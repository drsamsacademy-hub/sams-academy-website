import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Search, Share2, Microscope } from 'lucide-react';

export default function Zoology() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        // Only fetch materials related to Zoology
        const zoologyKeywords = ['zoology', 'life sciences', 'csir net'];
        const filtered = data.filter(post => {
          const cat = post.category.toLowerCase();
          return zoologyKeywords.some(keyword => cat.includes(keyword));
        });
        setPosts(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  const displayedPosts = posts.filter(post => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return post.title.toLowerCase().includes(searchLower) || post.content.toLowerCase().includes(searchLower);
  });

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <div className="flex items-center gap-3 mb-2">
        <Microscope className="text-brand-600" size={36} />
        <h1 className="text-4xl font-display font-bold text-gray-900">Zoology Prep Hub</h1>
      </div>
      <p className="text-gray-500 mb-8">Specialized preparation resources for Asst. Prof., CSIR NET, APSET, and APPGCET aspirants.</p>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search size={20} className="absolute left-3 top-3 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search Zoology topics (e.g., Genetics, Cell Biology)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none shadow-sm"
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading Zoology resources...</p>
      ) : displayedPosts.length === 0 ? (
        <p className="text-gray-500">No Zoology materials found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedPosts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{post.category}</span>
                <h2 className="text-2xl font-bold text-gray-800 mt-1 mb-3">{post.title}</h2>
                <p className="text-gray-600 whitespace-pre-wrap mb-4">{post.content}</p>
              </div>
              
              <div>
                <div className="flex flex-wrap gap-3 mb-4">
                  {post.link_url && (
                    <a href={post.link_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
                      Open Link
                    </a>
                  )}

                  {post.file_url && (
                    <a href={post.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition">
                      <Download size={18} className="mr-2" /> Download
                    </a>
                  )}
                  
                  <button 
                    onClick={() => {
                      const text = `Check out this Zoology material on Dr. SAMS Academy: *${post.title}*\n\nhttps://drsamsacademy.in/zoology`;
                      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="inline-flex items-center px-5 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
                  >
                    <Share2 size={18} className="mr-2" /> Share
                  </button>
                </div>
                
                <p className="text-xs text-gray-400 mt-4 border-t pt-4">
                  Posted on: {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}