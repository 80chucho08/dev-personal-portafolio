
export const CardProjects = ({
    imageSrc,
    tags = [],
    title,
    description,
    liveHref,
    repoHref,
}) => {
    return (
        <article className="glass rounded-[2rem] border border-white/10 bg-surface/70 shadow-2xl shadow-primary/10 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <div className="overflow-hidden bg-slate-950">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={title}
                        className="h-56 w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="flex h-56 items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-white/5 text-sm text-slate-400">
                        Imagen del proyecto
                    </div>
                )}
            </div>

            <div className="p-6 space-y-5">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
                    <p className="text-sm leading-7 text-slate-300">{description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {liveHref && (
                        <a
                            href={liveHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-primary"
                        >
                            <span>Ver demo</span>
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M13 5l7 7-7 7" />
                            </svg>
                        </a>
                    )}
                    {repoHref && (
                        <a
                            href={repoHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground"
                        >
                            <span>GitHub</span>
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.683-.217.683-.483 0-.239-.009-.868-.013-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.395.1 2.648.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.935.36.31.68.923.68 1.861 0 1.343-.012 2.426-.012 2.755 0 .268.18.58.688.482A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};
