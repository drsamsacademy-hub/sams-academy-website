import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, ExternalLink, Newspaper, ChevronDown, ChevronUp, Download } from 'lucide-react';

// A component to handle the "Read More" toggle and card layout
const NewsCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar size={16} />
          <span>{new Date(post.created_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h2>
        
        {/* The text content with the fade effect */}
        <div className={`text-gray-600 whitespace-pre-wrap text-sm relative ${!isExpanded ? 'max-h-32 overflow-hidden' : ''}`}>
          {post.content}
          
          {/* Fade effect at the bottom if text is collapsed */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>
      </div>

      <div>
        {/* Read More / Read Less Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:text-brand-700 transition mt-4 mb-4 w-max"
        >
          {isExpanded ? (
            <><ChevronUp size={16} /> Read Less</>
          ) : (
            <><ChevronDown size={16} /> Read Full News</>
          )}
        </button>
        
        {/* Links/Downloads */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          {post.link_url && (
            <a 
              href={post.link_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm rounded-lg font-medium hover:bg-gray-800 transition"
            >
              <ExternalLink size={16} className="mr-1.5" /> Article
            </a>
          )}
          {post.file_url && (
            <a 
              href={post.file_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-brand-600 text-white text-sm rounded-lg font-medium hover:bg-brand-700 transition"
            >
              <Download size={16} className="mr-1.5" /> PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CurrentAffairs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        const newsList = data.filter(post => post.category === 'Current Affairs');
        setPosts(newsList);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <div className="flex items-center gap-3 mb-2">
        <Newspaper className="text-brand-600" size={32} />
        <h1 className="text-4xl font-display font-bold text-gray-900">Daily Current Affairs</h1>
      </div>
      <p className="text-gray-500 mb-8">Stay updated with the latest news and events for your exams.</p>

      {loading ? (
        <p className="text-gray-500">Loading news...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No current affairs uploaded yet. Check back soon!</p>
      ) : (
        /* The 2-Column Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}