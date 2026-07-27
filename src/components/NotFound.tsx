import { ArrowLeftIcon, NotePencilIcon } from "@phosphor-icons/react";
import MatrixRain from "./MatrixRain";

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center"
      id="main-content"
    >
      <MatrixRain />
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#dfd0b8]/45">
        404
      </p>
      <h1 className="mt-5 text-4xl font-bold leading-tight text-[#dfd0b8] sm:text-6xl">
        Nothing lives here
      </h1>
      <p className="mt-5 max-w-md text-sm leading-6 text-[#dfd0b8]/62">
        The page you asked for was moved, renamed, or never existed. The rest of
        the site is fine.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#dfd0b82b] bg-[#393E46]/45 px-4 py-2 text-sm font-semibold text-[#dfd0b8]/72 transition hover:border-[#dfd0b866] hover:text-[#dfd0b8]"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          home
        </a>
        <a
          href="/#posts"
          className="inline-flex items-center gap-2 rounded-full border border-[#dfd0b82b] bg-[#393E46]/45 px-4 py-2 text-sm font-semibold text-[#dfd0b8]/72 transition hover:border-[#dfd0b866] hover:text-[#dfd0b8]"
        >
          <NotePencilIcon className="h-4 w-4" />
          posts
        </a>
      </div>
    </main>
  );
}
