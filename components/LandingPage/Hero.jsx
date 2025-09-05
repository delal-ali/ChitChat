"use client";
import React from "react";
import Link from "next/link";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TypewriterEffect } from "../ui/typewriter-effect";
import HeroAnimation from "../cards/animation";
import SubmitButton from "../auth/SubmitButton";

const words = [
  "Connect",
  "Share",
  "Message",
  "Collaborate",
  "React",
  "Enjoy",
  "Engage",
  "Instantly",
].join(" ");

const title = [
  { text: "Chat....", className: "text-blue-600 dark:text-purple-500" },
  { text: "with ..", className: "text-gray-700 dark:text-gray-400" },
  { text: "friends...", className: "text-pink-500 dark:text-pink-00" },
  { text: "anywhere!", className: "text-blue-700 dark:text-blue" },
];

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 transition-all duration-700" />

      <div className="relative flex flex-col md:flex-row w-full h-full">
        {/* Left section */}
        <div className="relative w-full md:w-[65%] flex flex-col items-center md:items-start justify-center p-6 sm:p-10 text-center md:text-left">
          <TypewriterEffect
            words={title}
            className="text-3xl sm:text-4xl md:text-6xl font-bold transition-colors duration-500"
          />
          <div className="mt-6 text-base sm:text-lg md:text-xl opacity-80 max-w-[90%] md:max-w-full">
            <TextGenerateEffect duration={30} filter={false} words={words} />
          </div>
          <div className="w-full flex justify-center md:justify-start mt-6">
            <Link href="/login" passHref>
              <SubmitButton
                text="Get Started"
                className="ml-0 md:ml-5 px-8 md:px-10 py-4 md:py-6 text-lg md:text-xl bg-blue-800 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-300"
              />
            </Link>
          </div>
        </div>

        {/* Right section */}
        <div className="w-full md:w-[35%] flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-full">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
