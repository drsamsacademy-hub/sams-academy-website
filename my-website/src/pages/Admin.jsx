import { useState } from 'react';

export default function Admin() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Indian History',
    content: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Publishing...');

    try {
      const response = await fetch('http://localhost:4000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Material published successfully!');
        setFormData({ ...formData, title: '', content: '' }); // Clear form
      } else {
        setMessage('❌ Error: ' + data.error);
      }
    } catch (err) {
      setMessage('❌ Could not connect to the server.');
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
            placeholder="Enter password (admin123)"
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

        <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3 rounded-lg hover:bg-brand-700 transition">
          Publish Material
        </button>

        {message && <p className="text-center font-medium mt-4">{message}</p>}
      </form>
    </div>
  );
}