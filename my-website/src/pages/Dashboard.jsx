import { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { ArrowLeft, Flame, Award, BookOpen, Target } from 'lucide-react';

export default function Dashboard() {
  const { user } = useUser();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // 1. Calculate Daily Streak using Local Storage
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('sams_last_visit');
    const currentStreak = parseInt(localStorage.getItem('sams_streak') || '0', 10);

    if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastVisit === yesterday.toDateString()) {
        // They visited yesterday, increase streak
        setStreak(currentStreak + 1);
        localStorage.setItem('sams_streak', currentStreak + 1);
      } else {
        // Streak broken, reset to 1
        setStreak(1);
        localStorage.setItem('sams_streak', 1);
      }
      localStorage.setItem('sams_last_visit', today);
    } else {
      // Already visited today
      setStreak(currentStreak || 1);
    }

    // 2. Fetch Student's Test Results
    if (user) {
      fetch('https://sams-academy-plus.onrender.com/api/results')
        .then(res => res.json())
        .then(data => {
          const myResults = data.filter(r => r.student_email === user.primaryEmailAddress?.emailAddress);
          setResults(myResults);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const averageScore = results.length > 0 
    ? Math.round((results.reduce((acc, curr) => acc + (curr.score / curr.total_questions), 0) / results.length) * 100) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 mb-20">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <div className="flex items-center gap-4 mb-8">
        <img src={user?.imageUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-brand-500" />
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Welcome back, {user?.firstName || 'Aspirant'}!</h1>
          <p className="text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-50 text-orange-500 rounded-xl">
            <Flame size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Daily Streak</p>
            <h2 className="text-2xl font-bold text-gray-800">{streak} Days 🔥</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-500 rounded-xl">
            <Target size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Average Score</p>
            <h2 className="text-2xl font-bold text-gray-800">{averageScore}%</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-500 rounded-xl">
            <BookOpen size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tests Taken</p>
            <h2 className="text-2xl font-bold text-gray-800">{results.length}</h2>
          </div>
        </div>
      </div>

      {/* Test History Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <Award className="text-brand-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">My Mock Test History</h2>
        </div>
        
        {loading ? (
          <p className="p-6 text-gray-500">Loading your results...</p>
        ) : results.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500 mb-4">You haven't taken any mock tests yet.</p>
            <a href="/tests" className="px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700">Take a Test Now</a>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 font-semibold">Test Name</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.map(result => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{result.test_title}</td>
                  <td className="p-4 text-gray-500">{new Date(result.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full font-bold ${
                      (result.score / result.total_questions) >= 0.5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {result.score} / {result.total_questions}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}