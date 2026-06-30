import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useState } from "react";

function getInitialTheme(): "dark" | "light" {
  const stored = localStorage.getItem("theme") as "dark" | "light" | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#dfd0b833] bg-[#393E46]/60 backdrop-blur transition hover:border-[#dfd0b866] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4e7c5]"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-[#dfd0b8]" weight="bold" />
      ) : (
        <MoonIcon className="h-5 w-5 text-[#222831]" weight="bold" />
      )}
    </button>
  );
}
