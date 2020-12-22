<script>
  import { onMount } from "svelte";
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
        let data = launchesJSON.docs;
        data = data.map((launch) => {
          let landings = 0;
          launch.cores.forEach((core) => {
            if (core.landing_success) {
              landings++;
            }
          });
          return { landings };
        });
        // add average to current launch
        data = data.map((el, index) => {
          const arrayUntilNow = data.slice(0, index + 1);
          return {
            ...el,
            average:
              Math.round(
                (arrayUntilNow
                  .map((el) => el.landings)
                  .reduce((a, b) => a + b) /
                  (index + 1)) *
                  100
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
              name: "# of landed boosters",
              data: data.map((el) => el.landings),
            },
            {
              name: "average",
              data: data.map((el) => el.average),
            },
          ],
          colors: ["#f1c46d", "#FFFFFF"],
          xaxis: {
            categories: data.map((_, i) => i),
            title: {
              text: "flight number",
              style: {
                color: "#FFFFFF",
              },
            },
          },
          yaxis: {
            title: {
              text: "# of landed boosters",
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
          document.querySelector("#fhRecoveryChart"),
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
      padding: 1rem;
    }
  }
  #fhRecoveryChart {
    width: 40vw;
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
  <div id="fhRecoveryChart" />
  <figcaption>
    <h3>booster landings</h3>
    <p>
      Depending on the mission profile up to 3 boosters can be recovered. In
      fully reusable mode the two side boosters land back on land and the center
      core on a droneship.
    </p>
  </figcaption>
</figure>
