<script>
  import { onMount, onDestroy } from "svelte";
  import f9 from "../../static/images/f9.png";
  import BoosterFlightsBarChart from "../components/_BoosterFlightsBarChart.svelte";
  import LaunchesPerMonthChart from "../components/_LaunchesPerMonthChart.svelte";

  onMount(() => {
    // move the image on scroll
    document.querySelector("body").addEventListener("scroll", calculateScroll);
  });
  onDestroy(() => {
    // remove scroll event listener
    document
      .querySelector("body")
      .removeEventListener("scroll", calculateScroll);
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
  @media screen and (max-width: 600px) {
    div.screen-one {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas: "headings" "f9";
    }
  }

  img.background {
    width: 50%;
    position: fixed;
    right: 32px;
    top: 200px;
    pointer-events: none;
  }
  @media screen and (max-width: 600px) {
    img.background {
      position: unset;
      width: 90%;
    }

    img.background,
    header {
      align-self: center;
      justify-self: center;
    }
  }

  header {
    grid-area: headings;
  }
  @media screen and (max-width: 600px) {
    header {
      padding: 1rem;
    }
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
    <img class="background" alt="Falcon 9" src={f9} id="f9background" />
    <header>
      <h1>Falcon 9</h1>
      <h2>First orbital class rocket capable of reflight</h2>
    </header>
  </div>
  <BoosterFlightsBarChart />
  <div class="spacer" />
  <LaunchesPerMonthChart />
</div>
