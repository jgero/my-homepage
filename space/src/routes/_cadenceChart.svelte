<script>
  import { onMount } from "svelte";

  export let launches;

  onMount(() => {
    let intervals = [];
    // go through the launches and start at the second one to always have a previous one to compare it to
    for (let i = 1; i < launches.length; i++) {
      // get date objects from launches
      const datePreviousLaunch = new Date(launches[i - 1].date_utc);
      const dateCurrentLaunch = new Date(launches[i].date_utc);
      intervals.push(
        Math.floor(
          (dateCurrentLaunch - datePreviousLaunch) / 1000 / 60 / 60 / 24
        )
      );
    }
    intervals = intervals.map((interval, index) => {
      const arrayToCurrentIndex = intervals.slice(0, index + 1);
      return {
        value: interval,
        average:
          Math.round(
            (arrayToCurrentIndex.reduce((a, b) => a + b) / (index + 1)) * 100
          ) / 100,
      };
    });
    // create the chart
    var options = {
      chart: {
        type: "line",
        foreColor: "#FFFFFF",
      },
      series: [
        {
          name: "time between launches",
          data: intervals.map((interval) => interval.value),
        },
        {
          name: "average",
          data: intervals.map((interval) => interval.average),
        },
      ],
      colors: ["#f1c46d", "#FFFFFF"],
      yaxis: {
        title: {
          text: "days",
          style: {
            color: "#FFFFFF",
          },
        },
      },
      stroke: {
        curve: ["straight", "smooth"],
      },
      dataLabels: {
        style: {
          colors: ["#FFFFFF"],
        },
      },
    };

    var chart = new ApexCharts(
      document.querySelector("#cadenceChart"),
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
  #cadenceChart {
    width: 40vw;
  }
  :global(.apexcharts-tooltip) {
    color: black;
  }
</style>

<figure>
  <div id="cadenceChart" />
  <figcaption>
    <h3>launch cadence</h3>
    <p>
      The diagram shows the amount of time that passed between launches. This
      includes every vehicle and every flight since the first one.
    </p>
  </figcaption>
</figure>
