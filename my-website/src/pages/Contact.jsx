import { useState } from 'react';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.target;
    const data = new FormData(form);

    try {
      // ⚠️ REPLACE THE URL BELOW WITH YOUR FORMSPREE URL
      const response = await fetch('https://formspree.io/f/mqpqeqbb', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form.");
        setStatus('idle');
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form.");
      setStatus('idle');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-2 text-gray-900">Submit a Doubt</h1>
      <p className="text-gray-500 mb-8">Stuck on a topic? Send your question here and Dr. Sams will get back to you.</p>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center">
          <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
          <p>Your doubt has been submitted successfully. We will reply to your email soon.</p>
          <button onClick={() => setStatus('idle')} className="mt-6 text-brand-600 font-medium hover:underline">
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input 
              type="text" name="name" required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input 
              type="email" name="email" required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input 
              type="text" name="subject" required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="e.g., Doubt in Day 2 - Pre-Historic India"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
            <textarea 
              name="message" required rows="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none"
              placeholder="Type your doubt here in detail..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full flex justify-center items-center gap-2 bg-brand-600 text-white font-bold py-3 rounded-lg hover:bg-brand-700 transition disabled:opacity-70"
          >
            {status === 'submitting' ? 'Sending...' : <><Send size={18} /> Send Message</>}
          </button>
        </form>
      )}
    </div>
  );
}