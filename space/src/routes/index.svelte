<script>
  import { onMount } from "svelte";
  import moon from "../../static/images/moon.jpg";
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
  @media screen and (max-width: 600px) {
    div.startpage-wrapper {
      height: unset;

      grid-template-columns: auto;
      grid-template-rows: 1fr 1fr;
      grid-template-areas: "moon" "headings";
    }
  }

  img.background {
    grid-area: moon;
    width: 100%;
  }

  section {
    grid-area: headings;
    padding: 1rem;
  }

  h1 {
    font-size: 4.5rem;
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
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
