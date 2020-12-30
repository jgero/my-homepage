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

  const c1 = "#f1c46d";
  const c2 = "#e6e6e6";

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
    // x axis label
    xAxis
      .append("text")
      .text("launch intervals")
      .attr("fill", "currentColor")
      .style("text-anchor", "middle")
      .attr("x", margin + scaleSpace)
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

  function generateLegend(node) {
    const circleR = "1em";
    const legend = select(node).append("g");
    legend.attr(
      "transform",
      `translate(${margin + scaleSpace + width / 2}, ${margin})`
    );
    legend.append("circle").attr("r", circleR).attr("class", "legend");
    legend
      .append("text")
      .text("time between launches")
      .attr("fill", "currentColor")
      .style("text-anchor", "start")
      .attr("x", 0)
      .attr("y", 0);
    legend
      .append("text")
      .text("average")
      .attr("fill", "currentColor")
      .style("text-anchor", "start")
      .attr("x", 0)
      .attr("y", "1em");
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
    <g transform={`translate(${margin + scaleSpace}, ${margin})`}>
      <g use:generateAxis>
        <path transition:draw d={valueLine(intervals)} stroke={c1} />
        <path transition:draw d={averageLine(intervals)} stroke={c2} />
      </g>
      <g
        transform={`translate(${margin + scaleSpace + width / 2}, ${margin})`}
        font-size="12">
        <circle r="6" fill={c1} cx="6" cy="6" />
        <text fill="currentColor" x="18" y="10" text-anchor="start">
          time between launches
        </text>
        <circle r="6" fill={c2} cx="6" cy="20" />
        <text fill="currentColor" x="18" y="23">average</text>
      </g>
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
