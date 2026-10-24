import { useEffect, useRef } from "react";

export const HeroParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return undefined;

    const root = document.documentElement;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let particles = [];
    let frameId = null;
    let isVisible = true;
    let color = "#547960";
    let pointer = null;
    let resizeObserver;

    const readColor = () => {
      color = getComputedStyle(root).getPropertyValue("--color-primary").trim() || "#547960";
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      const maxDistance = width < 640 ? 118 : 158;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            context.globalAlpha = (1 - distance / maxDistance) * 0.28;
            context.strokeStyle = color;
            context.lineWidth = 0.9;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      }

      for (const particle of particles) {
        context.globalAlpha = 0.82;
        context.fillStyle = color;
        context.beginPath();
        context.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const stop = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const animate = () => {
      frameId = null;
      if (motionPreference.matches || !isVisible || document.hidden) return;

      for (const particle of particles) {
        if (pointer) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0 && distance < 115) {
            const influence = (1 - distance / 115) * 0.003;
            particle.vx += (dx / distance) * influence;
            particle.vy += (dy / distance) * influence;
          }
        }

        particle.vx = Math.max(-0.22, Math.min(0.22, particle.vx * 0.995));
        particle.vy = Math.max(-0.22, Math.min(0.22, particle.vy * 0.995));
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -4) particle.x = width + 4;
        if (particle.x > width + 4) particle.x = -4;
        if (particle.y < -4) particle.y = height + 4;
        if (particle.y > height + 4) particle.y = -4;
      }

      render();
      frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      stop();
      if (motionPreference.matches || !isVisible || document.hidden) {
        render();
        return;
      }
      frameId = requestAnimationFrame(animate);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;

      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const isMobile = width < 640;
      const targetCount = Math.max(16, Math.min(isMobile ? 26 : 64, Math.round((width * height) / (isMobile ? 26000 : 19000))));
      particles = Array.from({ length: targetCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.11,
        vy: (Math.random() - 0.5) * 0.11,
      }));
      start();
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      pointer = x >= 0 && x <= width && y >= 0 && y <= height ? { x, y } : null;
    };

    const handleMotionPreference = () => start();
    const handleVisibility = () => start();
    const themeObserver = new MutationObserver(() => {
      readColor();
      render();
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });

    readColor();
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    motionPreference.addEventListener("change", handleMotionPreference);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      start();
    });
    intersectionObserver.observe(canvas);

    return () => {
      stop();
      resizeObserver?.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      motionPreference.removeEventListener("change", handleMotionPreference);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles pointer-events-none z-0" aria-hidden="true" />;
};
