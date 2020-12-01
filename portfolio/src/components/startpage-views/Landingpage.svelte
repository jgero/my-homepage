<script>
  import { fly } from "svelte/transition";
  import Clouds from "../Clouds.svelte";
</script>

<style>
  .container {
    display: grid;
    height: 100%;
    padding: 10vh 2rem;
    box-sizing: border-box;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr 4fr;
    grid-template-areas: "header ." "header clouds";
  }
  @media screen and (max-width: 600px) {
    .container {
      padding: 5vh 2rem;
      grid-template-columns: auto;
      grid-template-rows: 1fr 1fr;
      grid-template-areas: "header" "clouds";
    }
  }
  h1,
  h2 {
    margin: 1rem 0;
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

  header > div {
    background-color: var(--dark-4);
    height: 2px;
    width: 100%;
  }
  .wrapper {
    grid-area: clouds;
    position: relative;
  }

  figure {
    margin: 0;
    position: absolute;
    top: 0;
    left: 17%;
  }
  @media screen and (max-width: 600px) {
    figure {
      transform: scale(0.5) translate(-50%, -50%);
      left: 0;
    }
  }
</style>

<svelte:head>
  <title>Johannes Gerold - startpage</title>
</svelte:head>

<div class="container">
  <header out:fly={{ x: -200, duration: 200, delay: 0 }}>
    <h1 in:fly={{ x: -200, duration: 1500, delay: 400 }}>
      johannes
      <br />
      gerold
    </h1>
    <div in:fly={{ x: -200, duration: 1500, delay: 600 }} />
    <h2 in:fly={{ x: -200, duration: 1500, delay: 800 }}>
      web developer,
      <br />full stack.
    </h2>
  </header>
  <div class="wrapper">
    <figure>
      <Clouds />
    </figure>
  </div>
</div>
