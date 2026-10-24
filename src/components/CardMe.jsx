export const CardMe = ({ number, title = "", description = "", icon = "default" }) => {
  const icons = {
    default: <path d="M10 17l5-5-5-5" />,
    monitor: <><rect x="3" y="4" width="18" height="12" /><path d="M8 20h8m-4-4v4" /></>,
    server: <><rect x="3" y="4" width="18" height="6" /><rect x="3" y="14" width="18" height="6" /><path d="M7 7h.01M7 17h.01" /></>,
  };

  return (
    <article className="group grid gap-4 py-7 transition-colors duration-200 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-8">
      <span className="font-mono text-xs tracking-[0.12em] text-muted-foreground">{number}</span>
      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-3xl">{title}</h3>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
            {icons[icon]}
          </svg>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
      </div>
    </article>
  );
};
