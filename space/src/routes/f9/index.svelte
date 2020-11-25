<script>
  import falcon from "images/f9.png";
  import { onMount } from "svelte";
  import BoosterFlightsBarChart from "./_BoosterFlightsBarChart.svelte";
  import LaunchesPerMonthChart from "./_LaunchesPerMonthChart.svelte";

  onMount(() => {
    // move the image on scroll
    document.querySelector("body").addEventListener("scroll", calculateScroll);
  });

  function calculateScroll(ev) {
    const maxScrollX = 300;
    const maxScrollY = 150;

    const scrollPercent =
      ev.target.scrollTop / (ev.target.scrollHeight - window.innerHeight);
    document.getElementById("f9background").style.right =
      maxScrollX * scrollPercent + 32 + "px";
    document.getElementById("f9background").style.top =
      maxScrollY - maxScrollY * scrollPercent + 50 + "px";
  }
</script>

<style>
  div.page-wrapper {
    width: 100%;
    background-color: #02305d;
  }

  div.screen-one {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 10% auto 5% 55%;
    grid-template-rows: 10% 40% 50%;
    grid-template-areas: ". . . ." ". . . f9" ". headings . f9";
  }

  img.background {
    width: 50%;
    position: fixed;
    right: 32px;
    top: 200px;
    pointer-events: none;
  }

  header {
    grid-area: headings;
  }

  h1 {
    font-size: 72px;
    margin: 0;
    color: #e6e6e6;
  }

  h2 {
    font-size: 24px;
    font-weight: 300;
    color: #f1c46d;
    margin: 0.2em 0 0 0;
  }

  .spacer {
    height: 20vh;
  }
</style>

<svelte:head>
  <title>SpaceX Stats - Falcon 9</title>
</svelte:head>

<div class="page-wrapper" id="page-wrapper">
  <div class="screen-one">
    <img class="background" alt="Falcon 9" src={falcon} id="f9background" />
    <header>
      <h1>Falcon 9</h1>
      <h2>First orbital class rocket capable of reflight</h2>
    </header>
  </div>
  <BoosterFlightsBarChart />
  <div class="spacer" />
  <LaunchesPerMonthChart />
</div>
