<script>
  import { stores } from "@sapper/app";
  const { page } = stores();
  import Nav from "../components/Nav.svelte";
  export let segment;

  let hasShadow;
  $: hasShadow = segment || $page.error;
</script>

<style>
  main {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 4rem;
    overflow: hidden;
  }
</style>

<Nav {hasShadow} />
<slot />
