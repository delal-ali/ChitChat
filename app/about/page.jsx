import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Welcome to ChitChat 💬
        </h1>
        <p className="text-lg leading-relaxed">
          ChitChat is your go-to platform for seamless, real-time conversations.
          Whether you're catching up with friends or collaborating with
          teammates, our intuitive interface and lightning-fast messaging make
          it effortless.
        </p>
        <ul className="text-left list-disc list-inside space-y-2 text-md">
          <li>⚡ Instant messaging with zero lag</li>
          <li>🎨 Beautiful, responsive UI built with Tailwind</li>
          <li>🔒 Secure and private conversations</li>

        </ul>
      </div>
    </div>
  );
};

export default Page;
