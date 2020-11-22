<script>
  import { fly } from "svelte/transition";
  import SolarSystemAnimated from "../SolarSystemAnimated.svelte";
</script>

<style>
  .wrapper {
    display: grid;
    height: 100%;
    grid-template-rows: 2fr 1fr;
    grid-template-columns: 2rem 1fr 3fr 2rem;
    grid-template-areas: ". header animation ." ". . . .";
  }
  header,
  .animation {
    justify-self: center;
  }
  header {
    grid-area: header;
    align-self: center;
  }
  header > div {
    background-color: var(--dark-4);
    height: 2px;
  }
  header > a {
    display: inline-block;
  }
  .animation {
    grid-area: animation;
    transform: scale(1.5);
    align-self: flex-end;
  }
</style>

<div class="wrapper">
  <header out:fly={{ x: -200, duration: 200 }}>
    <h1 in:fly={{ x: -200, duration: 1500, delay: 0 }}>about me</h1>
    <div in:fly={{ x: -200, duration: 1500, delay: 200 }} />
    <h2 in:fly={{ x: -200, duration: 1500, delay: 400 }}>
      i love programming,
      <br />
      space and sports
    </h2>
    <a
      in:fly={{ x: -200, duration: 1500, delay: 600 }}
      href="/about_me"
      class="button primary">show me more</a>
  </header>
  <div
    in:fly={{ y: 300, duration: 3000 }}
    out:fly={{ y: 300, duration: 200 }}
    class="animation">
    <SolarSystemAnimated />
  </div>
</div>
