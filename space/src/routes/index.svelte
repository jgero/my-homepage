<script>
  import { onMount } from "svelte";
  import moon from "images/moon.jpg";
  import CadenceChart from "./_cadenceChart.svelte";
  import VehicleChart from "./_vehicleChart.svelte";

  let launches, rockets;

  onMount(async () => {
    const apiResponseLaunches = await fetch(
      "https://api.spacexdata.com/v4/launches/past?order=asc"
    );
    const apiResponseRockets = await fetch(
      "https://api.spacexdata.com/v4/rockets"
    );
    // only keep the JSON part
    launches = await apiResponseLaunches.json();
    rockets = await apiResponseRockets.json();
  });
</script>

<style>
  div.startpage-wrapper {
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
    background-color: #000000;

    display: grid;
    grid-template-columns: 60% auto 10%;
    grid-template-rows: 3fr 2fr;
    grid-template-areas: "moon . ." "moon headings .";
  }

  img.background {
    grid-area: moon;
    width: 100%;
  }

  section {
    grid-area: headings;
  }

  h1 {
    font-size: 72px;
    margin: 0;
  }

  h2 {
    font-size: 24px;
    font-weight: 300;
    color: #909090;
    margin: 0.2em 0 0 0;
  }

  .second-page {
    background-color: black;
  }
</style>

<svelte:head>
  <title>SpaceX Stats</title>
</svelte:head>

<div class="startpage-wrapper">
  <img class="background" alt="moon" src={moon} />
  <section>
    <h1>SpaceX Stats</h1>
    <h2>
      Not an official site, just a fan visualizing the data of the SpaceX API
    </h2>
  </section>
</div>

{#if launches && rockets}
  <div class="second-page">
    <CadenceChart {launches} />
    <VehicleChart {rockets} {launches} />
  </div>
{/if}
