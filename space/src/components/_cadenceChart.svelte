<script>
  import { draw } from "svelte/transition";

  import { extent } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import { line, curveBasis } from "d3-shape";
  import { axisBottom, axisLeft } from "d3-axis";
  import { select } from "d3-selection";

  export let launches;

  const margin = 10;
  const scaleSpace = 35;
  const height = 150;
  const width = 800;

  let intervals = [];
  // go through the launches and start at the second one to always have a previous one to compare it to
  for (let i = 1; i < launches.length; i++) {
    // get date objects from launches
    const datePreviousLaunch = new Date(launches[i - 1].date_utc);
    const dateCurrentLaunch = new Date(launches[i].date_utc);
    intervals.push(
      Math.floor((dateCurrentLaunch - datePreviousLaunch) / 1000 / 60 / 60 / 24)
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

  // the scales
  const xScale = scaleLinear()
    .domain(extent(intervals.map((_, i) => i)))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(intervals.map((d) => d.value)))
    .range([height, 0]);

  // the path generator
  const valueLine = line()
    .x((_, i) => xScale(i))
    .y((d) => yScale(d.value))
    .curve(curveBasis);
  const averageLine = line()
    .x((_, i) => xScale(i))
    .y((d) => yScale(d.average))
    .curve(curveBasis);

  function setup(node) {
    node.setAttribute(
      "transform",
      `translate(${margin + scaleSpace}, ${margin})`
    );
  }

  function generateAxis(node) {
    const xAxis = select(node).append("g");
    xAxis.attr("transform", `translate(0, ${height})`);
    xAxis
      .append("text")
      .text("launch intervals")
      .attr("fill", "currentColor")
      .style("text-anchor", "middle")
      .attr("x", margin + scaleSpace + width / 2)
      .attr("y", scaleSpace);
    xAxis.call(axisBottom(xScale).ticks(5).tickSize([2]));
    const yAxis = select(node).append("g");
    yAxis.attr("transform", `translate(-1, 0)`);
    yAxis
      .append("text")
      .text("# of days in launch interval")
      .attr("fill", "currentColor")
      .style("text-anchor", "middle")
      .attr(
        "transform",
        `translate(${-scaleSpace}, ${height / 2}) rotate(-90)`
      );
    yAxis.call(axisLeft(yScale).ticks(5).tickSize([2]));
    return {
      destroy() {},
    };
  }
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
  <svg
    viewBox={`0 0 ${width + scaleSpace + 2 * margin} ${height + scaleSpace + 2 * margin}`}>
    <g use:setup use:generateAxis>
      <path transition:draw d={valueLine(intervals)} stroke="#f1c46d" />
      <path transition:draw d={averageLine(intervals)} stroke="#e6e6e6" />
    </g>
  </svg>
  <figcaption>
    <h3>launch cadence</h3>
    <p>
      The diagram shows the amount of time that passed between launches. This
      includes every vehicle and every flight since the first one.
    </p>
  </figcaption>
</figure>
