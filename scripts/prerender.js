import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { allPosts, render } from "../dist-ssr/entry-server.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "dist");
const SITE_URL = "https://serhiifotex.dev";
const SITE_TITLE = "Serhii Nesterov — Software Engineer";
const SITE_DESCRIPTION =
  "Personal portfolio of Serhii Nesterov — software engineer, smart contract, and backend developer.";

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setMeta(html, attribute, name, value) {
  const pattern = new RegExp(`<meta\\s+${attribute}="${name}"[\\s\\S]*?/>`);

  if (!pattern.test(html)) {
    throw new Error(`Template is missing <meta ${attribute}="${name}">`);
  }

  return html.replace(
    pattern,
    `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`
  );
}

function applyMeta(template, page) {
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(page.title)}</title>`
  );

  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "property", "og:type", page.type);
  html = setMeta(html, "property", "og:url", page.url);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);

  const head = [`<link rel="canonical" href="${page.url}" />`];

  if (page.noindex) {
    head.push('<meta name="robots" content="noindex" />');
  }

  return html.replace("</head>", `  ${head.join("\n    ")}\n  </head>`);
}

function pageFor(post) {
  return {
    path: `/posts/${post.slug}`,
    url: `${SITE_URL}/posts/${post.slug}`,
    title: `${post.title} — Serhii Nesterov`,
    description: post.description,
    type: "article",
    noindex: post.hidden,
  };
}

const pages = [
  {
    path: "/",
    url: `${SITE_URL}/`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    noindex: false,
  },
  ...allPosts.map(pageFor),
];

const template = readFileSync(join(DIST, "index.html"), "utf8");

if (!template.includes('<div id="root"></div>')) {
  throw new Error('Template is missing an empty <div id="root"></div>');
}

for (const page of pages) {
  const markup = render(page.path);
  const html = applyMeta(template, page).replace(
    '<div id="root"></div>',
    `<div id="root">${markup}</div>`
  );
  const file =
    page.path === "/" ? join(DIST, "index.html") : join(DIST, `${page.path}.html`);

  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`prerendered ${page.path}`);
}
