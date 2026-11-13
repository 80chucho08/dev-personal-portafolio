import { FiArrowUpRight, FiGithub } from "react-icons/fi";

const linkClass =
  "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-primary transition-colors duration-200 hover:text-foreground";

/* Ficha de experimento: recorte con la captura, descripción y montaje (stack). */
export const CardProjects = ({ code, name, kind, description, tags = [], imageSrc, liveHref, repoHref, featured }) => (
  <article className="group relative flex h-full flex-col border border-border bg-card p-4 sm:p-5">
    {featured && (
      <span className="absolute -right-2 -top-4 z-10 rotate-6 bg-highlight px-2 font-hand text-xl text-foreground shadow-sm">
        ★ destacado
      </span>
    )}

    <div className="relative border border-border bg-background p-2">
      <span className="tape -top-3 left-6 -rotate-6" aria-hidden="true" />
      <div className="overflow-hidden">
        <img
          src={imageSrc}
          alt={`Captura de ${name}`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>

    <div className="flex flex-1 flex-col px-1 pt-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{code}</p>
      <h3 className="mt-2 font-display text-3xl font-medium leading-tight text-foreground">{name}</h3>
      <p className="text-lg italic text-muted-foreground">{kind}</p>
      <p className="mt-4 text-base leading-relaxed text-foreground">{description}</p>

      <div className="mb-6 mt-5">
        <p className="font-hand text-xl text-primary">montaje:</p>
        <p className="mt-1 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted-foreground">
          {tags.join(" · ")}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4">
        {liveHref ? (
          <a href={liveHref} target="_blank" rel="noreferrer" className={linkClass}>
            Ver demo <FiArrowUpRight aria-hidden="true" />
            <span className="sr-only">de {name} (se abre en una pestaña nueva)</span>
          </a>
        ) : (
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Demo no publicada</span>
        )}
        {repoHref && (
          <a href={repoHref} target="_blank" rel="noreferrer" className={linkClass}>
            <FiGithub aria-hidden="true" /> Código
            <span className="sr-only">de {name} en GitHub (se abre en una pestaña nueva)</span>
          </a>
        )}
      </div>
    </div>
  </article>
);
