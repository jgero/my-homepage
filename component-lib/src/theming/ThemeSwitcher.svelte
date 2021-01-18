<script>
  import { themeNameStore, theme } from "./colors.js";

  function goDark() {
    theme.select("dark");
  }
</script>

<span>current theme: {$themeNameStore}</span>
<button on:click={goDark}>go dark</button>
