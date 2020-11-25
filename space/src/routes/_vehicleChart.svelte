<script>
  import { onMount } from "svelte";

  export let launches;

  onMount(() => {
    const vehicleMap = new Map();
    // enter the vehicles to the map
    launches.forEach((launch) => {
      const id = launch.rocket.rocket_id;
      const name = launch.rocket.rocket_name;
      if (vehicleMap.has(id)) {
        // if entry for that rocket already exists increment the number
        vehicleMap.set(id, { name, launches: vehicleMap.get(id).launches + 1 });
      } else {
        // otherwise set it to 1
        vehicleMap.set(id, { name, launches: 1 });
      }
    });
    // create the chart
    let options = {
      chart: {
        type: "pie",
        width: 380,
      },
      series: Array.from(vehicleMap.values()).map(
        (vehicle) => vehicle.launches
      ),
      labels: Array.from(vehicleMap.values()).map((vehicle) => vehicle.name),
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
