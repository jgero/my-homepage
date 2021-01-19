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

<style>
  main {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30vh;
  }
  section {
    max-width: 800px;
  }
</style>

<svelte:head>
  <title>{data.metadata.title} - Blog - Johannes Gerold</title>
  <meta property="og:title" content={data.metadata.title} />
  <meta property="og:description" content={data.metadata.description} />
  <meta property="og:image" content="https://via.placeholder.com/150" />
  <meta
    property="og:url"
    content={`https://jgero.me/blog/${data.metadata.slug}`} />
</svelte:head>

<main>
  <section>
    {@html data.html}
  </section>
</main>
