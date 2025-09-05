import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-600 flex items-center justify-center px-6 py-12 text-white">
      <div className="max-w-lg w-full space-y-8">
        <h2 className="text-4xl font-bold text-center">Contact Us 📬</h2>
        <p className="text-center text-lg">
          Got questions, feedback, or just want to say hi? Drop us a message and
          we’ll get back to you soon!
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-sky-500 text-gray-50 font-semibold rounded-full hover:bg-indigo-300 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
