import { ArrowDownIcon } from "@phosphor-icons/react";

export default function ScrollHint() {
  return (
    <a
      href="#posts"
      className="group absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#dfd0b833] bg-[#393E46]/60 px-4 py-2 text-xs font-medium text-[#dfd0b8]/70 shadow-[0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur transition hover:border-[#dfd0b866] hover:text-[#dfd0b8] md:bottom-8"
      aria-label="Scroll to blog posts"
    >
      <span className="hidden sm:inline">posts are hiding below</span>
      <ArrowDownIcon className="h-4 w-4 animate-soft-drop group-hover:animate-(--animate-small-bounce)" />
    </a>
  );
}
