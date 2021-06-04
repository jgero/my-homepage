<script context="module">
  export async function preload() {
    const r = await this.fetch("/blog.json");
    const data = await r.json();
    return { data };
  }
</script>

<script>
  import PostCard from "../../components/PostCard.svelte";
  export let data;
</script>

<svelte:head>
  <title>Blog - Johannes Gerold</title>
  <meta property="og:title" content="Blog - Johannes Gerold" />
  <meta property="og:description" content="Have a look at what I am doing." />
  <meta property="og:image" content="https://via.placeholder.com/150" />
  <meta property="og:url" content="https://jgero.me/blog" />
</svelte:head>

<main>
  <h1>freshest blog posts</h1>
  <div>
    {#each data as post}
      <PostCard {...post.metadata} />
    {/each}
  </div>
</main>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
  }
</style>
