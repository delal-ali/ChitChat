"use client";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function ChatAuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-center  text-indigo-700 dark:text-indigo-300 tracking-tight leading-tight mt-10">
        Welcome to ChitChat
      </h1>
      <h3
        className={`${dancingScript.className} text-3xl md:text-3xl font-bold text-center text-pink-500 dark:text-pink-300 tracking-tight mb-30 mt-5`}
      >
        " where every voice finds a connection 🔗"
      </h3>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all">
        <div className="w-full md:w-1/2 border-r md:border-r-gray-300 dark:border-r-gray-700 pr-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-indigo-500">
            Already have an account?
          </h3>
          <br></br>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-200 mb-4">
            Log In
          </h2>
          <LoginForm />
        </div>

        <div className="w-full md:w-1/2 pl-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-pink-500">
            Creating a new account?
          </h3>
          <br></br>
          <h2 className="text-xl font-semibold text-pink-600 dark:text-pink-200 mb-4">
            Sign Up
          </h2>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}