import { useEffect, useState } from "react";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-background text-foreground transition-colors duration-300">
      <main className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-border px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>© {new Date().getFullYear()}</span>
          <span>v1.0</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
