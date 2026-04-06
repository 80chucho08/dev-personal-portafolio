import Particles from "@tsparticles/react";

export const ParticlesBackground = () => {
    return (
        <Particles
            id="tsparticles"
            // Agregamos clases para asegurar que ocupe todo el espacio
            className="absolute inset-0 z-0" 
            options={{
                fullScreen: { enable: true }, // Cámbialo a true para que use todo el viewport
                fpsLimit: 120,
                background: {
                    color: { value: "transparent" },
                },
                preset: "links",
                particles: {
                    number: {
                        value: 80,
                        density: { enable: true, area: 800 },
                    },
                    color: { value: "#ffffff" },
                    links: {
                        enable: true,
                        color: "#ffffff",
                        distance: 150,
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        outModes: { default: "out" },
                    },
                    size: { value: { min: 1, max: 3 } },
                    opacity: { value: 0.5 },
                },
                detectRetina: true,
            }}
        />
    );
};