<script>
  import { ThemeManager } from "component-lib";
  import Header from "../components/Header.svelte";
</script>

<ThemeManager>
  <Header />
  <slot />
</ThemeManager>
