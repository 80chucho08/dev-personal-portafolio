import { FiArrowDown } from "react-icons/fi";

export const Hero = () => {
    return (
        <section
            id="hero"
            className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center pt-32 pb-24 bg-transparent overflow-hidden"
        >
            {/* Contenedor centralizado y con ancho máximo para el contenido */}
            <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center max-w-5xl">
                
                {/* Título Principal */}
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-foreground animate-fadeInUp">
                    Hola, Soy{" "}
                    <span className="text-primary font-semibold">Jesus</span> Carbajal
                </h1>

                {/* Description*/}
                <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    Soy un <strong className="text-foreground">desarrollador FullStack</strong> con interés en el desarrollo de software, Experiencia en proyectos con JavaScript, PHP, TypeScript, implementando metodologías como MVC y tecnologías como Node.js y React
                </p>

                {/* Botón (CTA) */}
                <div className="mt-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <a
                        href="#projects"
                        className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-[--radius] hover:bg-highlight transition-colors duration-300 shadow-lg"
                    >
                        Ver Proyectos
                    </a>
                </div>
            </div>

            {/* Flecha hacia abajo para indicar scroll */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-muted-foreground opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Scroll</span>
                {/* Puedes usar una librería como react-icons o un SVG */}
                <FiArrowDown className="w-7 h-7" />
            </div>
        </section>
    );
};