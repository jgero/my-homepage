<script>
  import { onMount } from "svelte";

  import LineChart from "../components/LineChart.svelte";

  let hasLoaded = false;

  const data = {
    xAxis: "month",
    yAxis: "launches",
    datasets: [
      {
        name: "launches",
        color: "#f1c46d",
        data: [],
      },
      { name: "average", color: "#e6e6e6", data: [] },
    ],
  };

  onMount(() => {
    // get the falcon 9 launches per month starting january 2014
    fetch("https://api.spacexdata.com/v4/launches/past?rocket=falcon9")
      // only keep the JSON part
      .then((response) => response.json())
      .then((launchesJSON) => {
        let launchesPerMonthMap = new Map();
        // create empty map starting january 2014
        let d = new Date(2014, 0);
        while (d < new Date()) {
          launchesPerMonthMap.set(`${d.getMonth() + 1}/${d.getFullYear()}`, 0);
          d = new Date(d.getFullYear(), d.getMonth() + 1);
        }
        // filter out launches before january 2014
        const launches = launchesJSON.filter(
          (launch) => new Date(2014, 0) < new Date(launch.date_utc)
        );
        // count the launches per month
        launches.forEach((launch) => {
          const d = new Date(launch.date_utc);
          launchesPerMonthMap.set(
            `${d.getMonth() + 1}/${d.getFullYear()}`,
            launchesPerMonthMap.get(`${d.getMonth() + 1}/${d.getFullYear()}`) +
              1
          );
        });
        // build an array from the map
        data.datasets[0].data = Array.from(
          launchesPerMonthMap.keys()
        ).map((key) => launchesPerMonthMap.get(key));
        // add average to current launch
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
  <figcaption>
    <h3>launches per month</h3>
    <p>
      The steadily increasing launches per month of Falcon 9 since january 2014
    </p>
  </figcaption>
  {#if hasLoaded}
    <LineChart {data} />
  {:else}
    <p>loading...</p>
  {/if}
</figure>
