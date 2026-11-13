import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { SHOW_EXPERIENCE } from "@/sections/Experience";

const navLinks = [
  { href: "#about", label: "Perfil" },
  { href: "#projects", label: "Proyectos" },
  { href: "#skills", label: "Stack" },
  ...(SHOW_EXPERIENCE ? [{ href: "#experience", label: "Trayectoria" }] : []),
  { href: "#contact", label: "Contacto" },
];

export const Navbar = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ["#hero", ...navLinks.map(({ href }) => href)]
      .map((href) => document.querySelector(href))
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

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/92 backdrop-blur-sm">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <a href="#hero" onClick={closeMenu} className="group flex items-baseline gap-2 text-foreground">
          <span className="font-display text-xl font-medium italic tracking-[-0.01em]">J. Navarro</span>
          <span className="font-hand text-lg text-primary transition-transform duration-200 group-hover:-rotate-3">
            bitácora
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, index) => {
            const id = link.href.slice(1);
            const active = activeSection === id;
            return (
              <a
                href={link.href}
                key={id}
                aria-current={active ? "location" : undefined}
                className={`flex items-baseline gap-1.5 px-3 py-2 text-base transition-colors duration-200 ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span className="font-mono text-[11px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <span className={active ? "marker" : undefined}>{link.label}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-10 place-items-center rounded-full text-foreground transition-colors duration-200 hover:bg-hover"
            aria-label={`Cambiar a tema ${theme === "dark" ? "papel (claro)" : "pizarra (oscuro)"}`}
            title={theme === "dark" ? "Cambiar a papel" : "Cambiar a pizarra"}
          >
            {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-full text-foreground hover:bg-hover md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-navigation" className="paper border-t border-border px-5 pb-6 pt-2 md:hidden">
          <p className="pb-2 pt-3 font-hand text-xl text-primary">índice —</p>
          <div className="flex flex-col">
            {navLinks.map((link, index) => {
              const id = link.href.slice(1);
              const active = activeSection === id;
              return (
                <a
                  href={link.href}
                  key={id}
                  onClick={closeMenu}
                  aria-current={active ? "location" : undefined}
                  className="flex items-baseline gap-4 border-b border-border py-3 font-display text-2xl text-foreground last:border-0"
                >
                  <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <span className={active ? "marker" : undefined}>{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
