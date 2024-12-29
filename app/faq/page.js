import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I create an account on JobHut?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your details and follow the prompts to complete your profile."
    },
    {
      question: "How can I search for jobs on JobHut?",
      answer: "Use the search bar on our homepage to look for jobs by title, company, or keywords. You can also use filters to narrow down results by location, job type, and more."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "Click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password."
    },
    {
      question: "How can employers contact me about my application?",
      answer: "Employers will typically contact you via the email address associated with your JobHut account. Make sure to keep your contact information up to date and check your email regularly."
    },
    {
      question: "Is my personal information secure on JobHut?",
      answer: "Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. For more details, please refer to our Privacy Policy."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h2>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

