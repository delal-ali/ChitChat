import { ThemeProvider } from "next-themes";
import { FloatingNavDemo } from "@/components/LandingPage/NavBar";
import Hero from "@/components/LandingPage/Hero";




export default function Home() {
  return (
    <>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
   <FloatingNavDemo />
   <Hero />
     </ThemeProvider>
    </>
  );
}
