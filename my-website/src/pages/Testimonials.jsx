import { ArrowLeft, Quote } from 'lucide-react';

export default function Testimonials() {
  // Add your Cloudinary video URLs and student names here
  const testimonials = [
    {
      name: "Student Name 1",
      exam: "APPGCET 2026 - Rank 1",
      videoUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/YOUR_PUBLIC_ID.mp4",
      quote: "Dr. Sams Academy's daily notes were a game-changer for my preparation."
    },
    {
      name: "Student Name 2",
      exam: "APPGCET 2026 - Rank 5",
      videoUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/YOUR_PUBLIC_ID.mp4",
      quote: "The mock tests helped me understand the exact exam pattern."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-2 text-gray-900">Student Success Stories</h1>
      <p className="text-gray-500 mb-8">Hear directly from our students who cracked their exams.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((student, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black mb-4">
              <video 
                controls 
                className="w-full h-full object-cover"
                poster="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/so_0/YOUR_PUBLIC_ID.jpg" // Optional: Thumbnail
              >
                <source src={student.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Quote className="text-brand-600" size={20} />
              <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
            </div>
            <p className="text-sm font-semibold text-brand-600 mb-2">{student.exam}</p>
            <p className="text-gray-600 italic">"{student.quote}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}