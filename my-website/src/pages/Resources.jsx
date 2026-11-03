import { useState, useEffect } from 'react';
import { ArrowLeft, Download, FileText } from 'lucide-react';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        // Filter to only show Syllabus and Previous Papers
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

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-2 text-gray-900">Important Resources</h1>
      <p className="text-gray-500 mb-8">Download official syllabi and previous year question papers.</p>

      {loading ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : resources.length === 0 ? (
        <p className="text-gray-500">No resources uploaded yet. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {resources.map(post => (
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