<script>
  import { onMount } from "svelte";

  let hasLoaded = false;

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
        let launchesPerMonth = Array.from(launchesPerMonthMap.keys()).map(
          (key) => ({
            month: key,
            launches: launchesPerMonthMap.get(key),
          })
        );
        // add average to current launch
        launchesPerMonth = launchesPerMonth.map((el, index) => {
          const arrayUntilNow = launchesPerMonth.slice(0, index + 1);
          return {
            ...el,
            average:
              Math.round(
                (arrayUntilNow.map((i) => i.launches).reduce((a, b) => a + b) /
                  (index + 1)) *
                  100
              ) / 100,
          };
        });
        hasLoaded = true;
        // create the chart
        var options = {
          chart: {
            type: "line",
            foreColor: "#FFFFFF",
          },
          series: [
            {
              name: "launches",
              data: launchesPerMonth.map((month) => month.launches),
            },
            {
              name: "average",
              data: launchesPerMonth.map((month) => month.average),
            },
          ],
          colors: ["#f1c46d", "#FFFFFF"],
          xaxis: {
            categories: launchesPerMonth.map((month) => month.month),
            title: {
              text: "month",
              style: {
                color: "#FFFFFF",
              },
            },
          },
          yaxis: {
            title: {
              text: "launches",
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
  #cadenceChart {
    min-width: 40vw;
  }
</style>

<figure>
  <figcaption>
    <h3>launches per month</h3>
    <p>
      The steadily increasing launches per month of Falcon 9 since january 2014
    </p>
  </figcaption>
  {#if !hasLoaded}
    <p>loading...</p>
  {/if}
  <div id="cadenceChart" />
</figure>
