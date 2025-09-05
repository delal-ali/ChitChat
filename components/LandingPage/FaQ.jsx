"use client";

export function FAQ() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center text-black mb-10">
        Frequently Asked Questions
      </h2>

      {/* FAQ List */}
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-slate-400 to-slate-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-black">{faq.q}</h3>
            <p className="text-gray-50 mt-2">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-black mb-3">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-6">
          Enter your email below and we’ll get back to you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Your email"
            className="w-full sm:w-72 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button className="px-6 py-2 rounded-lg bg-slate-800 text-white font-medium hover:opacity-90 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export const faqs = [
  {
    q: "Is my data safe?",
    a: "Yes, all messages are end-to-end encrypted so only you and your recipient can read them.",
  },
  {
    q: "Can I use this on mobile?",
    a: "Absolutely! You can access chats from web, mobile, or desktop apps.",
  },
  {
    q: "Is it free?",
    a: "Yes, messaging is completely free. Premium features may be available in the future.",
  },
];
