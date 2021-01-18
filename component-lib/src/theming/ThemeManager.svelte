<script>
  import { theme } from "./colors.js";
  import { onMount } from "svelte";

  onMount(() => {
    theme.subscribe((theme) => {
      for (const attrKey in theme) {
        document.documentElement.style.setProperty(
          `--${attrKey}`,
          theme[attrKey]
        );
      }
    });
  });
</script>

<slot />
