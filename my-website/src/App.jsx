import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Target, TrendingUp } from 'lucide-react';
import Admin from './pages/Admin';
import Materials from './pages/Materials';
import Books from './pages/Books';
import Resources from './pages/Resources';
import Jobs from './pages/Jobs';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import CurrentAffairs from './pages/CurrentAffairs';
import MockTests from './pages/MockTests';
import Legal from './pages/Legal';
import { Show, SignInButton, UserButton, useUser } from "@clerk/react";
import Testimonials from './pages/Testimonials';
import Zoology from './pages/Zoology';
import Dashboard from './pages/Dashboard';
import { BookOpen, Sparkles, Target, TrendingUp, LayoutDashboard } from 'lucide-react';

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
    { name: 'Zoology (All Exams)', icon: '🧬', searchQuery: '/zoology' },
  { name: 'CSIR NET', icon: '🎓' }
];

export default function App() {
    const { user } = useUser();
  const [homeSearch, setHomeSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (homeSearch.trim()) {
      window.location.href = `/materials?search=${encodeURIComponent(homeSearch)}`;
    }
  };
 // Dashboard Route 
  if (window.location.pathname === '/dashboard') {
    return (
      <Show when="signed-in" fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">Please log in to view your dashboard.</p>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition">
              Student Login
            </button>
          </SignInButton>
        </div>
      }>
        <Dashboard />
      </Show>
    );
  }
  // 1. Admin Route
    if (window.location.pathname === '/admin') {
    return (
      <Show when="signed-in" fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Access Only</h1>
          <p className="text-gray-600 mb-6">Please log in to access the admin panel.</p>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition">
              Login
            </button>
          </SignInButton>
        </div>
      }>
        {/* Check if the logged-in user is YOU */}
        {user?.primaryEmailAddress?.emailAddress === 'drsamsacademy@gmail.com' ? (
          <Admin />
        ) : (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600">You do not have permission to view this page.</p>
            <a href="/" className="mt-6 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition">
              Return to Home
            </a>
          </div>
        )}
      </Show>
    );
  }

  // 2. Materials Route
  if (window.location.pathname === '/materials') {
    return (
      <Show when="signed-in" fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">Please log in to access the study materials.</p>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition">
              Student Login
            </button>
          </SignInButton>
        </div>
      }>
        <Materials />
      </Show>
    );
  }

  // 3. Videos Route
  if (window.location.pathname === '/videos') {
    return (
      <Show when="signed-in" fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">Please log in to access the video lectures.</p>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition">
              Student Login
            </button>
          </SignInButton>
        </div>
      }>
        <Videos />
      </Show>
    );
  }

  // 4. Tests Route
  if (window.location.pathname === '/tests') {
    return (
      <Show when="signed-in" fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">Please log in to take the mock tests.</p>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition">
              Student Login
            </button>
          </SignInButton>
        </div>
      }>
        <MockTests />
      </Show>
    );
  }

  // 5. Books Route
  if (window.location.pathname === '/books') {
    return <Books />;
  }

  // 6. Resources Route
  if (window.location.pathname === '/resources') {
    return <Resources />;
  }

  // 7. Jobs Route
  if (window.location.pathname === '/jobs') {
    return <Jobs />;
  }

  // 8. Contact Route
  if (window.location.pathname === '/contact') {
    return <Contact />;
  }

  // 9. News Route
  if (window.location.pathname === '/news') {
    return <CurrentAffairs />;
  }

  // 10. Legal Route
  if (window.location.pathname === '/legal') {
    return <Legal />;
  }
