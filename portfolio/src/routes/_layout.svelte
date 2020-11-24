<script>
  import { stores } from "@sapper/app";
  const { page } = stores();

  import Nav from "../components/Nav.svelte";
  import Sidebar from "../components/Sidebar.svelte";

  export let segment;
</script>

<style>
  main {
    display: flex;
    height: 100%;
    overflow: hidden;
  }

  div {
    flex: 1;
  }
</style>

<Nav />

<main>
  {#if !segment & !$page.error}
    <Sidebar />
  {/if}
  <div>
    <slot />
  </div>
</main>
