"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TypewriterEffect } from "../ui/typewriter-effect";
import HeroAnimation from "../cards/animation";
import SubmitButton from "../auth/SubmitButton";

const words = [
  "Connect","Share","Message","Collaborate","React","Enjoy","Engage","Instantly"
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

      <div
        className="absolute inset-0 transition-all duration-700"
      />

      <div className="relative flex flex-col md:flex-row w-full h-full">
        <div className="relative w-full md:w-[65%] flex flex-col items-start justify-center p-10">
         

          <TypewriterEffect
            words={title}
            className={`text-4xl md:text-6xl font-bold transition-colors duration-500 `}
          />
                <div className={`mt-6 text-1rem md:text-xl opacity-80 `}>
            <TextGenerateEffect duration={30} filter={false} words={words} />
          </div>
         <div className="w-full flex justify-center md:justify-start mb-2">
        <Link href="/login" passHref>
              <SubmitButton
                text="Get Started"
                className=" ml-5 mt-25 px-10 py-6 text-xl bg-blue-800 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-300"
              />
            </Link>
        </div>
</div>
        <div className="w-full md:w-[35%] flex items-center justify-center px-100px md:p-10">
         <div>
           <HeroAnimation />
         </div>          
        </div>
      </div>
    </div>
  );
};

export default Hero;
