import { lazy, Suspense } from "react";
import { Reveal } from "@/components/Reveal";

const HeroWireframe = lazy(() =>
  import("@/components/HeroWireframe").then((module) => ({ default: module.HeroWireframe })),
);

const WireframeFallback = () => (
  <svg viewBox="0 0 320 320" fill="none" aria-hidden="true" className="h-full w-full text-muted-foreground">
    <g stroke="currentColor" strokeWidth="0.8" opacity="0.7">
      <path d="m160 24 119 92-45 148H86L41 116 160 24Z" />
      <path d="m160 24-7 121m126-29-126 29m81 119-81-148m-67 148 67-148M41 116l112 29m-67 119 67-148m-67 0 126 29m-126-29 81 119m-81 29 126-148m-126 0-74 32m155 116 74-148" />
      <path d="m86 264 193-148M41 116l205 148M160 24 86 264m74-240 83 240" opacity="0.55" />
    </g>
    <circle cx="160" cy="145" r="3" fill="currentColor" />
  </svg>
);

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-28 pt-28 sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute right-[2%] top-1/2 hidden aspect-square w-[min(38vw,500px)] -translate-y-1/2 opacity-55 md:block" aria-hidden="true">
        <Suspense fallback={<WireframeFallback />}>
          <HeroWireframe />
        </Suspense>
      </div>

      <Reveal className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="max-w-[760px] md:max-w-[62%]">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Portafolio · Desarrollo web
          </p>
          <h1 className="font-display text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.86] tracking-[-0.07em] text-foreground">
            Jesus
            <br />
            Carbajal<span aria-hidden="true" className="ml-2 inline-block size-[0.12em] translate-y-[-0.12em] bg-primary" />
          </h1>
          <div className="mt-9 flex flex-col items-start gap-7 sm:mt-12 sm:flex-row sm:items-center sm:gap-10">
            <p className="font-display text-xl tracking-[-0.03em] text-muted-foreground sm:text-2xl">
              Full Stack Developer
            </p>
            <a
              href="#projects"
              className="group inline-flex min-h-12 items-center justify-center border border-border px-6 font-mono text-xs uppercase tracking-[0.12em] text-foreground transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-[#0B0C07] focus-visible:outline-primary"
            >
              Ver proyectos <span className="ml-4 transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          </div>
          <p className="mt-8 max-w-2xl text-base leading-[1.7] text-muted-foreground sm:text-lg">
            Soy un desarrollador FullStack enfocado en la creación de aplicaciones web. Tengo experiencia trabajando con tecnologías como Node.js JavaScript y bases de datos, desarrollando proyectos propios donde aplico arquitecturas como MVC y buenas prácticas de desarrollo.
          </p>
        </div>
      </Reveal>

      <a
        href="#about"
        className="group absolute bottom-8 left-5 flex items-center gap-4 font-mono text-[10px] tracking-[0.18em] text-muted-foreground sm:bottom-10 sm:left-8 lg:left-12"
      >
        <span className="relative block h-12 w-px overflow-hidden bg-border">
          <span className="absolute left-0 top-0 h-5 w-px origin-top bg-primary motion-safe:animate-[scroll-line_1.8s_ease-in-out_infinite]" />
        </span>
        SCROLL
      </a>
      <span aria-hidden="true" className="absolute bottom-10 right-5 font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:right-8 lg:right-12">
        01 — 04
      </span>
      <style>{`@keyframes scroll-line { 0% { transform: translateY(-100%); } 55%, 100% { transform: translateY(250%); } }`}</style>
    </section>
  );
};
