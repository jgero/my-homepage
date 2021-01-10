<script>
  export let rockets, launches;
  const colors = ["#f1c46d", "#909090", "#cf1b2a"];

  const rocketMap = new Map();
  // enter the rockets to the map
  launches.forEach((launch) => {
    const rocketId = launch.rocket;
    const rocketName = rockets.find((el) => el.id === rocketId).name;
    if (rocketMap.has(rocketId)) {
      // if entry for that rocket already exists increment the number
      rocketMap.set(rocketId, {
        name: rocketName,
        launches: rocketMap.get(rocketId).launches + 1,
      });
    } else {
      // otherwise set it to 1
      rocketMap.set(rocketId, { name: rocketName, launches: 1 });
    }
  });

  const data = Array.from(rocketMap.values())
    // add colors and the width of the bar
    .map((rocket, i, arr) => {
      const all = arr.map((el) => el.launches).reduce((a, b) => a + b);
      const fraction = rocket.launches / all;
      return {
        ...rocket,
        color: colors[i],
        width: width * fraction,
      };
    })
    // add x offset
    .map((element, index, arr) => {
      const prevElements =
        index > 0
          ? arr
              .slice(0, index)
              .map((el) => el.width)
              .reduce((a, b) => a + b)
          : 0;
      return { ...element, x: prevElements };
    });

  const margin = 10;
  const height = 85;
  const width = 550;
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
  svg {
    max-width: 40vw;
    min-width: 35vw;
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
  <svg viewBox={`0 0 ${width + 2 * margin} ${height + 2 * margin}`}>
    <g transform={`translate(${margin}, ${margin})`} font-size="10">
      {#each data as datapoint}
        <rect
          fill={datapoint.color}
          x={datapoint.x}
          y={margin}
          {height}
          width={datapoint.width} />
        <text
          transform="rotate(90)"
          y={-datapoint.x - 5}
          x={margin + 5}
          fill="white">
          {datapoint.name}
        </text>
      {/each}
    </g>
  </svg>
</figure>
