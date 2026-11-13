import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, ExternalLink, Newspaper } from 'lucide-react';

export default function CurrentAffairs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        // Only show posts where the category is "Current Affairs"
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
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-brand-500 border-t border-r border-b border-gray-100 flex flex-col">
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Calendar size={16} />
                <span>{new Date(post.created_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
              
              <div className="text-gray-600 whitespace-pre-wrap mb-4">
                {post.content}
              </div>
              
              <div className="mt-auto flex gap-3">
                {post.link_url && (
                  <a 
                    href={post.link_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
                  >
                    <ExternalLink size={18} className="mr-2" /> Read Full Article
                  </a>
                )}
                {post.file_url && (
                  <a 
                    href={post.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition"
                  >
                    Download PDF
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