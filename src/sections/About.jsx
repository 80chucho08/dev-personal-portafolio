import { CardMe } from "@/components/cardMe";
import { PrimaryButton } from "../components/PrimaryButton";

export const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 bg-transparent overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary drop-shadow-lg">
          <span className="text-white">Sobre </span>
          Mí
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 flex flex-col items-center gap-6">
            <div className="w-48 h-48 bg-gradient-to-br from-primary via-secondary to-highlight rounded-full flex items-center justify-center text-6xl font-bold text-primary-foreground shadow-2xl shadow-primary/20 animate-pulse">
              JC
            </div>
            <div className="flex flex-row gap-4 mt-8">
              <PrimaryButton size="md" variant="primary" href="#projects">
                ContactaMe
              </PrimaryButton>
              <PrimaryButton size="md" variant="glass" href="#projects">
                Descargar CV
              </PrimaryButton>
            </div>
          </div>
          <div className="md:w-2/3 space-y-6">
            <CardMe
              title="Desarrollo Web"
              description="Desarrollo aplicaciones web modernas utilizando tecnologías como React, JavaScript y TailwindCSS, enfocándome en interfaces dinámicas, responsivas y una buena experiencia de usuario."
              icon="default"
            />
            <CardMe
              title="Entornos y herramientas"
              description="Trabajo en entornos de desarrollo tanto en Windows como Linux, gestionando proyectos en local y con despliegues básicos en servidores mediante SSH y servicios en la nube."
              icon="monitor"
            />
            <CardMe
              title="Back-end Development"
              description="Desarrollo la lógica del lado del servidor con Node.js y .NET, implementando arquitecturas como MVC, manejo de bases de datos y sistemas de autenticación en proyectos reales."
              icon="server"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
