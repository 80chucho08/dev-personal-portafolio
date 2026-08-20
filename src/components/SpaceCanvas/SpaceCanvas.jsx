import { useEffect, useRef } from "react";

const SpaceCanvas = () => {
    const canvasRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Game State //
        let frameCount = 0;
        let lastTime = 0;
        let animationFrameId;

        // Circulo de prueba 
        let testX = 100;

        //Mouse //
        const mouse = {
            x: 0,
            y: 0,
        };

        // Nave
        const ship = {
            x: 0,
            y: 0,
            angle: 0,
        };

        //========================
        //CANVAS
        //========================

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };


        //========================
        //Mouse
        //========================
        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };


        //========================
        //Update
        //========================
        const update = (deltaTime) => {
            frameCount++;
            // Aquí actualizaremos la lógica del juego
            testX += 0.1 * deltaTime;

            // Reiniciar cuando salga de la pantalla
            if (testX > canvas.width + 10) {
                testX = -10;
            }

            // Seguimiento del mouse
            ship.x += (mouse.x - ship.x) * 0.15;
            ship.y += (mouse.y - ship.y) * 0.15;

            ship.angle = Math.atan2(
                mouse.y - ship.y,
                mouse.x - ship.x
            );
        };

        const drawShip = () => {
            ctx.save();

            ctx.translate(ship.x, ship.y);

            ctx.rotate(ship.angle + Math.PI / 2);

            ctx.beginPath();

            ctx.moveTo(0, -18);

            ctx.lineTo(-10, 12);

            ctx.lineTo(0, 7);

            ctx.lineTo(10, 12);

            ctx.closePath();

            ctx.strokeStyle = "#E6E8EC";
            ctx.lineWidth = 2;

            ctx.stroke();

            ctx.restore();
        };


        //========================
        //Draw
        //========================
        const draw = () => {
            // Limpiamos el canvas
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            // Frame counter
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

            // Mouse cursor
            ctx.beginPath();

            ctx.arc(
                mouse.x,
                mouse.y,
                4,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "#acff46";
            ctx.fill();

            // Mouse cursor suavizado
            drawShip();
        };


        //========================
        //Game Loop
        //========================

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

        //========================
        //Inicializacion
        //========================
        resizeCanvas();

        ship.x = window.innerWidth / 2;
        ship.y = window.innerHeight / 2;

        mouse.x = ship.x;
        mouse.y = ship.y;

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        animationFrameId =
            requestAnimationFrame(gameLoop);


        //========================
        //Cleanup
        //========================

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);

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