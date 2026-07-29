import { FiSun, FiMoon } from "react-icons/fi";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
]

export const Navbar = ({ theme, toggleTheme }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-5">
            <nav className="container mx-auto px-6 flex items-center justify-between">
                <a href="#" className="text-lg font-bold tracking-tight hover:text-primary transition-colors">
                    PM <span className="text-primary">.</span>
                </a>

                {/* Desktop Nav*/}
                <div className="flex items-center gap-3">
                    <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <a
                                href={link.href}
                                key={index}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-hover/20 transition-all duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="glass p-3 rounded-full text-foreground hover:bg-hover/20 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? (
                            <FiSun className="w-4.5 h-4.5 text-yellow-400" />
                        ) : (
                            <FiMoon className="w-4.5 h-4.5 text-slate-700" />
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}