<script>
  import { Greeter, Button, theme } from "component-lib";
  import { ThemeSwitcher } from "component-lib";

  function switchTheme() {
    console.log("switching theme");
    theme.select("dark");
  }
</script>

<style>
  * {
    color: blue;
  }
</style>

<svelte:head>
  <title>placeholder</title>
</svelte:head>

<h1>placeholder</h1>

<p>
  This page is currently just a placeholder. The portfolio can be found
  <a href="https://portfolio.jgero.me">here</a>
  and the sapce stats page
  <a href="https://space.jgero.me">here</a>
</p>

<Greeter />
<Button on:click={switchTheme} />
<ThemeSwitcher />
