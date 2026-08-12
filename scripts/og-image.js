import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createElement } from "react";
import satori from "satori";

const require = createRequire(import.meta.url);

const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND = "#222831";
const PANEL = "rgba(57, 62, 70, 0.6)";
const FOREGROUND = "#dfd0b8";

const FONT_SUBSETS = ["latin", "cyrillic"];

const fonts = FONT_SUBSETS.flatMap((subset) =>
  [400, 700].map((weight) => ({
    name: "Inter",
    weight,
    style: "normal",
    data: readFileSync(
      require.resolve(
        `@fontsource/inter/files/inter-${subset}-${weight}-normal.woff`
      )
    ),
  }))
);

function box(key, style, children) {
  return createElement(
    "div",
    { key, style: { display: "flex", ...style } },
    children
  );
}

function truncate(text, limit) {
  if (text.length <= limit) {
    return text;
  }

  const clipped = text.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(" ");

  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : limit).trimEnd()}…`;
}

function titleSize(title) {
  if (title.length <= 40) {
    return 72;
  }

  return title.length <= 70 ? 60 : 50;
}

function element(title, description, eyebrow) {
  return box(
    "page",
    {
      width: WIDTH,
      height: HEIGHT,
      padding: 56,
      backgroundColor: BACKGROUND,
      fontFamily: "Inter",
    },
    box(
      "panel",
      {
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1,
        padding: 64,
        borderRadius: 32,
        border: "1px solid rgba(223, 208, 184, 0.12)",
        backgroundColor: PANEL,
      },
      [
        box(
          "eyebrow",
          {
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 6,
            color: "rgba(223, 208, 184, 0.5)",
          },
          eyebrow.toUpperCase()
        ),
        box("body", { flexDirection: "column" }, [
          box(
            "title",
            {
              fontSize: titleSize(title),
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 1.12,
              color: FOREGROUND,
            },
            truncate(title, 90)
          ),
          box(
            "description",
            {
              marginTop: 24,
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(223, 208, 184, 0.62)",
            },
            truncate(description, 120)
          ),
        ]),
        box("footer", { alignItems: "center" }, [
          box("bar", {
            width: 56,
            height: 3,
            borderRadius: 2,
            marginRight: 18,
            backgroundColor: "rgba(244, 231, 197, 0.5)",
          }),
          box(
            "site",
            { fontSize: 22, color: "rgba(244, 231, 197, 0.62)" },
            "serhiifotex.dev"
          ),
        ]),
      ]
    )
  );
}

export async function renderOgImage({ title, description, eyebrow }) {
  const svg = await satori(element(title, description, eyebrow), {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });

  return new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
    font: { loadSystemFonts: false },
  })
    .render()
    .asPng();
}
