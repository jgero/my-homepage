<script>
  import { theme } from './colors.js';
  import { onMount } from 'svelte';

  // TODO: apply these colors somehow else to allow for server side rendering
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
