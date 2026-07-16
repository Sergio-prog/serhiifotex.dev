import { ArrowSquareOutIcon, SparkleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { BlogPost, posts } from "../content/posts";
import { postPath } from "../routes";
import { classNames } from "../utils/classnames";
import { trackGlow } from "../utils/glow";

export default function BlogSection() {
  const [featuredSlug, setFeaturedSlug] = useState(posts[0]?.slug);

  const featuredPost =
    posts.find((post) => post.slug === featuredSlug) ?? posts[0];

  return (
    <section
      id="posts"
      className="relative min-h-screen overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-[1px] w-[min(1120px,92vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#dfd0b866] to-transparent" />
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-12 lg:h-fit">
          <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-[#dfd0b8]/50">
            <SparkleIcon className="h-4 w-4" />
            Notebook
          </div>
          <h2 className="text-4xl font-bold leading-none text-[#dfd0b8] sm:text-5xl">
            Posts
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#dfd0b8]/62">
            Notes, drafts, and tiny engineering traps.
          </p>
        </aside>

        <div className="relative">
          <div className="absolute -left-4 top-0 hidden h-full w-[1px] bg-[#dfd0b81f] md:block" />
          <ol className="space-y-3">
            {posts.map((post, index) => (
              <PostRow
                key={post.slug}
                post={post}
                index={index}
                selected={post.slug === featuredPost?.slug}
                onFocus={() => setFeaturedSlug(post.slug)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function PostRow({
  post,
  index,
  selected,
  onFocus,
}: {
  post: BlogPost;
  index: number;
  selected: boolean;
  onFocus: () => void;
}) {
  return (
    <li>
      <a
        href={postPath(post.slug)}
        className={classNames(
          "glow-card group relative grid w-full gap-4 rounded-[26px] border p-5 pr-20 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/25 md:grid-cols-[124px_minmax(0,1fr)_auto] md:pr-5",
          selected
            ? "border-[#dfd0b86b] bg-[#dfd0b812]"
            : "border-[#dfd0b81f] bg-[#393E46]/25 hover:border-[#dfd0b852] hover:bg-[#393E46]/44"
        )}
        id={post.slug}
        onMouseEnter={onFocus}
        onMouseMove={trackGlow}
        onFocus={onFocus}
        style={{ animationDelay: `${index * 65}ms` }}
      >
        <div className="glow-overlay" />
        <time className="whitespace-nowrap text-sm font-semibold tabular-nums text-[#dfd0b8]/52">
          {formatDate(post.date)}
        </time>
        <div>
          <div className="flex items-start gap-2">
            <h3 className="text-2xl font-bold leading-tight text-[#dfd0b8]">
              {post.title}
            </h3>
            <ArrowSquareOutIcon className="mt-1 h-4 w-4 shrink-0 text-[#dfd0b8]/0 transition group-hover:text-[#dfd0b8]/55" />
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#dfd0b8]/66">
            {post.description}
          </p>
        </div>
        <span className="absolute right-5 top-5 self-start rounded-full border border-[#dfd0b81f] px-3 py-1 text-xs font-semibold text-[#dfd0b8]/45 md:static">
          {post.readingMinutes} min
        </span>
      </a>
    </li>
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
