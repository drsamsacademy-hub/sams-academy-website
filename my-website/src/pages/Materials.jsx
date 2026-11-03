import { useState, useEffect } from 'react';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';

const CATEGORIES = [
  'All', 'Indian History', 'AP History', 'Geography', 
  'Constitution of India', 'Economy', 'Society', 
  'Current Affairs', 'Mental Ability',
  'Assessments', 'APPGCET Zoology', 'Life Sciences', 'CSIR NET'
];

export default function Materials() {
      // Read the category from the URL (e.g., /materials?cat=Geography)
  const queryParams = new URLSearchParams(window.location.search);
  const initialCategory = queryParams.get('cat') || 'All';
    const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-6 text-gray-900">Study Materials & Links</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat 
                ? 'bg-brand-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading materials...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-gray-500">No materials posted yet for this subject. Check back soon!</p>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{post.category}</span>
              <h2 className="text-2xl font-bold text-gray-800 mt-1 mb-3">{post.title}</h2>
              
              <p className="text-gray-600 whitespace-pre-wrap mb-4">{post.content}</p>
              
              {/* Smart Link Button */}
              {post.link_url && (
                <a 
                  href={post.link_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
                >
                  <LinkIcon size={18} className="mr-2" /> Open Link / Resource
                </a>
              )}

              <p className="text-xs text-gray-400 mt-4">
                Posted on: {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}