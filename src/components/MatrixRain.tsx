import { useEffect, useRef } from "react";
import { classNames } from "../utils/classnames";

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテト0123456789<>/{}[]$#*+=";
const FONT_SIZE = 14;

export default function MatrixRain({ storm = false }: { storm?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const stepMs = storm ? 42 : 90;
    const brightChance = storm ? 0.18 : 0.1;

    let drops: number[] = [];
    let columns = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.font = `${FONT_SIZE}px monospace`;
      columns = Math.ceil(width / FONT_SIZE);
      drops = Array.from(
        { length: columns },
        () => Math.random() * -(height / FONT_SIZE)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    let frame = 0;

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);

      if (time - last < stepMs) return;
      last = time;

      context.fillStyle = "rgba(34, 40, 49, 0.18)";
      context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      for (let i = 0; i < columns; i++) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const y = drops[i] * FONT_SIZE;

        context.fillStyle =
          Math.random() < brightChance
            ? "#f4e7c5"
            : "rgba(223, 208, 184, 0.5)";
        context.fillText(glyph, i * FONT_SIZE, y);

        if (y > canvas.clientHeight && Math.random() > 0.97) {
          drops[i] = 0;
        }

        drops[i] += 1;
      }
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [storm]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={classNames(
        "pointer-events-none transition-opacity duration-1000",
        storm
          ? "fixed inset-0 z-40 h-screen w-full opacity-60"
          : "absolute inset-x-0 top-0 h-[58vh] w-full opacity-25 [mask-image:linear-gradient(to_bottom,black,black_22%,transparent_94%)]"
      )}
    />
  );
}
