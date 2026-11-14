import { ArrowLeft } from 'lucide-react';

export default function Legal() {
  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 mb-20">
      <a href="/" className="inline-flex items-center text-brand-600 hover:underline mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </a>

      <h1 className="text-4xl font-display font-bold mb-8 text-gray-900">Privacy Policy & Terms</h1>
      
      <div className="space-y-8 text-gray-700">
        
        {/* Privacy Policy */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Privacy Policy</h2>
          <p className="mb-2">At SAMS Academy, we respect your privacy. This policy explains what information we collect and how we use it.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Data Collection:</strong> If you use our "Contact" form, we collect your name, email address, and message. We do not collect personal data automatically.</li>
            <li><strong>Usage Data:</strong> We use Vercel Analytics to track anonymous visitor numbers (page views). This does not identify you personally and does not use cookies.</li>
            <li><strong>How we use data:</strong> Your email is used only to reply to your doubts or messages. We will never sell or share your email with third parties.</li>
          </ul>
        </section>

        {/* Terms & Conditions */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Terms & Conditions</h2>
          <p className="mb-2">By using this website, you agree to the following terms:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Educational Use Only:</strong> All materials provided on this website are for personal study and competitive exam preparation.</li>
            <li><strong>No Redistribution:</strong> You may not copy, resell, or distribute the PDFs, notes, or mock tests provided here for commercial purposes.</li>
            <li><strong>Availability:</strong> Because this is a free educational platform, we do not guarantee 100% uptime. The site may be temporarily unavailable for maintenance.</li>
          </ul>
        </section>

        {/* AI Usage Policy */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">3. AI Usage Policy</h2>
          <p>To provide you with high-quality and up-to-date materials, SAMS Academy occasionally uses Artificial Intelligence (AI) tools to assist in compiling and formatting content. However, <strong>all AI-generated or assisted content is manually reviewed, verified, and edited by Dr. Sams</strong> before publication to ensure accuracy for competitive exams.</p>
        </section>

        {/* Copyright & Fair Use */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">4. Copyright & Fair Use</h2>
          <p>The original notes, compiled materials, and mock tests on this website are the intellectual property of SAMS Academy. However, we acknowledge that some official information (like government notifications or syllabi) is sourced from the public domain. Such content is used under the "Fair Use" doctrine for educational purposes.</p>
        </section>

        {/* Corrections & Feedback */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">5. Corrections & Feedback</h2>
          <p>We strive for 100% accuracy. If you find any factual errors, typos, or outdated information in our materials, please report it immediately using the <a href="/contact" className="text-brand-600 underline font-medium">Contact Page</a>. We will review and correct it promptly.</p>
        </section>

      </div>
    </div>
  );
}