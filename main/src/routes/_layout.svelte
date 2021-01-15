<script>
  import { applyColorPalette } from "component-lib";
</script>

<style>
  main {
    background-color: var(--background);
    padding: 3rem;
  }
</style>

<main use:applyColorPalette>
  <slot />
</main>
