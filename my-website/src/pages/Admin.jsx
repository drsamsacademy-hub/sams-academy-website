import { useState, useEffect } from 'react';

export default function Admin() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Indian History',
    content: '',
    password: '',
    link_url: '',
    file_url: ''
  });
  const [message, setMessage] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [allResults, setAllResults] = useState([]);
const [adminSearch, setAdminSearch] = useState('');
  const [adminCategory, setAdminCategory] = useState('All');
  const filteredAdminPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesCategory = adminCategory === 'All' || post.category === adminCategory;
          return matchesSearch && matchesCategory;
  });
  // Fetch posts on load (and refresh whenever the message changes)
  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => setAllPosts(data))
      .catch(err => console.error(err));
  }, [message]);
    useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/results')
      .then(res => res.json())
      .then(data => setAllResults(data))
      .catch(err => console.error(err));
  }, [message]); // Refreshes when a message changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Publishing...');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('password', formData.password);
      if (formData.link_url) formDataToSend.append('link_url', formData.link_url);
      if (formData.file_url) formDataToSend.append('file', formData.file_url);

      const response = await fetch('https://sams-academy-plus.onrender.com/api/posts', {
        method: 'POST',
        body: formDataToSend,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Material published successfully!');
        setFormData({ ...formData, title: '', content: '', link_url: '', file_url: '' }); 
      } else {
        setMessage('❌ Error: ' + data.error);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setMessage('❌ Server took too long to wake up. Please try again.');
      } else {
        setMessage('❌ Could not connect to the server.');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`https://sams-academy-plus.onrender.com/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: formData.password })
      });

      if (response.ok) {
        setMessage('✅ Post deleted successfully!');
      } else {
        setMessage('❌ Failed to delete. Check password.');
      }
    } catch (err) {
      setMessage('❌ Could not connect to server.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 mb-20">
      <h1 className="text-3xl font-display font-bold mb-6 text-gray-800">Teacher's Admin Panel</h1>
      <p className="text-gray-500 mb-6">Paste your Daily Material here to publish it to the website.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Password</label>
          <input 
            type="password" required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            placeholder="Enter password"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            type="text" required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            placeholder="e.g., Day 1 - Constitution Preamble"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject Category</label>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          >
            <option>Indian History</option>
            <option>AP History</option>
            <option>Geography</option>
            <option>Constitution of India</option>
            <option>Economy</option>
            <option>Society</option>
            <option>Current Affairs</option>
            <option>Mental Ability</option>
            <option>Assessments</option>
            <option>APPGCET Zoology</option>
            <option>Life Sciences</option>
            <option>CSIR NET</option>
            <option>Syllabus</option>
            <option>Previous Papers</option>
            <option>Book</option>
            <option>Job Portal</option>
            <option>Video</option>
            <option>Mock Test</option>
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Content (Paste from Word)</label>
          <textarea 
            required rows="6"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none font-mono text-sm"
            placeholder="Paste your notes here..."
          />
        </div>

        {/* Link Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Link (YouTube / Google Form)</label>
          <input 
            type="url"
            value={formData.link_url}
            onChange={(e) => setFormData({...formData, link_url: e.target.value})}
            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            placeholder="https://..."
          />
        </div>

        {/* File Upload Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload PDF / Word / Image (Optional)</label>
          <input 
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={(e) => setFormData({...formData, file_url: e.target.files[0]})}
            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-gray-50"
          />
          <p className="text-xs text-gray-400 mt-1">Max size: 10MB</p>
        </div>

        <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3 rounded-lg hover:bg-brand-700 transition">
          Publish Material
        </button>

        {message && <p className="text-center font-medium mt-4">{message}</p>}
      </form>

      {/* List of Published Posts */}
      <div className="mt-12 pt-8 border-t border-gray-200">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Published Materials</h2>
        <p className="text-sm text-gray-500 mb-4">Type your password above to enable deletion.</p>
        
        {/* Admin Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <input 
            type="text" 
            placeholder="Search by title..." 
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
          />
          <select 
            value={adminCategory}
            onChange={(e) => setAdminCategory(e.target.value)}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-white"
          >
            <option value="All">All Categories</option>
            <option>Indian History</option>
            <option>AP History</option>
            <option>Geography</option>
            <option>Constitution of India</option>
            <option>Economy</option>
            <option>Society</option>
            <option>Current Affairs</option>
            <option>Mental Ability</option>
            <option>Assessments</option>
            <option>APPGCET Zoology</option>
            <option>Life Sciences</option>
            <option>CSIR NET</option>
            <option>Syllabus</option>
            <option>Previous Papers</option>
            <option>Book</option>
            <option>Job Portal</option>
            <option>Video</option>
            <option>Mock Test</option>
          </select>
        </div>

        {/* Grid Layout for Posts */}
        {filteredAdminPosts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No materials found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAdminPosts.map(post => (
              <div key={post.id} className="flex flex-col justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                <div>
                  <span className="inline-block text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-md mb-2 uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-2 line-clamp-3">{post.title}</h3>
                </div>
                <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition font-medium text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
          {/* Student Results Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Student Mock Test Results</h2>
        <p className="text-sm text-gray-500 mb-4">Here are the recent scores submitted by logged-in students.</p>
        
        {allResults.length === 0 ? (
          <p className="text-gray-400">No test results yet.</p>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="p-4 font-semibold">Student</th>
                  <th className="p-4 font-semibold">Test</th>
                  <th className="p-4 font-semibold">Score</th>
                  <th className="p-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allResults.map(result => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{result.student_name || 'Student'}</div>
                      <div className="text-xs text-gray-500">{result.student_email}</div>
                    </td>
                    <td className="p-4 text-gray-800">{result.test_title}</td>
                    <td className="p-4 font-bold text-brand-600">{result.score} / {result.total_questions}</td>
                    <td className="p-4 text-gray-500">{new Date(result.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}