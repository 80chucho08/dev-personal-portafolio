import { useEffect, useState } from "react";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";
import { VisitCounter } from "@/components/VisitCounter";
import { profile } from "@/data/profile";

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
    <div className="paper relative min-h-screen overflow-x-hidden text-foreground transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-border px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-hand text-2xl text-primary">Gracias por tu visita</p>
          <div className="flex flex-col gap-2 sm:items-end">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <VisitCounter />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
