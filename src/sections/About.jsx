import { CardMe } from "@/components/CardMe";

const actionClass = "inline-flex min-h-11 items-center justify-center border border-border px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-[#0B0C07]";

export const About = () => {
  return (
    <section id="about" className="border-t border-border px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 flex flex-col justify-between gap-5 border-b border-border pb-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">01 / Perfil</p>
            <h2 className="font-display text-5xl font-medium tracking-[-0.06em] text-foreground sm:text-7xl">Sobre mí<span className="text-muted-foreground">.</span></h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Una mirada a mi trabajo</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col items-start">
            <div className="grid size-40 place-items-center border border-border font-mono text-4xl tracking-[-0.08em] text-foreground sm:size-48 sm:text-5xl" aria-label="Iniciales JC">
              JC
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Analítico", "Resolutivo", "Perseverante"].map((quality, index) => (
                <span key={quality} className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {quality}{index < 2 && <span className="ml-2 text-border">/</span>}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className={actionClass} href="#projects">ContactaMe</a>
              <a className={actionClass} href="#projects">Descargar CV</a>
            </div>
          </div>

          <div className="divide-y divide-border border-y border-border">
            <CardMe number="01" title="Desarrollo Web" description="Desarrollo aplicaciones web modernas utilizando tecnologías como React, JavaScript, TypeScript y TailwindCSS, enfocándome en interfaces dinámicas, responsivas y una buena experiencia de usuario." icon="default" />
            <CardMe number="02" title="Entornos y herramientas" description="Trabajo en entornos de desarrollo tanto en Windows como Linux, gestionando proyectos en local y con despliegues básicos en servidores mediante SSH y servicios en la nube." icon="monitor" />
            <CardMe number="03" title="Back-end Development" description="Desarrollo la lógica del lado del servidor con Node.js y .NET, implementando arquitecturas como MVC, manejo de bases de datos y sistemas de autenticación en proyectos reales." icon="server" />
          </div>
        </div>
      </div>
    </section>
  );
};
