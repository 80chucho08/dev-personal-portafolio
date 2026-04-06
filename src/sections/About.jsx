// About.jsx
import { useEffect, useRef } from "react";

export const About = () => {
  const particleContainer = useRef(null);

  useEffect(() => {
    const container = particleContainer.current;
    const numParticles = 20; // cantidad de partículas que quieres
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Posición aleatoria
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;

      // Delay aleatorio para que no se muevan todas igual
      particle.style.animationDelay = `${Math.random() * 15}s`;

      container.appendChild(particle);
    }
  }, []);

  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-br from-background via-surface to-background overflow-hidden"
    >
      {/* Partículas animadas en el fondo */}
      <div
        ref={particleContainer}
        className="absolute inset-0 pointer-events-none"
      ></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary drop-shadow-lg">
          Sobre Mí
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-gradient-to-br from-primary via-secondary to-highlight rounded-full flex items-center justify-center text-6xl font-bold text-primary-foreground shadow-2xl shadow-primary/20 animate-pulse">
              JD
            </div>
          </div>
          <div className="md:w-2/3 space-y-6">
            <p className="text-lg leading-relaxed text-foreground glass p-6 rounded-lg">
              Hola, soy Juan Developer, un apasionado desarrollador web junior
              con una gran motivación por crear experiencias digitales
              innovadoras y funcionales.
            </p>
            <p className="text-lg leading-relaxed text-foreground glass p-6 rounded-lg">
              Me especializo en el desarrollo front-end, utilizando tecnologías
              modernas como HTML5, CSS3, JavaScript y frameworks como React para
              construir interfaces de usuario atractivas y responsivas.
            </p>
            <p className="text-lg leading-relaxed text-foreground glass p-6 rounded-lg">
              Actualmente, estoy ampliando mis conocimientos en desarrollo
              back-end con Node.js y bases de datos, mientras exploro nuevas
              tecnologías emergentes para desarrollar aplicaciones web completas.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                HTML5
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                CSS3
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                JavaScript
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                React
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                Node.js
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                Git
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
