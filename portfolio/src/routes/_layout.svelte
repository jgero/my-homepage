<script>
  import { stores } from "@sapper/app";
  const { page } = stores();
  import Nav from "../components/Nav.svelte";
  export let segment;

  let hasShadow;
  $: hasShadow = segment || $page.error;
</script>

<Nav {hasShadow} />

<slot />
