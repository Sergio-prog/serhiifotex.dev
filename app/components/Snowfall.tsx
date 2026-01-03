"use client";

import { useEffect, useState } from "react";
import { classNames } from "../utils/classnames";

type SnowflakeInstance = {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
  startY: number;
  drift: number;
};

export function Snowfall({ count }: { count: number }) {
  const [snowflakes, setSnowflakes] = useState<SnowflakeInstance[]>([]);

  useEffect(() => {
    const flakes: SnowflakeInstance[] = Array.from(
      { length: count },
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 5 + 4,
        opacity: Math.random() * 0.5 + 0.5,
        size: Math.random() * 4 + 5,
        startY: -(Math.random() * 100),
        drift: Math.random() * 50 - 25,
      })
    );
    setSnowflakes(flakes);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-white animate-fall"
          style={{
            left: `${f.left}%`,
            top: `${f.startY}vh`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.animationDuration}s`,
            ["--drift" as any]: `${f.drift}px`,
          }}
        />
      ))}

            <style>{`
        @keyframes fall {
          to {
            transform: translateY(calc(100vh + 100vh)) translateX(var(--drift));
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
