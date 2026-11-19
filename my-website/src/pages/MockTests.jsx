import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

// --- SUB-COMPONENT FOR A SINGLE QUESTION ---
const QuestionBlock = ({ q, index, answers, setAnswers, showResults }) => {
  const questionText = q.options.length > 0 ? q.lines[0] : q.lines[0];
  
  // Extract the correct answer (last line)
  const answerLine = q.lines[q.lines.length - 1];
  const correctAnswer = answerLine.replace('Answer:', '').trim().toUpperCase();

  // Extract the options
  const options = q.lines.filter(line => /^[A-D]\)/.test(line.trim().toUpperCase()));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">{index + 1}. {questionText}</h2>

      <div className="space-y-3">
        {options.map((opt, i) => {
          const letter = opt.trim().charAt(0).toUpperCase();
          const text = opt.replace(/^[A-D]\)/, '').trim();
          const isSelected = answers[index] === letter;
          const isCorrect = letter === correctAnswer;
          
          let bgClass = "border-gray-100 hover:border-brand-300";
          if (isSelected && !showResults) bgClass = "border-brand-500 bg-brand-50";
          if (showResults) {
            if (isCorrect) bgClass = "border-green-500 bg-green-50";
            else if (isSelected && !isCorrect) bgClass = "border-red-500 bg-red-50";
          }

          return (
            <label key={i} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${bgClass}`}>
              <input 
                type="radio" 
                name={`q-${index}`} 
                value={letter}
                checked={isSelected}
                onChange={() => setAnswers({ ...answers, [index]: letter })}
                disabled={showResults}
                className="mr-3 w-4 h-4 text-brand-600"
              />
              <span className="font-semibold mr-2">{letter})</span>
              <span className="text-gray-700">{text}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function MockTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTest, setActiveTest] = useState(null);
  
  // State to track user's answers and submission status
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        const testList = data.filter(post => post.category === 'Mock Test');
        setTests(testList);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tests:", err);
        setLoading(false);
      });
  }, []);

  // Function to parse the raw text into separate questions
  const parseQuestions = (content) => {
    // Split by question marks or lines that start with a number
    const rawBlocks = content.split(/(?=\n?\d+\.|\n?Q\d+)/).filter(b => b.trim() !== '');
    
    return rawBlocks.map(block => {
      const lines = block.split('\n').filter(line => line.trim() !== '');
      return { lines };
    });
  };

  // Function to calculate score
  const calculateScore = () => {
    let score = 0;
    const qs = parseQuestions(activeTest.content);
    
    qs.forEach((q, index) => {
      const answerLine = q.lines[q.lines.length - 1];
      const correct = answerLine.replace('Answer:', '').trim().toUpperCase();
      if (answers[index] === correct) score++;
    });
    
    return score;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="text-brand-600" size={32} />
        <h1 className="text-4xl font-display font-bold text-gray-900">Interactive Mock Tests</h1>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading tests...</p>
      ) : tests.length === 0 ? (
        <p className="text-gray-500">No mock tests uploaded yet. Check back soon!</p>
      ) : (
        <div>
          {/* LIST OF AVAILABLE TESTS */}
          {!activeTest ? (
            <div className="grid md:grid-cols-2 gap-5">
              {tests.map(test => (
                <div key={test.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{test.title}</h2>
                    <p className="text-gray-500 text-sm mb-4">Click below to start this test.</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTest(test); setAnswers({}); setShowResults(false); }}
                    className="w-full bg-brand-600 text-white font-bold py-2.5 rounded-lg hover:bg-brand-700 transition"
                  >
                    Start Test
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* ACTIVE TEST VIEW */
            <div>
              <div className="flex justify-between items-center mb-6 bg-brand-50 p-4 rounded-xl border border-brand-100">
                <h2 className="text-2xl font-bold text-brand-800">{activeTest.title}</h2>
                <button onClick={() => setActiveTest(null)} className="text-brand-600 font-medium hover:underline text-sm">
                  Exit Test
                </button>
              </div>

              {/* RENDER QUESTIONS */}
              {parseQuestions(activeTest.content).map((q, index) => (
                <QuestionBlock 
                  key={index} 
                  q={q} 
                  index={index} 
                  answers={answers} 
                  setAnswers={setAnswers} 
                  showResults={showResults} 
                />
              ))}

              {/* SUBMIT BUTTON & SCORE */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 sticky bottom-4">
                {!showResults ? (
                  <button 
                    onClick={() => setShowResults(true)}
                    className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition"
                  >
                    Submit Test & See Score
                  </button>
                ) : (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      You scored {calculateScore()} out of {parseQuestions(activeTest.content).length}!
                    </h3>
                    <p className="text-gray-500 mb-4">Review your answers above (Green = Correct, Red = Incorrect).</p>
                    <button 
                      onClick={() => { setActiveTest(null); setAnswers({}); setShowResults(false); }}
                      className="bg-brand-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-brand-700 transition"
                    >
                      Back to Tests
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}