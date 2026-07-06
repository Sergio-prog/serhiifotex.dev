import { ReactNode, useState } from "react";
import ImageLightbox from "./ImageLightbox";

type ImageBlock = { type: "image"; alt: string; src: string; radius?: string };

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "code"; language: string; code: string }
  | ImageBlock
  | { type: "rule" };

export default function MarkdownContent({ source }: { source: string }) {
  return (
    <div className="post-markdown py-10 flex-row gap">
      {parseMarkdown(source).map((block, index) => (
        <MarkdownBlockView key={index} block={block} />
      ))}
    </div>
  );
}

function MarkdownBlockView({ block }: { block: MarkdownBlock }) {
  if (block.type === "heading") {
    if (block.level === 1) {
      return <h2>{renderInline(block.text)}</h2>;
    }

    if (block.level === 2) {
      return <h3>{renderInline(block.text)}</h3>;
    }

    return <h4>{renderInline(block.text)}</h4>;
  }

  if (block.type === "blockquote") {
    return <blockquote>{renderInline(block.text)}</blockquote>;
  }

  if (block.type === "unordered-list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "ordered-list") {
    return (
      <ol>
        {block.items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ol>
    );
  }

  if (block.type === "code") {
    return (
      <pre>
        <code data-language={block.language}>{block.code}</code>
      </pre>
    );
  }

  if (block.type === "image") {
    return <MarkdownImage block={block} />;
  }

  if (block.type === "rule") {
    return <hr />;
  }

  return <p>{renderInline(block.text)}</p>;
}

function MarkdownImage({ block }: { block: ImageBlock }) {
  const [open, setOpen] = useState(false);
  const radiusStyle = block.radius ? { borderRadius: block.radius } : undefined;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open ${block.alt || "image"} in full size`}
        className="mx-auto block cursor-zoom-in"
      >
        <img
          src={block.src}
          alt={block.alt}
          loading="lazy"
          style={radiusStyle}
        />
      </button>
      {open && (
        <ImageLightbox
          src={block.src}
          alt={block.alt}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function parseMarkdown(source: string) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push({ type: "code", language, code: codeLines.join("\n") });
      index += 1;
      continue;
    }

    const image = line.match(
      /^!\[(.*)]\(\s*(\S+?)(?:\s+"[^"]*")?\s*\)(?:\{([^}]*)\})?$/
    );

    if (image) {
      blocks.push({
        type: "image",
        alt: image[1],
        src: image[2],
        radius: parseRadius(image[3]),
      });
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);

    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2],
      });
      index += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].startsWith("> ")) {
        quoteLines.push(lines[index].slice(2));
        index += 1;
      }

      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    if (/^- /.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^- /.test(lines[index])) {
        items.push(lines[index].slice(2));
        index += 1;
      }

      blocks.push({ type: "unordered-list", items });
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\. /.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\. /, ""));
        index += 1;
      }

      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const paragraphLines: string[] = [];

    while (
      index < lines.length &&
      lines[index].trim() &&
      !(paragraphLines.length && startsBlock(lines[index]))
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

function startsBlock(line: string) {
  return (
    line.startsWith("```") ||
    line.startsWith("> ") ||
    line.startsWith("![") ||
    /^#{1,4}\s/.test(line) ||
    /^---+$/.test(line.trim()) ||
    /^- /.test(line) ||
    /^\d+\. /.test(line)
  );
}

function parseRadius(attrs?: string) {
  const match = attrs?.match(/radius\s*[=:]\s*([\d.]+(?:px|rem|em|%)?)/);

  if (!match) {
    return undefined;
  }

  return /^[\d.]+$/.test(match[1]) ? `${match[1]}px` : match[1];
}

function renderInline(text: string): ReactNode[] {
  const matches = Array.from(
    text.matchAll(
      /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+]\([^)]+\)|<https?:\/\/[^>\s]+>|https?:\/\/[^\s<]+)/g
    )
  );

  if (!matches.length) {
    return [text];
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of matches) {
    const start = match.index ?? 0;
    const value = match[0];

    if (start > cursor) {
      nodes.push(text.slice(cursor, start));
    }

    nodes.push(renderInlineToken(value, start));
    cursor = start + value.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function renderInlineToken(value: string, key: number) {
  if (value.startsWith("`")) {
    return <code key={key}>{value.slice(1, -1)}</code>;
  }

  if (value.startsWith("**")) {
    return <strong key={key}>{renderInline(value.slice(2, -2))}</strong>;
  }

  if (value.startsWith("*")) {
    return <em key={key}>{renderInline(value.slice(1, -1))}</em>;
  }

  const link = value.match(/^\[([^\]]+)]\(([^)]+)\)$/);

  if (link) {
    return renderLink(link[2], renderInline(link[1]), key);
  }

  const autolink = value.match(/^<(.+)>$/);

  if (autolink) {
    return renderLink(autolink[1], autolink[1], key);
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    const { href, trailing } = splitTrailingPunctuation(value);

    return (
      <span key={key}>
        {renderLink(href, href, `${key}-link`)}
        {trailing}
      </span>
    );
  }

  return value;
}

function renderLink(href: string, children: ReactNode, key: string | number) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      key={key}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function splitTrailingPunctuation(value: string) {
  const match = value.match(/^(.+?)([.,!?;:]+)?$/);

  return {
    href: match?.[1] ?? value,
    trailing: match?.[2] ?? "",
  };
}
