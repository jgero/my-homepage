<script>
  import { fly } from "svelte/transition";
  import SolarSystemAnimated from "../SolarSystemAnimated.svelte";
</script>

<style>
  .wrapper {
    display: grid;
    height: 100%;
    padding: 10vh 2rem;
    box-sizing: border-box;
    grid-template-columns: 1fr 3fr;
    grid-template-areas: "header animation";
  }
  @media screen and (max-width: 600px) {
    .wrapper {
      padding: 5vh 2rem;
      grid-template-columns: auto;
      grid-template-rows: 2fr 3fr;
      grid-template-areas: "header" "animation";
    }
  }
  header {
    grid-area: header;
    width: max-content;
    justify-self: center;
  }
  @media screen and (max-width: 600px) {
    header {
      justify-self: unset;
    }
  }
  header > h1 {
    margin-top: 1em;
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
    position: relative;
    width: 100%;
  }
  .positioning-helper {
    position: absolute;
    top: 25%;
    right: 30%;
    transform: scale(1.5);
  }
  @media screen and (max-width: 600px) {
    .positioning-helper {
      top: 0%;
      right: -13%;
      transform: scale(0.5);
    }
  }
</style>

<svelte:head>
  <title>Johannes Gerold - about me</title>
</svelte:head>

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
    <div class="positioning-helper">
      <SolarSystemAnimated />
    </div>
  </div>
</div>
