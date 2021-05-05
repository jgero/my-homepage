---
title: Creating my own blog
description: How I created my own blog using Svelte/Sapper with posts rendred from markdown text.
pubdate: 2021-01-19T09:25:55.516Z
---

# Creating my own blog

Using the basic [sapper template](https://github.com/sveltejs/sapper-template) and just taking a [rollup plugin](https://github.com/jackfranklin/rollup-plugin-markdown) to import markdown files would be possible and quick to do, but I wanted to be a little bit more flexible. I want to be able to hook into the rendering process to make some minor tweaks to the generated content like for example adding a _target_ attribute to external links to open them in a new tab. To do this I took some inspiration from the blog on the [official Svelte site](https://svelte.dev/) and used [marked](https://marked.js.org/) with a custom renderer.

## Custom marked renderer

Creating a custom marked renderer sounds way more difficult than it is. You basically just have to create a default renderer and overwrite the renderer methods with your own.

```javascript
const renderer = new marked.Renderer();
renderer.heading = (text, level, rawtext) => {
  const fragment = makeSlug(rawtext);

  return `
		<h${level}>
			<span id="${fragment}" class="offset-anchor"></span>
			<a href="blog/${slug}#${fragment}" class="anchor" aria-hidden="true"></a>
			${text}
		</h${level}>`;
};

const html = marked(
  content.replace(/^\t+/gm, (match) => match.split("\t").join("  ")),
  { renderer }
);
```

This fragment from the [official Svelte blog site](https://github.com/sveltejs/svelte/tree/master/site) takes a default renderer and overwrites how headings are generated. They use it to enable page fragment anchors on the page. In the last lines of this code example the content is modified a bit with a regex and the renderer is applied and run with the marked library to get the html content to be used on the page.

```javascript
renderer.link = (href, _title, text) => {
  const target = href.startsWith("http") ? "_blank" : null;
  return `<a href="${href}" ${target}>${text}</a>`;
};
```

Like already mentioned above I use it to add a target attribute depending on if it is an external link.

I explored the option of generating Svelte components in the markdown renderer as well. This would be really handy in conjunction with some sort of component library which is used for the "manually" coded parts of the page **and** the automatically generated.

## Generate Svelte components in the marked renderer

Svelte has a [server side component API](https://svelte.dev/docs#Server-side_component_API). Together with [svelte register](https://svelte.dev/docs#svelte_register) it is easy to render components on the server without bundling them. The component API is used to create the component and pass in props, svelte register handles the rest.

```javascript
require("svelte/register");

import { HeroHeader, SubHeader } from "component-lib";

// ....

renderer.heading = (text, level) => {
  switch (level) {
    case 1: {
      const { html } = HeroHeader.render({ header: text });
      return html;
    }
    case 2: {
      const { html } = SubHeader.render({ header: text });
      return html;
    }
    default:
      throw new Error("unhandeled heading level");
  }
};
```

In theory requiring a script, importing some components and invoking some methods sounds easy enough. In practice creating a separate local npm package as the component library and requiring this register script led to some annoying bundling problems. Because of that i decided to just generate plain HTML without Svelte for now and revisit this idea in the future, maybe when [svelte kit](https://svelte.dev/blog/whats-the-deal-with-sveltekit) is released.

## Syntax highlighting in code blocks

For this I am using [highlight.js](https://highlightjs.org/). In the marked renderer with the default GitHub stylesheet for the highlights.

```javascript
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

// ...

renderer.code = (code, language) => {
  // highlight code before giving it to the component
  code = hljs.highlight(language, code).value;
  // add some wrapper elements to allow for better styling
  return `<div class="listing"><pre><code class="language-${language}">${code}</code></pre></div>`;
};
```

To keep the bundle size as small as possible i only import the highlight.js core and the javascript language. If I include some code blocks in other languages I will have to add these here aswell, but for now just javascript is fine. Similar to the link renderer I overwrote the code renderer. Wrapping it with another div element to allows me some easier styling. As content of the code element the highlighted output of highlight.js is used. This would work, but the stylesheet to apply the colors are still missing. Including `highlight.js/styles/github.css` in the `client.js` file of the Sapper app does the trick.

## Get the content from the files to the page

Because the files are on the server this can only be done inside a server route. From there it is just a matter of reading the contents of a directory with the `fs` package and running the content of the files through the marked renderer.

```javascript
export function get_posts() {
  return fs.readdirSync("static/posts").map((file) => {
    // ...
  });
}

function getMarkdownContent(slug) {
  const markdown = fs.readFileSync(`static/posts/${slug}.md`, "utf-8");
  // ...
}
```

In the `getMarkdownContent` function I run the marked renderer and in the `get_posts` function I add some extra metadata content like title and description for meta tags on the page later. Speaking of the page, let's have a look at how this is done.

```javascript
export async function preload() {
  const r = await this.fetch("/blog.json");
  const data = await r.json();
  return { data };
}
```

Sapper pages can have module script blocks to run some code on the server before the page is loaded. This is perfect in this case, I use that to make the request to my server route which provides me the already completely rendered blogs. I return this fetched data as a prop to the page. This has the effect that when a user clicks on the link to this page the browser only has to make one request to the server to get the completely populated page. If I made the request in the normal script of the component the browser would first load the empty page, then send another request to get the blog post content and then show the complete page.

Using all these nice features of Sapper enables me to build a nice blog that can be rendered completely on the server side which results in a lightning quick experience.
