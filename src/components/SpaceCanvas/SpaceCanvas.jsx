import { useEffect, useRef } from "react";

const SpaceCanvas = () => {
    const canvasRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let frameCount = 0;

        let lastTime = 0;

        let testX = 100;

        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        const update = (deltaTime) => {
            frameCount++;
            // Aquí actualizaremos la lógica del juego
            testX += 0.1 * deltaTime;

            // Reiniciar cuando salga de la pantalla
            if (testX > canvas.width + 10) {
                testX = -10;
            }
        };

        const draw = () => {
            // Limpiamos el canvas
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );
            ctx.font = "16px monospace";
            ctx.fillStyle = "#828893";

            ctx.fillText(
                `FRAME : ${frameCount}`,
                20,
                30
            );
            // Círculo de prueba
            ctx.beginPath();

            ctx.arc(
                testX,
                100,
                5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "#acff46";
            ctx.fill();
        };

        const gameLoop = (currentTime) => {
            // Primer frame
            if (lastTime === 0) {
                lastTime = currentTime;
            }

            const deltaTime = currentTime - lastTime;

            lastTime = currentTime;

            update(deltaTime);
            draw();

            animationFrameId = requestAnimationFrame(gameLoop);
        };

        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);

        animationFrameId =
            requestAnimationFrame(gameLoop);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
        />
    );
};

export default SpaceCanvas;