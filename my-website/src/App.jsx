import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Target, TrendingUp } from 'lucide-react';
import Admin from './pages/Admin';
import Materials from './pages/Materials';
import Books from './pages/Books';
import Resources from './pages/Resources';

const SUBJECTS = [
  { name: 'Indian History', icon: '🏛️' },
  { name: 'AP History', icon: '🌾' },
  { name: 'Geography', icon: '🗺️' },
  { name: 'Constitution of India', icon: '⚖️' },
  { name: 'Economy', icon: '📈' },
  { name: 'Society', icon: '👥' },
  { name: 'Current Affairs', icon: '📰' },
  { name: 'Mental Ability', icon: '🧠' },
  { name: 'Assessments', icon: '📝' },
  { name: 'APPGCET Zoology', icon: '🔬' },
  { name: 'Life Sciences', icon: '🧬' },
  { name: 'CSIR NET', icon: '🎓' }
];

export default function App() {
  const [homeSearch, setHomeSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (homeSearch.trim()) {
      window.location.href = `/materials?search=${encodeURIComponent(homeSearch)}`;
    }
  };

  // Check the URL to show the right page
  if (window.location.pathname === '/admin') {
    return <Admin />;
  }

  if (window.location.pathname === '/materials') {
    return <Materials />;
  }

  if (window.location.pathname === '/books') {
    return <Books />;
  }

  if (window.location.pathname === '/resources') {
    return <Resources />;
  }

  // Otherwise, show the Homepage
  return (
    <div className="min-h-screen">
            {/* Scrolling Notification Bar */}
      <div className="bg-brand-700 text-white text-sm py-2 overflow-hidden relative z-50">
        <marquee scrollamount="5" className="font-medium">
          🔔 <strong>Latest Update:</strong> APPSC Group 2 Notification Released! 
          <a href="https://psc.ap.gov.in" target="_blank" rel="noopener noreferrer" className="underline text-yellow-300 ml-2 hover:text-yellow-100">
            Click here to apply
          </a> 
          &nbsp;&nbsp;|&nbsp;&nbsp; 
          📢 UPSC Prelims 2026 dates announced. 
          <a href="https://upsc.gov.in" target="_blank" rel="noopener noreferrer" className="underline text-yellow-300 ml-2 hover:text-yellow-100">
            Check details
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp; 
          🎓 CSIR NET Life Sciences new batch starting soon!
        </marquee>
      </div>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-display font-extrabold cursor-pointer">
            <span className="gradient-text">SAMS</span>{' '}
            <span className="text-brand-600">Academy</span>
          </div>
          <div className="flex gap-6 font-medium text-gray-600">
            <a href="/" className="hover:text-brand-600 transition">Home</a>
            <a href="/admin" className="hover:text-brand-600 transition">Admin</a>
            <a href="/materials" className="hover:text-brand-600 transition">Materials</a>
            <a href="/books" className="hover:text-brand-600 transition">Books</a>
            <a href="/resources" className="hover:text-brand-600 transition">Resources</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-pink-50" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-extrabold leading-tight text-gray-900"
          >
            Crack <span className="gradient-text">APPSC</span> with clarity.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Daily curated notes across core subjects — built for Gen Z aspirants
            who want smart, focused prep. 🚀
          </motion.p>

          {/* Homepage Search Bar */}
          <motion.form 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            onSubmit={handleSearch} 
            className="mt-8 max-w-xl mx-auto flex items-center bg-white rounded-full shadow-lg border border-gray-100 p-2"
          >
            <input 
              type="text" 
              placeholder="Search for Day, Topic, or Keyword..." 
              value={homeSearch}
              onChange={(e) => setHomeSearch(e.target.value)}
              className="flex-grow px-4 py-2 bg-transparent outline-none text-gray-700"
            />
            <button type="submit" className="px-6 py-2 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition">
              Search
            </button>
          </motion.form>

          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <a href="/materials"
              className="px-8 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition shadow-lg shadow-brand-500/30">
              Explore Materials
            </a>
            <a href="#subjects"
              className="px-8 py-3 border-2 border-brand-600 text-brand-600 rounded-full font-semibold hover:bg-brand-50 transition">
              Browse Subjects
            </a>
          </div>
          
          <div className="mt-12 flex gap-8 justify-center text-sm text-gray-600 flex-wrap">
            <div className="flex items-center gap-2"><BookOpen size={18}/> Daily notes</div>
            <div className="flex items-center gap-2"><Target size={18}/> Multiple subjects</div>
            <div className="flex items-center gap-2"><TrendingUp size={18}/> Expert curated</div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3 text-gray-900">
          Your <span className="gradient-text">Syllabus Arsenal</span>
        </h2>
        <p className="text-center text-gray-500 mb-12">Pick a subject and start grinding.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {SUBJECTS.map((cat, i) => (
            <motion.div key={cat.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <a href={`/materials?cat=${encodeURIComponent(cat.name)}`} className="block p-6 bg-white rounded-2xl border border-gray-100 hover:border-brand-500 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-800">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">View notes →</p>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} SAMS Academy · Built for aspirants 💪
      </footer>
    </div>
  );
}