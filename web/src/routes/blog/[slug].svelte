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

<svelte:head>
  <title>{data.metadata.title} - Blog - Johannes Gerold</title>
  <meta property="og:title" content={data.metadata.title} />
  <meta property="og:description" content={data.metadata.description} />
  <meta property="og:image" content="https://via.placeholder.com/150" />
  <meta
    property="og:url"
    content={`https://jgero.me/blog/${data.metadata.slug}`}
  />
</svelte:head>

<main>
  <section>
    {@html data.html}
  </section>
</main>

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

  section :global(a) {
    display: inline-block;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    color: var(--font);
    text-decoration: none;
    position: relative;
    z-index: 1;
    transition: transform ease-in 0.1s;
  }
  section :global(a):active {
    transform: scale(1.02);
  }
  section :global(a)::before {
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: 2px;
    left: 0;
    background-image: linear-gradient(
      to right,
      var(--primary),
      var(--secondary)
    );
    z-index: -1;
  }
  section :global(a)::after {
    --overlap: 0.2em;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: var(--primary);
    opacity: 0;
    z-index: -1;
    transition: opacity ease-in 0.2s;
    padding: var(--overlap);
    border-radius: var(--overlap);
    top: calc(-1 * var(--overlap));
    left: calc(-1 * var(--overlap));
  }
  section :global(a):hover::after,
  section :global(a):focus::after {
    opacity: 0.3;
  }
</style>
