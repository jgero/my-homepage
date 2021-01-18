<script>
  import { ThemeManager } from "component-lib";
  import Header from "../components/Header.svelte";
</script>

<style>
  /* div { */
  /*   background-color: var(--background); */
  /*   width: 100%; */
  /*   min-height: 100%; */
  /*   font-family: "DM Sans", sans-serif; */
  /*   color: var(--font); */
  /* } */
</style>

<ThemeManager>
  <Header />
  <slot />
</ThemeManager>
