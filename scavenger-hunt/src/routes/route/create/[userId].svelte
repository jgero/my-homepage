<script context="module">
  export async function preload(page, session) {
    // the `slug` parameter is available because this file
    // is called [slug].svelte
    const { userId } = page.params;
    console.log(userId);

    return { userId };
  }
</script>

<script>
  export let userId;
</script>

<h1>hello {userId}</h1>
