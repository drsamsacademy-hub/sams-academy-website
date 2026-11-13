import { useState, useEffect } from 'react';
import { ArrowLeft, Play } from 'lucide-react';

// Helper function to extract YouTube Video ID from a URL
const getYouTubeId = (url) => {
  if (!url) return null;
  // This regex handles standard links, shortened links, and Shorts
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        // Only show posts where the category is "Video"
        const videoList = data.filter(post => post.category === 'Video');
        setVideos(videoList);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching videos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-2 text-gray-900">Video Lectures</h1>
      <p className="text-gray-500 mb-8">Watch daily classes and explanations directly on the platform.</p>

      {loading ? (
        <p className="text-gray-500">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-500">No videos uploaded yet. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map(video => {
            const videoId = getYouTubeId(video.link_url);
            return (
              <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                {videoId ? (
                  <div className="aspect-video w-full bg-gray-900">
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}`} 
                      title={video.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <Play size={48} />
                  </div>
                )}
                
                <div className="p-5 flex-grow">
                  <h2 className="text-lg font-bold text-gray-800 leading-tight mb-2">{video.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{video.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}