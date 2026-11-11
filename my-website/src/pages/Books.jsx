import { useState, useEffect } from 'react';
import { ArrowLeft, Download, BookOpen } from 'lucide-react';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sams-academy-plus.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        // Only show posts where the category is "Book"
        const bookList = data.filter(post => post.category === 'Book');
        setBooks(bookList);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-2 text-gray-900">My Publications</h1>
      <p className="text-gray-500 mb-8">Books authored by me for competitive exam aspirants.</p>

      {loading ? (
        <p className="text-gray-500">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-500">No books published yet. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 flex-grow whitespace-pre-wrap">{book.content}</p>
              
              <div className="flex gap-3 mt-auto">
                {book.link_url && (
                  <a href={book.link_url} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
                    Buy Book
                  </a>
                )}
                {book.file_url && (
                  <a href={book.file_url} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2 border-2 border-brand-600 text-brand-600 rounded-lg font-medium hover:bg-brand-50 transition flex items-center justify-center gap-2">
                    <Download size={18} /> Get PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}