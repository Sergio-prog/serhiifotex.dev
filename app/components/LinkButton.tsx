"use client";

import { PropsWithChildren, useRef, useState, MouseEvent } from "react";
import { classNames } from "../utils/classnames";
import { Tooltip } from "react-tooltip";

interface LinkButtonProps extends PropsWithChildren {
  text: string;
  className?: string;
  link: string;
  isCopiable?: boolean;
  durationCopiableMs?: number;
  tooltip: string;
}

export default function LinkButton({
  children,
  text,
  className,
  link,
  tooltip,
  isCopiable,
  durationCopiableMs = 1000,
}: LinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const divRef = useRef<HTMLButtonElement>(null);
  const [borderOpacity, setBorderOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (e) {
      // ignore - copying isn't required for the visual effect
    }

    setCopied(true);
    setTimeout(() => setCopied(false), durationCopiableMs);
  };

  const redirect = () => {
    window.open(link, "_blank", "noreferrer noopener");
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setBorderOpacity(1);
  };

  const handleMouseLeave = () => {
    setBorderOpacity(0);
  };

  return (
    <>
      <Tooltip
        id="link-button"
        opacity="50%"
        noArrow
        style={{
          paddingLeft: "12px",
          paddingRight: "12px",
          borderRadius: "6px",
          zIndex: 200,
        }}
      />
      <button
        ref={divRef}
        className={classNames(
          "w-full min-w-0 h-[56px] lg:py-3 py-2 lg:px-4 px-3 bg-[#EFE4D326] rounded-2xl",
          "hover:ring-2 hover:cursor-pointer hover:ring-[#EFE4D340] max-md:ring-2 max-md:ring-[#EFE4D340] hover:scale-[101.8%]",
          "transition-transform ease-in-out duration-200 flex items-center relative overflow-hidden",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={isCopiable ? handleCopyClick : redirect}
        data-tooltip-id="link-button"
        data-tooltip-content={copied ? "Copied!" : tooltip}
        data-tooltip-place="top"
      >
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-[17px] transition-opacity duration-300"
          style={{
            opacity: borderOpacity,
            background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, #EFE4D319, transparent 55%)`,
          }}
        />

        <div className="relative z-10 flex gap-2 items-center min-w-0">
          {children}
          <p className="lg:text-xl text-md font-medium leading-normal truncate">
            {text}
          </p>
        </div>
      </button>
    </>
  );
}
