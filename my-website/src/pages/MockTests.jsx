import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

// A component for each individual question card
const QuestionCard = ({ post }) => {
  // We split the content by new lines to get the options and the answer
  const lines = post.content.split('\n').filter(line => line.trim() !== '');
  
  // Assuming the last line is the answer (e.g., "Answer: B")
  const answerLine = lines[lines.length - 1];
  const correctAnswer = answerLine.replace('Answer:', '').trim().toUpperCase();
  
  // The options are the lines that start with A), B), C), or D)
  const options = lines.filter(line => /^[A-D]\)/.test(line.trim().toUpperCase()));
  
  // The question text is the first line
  const questionText = lines[0];

  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return alert("Please select an option first!");
    setSubmitted(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <HelpCircle className="text-brand-600 mt-1 flex-shrink-0" size={24} />
        <h2 className="text-lg font-bold text-gray-800">{questionText}</h2>
      </div>

      <div className="space-y-3 mb-6 pl-9">
        {options.map((opt, index) => {
          // Extract the letter (A, B, C, D)
          const letter = opt.trim().charAt(0).toUpperCase();
          const text = opt.replace(/^[A-D]\)/, '').trim();
          
          const isCorrect = letter === correctAnswer;
          const isSelected = selected === letter;

          return (
            <label 
              key={index} 
              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                submitted 
                  ? isCorrect 
                    ? 'border-green-500 bg-green-50' 
                    : isSelected 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-100'
                  : isSelected 
                    ? 'border-brand-500 bg-brand-50' 
                    : 'border-gray-100 hover:border-brand-300'
              }`}
            >
              <input 
                type="radio" 
                name={`question-${post.id}`} 
                value={letter}
                checked={isSelected}
                onChange={() => setSelected(letter)}
                disabled={submitted}
                className="mr-3 w-4 h-4 text-brand-600"
              />
              <span className="font-semibold mr-2">{letter})</span>
              <span className="text-gray-700">{text}</span>
            </label>
          );
        })}
      </div>

      {!submitted ? (
        <button 
          onClick={handleSubmit}
          className="ml-9 bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition"
        >
          Check Answer
        </button>
      ) : (
        <div className="ml-9 flex items-center gap-2 font-medium">
          {selected === correctAnswer ? (
            <span className="text-green-600 flex items-center gap-1"><CheckCircle size={20}/> Correct!</span>
          ) : (
            <span className="text-red-600 flex items-center gap-1"><XCircle size={20}/> Incorrect. The right answer is {correctAnswer}.</span>
          )}
          <button onClick={() => { setSelected(null); setSubmitted(false); }} className="text-gray-500 text-sm ml-4 hover:underline">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default function MockTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        // Only show posts where the category is "Mock Test"
        const testList = data.filter(post => post.category === 'Mock Test');
        setTests(testList);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tests:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-2 text-gray-900">Interactive Mock Tests</h1>
      <p className="text-gray-500 mb-8">Test your knowledge instantly. Select an option and check your answer.</p>

      {loading ? (
        <p className="text-gray-500">Loading tests...</p>
      ) : tests.length === 0 ? (
        <p className="text-gray-500">No mock tests uploaded yet. Check back soon!</p>
      ) : (
        <div>
          {tests.map(test => (
            <QuestionCard key={test.id} post={test} />
          ))}
        </div>
      )}
    </div>
  );
}