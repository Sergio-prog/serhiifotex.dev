import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { allPosts, render } from "../dist-ssr/entry-server.js";
import { renderOgImage } from "./og-image.js";

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

  if (page.ogImage) {
    html = setMeta(html, "property", "og:image", `${SITE_URL}${page.ogImage}`);
    html = setMeta(html, "name", "twitter:image", `${SITE_URL}${page.ogImage}`);
  }

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
    ogImage: `/og/${post.slug}.png`,
    og: { title: post.title, description: post.description, eyebrow: "Serhii Nesterov" },
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
  {
    path: "/404",
    url: `${SITE_URL}/404`,
    title: "Nothing lives here — Serhii Nesterov",
    description: "This page was moved, renamed, or never existed.",
    type: "website",
    noindex: true,
  },
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

  if (page.og) {
    const image = join(DIST, page.ogImage);

    mkdirSync(dirname(image), { recursive: true });
    writeFileSync(image, await renderOgImage(page.og));
  }

  console.log(`prerendered ${page.path}`);
}
