import fs from "fs";
import path from "path";
import marked from "marked";
import hljs from "highlight.js/lib/core";
// import and register javascript highlighting
// if more langauges are needed they have to be added here
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);

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
  renderer.code = (code, language) => {
    // highlight code before giving it to the component
    code = hljs.highlight(language, code).value;
    // add some wrapper elements to allow for better styling
    return `<div class="listing"><pre><code class="language-${language}">${code}</code></pre></div>`;
  };
  renderer.link = (href, _title, text) => {
    // add a target attribute to open links to external pages in new tabs
    const target = href.startsWith("http") ? "_blank" : null;
    return `<a href="${href}" ${target}>${text}</a>`;
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
