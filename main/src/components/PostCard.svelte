<script>
  export let title;
  export let description;
  export let pubdate;
  export let slug;
</script>

<h1>{title}</h1>
<p>{description}</p>
<time>{pubdate}</time>
<a href={`/blog/${slug}`}>open</a>
