<script>
  import LineChart from "../components/LineChart.svelte";
  export let launches;

  const data = {
    xAxis: "launch intervals",
    yAxis: "# of days in launch interval",
    datasets: [
      {
        name: "time between launches",
        color: "#f1c46d",
        data: [],
      },
      { name: "average", color: "#e6e6e6", data: [] },
    ],
  };

  // calculate the intervals
  launches.forEach((current, i, arr) => {
    // do nothing on first one, because there is nothing to compare to
    if (i === 0) return;
    // get the date objects
    const datePreviousLaunch = new Date(arr[i - 1].date_utc);
    const dateCurrentLaunch = new Date(current.date_utc);
    // calculate the days between the launches
    data.datasets[0].data.push(
      Math.floor((dateCurrentLaunch - datePreviousLaunch) / 1000 / 60 / 60 / 24)
    );
  });
  // calculate average curve from first dataset
  data.datasets[1].data = data.datasets[0].data.map((_, i, intervals) => {
    // get array to current index, including current index
    const arrayToCurrentIndex = intervals.slice(0, i + 1);
    // calculate average of all launches up until now
    return (
      Math.round(
        (arrayToCurrentIndex.reduce((a, b) => a + b) / (i + 1)) * 100
      ) / 100
    );
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
  <LineChart {data} />
  <figcaption>
    <h3>launch cadence</h3>
    <p>
      The diagram shows the amount of time that passed between launches. This
      includes every vehicle and every flight since the first one.
    </p>
  </figcaption>
</figure>
