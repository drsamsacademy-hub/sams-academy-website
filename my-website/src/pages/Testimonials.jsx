import { ArrowLeft, Quote, Star } from 'lucide-react';

export default function Testimonials() {
  // We will add video URLs here later
  const testimonials = [
    {
      name: "Ramesh Kumar",
      exam: "APPGCET 2026 - Rank 12",
      quote: "Dr. Sams Academy's daily notes were a game-changer for my preparation. The mock tests gave me the confidence I needed.",
      videoUrl: null // Placeholder for now
    },
    {
      name: "Sita Devi",
      exam: "APPGCET 2026 - Rank 45",
      quote: "The best part is that all the material is 100% free. Thank you, Dr. Sams, for supporting poor students like me.",
      videoUrl: null // Placeholder for now
    },
    {
      name: "Anil Reddy",
      exam: "CSIR NET - Qualified",
      quote: "The Zoology specific notes were incredibly detailed. I cleared the exam in my first attempt!",
      videoUrl: null // Placeholder for now
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-2 text-gray-900">Student Success Stories</h1>
      <p className="text-gray-500 mb-10 text-lg">Hear from the aspirants who cracked their exams with Dr. SAMS Academy.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((student, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative">
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-gray-100">
              <Quote size={40} />
            </div>

            {/* Video Player (Shows only if video URL exists) */}
            {student.videoUrl && (
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black mb-6">
                <video controls className="w-full h-full object-cover">
                  <source src={student.videoUrl} type="video/mp4" />
                </video>
              </div>
            )}

            {/* Star Rating */}
            <div className="flex gap-1 text-yellow-400 mb-4">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>

            <p className="text-gray-600 italic mb-6 flex-grow z-10 relative">
              "{student.quote}"
            </p>

            <div className="mt-auto">
              <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
              <p className="text-sm font-semibold text-brand-600">{student.exam}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}