import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { collectPosts, type BlogPost } from "./src/content/parsePost";
import { postPath } from "./src/routes";

const SITE_URL = "https://serhiifotex.dev";
const SITE_TITLE = "Serhii Nesterov";
const SITE_DESCRIPTION = "Notes, drafts, and tiny engineering traps.";
const POSTS_DIR = fileURLToPath(new URL("src/posts", import.meta.url));

function readPublishedPosts(): BlogPost[] {
  const entries = readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name): [string, string] => [
      name,
      readFileSync(join(POSTS_DIR, name), "utf8"),
    ]);

  return collectPosts(entries).filter((post) => !post.hidden);
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function postUrl(post: BlogPost) {
  return `${SITE_URL}${postPath(post.slug)}`;
}

function renderFeed(posts: BlogPost[]) {
  const items = posts
    .map((post) =>
      [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(postUrl(post))}</link>`,
        `      <guid isPermaLink="true">${escapeXml(postUrl(post))}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        "    </item>",
      ].join("\n")
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(SITE_TITLE)}</title>`,
    `    <link>${SITE_URL}/</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    "    <language>en</language>",
    `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

function renderSitemap(posts: BlogPost[]) {
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: posts[0]?.date },
    ...posts.map((post) => ({ loc: postUrl(post), lastmod: post.date })),
  ];

  const entries = urls
    .map((url) =>
      [
        "  <url>",
        `    <loc>${escapeXml(url.loc)}</loc>`,
        ...(url.lastmod ? [`    <lastmod>${url.lastmod}</lastmod>`] : []),
        "  </url>",
      ].join("\n")
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</urlset>",
    "",
  ].join("\n");
}

function contentFeeds(): Plugin {
  return {
    name: "content-feeds",
    apply: "build",
    generateBundle() {
      const posts = readPublishedPosts();

      this.emitFile({
        type: "asset",
        fileName: "feed.xml",
        source: renderFeed(posts),
      });

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: renderSitemap(posts),
      });
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), ...(isSsrBuild ? [] : [contentFeeds()])],
}));
