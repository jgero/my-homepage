<script context="module">
  export async function preload(page) {
    const r = await this.fetch(`/blog/${page.params.slug}.json`);
    const data = await r.json();
    return { data };
  }
</script>

<script>
  export let data;
</script>

{@html data.html}
