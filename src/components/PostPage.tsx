import { ArrowLeftIcon, ClockIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import { BlogPost } from "../content/posts";
import MarkdownContent from "./MarkdownContent";

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);

  if (el) {
    el.setAttribute("content", content);
    return;
  }

  el = document.createElement("meta");

  if (name.startsWith("og:") || name.startsWith("twitter:")) {
    el.setAttribute("property", name);
  } else {
    el.setAttribute("name", name);
  }

  el.setAttribute("content", content);
  document.head.appendChild(el);
}

export default function PostPage({ post }: { post: BlogPost }) {
  useEffect(() => {
    const title = `${post.title} — Serhii Nesterov`;
    const url = `https://serhiifotex.dev/#/posts/${post.slug}`;
    const desc = post.description;

    document.title = title;
    setMeta("og:title", title);
    setMeta("og:description", desc);
    setMeta("og:url", url);
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);

    return () => {
      document.title = "Serhii Nesterov — Software Engineer";
      setMeta("og:title", "Serhii Nesterov — Software Engineer");
      setMeta("og:description", "Personal portfolio of Serhii Nesterov — software engineer, smart contract, and backend developer.");
      setMeta("og:url", "https://serhiifotex.dev/");
      setMeta("twitter:title", "Serhii Nesterov — Software Engineer");
      setMeta("twitter:description", "Personal portfolio of Serhii Nesterov — software engineer, smart contract, and backend developer.");
    };
  }, [post]);

  return (
    <main className="min-h-screen bg-[#222831] px-4 py-8 text-[#dfd0b8] sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <a
          href="#posts"
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#dfd0b82b] bg-[#393E46]/45 px-4 py-2 text-sm font-semibold text-[#dfd0b8]/72 transition hover:border-[#dfd0b866] hover:text-[#dfd0b8]"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          posts
        </a>

        <header className="border-b border-[#dfd0b824] pb-8">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-[#dfd0b8]/52">
            <time className="whitespace-nowrap font-semibold tabular-nums">
              {formatDate(post.date)}
            </time>
            <span className="h-1 w-1 rounded-full bg-[#dfd0b8]/35" />
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <ClockIcon className="h-4 w-4" />
              {post.readingMinutes} min
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#dfd0b8]/68">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#dfd0b824] px-3 py-1 text-xs font-semibold text-[#dfd0b8]/62"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <MarkdownContent source={post.body} />
      </article>
    </main>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
