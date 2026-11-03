import { useState } from 'react';

export default function Admin() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Indian History',
    content: '',
    password: '',
    link_url: '',
     file_url: '' //
  });
  const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Publishing...');

    try {
      // 1. Set up a 60-second timeout to wake up the free Render server
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      // 2. Prepare the data (FormData is required for files)
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('password', formData.password);
      if (formData.link_url) formDataToSend.append('link_url', formData.link_url);
      if (formData.file_url) formDataToSend.append('file', formData.file_url);

      // 3. Send the request
      const response = await fetch('https://sams-academy-plus.onrender.com/api/posts', {
        method: 'POST',
        body: formDataToSend, // We send the FormData here
        signal: controller.signal
        // Notice: We completely removed the "headers: { 'Content-Type': 'application/json' }" line!
      });

      // 4. Clear the timeout once the request finishes
      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Material published successfully!');
        // Clear form (reset the file input and link)
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

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg border border-gray-100">
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
            placeholder="Enter your secret password"
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
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Content (Paste from Word)</label>
          <textarea 
            required rows="10"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none font-mono text-sm"
            placeholder="Paste your notes here..."
          />
        </div>

        {/* Link Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Link (YouTube / Google Form / PDF)</label>
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
    </div>
  );
}