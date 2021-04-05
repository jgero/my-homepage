<script>
  import Nav from '../components/Nav.svelte';
  import Logger from '../components/Logger.svelte';

  export let segment;
</script>

<Nav {segment} />

<main>
  <slot />
</main>
<Logger />

<style>
  main {
    position: relative;
    max-width: 56em;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