// 11. Testimonials
    if (window.location.pathname === '/testimonials') {
    return <Testimonials />;
  }
  // 12. Zoology
    if (window.location.pathname === '/zoology') {
    return <Zoology />;
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
          
          {/* Logo */}
          <div className="text-2xl font-display font-extrabold cursor-pointer">
            <span className="text-gray-800">Dr. </span>
            <span className="gradient-text">SAMS</span>{' '}
            <span className="text-brand-600">Academy</span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-4 font-medium text-gray-600 text-sm">
            <a href="/" className="hover:text-brand-600 transition">Home</a>
            <a href="/admin" className="hover:text-brand-600 transition">Admin</a>
            <a href="/materials" className="hover:text-brand-600 transition">Materials</a>
            <a href="/books" className="hover:text-brand-600 transition">Books</a>
            <a href="/resources" className="hover:text-brand-600 transition">Resources</a>
            <a href="/jobs" className="hover:text-brand-600 transition">Jobs</a>
            <a href="/videos" className="hover:text-brand-600 transition">Videos</a>
            <a href="/news" className="hover:text-brand-600 transition">News</a>
            <a href="/tests" className="hover:text-brand-600 transition">Tests</a>
            <a href="/zoology" className="hover:text-brand-600 transition">Zoology</a>
          </div>

          {/* Login / Profile Button */}
                              <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition text-sm">
                  Student Login
                </button>
              </SignInButton>
            </Show>
                        <Show when="signed-in">
              <a href="/dashboard" title="Dashboard" className="p-2 text-gray-600 hover:text-brand-600 transition">
                <LayoutDashboard size={22} />
              </a>
            </Show>
            <UserButton />
            </Show>
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
              <a href={cat.searchQuery && cat.searchQuery.startsWith('/') ? cat.searchQuery : `/materials?cat=${encodeURIComponent(cat.name)}`} className="block p-6 bg-white rounded-2xl border border-gray-100 hover:border-brand-500 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
                 <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-800">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">View notes →</p>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

                  {/* Footer */}
      <footer className="mt-16 bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Dr. <span className="gradient-text">SAMS</span> Academy
            </h2>
            <p className="text-sm leading-relaxed mb-4 text-gray-400">
              Dr. SAMS Academy is a premier online coaching platform providing daily curated notes, previous year question papers, and interactive mock tests for APPSC Group 1, Group 2, APPGCET, CSIR NET, and Asst. Prof. (Zoology) aspirants.
            </p>
            <p className="text-xs text-gray-500">
              <strong>English:</strong> Prepared exclusively for educational purposes. Readers are advised to verify important facts from official sources before relying on them.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <strong>తెలుగు:</strong> ఈ మెటీరియల్ విద్యా మరియు పోటీ పరీక్షల సిద్ధత కోసం మాత్రమే రూపొందించబడింది. ముఖ్యమైన వివరాలను సంబంధిత అధికారిక వనరుల ద్వారా తప్పనిసరిగా ధృవీకరించండి.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/materials" className="hover:text-brand-400 transition">Study Materials</a></li>
              <li><a href="/tests" className="hover:text-brand-400 transition">Mock Tests</a></li>
              <li><a href="/zoology" className="hover:text-brand-400 transition">Zoology Prep Hub</a></li>
              <li><a href="/books" className="hover:text-brand-400 transition">My Publications</a></li>
              <li><a href="/resources" className="hover:text-brand-400 transition">Resources (Syllabus/Papers)</a></li>
              <li><a href="/jobs" className="hover:text-brand-400 transition">Job Notifications</a></li>
            </ul>
          </div>

          {/* Column 3: Support & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Support & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/testimonials" className="hover:text-brand-600 transition whitespace-nowrap">Testimonials</a>
              <li><a href="/contact" className="hover:text-brand-400 transition">Contact Us (Submit Doubt)</a></li>
              <li><a href="/legal" className="hover:text-brand-400 transition">Privacy Policy</a></li>
              <li><a href="/legal" className="hover:text-brand-400 transition">Terms & Conditions</a></li>
              <li><a href="/legal" className="hover:text-brand-400 transition">AI Usage Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Dr. SAMS Academy · Built for aspirants 💪</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for the aspirants of Andhra Pradesh</p>
        </div>
      </footer>
    </div>
  );
}