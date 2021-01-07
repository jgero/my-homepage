<script>
  import { onMount } from "svelte";
  import BarChart from "../../components/BarChart.svelte";

  let hasLoaded = false;
  let data = {
    xAxis: "booster id",
    yAxis: "flights",
    data: [],
    barColor: "#f1c46d",
    averageLineColor: "#e6e6e6",
  };

  onMount(() => {
    // get all cores from the api
    fetch("https://api.spacexdata.com/v4/cores?block=5")
      // just keep the json part of it
      .then((response) => response.json())
      // render the chart
      .then((responseJSON) => {
        data.data = responseJSON
          .filter((core) => core.block >= 5)
          .map((core) => core.reuse_count + 1);
        // data is now completely loaded
        hasLoaded = true;
      });
  });
</script>

<style>
  figure {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0;
    padding: 32px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 600px) {
    figure {
      flex-direction: column;
    }
  }

  figcaption {
    max-width: 400px;
  }

  figcaption > h3 {
    font-size: 24px;
    color: #e6e6e6;
  }
  figcaption > p {
    font-size: 18px;
    font-weight: 300;
    color: #f1c46d;
  }
</style>

<figure>
  {#if !hasLoaded}
    <p>loading...</p>
  {:else}
    <BarChart {data} />
  {/if}
  <figcaption>
    <h3>booster flights</h3>
    <p>
      The diagram shows the amount of flights of the boosters that have flown
      since 2014 sorted by date of the first flight
    </p>
  </figcaption>
</figure>
