<script context="module">
  export async function preload() {
    const r = await this.fetch("/blog.json");
    const data = await r.json();
    return { data };
  }
</script>

<script>
  import PostCard from "../../components/PostCard.svelte";
  import { HeroHeader } from "component-lib";
  export let data;
</script>

<style>
  main {
    margin: 0 20vw;
  }
</style>

<svelte:head>
  <title>Blog - Johannes Gerold</title>
  <meta property="og:title" content="Blog - Johannes Gerold" />
  <meta property="og:description" content="Have a look at what I am doing." />
  <meta property="og:image" content="https://via.placeholder.com/150" />
  <meta property="og:url" content="https://jgero.me/blog" />
</svelte:head>

<main>
  <HeroHeader header="freshest blog posts" />
  {#each data as post}
    <PostCard {...post.metadata} />
  {/each}
</main>
