<div align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br />

<div align="center">
  <h1>🧑‍💻 Serhii Nesterov — Portfolio</h1>
  <p>
    <strong>Software engineer · Smart contract & backend developer.</strong>
  </p>
  <p>
    Minimalist portfolio with a blog, CV, and contact links — built as a
    single-page app, served fast.
  </p>
  <p>
    <a href="https://serhiifotex.dev"><strong>🌐 Live site »</strong></a>
  </p>
</div>

<br />

---

## ✨ Features

- **Profile section** — name, role, and quick-access links (GitHub, X/Twitter,
  Discord, LinkedIn, CV)
- **Blog** — markdown-based posts with reading time estimates, served from real
  permalinks (`/posts/<slug>`) and prerendered to static HTML at build time
- **RSS feed** — `/feed.xml`, generated at build time from `src/posts/`
- **Responsive** — works great on mobile and desktop
- **Dark mode** — respects `prefers-color-scheme` with a warm dark palette
- **Radial hover glow** — subtle mouse-tracking border effect on link cards
- **Keyboard easter egg** — try <kbd>⌘/Ctrl</kbd> + <kbd>S</kbd>

## 🛠️ Tech Stack

| Layer        | Technology                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| **Build**    | [Vite](https://vite.dev)                                                    |
| **UI**       | [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org/)  |
| **Styling**  | [Tailwind CSS v4](https://tailwindcss.com)                                  |
| **Icons**    | [Phosphor Icons](https://phosphoricons.com)                                 |
| **Content**  | Markdown files with frontmatter, loaded via Vite glob imports               |
| **Rendering**| Prerendered to static HTML at build (`react-dom/server`), hydrated on load  |
| **Analytics**| [Vercel Analytics](https://vercel.com/analytics) (privacy-friendly)          |
| **Deploy**   | [Vercel](https://vercel.com)                                                |

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📝 Writing a Post

Add a `.md` file to `src/posts/` with frontmatter:

```markdown
---
title: "My New Post"
date: "2026-06-02"
description: "A short description"
hidden: false
---

Your content here...
```

The post is published at `/posts/my-new-post` — the slug comes from the filename.

Set `hidden: true` to keep a draft off the homepage, the RSS feed, and the
sitemap. It stays reachable at its URL for previewing and is marked `noindex`.

## 🧹 Lint

```bash
pnpm lint
```
---

<div align="center">
  <p>
    Built by <a href="https://github.com/Sergio-prog">Sergio-prog</a> ·
    <a href="https://x.com/0xFotex">@0xFotex</a>
  </p>
</div>
