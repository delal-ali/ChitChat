"use client";
import React from "react";
import Lottie from "lottie-react";
import chatAnimation from "@/public/assets/chatAnimation.json"; 

export default function HeroAnimation() {
  return (
    <div className="w-80 h-80 md:w-[500px] md:h-[500px]  overflow-hidden animate-float">
      <Lottie animationData={chatAnimation} loop={true} />
    </div>
  );
}
