<script>
  import { draw } from "svelte/transition";

  import { extent } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import { line, curveBasis } from "d3-shape";
  import { axisBottom, axisLeft } from "d3-axis";
  import { select } from "d3-selection";

  export let data = {
    xAxis: "launch intervals",
    yAxis: "# of days in launch interval",
    datasets: [
      {
        name: "time between launches",
        color: "#f1c46d",
        data: [200, 10, 5, 3],
      },
      { name: "average", color: "#e6e6e6", data: [200, 110, 50, 20] },
    ],
  };

  const margin = 10;
  const scaleSpace = 35;
  const height = 150;
  const width = 550;

  // the scales
  const xScale = scaleLinear()
    .domain(extent(data.datasets[0].data.map((_, i) => i)))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data.datasets[0].data))
    .range([height, 0]);

  // the path generator
  const valueLine = line()
    .x((_, i) => xScale(i))
    .y((d) => yScale(d))
    .curve(curveBasis);

  function generateAxis(node) {
    const xAxis = select(node).append("g");
    xAxis.attr("transform", `translate(0, ${height})`);
    // x axis label
    xAxis
      .append("text")
      .text(data.xAxis)
      .attr("fill", "currentColor")
      .style("text-anchor", "middle")
      .attr("x", margin + scaleSpace)
      .attr("y", scaleSpace);
    xAxis.call(axisBottom(xScale).ticks(5).tickSize([2]));
    const yAxis = select(node).append("g");
    yAxis.attr("transform", `translate(-1, 0)`);
    yAxis
      .append("text")
      .text(data.yAxis)
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
  svg {
    max-width: 40vw;
    min-width: 350px;
  }
</style>

<svg
  viewBox={`0 0 ${width + scaleSpace + 2 * margin} ${height + scaleSpace + 2 * margin}`}>
  <g transform={`translate(${margin + scaleSpace}, ${margin})`}>
    <g use:generateAxis>
      {#each data.datasets as dataset}
        <path
          transition:draw
          d={valueLine(dataset.data)}
          stroke={dataset.color}
          fill="none" />
      {/each}
    </g>
    <g
      transform={`translate(${margin + scaleSpace + width / 2}, ${margin})`}
      font-size="12">
      {#each data.datasets as dataset, i}
        <circle r="6" fill={dataset.color} cx="6" cy={(i + 1) * 6 + i * 8} />
        <text
          fill="currentColor"
          x="18"
          y={(i + 1) * 10 + i * 3}
          text-anchor="start">
          {dataset.name}
        </text>
      {/each}
    </g>
  </g>
</svg>
