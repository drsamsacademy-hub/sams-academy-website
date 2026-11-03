import { ArrowLeft, BookOpen } from 'lucide-react';

export default function Books() {
  // We will hardcode your books here for now. 
  // You can easily change these later!
  const myBooks = [
    {
      title: "APPSC Group 2 Comprehensive Guide",
      isbn: "978-93-XXXX-XXX-X",
      description: "A complete guide covering Indian History, Polity, and Economy for APPSC Group 2.",
      buyLink: "https://amazon.in/your-book-link", // Add your link here
      pdfLink: "#" // Add Google Drive link to your PDF here
    },
    {
      title: "CSIR NET Life Sciences Manual",
      isbn: "978-93-YYYY-YYY-Y",
      description: "Detailed notes, previous question papers, and assessments for CSIR NET aspirants.",
      buyLink: "https://amazon.in/your-book-link",
      pdfLink: "#"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-2 text-gray-900">My Publications</h1>
      <p className="text-gray-500 mb-8">Books authored by me for competitive exam aspirants.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {myBooks.map((book, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
                <BookOpen size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4 flex-grow">{book.description}</p>
            <p className="text-xs text-gray-400 mb-6 font-mono">ISBN: {book.isbn}</p>
            
            <div className="flex gap-3">
              <a href={book.buyLink} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
                Buy Book
              </a>
              <a href={book.pdfLink} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2 border-2 border-brand-600 text-brand-600 rounded-lg font-medium hover:bg-brand-50 transition">
                Get PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}