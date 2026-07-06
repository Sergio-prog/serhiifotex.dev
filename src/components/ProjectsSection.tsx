import {
  ArrowSquareOutIcon,
  GithubLogoIcon,
  GlobeIcon,
  SparkleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

interface Project {
  name: string;
  description: string;
  stack: string[];
  createdAt: string;
  repo?: string;
  site?: string;
  image?: string;
}

const NEW_BADGE_DAYS = 10;

const projects: Project[] = [
  {
    name: "ReconSearch",
    description:
      "Crypto research agent. Drop a ticker or a contract address and get a structured breakdown in seconds: on-chain data, socials, news, red flags.",
    stack: ["TypeScript", "Next.js", "AI agents"],
    createdAt: "2026-04-20",
    site: "https://reconsear.ch",
    image: "https://reconsear.ch/social-preview.png",
  },
  {
    name: "chainq",
    description:
      "One CLI for the crypto world — built for AI agents, pleasant for humans. Prices, balances, gas, DeFi protocols and Hyperliquid perps from a single tool, zero API keys.",
    stack: ["Python", "CLI", "EVM + Solana"],
    createdAt: "2026-07-02",
    repo: "https://github.com/Sergio-prog/chainq",
    image: "https://opengraph.githubassets.com/1/Sergio-prog/chainq",
  },
  {
    name: "Ultra Tokenizer",
    description:
      "Token counter for GPT, Claude, Gemini, DeepSeek and friends. Pick a model, paste your text, read the count — everything runs in the browser, nothing gets uploaded.",
    stack: ["TypeScript", "React", "BPE"],
    createdAt: "2026-07-06",
    repo: "https://github.com/Sergio-prog/ultra-tokenizer",
    image: "https://opengraph.githubassets.com/1/Sergio-prog/ultra-tokenizer",
  },
  {
    name: "Fram",
    description:
      "Media editing toolkit with one Python core and three faces: a CLI with interactive TUI, an HTTP API, and a Telegram bot. Crop, compress, convert, cut — same pipeline everywhere.",
    stack: ["Python", "FastAPI", "aiogram", "FFmpeg"],
    createdAt: "2026-05-16",
    repo: "https://github.com/Sergio-prog/fram",
    image: "https://opengraph.githubassets.com/1/Sergio-prog/fram",
  },
  {
    name: "Finance Tracker",
    description:
      "Self-hosted personal finance tracker: expenses, income and subscriptions with charts and customizable themes.",
    stack: ["TypeScript", "React", "Node.js"],
    createdAt: "2026-05-27",
    repo: "https://github.com/Sergio-prog/finance-tracker",
    image: "https://opengraph.githubassets.com/1/Sergio-prog/finance-tracker",
  },
];

function isNew(createdAt: string) {
  return Date.now() - new Date(createdAt).getTime() < NEW_BADGE_DAYS * 86_400_000;
}

export default function ProjectsSection() {
  const [previewImage, setPreviewImage] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-[1px] w-[min(1000px,90vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#dfd0b866] to-transparent" />
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-12 lg:h-fit">
          <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-[#dfd0b8]/50">
            <SparkleIcon className="h-4 w-4" />
            Showcase
          </div>
          <h2 className="text-4xl font-bold leading-none text-[#dfd0b8] sm:text-5xl">
            Projects
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#dfd0b8]/62">
            Things I&apos;ve built, maintained, or shipped.
          </p>
        </aside>

        <div className="relative">
          <div className="absolute -left-4 top-0 hidden h-full w-[1px] bg-[#dfd0b81f] md:block" />
          <div className="projects-scroll max-h-[640px] space-y-3 overflow-y-auto pr-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                onPreview={() => setPreviewImage(project)}
              />
            ))}
          </div>
        </div>
      </div>

      {previewImage?.image && (
        <ImagePreview
          project={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  onPreview,
}: {
  project: Project;
  onPreview: () => void;
}) {
  const primaryLink = project.site ?? project.repo;

  return (
    <article className="group relative flex flex-col gap-4 rounded-[26px] border border-[#dfd0b81f] bg-[#393E46]/25 p-5 transition hover:border-[#dfd0b852] hover:bg-[#393E46]/44 sm:flex-row sm:gap-5">
      {project.image && (
        <button
          type="button"
          onClick={onPreview}
          aria-label={`Open ${project.name} preview`}
          className="relative z-10 h-40 w-full shrink-0 cursor-zoom-in overflow-hidden rounded-2xl border border-[#dfd0b81f] bg-[#222831] sm:h-[104px] sm:w-[176px]"
        >
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </button>
      )}

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-2xl font-bold leading-tight text-[#dfd0b8]">
            {primaryLink ? (
              <a
                href={primaryLink}
                target="_blank"
                rel="noreferrer"
                className="after:absolute after:inset-0 after:rounded-[26px]"
              >
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>
          {isNew(project.createdAt) && (
            <span className="rounded-full bg-[#f4e7c5] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#222831]">
              new
            </span>
          )}
          <ArrowSquareOutIcon className="h-4 w-4 shrink-0 text-[#dfd0b8]/0 transition group-hover:text-[#dfd0b8]/55" />
        </div>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#dfd0b8]/66">
          {project.description}
        </p>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-xs text-[#dfd0b8]/45">
            {project.stack.join(" · ")}
          </span>
          <span className="flex items-center gap-2">
            {project.repo && (
              <ProjectLink
                href={project.repo}
                label={`${project.name} source on GitHub`}
              >
                <GithubLogoIcon className="h-3.5 w-3.5" />
                Source
              </ProjectLink>
            )}
            {project.site && (
              <ProjectLink href={project.site} label={`${project.name} website`}>
                <GlobeIcon className="h-3.5 w-3.5" />
                Visit
              </ProjectLink>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[#dfd0b824] px-2.5 py-1 text-xs font-semibold text-[#dfd0b8]/62 transition hover:border-[#dfd0b866] hover:text-[#dfd0b8]"
    >
      {children}
    </a>
  );
}

function ImagePreview({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} preview`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#12161c]/85 p-4 backdrop-blur-sm sm:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#dfd0b833] bg-[#393E46]/60 text-[#dfd0b8] transition hover:border-[#dfd0b866]"
      >
        <XIcon className="h-5 w-5" weight="bold" />
      </button>
      <img
        src={project.image}
        alt={`${project.name} preview`}
        onClick={(event) => event.stopPropagation()}
        className="max-h-full max-w-full rounded-2xl border border-[#dfd0b833] object-contain shadow-2xl"
      />
    </div>
  );
}
