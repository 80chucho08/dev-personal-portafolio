
export const CardMe = ({
  title = "",
  description = "",
  icon = "default",
  className = ""
}) => {
  const icons = {
    default: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M10 17l5-5-5-5" />
      </svg>
    ),
    monitor: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
        <line x1="8" y1="20" x2="16" y2="20" />
        <line x1="12" y1="16" x2="12" y2="20" />
      </svg>
    ),
    server: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="6" rx="2" ry="2" />
        <rect x="3" y="14" width="18" height="6" rx="2" ry="2" />
        <line x1="7" y1="7" x2="7" y2="7" />
        <line x1="7" y1="17" x2="7" y2="17" />
      </svg>
    )
  };

  return (
    <div className={`glass rounded-[2rem] border border-white/10 bg-surface/70 shadow-2xl shadow-primary/10 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary/25 ${className}`}>
      <div className="flex items-center gap-4 mb-5">
        <div className="flex h-10 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-white/10 text-primary shadow-lg shadow-primary/20">
          {icons[icon]}
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm leading-7 text-slate-300">{description}</p>
    </div>
  );
};

