import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { SHOW_EXPERIENCE } from "@/sections/Experience";

const navLinks = [
  { href: "#about", label: "Sobre mí" },
  { href: "#projects", label: "Proyectos" },
  { href: "#skills", label: "Habilidades" },
  ...(SHOW_EXPERIENCE ? [{ href: "#experience", label: "Experiencia" }] : []),
  { href: "#contact", label: "Contacto" },
];

export const Navbar = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.1, 0.35] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <a
          href="#hero"
          onClick={closeMenu}
          className="font-display text-xl font-medium tracking-[-0.05em] text-foreground"
          aria-label="JC, inicio"
        >
          JC<span className="ml-0.5 inline-block size-1.5 translate-y-[-2px] bg-primary" />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link, index) => {
            const id = link.href.slice(1);
            const active = activeSection === id;
            return (
              <a
                href={link.href}
                key={id}
                aria-current={active ? "location" : undefined}
                className={`group flex items-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span className="flex items-center gap-2 text-[10px] text-muted-foreground/70">
                  <span className={`size-1.5 ${active ? "bg-primary" : "bg-transparent"}`} />
                  0{index + 1}
                </span>
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-10 place-items-center text-foreground transition-colors duration-200 hover:bg-primary hover:text-[#0B0C07]"
            aria-label={`Cambiar a tema ${theme === "dark" ? "claro" : "oscuro"}`}
            title={`Tema ${theme === "dark" ? "oscuro" : "claro"}`}
          >
            {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center text-foreground md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-navigation" className="border-t border-border bg-background px-5 py-3 md:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col">
            {navLinks.map((link, index) => {
              const id = link.href.slice(1);
              const active = activeSection === id;
              return (
                <a
                  href={link.href}
                  key={id}
                  onClick={closeMenu}
                  aria-current={active ? "location" : undefined}
                  className="flex items-center gap-3 border-b border-border py-3 font-mono text-xs uppercase tracking-[0.12em] text-foreground last:border-0"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className={`size-1.5 ${active ? "bg-primary" : "bg-transparent"}`} />
                    0{index + 1}
                  </span>
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
