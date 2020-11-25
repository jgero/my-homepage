<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  header {
    width: 100%;
    height: 0px;
    top: 0;
    position: sticky;
    z-index: 20;
  }
</style>

<header>
  <Nav {segment} />
</header>
<main>
  <slot />
</main>
