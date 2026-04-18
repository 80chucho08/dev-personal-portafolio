import { useState } from "react";
import { CardSkill } from "../components/cardSkill";

const categories = ["All", "Frontend", "Backend", "Database", "Tools"];

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

    const filteredSkills =
        activeCategory === "All"
            ? skillsData
            : skillsData.filter((skill) => skill.category === activeCategory);

    return (
        <section id="skills" className="relative py-20 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                        My <span className="text-primary">Skills</span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => {
                        const isActive = category === activeCategory;
                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full border px-5 py-2 text-sm font-medium transition duration-300 ${isActive
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredSkills.map((skill) => (
                        <CardSkill
                            key={skill.title}
                            title={skill.title}
                            level={skill.level}
                            value={skill.value}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
