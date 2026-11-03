import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Materials() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/posts')
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

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-8 text-gray-900">All Study Materials</h1>

      {loading ? (
        <p className="text-gray-500">Loading materials...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No materials posted yet. Check back soon!</p>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{post.category}</span>
              <h2 className="text-2xl font-bold text-gray-800 mt-1 mb-3">{post.title}</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{post.content}</p>
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