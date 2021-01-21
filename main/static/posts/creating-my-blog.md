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
	content.replace(/^\t+/gm, match => match.split('\t').join('  ')),
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

In theory requiring a script, importing some components and invoking some methods sounds easy enough. In practice creating a separate local npm package as the component library and requiring this register script led to some annoying bundling problems. Because of that i decided to just generate plain HTML for now and revisit this idea in the future, maybe when [svelte kit](https://svelte.dev/blog/whats-the-deal-with-sveltekit) is released.

## Get the content from the files to the page

