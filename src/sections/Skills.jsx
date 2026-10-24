import { useState } from "react";
import { CardSkill } from "@/components/cardSkill";
import { Reveal } from "@/components/Reveal";

const categories = [
  { value: "All", label: "Todas" },
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "Database", label: "Bases de datos" },
  { value: "Tools", label: "Herramientas" },
];

const skillsData = [
  { title: "HTML/CSS", category: "Frontend", level: "Avanzado", value: 92 },
  { title: "JavaScript", category: "Frontend", level: "Avanzado", value: 89 },
  { title: "ReactJS", category: "Frontend", level: "Intermedio", value: 80 },
  { title: "TypeScript", category: "Frontend", level: "Intermedio", value: 75 },
  { title: "NodeJS", category: "Backend", level: "Avanzado", value: 90 },
  { title: "Express", category: "Backend", level: "Avanzado", value: 78 },
  { title: "Java", category: "Backend", level: "Intermedio", value: 72 },
  { title: "MySQL", category: "Database", level: "Intermedio", value: 76 },
  { title: "PostgreSQL", category: "Database", level: "Básico", value: 65 },
  { title: "Docker", category: "Tools", level: "Básico", value: 62 },
  { title: "Figma", category: "Tools", level: "Intermedio", value: 75 },
  { title: "Linux/Bash", category: "Tools", level: "Intermedio-Avanzado", value: 80 },
  { title: "Git/GitHub", category: "Tools", level: "Intermedio-Avanzado", value: 88 },
  { title: "REST APIs", category: "Backend", level: "Avanzado", value: 88 },
  { title: "JWT/Auth", category: "Backend", level: "Avanzado", value: 85 },
  { title: "MVC Architecture", category: "Backend", level: "Avanzado", value: 87 },
];

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredSkills = activeCategory === "All"
    ? skillsData
    : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="border-t border-border px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mb-10 border-b border-border pb-6 sm:mb-12">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">03 / Tecnologías</p>
          <h2 className="font-display text-5xl font-medium tracking-[-0.06em] text-foreground sm:text-7xl">Habilidades<span className="text-muted-foreground">.</span></h2>
        </Reveal>

        <Reveal className="mb-8 flex flex-wrap gap-2" aria-label="Filtrar habilidades">
          {categories.map(({ value, label }) => {
            const isActive = value === activeCategory;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setActiveCategory(value)}
                aria-pressed={isActive}
                className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 ${isActive ? "border-primary bg-primary text-[#0B0C07]" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {label}
              </button>
            );
          })}
        </Reveal>

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {filteredSkills.map((skill) => (
            <Reveal key={skill.title} layout className="h-full">
              <CardSkill title={skill.title} level={skill.level} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
