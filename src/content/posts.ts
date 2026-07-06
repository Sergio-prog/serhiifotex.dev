type PostModule = string;

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  hidden: boolean;
  body: string;
  readingMinutes: number;
};

const postModules = import.meta.glob<PostModule>("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const allPosts = Object.entries(postModules)
  .map(([path, source]) => parsePost(path, source))
  .sort((a, b) => b.date.localeCompare(a.date));

export const posts = allPosts.filter((post) => !post.hidden);

function parsePost(path: string, source: string): BlogPost {
  const { frontmatter, body } = splitFrontmatter(source);
  const title = readString(frontmatter, "title");
  const date = readString(frontmatter, "date");
  const description = readString(frontmatter, "description");
  const hidden = readOptionalBoolean(frontmatter, "hidden");

  return {
    slug: path.split("/").pop()?.replace(/\.md$/, "") ?? title,
    title,
    date,
    description,
    hidden,
    body: body.trim(),
    readingMinutes: estimateReadingMinutes(body),
  };
}

function splitFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Post is missing frontmatter");
  }

  return {
    frontmatter: match[1],
    body: match[2],
  };
}

function readString(frontmatter: string, key: string) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*"(.+)"$`, "m"));

  if (!match) {
    throw new Error(`Post is missing ${key}`);
  }

  return match[1];
}

function readOptionalBoolean(frontmatter: string, key: string) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(true|false)$`, "m"));

  return match?.[1] === "true";
}

function estimateReadingMinutes(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}
