<script>
  import { onMount } from "svelte";

  export let rockets, launches;

  onMount(() => {
    /* const vehicleMap = new Map(); */
    const rocketMap = new Map();
    // enter the rockets to the map
    launches.forEach((launch) => {
      const rocketId = launch.rocket;
      const rocketName = rockets.find((el) => el.id === rocketId).name;
      if (rocketMap.has(rocketId)) {
        // if entry for that rocket already exists increment the number
        rocketMap.set(rocketId, {
          name: rocketName,
          launches: rocketMap.get(rocketId).launches + 1,
        });
      } else {
        // otherwise set it to 1
        rocketMap.set(rocketId, { name: rocketName, launches: 1 });
      }
    });
    // create the chart
    let options = {
      chart: {
        type: "pie",
        width: 380,
      },
      series: Array.from(rocketMap.values()).map((rocket) => rocket.launches),
      labels: Array.from(rocketMap.values()).map((rocket) => rocket.name),
      colors: ["#f1c46d", "#909090", "#cf1b2a"],
      legend: {
        labels: {
          colors: ["#FFFFFF"],
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    var chart = new ApexCharts(
      document.querySelector("#vehicleChart"),
      options
    );

    chart.render();
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

  figcaption {
    width: 400px;
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
  #vehicleChart {
    width: 40vw;
  }
  :global(.apexcharts-tooltip) {
    color: black;
  }
</style>

<figure>
  <figcaption>
    <h3>vehicle flights</h3>
    <p>
      SpaceX's rocket fleet consits of multiple vehicles for different payloads.
      Not all of them are still in use.
    </p>
  </figcaption>
  <div id="vehicleChart" />
</figure>
