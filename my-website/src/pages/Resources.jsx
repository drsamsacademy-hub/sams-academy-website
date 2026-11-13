import { useState, useEffect } from 'react';
import { ArrowLeft, Download, FileText } from 'lucide-react';

const CATEGORIES = ['All', 'Syllabus', 'Previous Papers'];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        // Only show Syllabus and Previous Papers
        const filtered = data.filter(post => 
          post.category === 'Syllabus' || post.category === 'Previous Papers'
        );
        setResources(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching resources:", err);
        setLoading(false);
      });
  }, []);

  // Filter the resources based on the selected tab
  const displayedResources = activeFilter === 'All' 
    ? resources 
    : resources.filter(res => res.category === activeFilter);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-2 text-gray-900">Important Resources</h1>
      <p className="text-gray-500 mb-6">Download official syllabi and previous year question papers.</p>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === cat 
                ? 'bg-brand-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : displayedResources.length === 0 ? (
        <p className="text-gray-500">No {activeFilter === 'All' ? 'resources' : activeFilter.toLowerCase()} uploaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {displayedResources.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-brand-50 text-brand-600 rounded-lg mt-1">
                  <FileText size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{post.category}</span>
                  <h2 className="text-lg font-bold text-gray-800 leading-tight">{post.title}</h2>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 flex-grow whitespace-pre-wrap">{post.content}</p>
              
              <div className="mt-auto pt-4 flex gap-3">
                {post.file_url ? (
                  <a 
                    href={post.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition"
                  >
                    <Download size={18} className="mr-2" /> Download
                  </a>
                ) : (
                  <span className="text-sm text-red-500">File missing</span>
                )}
                
                {post.link_url && (
                  <a 
                    href={post.link_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    View Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}