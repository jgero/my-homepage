<script>
  import ThemeManager from '../theming/ThemeManager.svelte';
  import Header from '../components/Header.svelte';
</script>

<ThemeManager>
  <Header />
  <slot />
</ThemeManager>
