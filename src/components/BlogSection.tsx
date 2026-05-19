import {
  ArrowSquareOutIcon,
  HashIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { BlogPost, posts, tags } from "../content/posts";
import { classNames } from "../utils/classnames";

const ALL_TAGS = "all";

export default function BlogSection() {
  const [activeTag, setActiveTag] = useState(ALL_TAGS);
  const [featuredSlug, setFeaturedSlug] = useState(posts[0]?.slug);

  const visiblePosts = useMemo(() => {
    if (activeTag === ALL_TAGS) {
      return posts;
    }

    return posts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag]);

  const featuredPost =
    posts.find((post) => post.slug === featuredSlug) ?? visiblePosts[0];

  return (
    <section
      id="posts"
      className="relative min-h-screen overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-[1px] w-[min(900px,88vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#dfd0b866] to-transparent" />
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[280px_1fr]">
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

          <div className="mt-7 flex flex-wrap gap-2">
            <TagButton
              active={activeTag === ALL_TAGS}
              label="all"
              onClick={() => setActiveTag(ALL_TAGS)}
            />
            {tags.map((tag) => (
              <TagButton
                key={tag}
                active={activeTag === tag}
                label={tag}
                onClick={() => setActiveTag(tag)}
              />
            ))}
          </div>
        </aside>

        <div className="relative">
          <div className="absolute -left-4 top-0 hidden h-full w-[1px] bg-[#dfd0b81f] md:block" />
          <ol className="space-y-3">
            {visiblePosts.map((post, index) => (
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

function TagButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={classNames(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "border-[#dfd0b8] bg-[#dfd0b8] text-[#222831]"
          : "border-[#dfd0b82e] bg-[#393E46]/35 text-[#dfd0b8]/70 hover:border-[#dfd0b875] hover:text-[#dfd0b8]"
      )}
      onClick={onClick}
      type="button"
    >
      <HashIcon className="h-3.5 w-3.5" />
      {label}
    </button>
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
        href={`#/posts/${post.slug}`}
        className={classNames(
          "group relative grid w-full gap-4 rounded-[26px] border p-5 pr-20 text-left transition md:grid-cols-[124px_minmax(0,1fr)_auto] md:pr-5",
          selected
            ? "border-[#dfd0b86b] bg-[#dfd0b812]"
            : "border-[#dfd0b81f] bg-[#393E46]/25 hover:border-[#dfd0b852] hover:bg-[#393E46]/44"
        )}
        id={post.slug}
        onMouseEnter={onFocus}
        onFocus={onFocus}
        style={{ animationDelay: `${index * 65}ms` }}
      >
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
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#dfd0b812] px-2.5 py-1 text-xs font-medium text-[#dfd0b8]/62"
              >
                #{tag}
              </span>
            ))}
          </div>
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
