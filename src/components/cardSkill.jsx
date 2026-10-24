const getLevelScore = (level) => {
  if (level.toLowerCase().includes("avanzado")) return 3;
  if (level.toLowerCase() === "intermedio") return 2;
  return 1;
};

export const CardSkill = ({ title, level }) => {
  const score = getLevelScore(level);

  return (
    <article className="flex h-full min-h-[76px] items-center justify-between gap-4 border border-border px-4 py-4 transition-colors duration-200 hover:border-muted-foreground sm:px-5">
      <h3 className="font-display text-lg font-medium tracking-[-0.03em] text-foreground">{title}</h3>
      <div className="flex shrink-0 flex-col items-end gap-2" aria-label={`${level} (${score} de 3)`}>
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{level}</span>
        <span className="flex gap-1" aria-hidden="true">
          {[1, 2, 3].map((point) => (
            <span key={point} className={`size-1.5 ${point <= score ? "bg-primary" : "border border-border"}`} />
          ))}
        </span>
      </div>
    </article>
  );
};
