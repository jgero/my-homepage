<script>
  import { onMount } from "svelte";

  let hasLoaded = false;

  onMount(() => {
    // get all cores from the api
    fetch("https://api.spacexdata.com/v4/cores?block=5")
      // just keep the json part of it
      .then((response) => response.json())
      // render the chart
      .then((responseJSON) => {
        // sort the cores by their first flight date
        const cores = responseJSON.filter((core) => core.block >= 5);
        // calculate average
        const average =
          cores.map((core) => core.reuse_count + 1).reduce((a, b) => a + b) /
          cores.length;

        // data is now completely loaded
        hasLoaded = true;
        // create the chart
        var options = {
          chart: {
            type: "bar",
            foreColor: "#FFFFFF",
          },
          series: [
            {
              name: "flights",
              data: cores.map((core) => core.reuse_count + 1),
            },
          ],
          xaxis: {
            categories: cores.map((core) => core.serial),
            title: {
              text: "booster id",
              style: {
                color: "#FFFFFF",
              },
            },
          },
          yaxis: {
            title: {
              text: "flights",
              style: {
                color: "#FFFFFF",
              },
            },
          },
          stroke: {
            curve: "smooth",
          },
          dataLabels: {
            style: {
              colors: ["#FFFFFF"],
            },
          },
          fill: {
            colors: "#f1c46d",
          },
          annotations: {
            yaxis: [
              {
                y: average,
                borderColor: "#FFFFFF",
                label: {
                  borderColor: "#FFFFFF",
                  style: {
                    color: "#000000",
                    background: "#FFFFFF",
                  },
                  text: `boosters average ${
                    Math.round(average * 100) / 100
                  } flights`,
                },
              },
            ],
          },
        };

        var chart = new ApexCharts(
          document.querySelector("#coreChart"),
          options
        );

        chart.render();
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
  #coreChart {
    width: 40vw;
  }
  :global(.apexcharts-tooltip) {
    color: black;
  }
</style>

<figure>
  {#if !hasLoaded}
    <p>loading...</p>
  {/if}
  <div id="coreChart" />
  <figcaption>
    <h3>booster flights</h3>
    <p>
      The diagram shows the amount of flights of the boosters that have flown
      since 2014 sorted by date of the first flight
    </p>
  </figcaption>
</figure>
