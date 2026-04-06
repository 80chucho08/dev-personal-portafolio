import { useEffect, useState } from "react";
import { initParticlesEngine } from "@tsparticles/react"; 
import { loadLinksPreset } from "@tsparticles/preset-links";
import { ParticlesBackground } from "./components/ParticlesBackground";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";

function App() {
  const [init, setInit] = useState(false);

  // Esto inicializa el motor una sola vez
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {init && <ParticlesBackground />}
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
    </div>
  )
}

export default App
