<script>
  import { extent } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import { axisBottom, axisLeft } from "d3-axis";
  import { select } from "d3-selection";

  export let data = {
    xAxis: "booster id",
    yAxis: "flights",
    data: [4, 3, 5, 7, 1, 1],
    barColor: "#f1c46d",
    averageLineColor: "#e6e6e6",
  };
  const averageValue = data.data.reduce((a, b) => a + b) / data.data.length;

  const margin = 10;
  const scaleSpace = 35;
  const height = 150;
  const width = 550;

  // the scales
  const xScale = scaleLinear()
    .domain(extent([...data.data.map((_, i) => i), data.data.length]))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent([...data.data, 0]))
    .range([height, 0]);

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
    xAxis.call(axisBottom(xScale).ticks(0));
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
      {#each data.data as value, i}
        <rect
          fill={data.barColor}
          x={xScale(i) + width / data.data.length / 4}
          y={yScale(value)}
          height={height - yScale(value)}
          width={width / data.data.length / 2} />
        <line
          x1={0}
          y1={yScale(averageValue)}
          x2={width}
          y2={yScale(averageValue)}
          stroke={data.averageLineColor}
          stroke-width="2" />
        <text
          x={width * 0.8}
          y={yScale(averageValue) - 5}
          fill={data.averageLineColor}>
          average
        </text>
      {/each}
    </g>
  </g>
</svg>
