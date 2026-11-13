import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import { profile } from "@/data/profile";

const actionBase =
  "inline-flex min-h-12 items-center justify-center gap-3 px-6 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200";

export const Hero = () => {
  return (
    <section id="hero" className="relative px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-12">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <Reveal>
          <p className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <span>Bitácora de ingeniería</span>
            <span aria-hidden="true">·</span>
            <span>Pachuca, Hgo.</span>
          </p>

          <h1 className="font-display text-[clamp(2.75rem,7.2vw,6.25rem)] font-medium leading-[0.98] tracking-[-0.025em] text-foreground">
            {profile.firstNames}
            <br />
            <span className="italic text-muted-foreground">{profile.lastNames}</span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-foreground sm:text-2xl">
            Ingeniero en Sistemas Computacionales en formación. Construyo aplicaciones de punta a punta y me interesa
            sobre todo lo que no se ve: el <Highlight>backend, las bases de datos</Highlight> y la arquitectura que los
            sostiene.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            9.º semestre en el Instituto Tecnológico de Pachuca · egreso en diciembre de 2026.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className={`${actionBase} bg-primary text-primary-foreground hover:bg-foreground hover:text-background`}
            >
              Ver proyectos <span aria-hidden="true">→</span>
            </a>
            <a
              href={profile.cv}
              download
              className={`${actionBase} border border-foreground/30 text-foreground hover:border-foreground hover:bg-hover`}
            >
              Descargar CV <span aria-hidden="true">↓</span>
            </a>
          </div>

          <p className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            Disponible para prácticas profesionales
          </p>
        </Reveal>

        <Reveal className="mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-none">
          <figure className="group relative">
            <div className="rotate-[2.5deg] border border-border bg-card p-3 pb-14 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:rotate-0">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden="true" />
              <img
                src={profile.photo}
                alt={`Fotografía de ${profile.name}`}
                width="720"
                height="960"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <figcaption className="absolute inset-x-3 bottom-3 font-hand text-2xl text-foreground">
                el autor de la bitácora
              </figcaption>
            </div>
            <p
              aria-hidden="true"
              className="absolute -bottom-10 -left-4 hidden -rotate-6 font-hand text-2xl text-primary sm:block lg:-left-16"
            >
              ↗ objetivo: backend, datos e IA
            </p>
          </figure>
        </Reveal>
      </div>
    </section>
  );
};
