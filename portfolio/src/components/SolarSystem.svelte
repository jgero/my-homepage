<script>
  const viewWidth = 500;
  const viewHeight = 250;
  const center = { x: 250, y: 125 };
  const planets = [
    {
      fill: 'green',
      radius: 5,
      orbit: { rx: 240, ry: 60, duration: 15 },
    },
    { fill: 'red', radius: 4, orbit: { rx: 210, ry: 50, duration: 10 } },
    { fill: 'blue', radius: 5, orbit: { rx: 160, ry: 35, duration: 9 } },
    {
      fill: 'purple',
      radius: 5,
      orbit: {
        rx: 120,
        ry: 25,
        duration: 7,
      },
    },
    { fill: 'grey', radius: 3, orbit: { rx: 70, ry: 15, duration: 4 } },
  ];

  function generateOrbitPath(rx, ry) {
    // start on the top of the ellipse
    return `M ${center.x} ${center.y - ry}
          C ${center.x + rx} ${center.y - ry}, ${center.x + rx} ${
      center.y + ry
    }, ${center.x} ${center.y + ry}
          C ${center.x - rx} ${center.y + ry}, ${center.x - rx} ${
      center.y - ry
    }, ${center.x} ${center.y - ry} z`;
  }
</script>

<svg viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
  {#each planets as planet, index}
    <path
      id={`orbit-${index}`}
      d={generateOrbitPath(planet.orbit.rx, planet.orbit.ry)}
      stroke="lightgrey"
      fill="transparent"
    />
    <circle r={planet.radius} fill={planet.fill}>
      <animateMotion dur={planet.orbit.duration} repeatCount="indefinite">
        <mpath xlink:href={`#orbit-${index}`} />
      </animateMotion>
    </circle>
  {/each}
  <circle id="sun" cx={viewWidth / 2} cy={viewHeight / 2} r="10" />
</svg>

<style>
  svg {
    width: 100%;
  }
  #sun {
    fill: yellow;
  }
</style>
