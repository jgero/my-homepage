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

{#each data as post}
  <PostCard {...post.metadata} />
{/each}
