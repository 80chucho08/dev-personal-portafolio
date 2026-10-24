export const CardProjects = ({
  imageSrc,
  tags = [],
  title,
  description,
  liveHref,
  repoHref,
  number,
  layout = "grid",
}) => {
  const isList = layout === "list";

  return (
    <article className={`group overflow-hidden border border-border bg-background transition-colors duration-300 hover:border-primary ${isList ? "grid sm:grid-cols-[minmax(220px,0.72fr)_1fr]" : "flex flex-col"}`}>
      <div className={`overflow-hidden border-border bg-background ${isList ? "border-b sm:border-b-0 sm:border-r" : "border-b"}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className={`w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03] ${isList ? "aspect-[16/9] h-full min-h-48" : "aspect-[16/10]"}`}
          />
        ) : (
          <div className={`flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground ${isList ? "aspect-[16/9] h-full min-h-48" : "aspect-[16/10]"}`}>
            Imagen del proyecto
          </div>
        )}
      </div>

      <div className="flex flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{number}</span>
          <span>Proyecto</span>
        </div>

        <h3 className="mb-3 font-display text-2xl font-medium leading-tight tracking-[-0.04em] text-foreground sm:text-3xl">{title}</h3>
        <p className="mb-6 text-sm leading-7 text-muted-foreground">{description}</p>

        <div className="mb-7 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">{tag}</span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4">
          {liveHref && (
            <a href={liveHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:text-muted-foreground">
              Ver demo <span aria-hidden="true">↗</span>
            </a>
          )}
          {repoHref && (
            <a href={repoHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:text-muted-foreground">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
