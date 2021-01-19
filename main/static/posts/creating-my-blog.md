---
title: Creating my own blog
description: How I created my own blog using Svelte/Sapper with posts consisting of svelte components rendred from markdown text.
pubdate: 2021-01-19T09:25:55.516Z
---
# Creating my own blog

Using the basic [sapper template](https://github.com/sveltejs/sapper-template) and just taking a [rollup plugin](https://github.com/jackfranklin/rollup-plugin-markdown) to import markdown files would be possible and quick to do, but I wanted to give it a little twist. I was already working on some kind of component library for my website so I wanted to use these components for the automatically rendered blog posts too. To do this I took some inspiration from the blog on the [official Svelte site](https://svelte.dev/) and used [marked](https://marked.js.org/) with a custom renderer.

## Custom marked renderer

Creating a custom marked renderer sounds way more difficult than it is. You basically just have to create a default renderer and overwrite the renderer methods with your own.

```
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
	content.replace(/^\t+/gm, match => match.split('\t').join('  ')),
	{ renderer }
);
```

This fragment from the official Svelte blog site takes a default renderer and overwrites how headings are generated. They use it to enable page fragment anchors on the page. In the last lines of this code example the content is modified a bit with a regex and the renderer is applied and run with the marked library to get the html content to be used on the page.

## Generate Svelte components in the marked renderer

Svelte has a [server side component API](https://svelte.dev/docs#Server-side_component_API). Together with [svelte register](https://svelte.dev/docs#svelte_register) it is easy to render components on the server without bundling them. The component API is used to create the component and pass in props, svelte register handles the rest.

```
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

I am using this to render headings as svelte components. My header components take a `header` prop which is just the text content the header should have. As you can see using these very handy APIs it is easily possible to reuse components of your component library in your rendered content aswell to save duplication or style inconsistencies.

