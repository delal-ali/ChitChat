"use client";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useTheme } from "next-themes";
import { FloatingNavDemo } from "@/components/LandingPage/NavBar";
import Hero from "@/components/LandingPage/Hero";
import { Features } from "@/components/LandingPage/Feature";

export default function Home() {
  const { theme } = useTheme();
  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(-45deg, #dff6fb, #f3fafd, #ffffff, #f9fafb)"
  );

  useEffect(() => {
    if (theme === "dark") {
      setBgGradient(
        "linear-gradient(-45deg, #1e0f4f, #2c0857, #0f0a1a, #1a0b2a)"
      );
    } else {
      setBgGradient(
        "linear-gradient(-45deg, #dff6fb, #f3fafd, #ffffff, #f9fafb)"
      );
    }
  }, [theme]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <FloatingNavDemo />
    

      <div className="relative w-full min-h-screen">
        {/* Background gradient */}
        <div
          className="absolute inset-0 -z-10 transition-all duration-700"
          style={{ background: bgGradient }}
        />

        {/* Page content */}
        <Hero />
        <Features />
      </div>
    </ThemeProvider>
  );
}
