"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  phase: number;
  speed: number;
  size: number;
  signal: boolean;
};

export function HeroUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let points: Point[] = [];

    const buildPoints = () => {
      const count = Math.max(28, Math.min(72, Math.floor(width / 18)));
      points = Array.from({ length: count }, (_, index) => {
        const x = (index / count) * width + Math.random() * 40;
        const y = Math.random() * height;
        return {
          x,
          y,
          originX: x,
          originY: y,
          phase: Math.random() * Math.PI * 2,
          speed: 0.15 + Math.random() * 0.3,
          size: 0.7 + Math.random() * 1.5,
          signal: index % 13 === 0,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildPoints();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const pointer = pointerRef.current;

      for (const point of points) {
        if (!reducedMotion) {
          point.x =
            point.originX +
            Math.cos(time * 0.00025 * point.speed + point.phase) * 18;
          point.y =
            point.originY +
            Math.sin(time * 0.00032 * point.speed + point.phase) * 16;
        }

        const pointerDistance = Math.hypot(
          point.x - pointer.x,
          point.y - pointer.y,
        );
        if (pointerDistance < 150) {
          const force = (150 - pointerDistance) / 150;
          point.x += (point.x - pointer.x) * force * 0.035;
          point.y += (point.y - pointer.y) * force * 0.035;
        }
      }

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];

        for (
          let targetIndex = index + 1;
          targetIndex < points.length;
          targetIndex += 1
        ) {
          const target = points[targetIndex];
          const distance = Math.hypot(
            point.x - target.x,
            point.y - target.y,
          );

          if (distance < 135) {
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(target.x, target.y);
            context.strokeStyle = `rgba(241, 240, 235, ${
              (1 - distance / 135) * 0.12
            })`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(
          point.x,
          point.y,
          point.signal ? point.size * 2.1 : point.size,
          0,
          Math.PI * 2,
        );
        context.fillStyle = point.signal
          ? "rgba(255, 87, 34, 0.9)"
          : "rgba(241, 240, 235, 0.48)";
        context.fill();

        if (point.signal) {
          context.beginPath();
          context.arc(
            point.x,
            point.y,
            7 + Math.sin(time * 0.002 + point.phase) * 2,
            0,
            Math.PI * 2,
          );
          context.strokeStyle = "rgba(255, 87, 34, 0.22)";
          context.stroke();
        }
      }

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: -1000, y: -1000 };
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
