<script>
  import { onMount } from "svelte";
  import LineChart from "../../components/LineChart.svelte";
  const data = {
    xAxis: "# of flights",
    yAxis: "# of landed boosters",
    datasets: [
      {
        name: "landings",
        color: "#f1c46d",
        data: [],
      },
      { name: "average", color: "#e6e6e6", data: [] },
    ],
  };
  let hasLoaded = false;
  onMount(() => {
    fetch("https://api.spacexdata.com/v4/launches/query", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: { rocket: "5e9d0d95eda69974db09d1ed" } }),
    })
      .then((response) => response.json())
      .then((launchesJSON) => {
        // calculate # of laded boosters per flight
        data.datasets[0].data = launchesJSON.docs.map((launch) => {
          let landings = 0;
          launch.cores.forEach((core) => {
            if (core.landing_success) {
              landings++;
            }
          });
          return landings;
        });
        // calculate average up until current launch
        data.datasets[1].data = data.datasets[0].data.map((_, index, arr) => {
          const arrayUntilNow = arr.slice(0, index + 1);
          return (
            Math.round(
              (arrayUntilNow.reduce((a, b) => a + b) / (index + 1)) * 100
            ) / 100
          );
        });
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
      padding: 1rem;
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
  {#if hasLoaded}
    <LineChart {data} />
  {:else}
    <p>Loading...</p>
  {/if}
  <figcaption>
    <h3>booster landings</h3>
    <p>
      Depending on the mission profile up to 3 boosters can be recovered. In
      fully reusable mode the two side boosters land back on land and the center
      core on a droneship.
    </p>
  </figcaption>
</figure>
