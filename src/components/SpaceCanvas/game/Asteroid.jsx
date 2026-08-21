export class Asteroid {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;

        this.radius = 15 + Math.random() * 25;

        this.points = [];

        const pointCount = 8;

        for (let i = 0; i < pointCount; i++) {
            const angle =
                (Math.PI * 2 / pointCount) * i;

            const radiusVariation =
                this.radius * (
                    0.75 + Math.random() * 0.35
                );

            this.points.push({
                angle,
                radius: radiusVariation,
            });
        }

        this.speedX = -0.5 + Math.random();
        this.speedY = -0.5 + Math.random();

        this.rotation = Math.random() * Math.PI * 2;

        this.rotationSpeed =
            -0.01 + Math.random() * 0.02;
    }

    update(deltaTime, canvasWidth, canvasHeight) {
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;

        this.rotation +=
            this.rotationSpeed * deltaTime;

        // Salida por la derecha
        if (this.x - this.radius > canvasWidth) {
            this.x = -this.radius;
        }

        // Salida por la izquierda
        if (this.x + this.radius < 0) {
            this.x = canvasWidth + this.radius;
        }

        // Salida por abajo
        if (this.y - this.radius > canvasHeight) {
            this.y = -this.radius;
        }

        // Salida por arriba
        if (this.y + this.radius < 0) {
            this.y = canvasHeight + this.radius;
        }
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        ctx.rotate(
            this.rotation
        );

        ctx.beginPath();

        this.points.forEach((point, index) => {
            const x =
                Math.cos(point.angle) *
                point.radius;

            const y =
                Math.sin(point.angle) *
                point.radius;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.closePath();

        ctx.strokeStyle = "#828893";
        ctx.lineWidth = 2;

        ctx.stroke();

        ctx.restore();
    }
}