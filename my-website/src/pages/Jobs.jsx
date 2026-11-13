import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Briefcase } from 'lucide-react';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        // Only show posts where the category is "Job Portal"
        const jobList = data.filter(post => post.category === 'Job Portal');
        setJobs(jobList);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-2 text-gray-900">Employment & Job Portals</h1>
      <p className="text-gray-500 mb-8">Official links for APPSC, UPSC, SSC, RRB, and other government job notifications.</p>

      {loading ? (
        <p className="text-gray-500">Loading links...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">No job links uploaded yet. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {jobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-brand-50 text-brand-600 rounded-lg mt-1">
                  <Briefcase size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Official Link</span>
                  <h2 className="text-lg font-bold text-gray-800 leading-tight">{job.title}</h2>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 flex-grow whitespace-pre-wrap">{job.content}</p>
              
              <div className="mt-auto pt-2">
                {job.link_url ? (
                  <a 
                    href={job.link_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
                  >
                    <ExternalLink size={18} className="mr-2" /> Visit Website
                  </a>
                ) : (
                  <span className="text-sm text-red-500">Link missing</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}