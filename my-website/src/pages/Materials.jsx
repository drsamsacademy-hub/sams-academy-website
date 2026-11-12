import { useState, useEffect } from 'react';
import { ArrowLeft, Link as LinkIcon, Download, Search } from 'lucide-react';

const CATEGORIES = [
  'All', 'Indian History', 'AP History', 'Geography', 
  'Constitution of India', 'Economy', 'Society', 
  'Current Affairs', 'Mental Ability',
  'Assessments', 'APPGCET Zoology', 'Life Sciences', 'CSIR NET'
];

export default function Materials() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'

  // Read the category from the URL on load
    useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const initialCategory = queryParams.get('cat') || 'All';
    const initialSearch = queryParams.get('search') || '';
    setActiveCategory(initialCategory);
    setSearchQuery(initialSearch);
  }, []);

  // Fetch the posts
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

  // Filter and Sort the posts
  const filteredPosts = posts
    .filter(post => {
      // 1. Filter by Category
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      
      // 2. Filter by Search Text (Title or Content)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        post.title.toLowerCase().includes(searchLower) || 
        post.content.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      // 3. Sort by Date
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-6 text-gray-900">Study Materials</h1>

      {/* Search & Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search size={20} className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Day, Topic, or Keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>
        <select 
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 outline-none font-medium text-gray-700"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First (Day 1)</option>
        </select>
      </div>

      {/* Category Filters */}
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

      {/* Results */}
      {loading ? (
        <p className="text-gray-500">Loading materials...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-gray-500">No materials found matching your search.</p>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{post.category}</span>
              <h2 className="text-2xl font-bold text-gray-800 mt-1 mb-3">{post.title}</h2>
              
              <p className="text-gray-600 whitespace-pre-wrap mb-4">{post.content}</p>
              
              <div className="flex flex-wrap gap-3 mb-4">
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

                {post.file_url && (
                  <a 
                    href={post.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition"
                  >
                    <Download size={18} className="mr-2" /> Download File
                  </a>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-4 border-t pt-4">
                Posted on: {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}