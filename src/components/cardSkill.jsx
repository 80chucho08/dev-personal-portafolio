export const CardSkill = ({
  title,
  level,
  value,
  className = "",
}) => {
  return (
    <article className={`glass rounded-[2rem] shadow-2xl shadow-primary/5 p-6 transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-5">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <span className="text-sm font-medium text-muted-foreground">{level}</span>
      </div>

      <div className="rounded-full bg-hover/20 h-2 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </article>
  );
};
