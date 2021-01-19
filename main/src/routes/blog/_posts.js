import fs from "fs";
import path from "path";
import marked from "marked";

require("svelte/register");

import { HeroHeader } from "component-lib";

// const HeroHeader = require("../../../../component-lib/src/HeroHeader.svelte")
//   .default;

export function get_post(slug) {
  return getMarkdownContent(slug);
}

export function get_posts() {
  // read dir with the posts
  return (
    fs
      .readdirSync("static/posts")
      .map((file) => {
        // map them to markdown and metadata
        if (path.extname(file) !== ".md") return;
        const slug = path.parse(file).name;
        return getMarkdownContent(slug);
      })
      // sort them by pubdate
      .sort((a, b) =>
        new Date(a.metadata.pubdate) < new Date(b.metadata.pubdate) ? 1 : -1
      )
  );
}

function getMarkdownContent(slug) {
  // open the the file
  const markdown = fs.readFileSync(`static/posts/${slug}.md`, "utf-8");
  // extract the metadata
  const { content, metadata } = extract_frontmatter(markdown);
  metadata.slug = slug;
  // create marked renderer
  const renderer = new marked.Renderer();
  // customize renderer
  // renderer.link = link_renderer;
  // renderer.code = highlight;
  renderer.heading = (text, level) => {
    switch (level) {
      case 1:
        const { html } = HeroHeader.render({ header: text });
        return html;
      default:
        throw new Error("unhandeled heading level");
    }
  };
  // remove tabs and add custom renderer
  const html = marked(
    content.replace(/^\t+/gm, (match) => match.split("\t").join("  ")),
    { renderer }
  );

  return {
    html,
    metadata,
  };
}

function extract_frontmatter(markdown) {
  const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown);
  const frontMatter = match[1];
  const content = markdown.slice(match[0].length);

  const metadata = {};
  frontMatter.split("\n").forEach((pair) => {
    const colonIndex = pair.indexOf(":");
    metadata[pair.slice(0, colonIndex).trim()] = pair
      .slice(colonIndex + 1)
      .trim();
  });

  return { metadata, content };
}
