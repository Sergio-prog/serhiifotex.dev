import { ArrowSquareOutIcon, CodeIcon, SparkleIcon } from "@phosphor-icons/react";

interface Project {
  name: string;
  description: string;
  tags: string[];
  href: string;
}

const projects: Project[] = [
  {
    name: "ReconSearch",
    description:
      "AI-powered crypto research agent. Drop a ticker or contract address, get a structured breakdown in seconds — on-chain data, socials, news, and red flags.",
    tags: ["TypeScript", "Next.js", "AI", "Crypto"],
    href: "https://reconsear.ch",
  },
  {
    name: "Fram",
    description:
      "Media workshop toolkit — shared core with CLI, HTTP API, and Discord bot adapters. Process images, video, and audio through a unified pipeline.",
    tags: ["Go", "CLI", "API", "Discord Bot"],
    href: "https://github.com/Sergio-prog/fram",
  },
  {
    name: "Finance Tracker",
    description:
      "Personal finance tracker for managing expenses, budgets, and financial insights across multiple accounts and categories.",
    tags: ["TypeScript", "React", "Node.js"],
    href: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-[1px] w-[min(900px,88vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#dfd0b866] to-transparent" />
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[280px_1fr]">
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
          <div className="space-y-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isExternal = project.href.startsWith("http");

  return (
    <a
      href={project.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="group relative grid w-full gap-4 rounded-[26px] border border-[#dfd0b81f] bg-[#393E46]/25 p-5 pr-20 text-left transition hover:border-[#dfd0b852] hover:bg-[#393E46]/44 md:grid-cols-[124px_minmax(0,1fr)_auto] md:pr-5"
      aria-label={`${project.name} — ${project.description}`}
    >
      <div className="flex items-start gap-3 md:items-center">
        <CodeIcon className="mt-1 h-5 w-5 shrink-0 text-[#dfd0b8]/45 md:mt-0" />
        <time className="hidden whitespace-nowrap text-sm font-semibold tabular-nums text-[#dfd0b8]/52 md:block">
          Project
        </time>
      </div>

      <div>
        <div className="flex items-start gap-2">
          <h3 className="text-2xl font-bold leading-tight text-[#dfd0b8]">
            {project.name}
          </h3>
          <ArrowSquareOutIcon className="mt-1 h-4 w-4 shrink-0 text-[#dfd0b8]/0 transition group-hover:text-[#dfd0b8]/55" />
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#dfd0b8]/66">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#dfd0b812] px-2.5 py-1 text-xs font-medium text-[#dfd0b8]/62"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
