export class Asteroid {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;

        this.radius = 15 + Math.random() * 25;

        this.speedX = -0.5 + Math.random();
        this.speedY = -0.5 + Math.random();

        this.rotation = Math.random() * Math.PI * 2;

        this.rotationSpeed =
            -0.01 + Math.random() * 0.02;
    }

    update(deltaTime) {
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;

        this.rotation +=
            this.rotationSpeed * deltaTime;
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

        ctx.arc(
            0,
            0,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle = "#828893";
        ctx.lineWidth = 2;

        ctx.stroke();

        ctx.restore();
    }
}