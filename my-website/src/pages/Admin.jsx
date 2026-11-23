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

  // Fetch Data
  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => setAllPosts(data))
      .catch(err => console.error(err));

    fetch('https://sams-academy-plus.onrender.com/api/results')
      .then(res => res.json())
      .then(data => setAllResults(data))
      .catch(err => console.error(err));
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Publishing...');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('password', formData.password);
      if (formData.link_url) formDataToSend.append('link_url', formData.link_url);
      if (formData.file_url) formDataToSend.append('file', formData.file_url);

      const response = await fetch('https://sams-academy-plus.onrender.com/api/posts', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setMessage('✅ Material published successfully!');
        setFormData({ ...formData, title: '', content: '', link_url: '', file_url: '' }); 
      } else {
        setMessage('❌ Error publishing material');
      }
    } catch (err) {
      setMessage('❌ Could not connect to the server.');
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
      if (response.ok) setMessage('✅ Post deleted!');
    } catch (err) {
      setMessage('❌ Could not connect to server.');
    }
  };

  const filteredAdminPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesCategory = adminCategory === 'All' || post.category === adminCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 mb-20">
      
      {/* 1. ADD MATERIAL FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
        <h1 className="text-3xl font-display font-bold mb-6 text-gray-800">Teacher's Admin Panel</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="p-3 border rounded-lg w-full" placeholder="Admin Password" />
            <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="p-3 border rounded-lg w-full" placeholder="Title (e.g., Day 1 - History)" />
          </div>
          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="p-3 border rounded-lg w-full">
            <option>Indian History</option><option>AP History</option><option>Geography</option><option>Constitution of India</option><option>Economy</option><option>Society</option><option>Current Affairs</option><option>Mental Ability</option><option>Assessments</option><option>APPGCET Zoology</option><option>Life Sciences</option><option>CSIR NET</option><option>Syllabus</option><option>Previous Papers</option><option>Book</option><option>Job Portal</option><option>Video</option><option>Mock Test</option>
          </select>
          <textarea required rows="3" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="p-3 border rounded-lg w-full" placeholder="Content..." />
          <div className="grid md:grid-cols-2 gap-4">
            <input type="url" value={formData.link_url} onChange={(e) => setFormData({...formData, link_url: e.target.value})} className="p-3 border rounded-lg w-full" placeholder="Link (Optional)" />
            <input type="file" onChange={(e) => setFormData({...formData, file_url: e.target.files[0]})} className="p-2 border rounded-lg w-full bg-gray-50 text-sm" />
          </div>
          <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3 rounded-lg hover:bg-brand-700">Publish Material</button>
          {message && <p className="text-center font-medium mt-4 text-brand-600">{message}</p>}
        </form>
      </div>

      {/* 2. STUDENT RESULTS TABLE (Moved Up so you can see it!) */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Student Mock Test Results</h2>
        {allResults.length === 0 ? (
          <p className="text-gray-400 bg-gray-50 p-6 rounded-xl text-center">No test results yet. Ask a student to take a test!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4">Student Email</th>
                  <th className="p-4">Test Name</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {allResults.map(result => (
                  <tr key={result.id} className="border-b">
                    <td className="p-4 font-medium">{result.student_email}</td>
                    <td className="p-4">{result.test_title}</td>
                    <td className="p-4 font-bold text-brand-600">{result.score} / {result.total_questions}</td>
                    <td className="p-4 text-gray-500">{new Date(result.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 3. PUBLISHED MATERIALS LIST */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Published Materials</h2>
        <div className="flex gap-3 mb-6">
          <input type="text" placeholder="Search..." value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} className="p-2 border rounded-lg flex-grow" />
          <select value={adminCategory} onChange={(e) => setAdminCategory(e.target.value)} className="p-2 border rounded-lg bg-white">
            <option value="All">All Categories</option>
            <option>Indian History</option><option>Current Affairs</option><option>Mock Test</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredAdminPosts.map(post => (
            <div key={post.id} className="p-4 border rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-brand-600 uppercase">{post.category}</span>
                <h3 className="font-semibold text-sm mb-2">{post.title}</h3>
              </div>
              <button onClick={() => handleDelete(post.id)} className="mt-4 px-3 py-1 bg-red-50 text-red-600 rounded text-xs">Delete</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}