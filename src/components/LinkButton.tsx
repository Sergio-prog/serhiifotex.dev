import { MouseEvent, PropsWithChildren, useState } from "react";
import { classNames } from "../utils/classnames";

interface LinkButtonProps extends PropsWithChildren {
  text: string;
  className?: string;
  link: string;
  isCopiable?: boolean;
  durationCopiableMs?: number;
  tooltip: string;
}

function relFor(link: string) {
  return link.startsWith("https://")
    ? "me noopener noreferrer"
    : "noopener noreferrer";
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
  const [borderOpacity, setBorderOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // Copying is optional; the click still gives visual feedback.
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), durationCopiableMs);
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const shellProps = {
    className: classNames(
      "relative flex h-[56px] w-full min-w-0 items-center overflow-hidden rounded-2xl bg-[#EFE4D326] px-3 py-2",
      "transition-transform duration-200 ease-in-out hover:scale-[101.8%] hover:cursor-pointer hover:ring-2 hover:ring-[#EFE4D340]",
      "max-md:ring-2 max-md:ring-[#EFE4D340] lg:px-4 lg:py-3",
      className
    ),
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setBorderOpacity(1),
    onMouseLeave: () => setBorderOpacity(0),
    "data-tooltip-id": "link-button",
    "data-tooltip-content": copied ? "Copied!" : tooltip,
    "data-tooltip-place": "top" as const,
    "aria-label": copied ? "Copied!" : `${tooltip}: ${text}`,
  };

  const content = (
    <>
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[17px] transition-opacity duration-300"
        style={{
          opacity: borderOpacity,
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, #EFE4D319, transparent 55%)`,
        }}
      />

      <div className="relative z-10 flex min-w-0 items-center gap-2">
        {children}
        <p className="text-md truncate font-medium leading-normal lg:text-xl">
          {text}
        </p>
      </div>
    </>
  );

  if (isCopiable) {
    return (
      <button type="button" {...shellProps} onClick={handleCopyClick}>
        {content}
      </button>
    );
  }

  const isMailto = link.startsWith("mailto:");

  return (
    <a
      {...shellProps}
      href={link}
      target={isMailto ? undefined : "_blank"}
      rel={relFor(link)}
    >
      {content}
    </a>
  );
}
