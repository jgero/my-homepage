<script>
  const viewWidth = 500;
  const viewHeight = 500;
  const center = { x: 250, y: 250 };
  const planets = [
    /* { id: 'neptun', radius: 5, orbit: { rx: 120, ry: 35 } }, */
    /* { id: 'saturn', radius: 5, orbit: { rx: 120, ry: 35 } }, */
    {
      id: "jupiter",
      radius: 5,
      orbit: {
        rx: 200,
        ry: 65,
        duration: 15,
      },
    },
    { id: "mars", radius: 4, orbit: { rx: 150, ry: 50, duration: 10 } },
    { id: "earth", radius: 5, orbit: { rx: 120, ry: 35, duration: 9 } },
    {
      id: "venus",
      radius: 5,
      orbit: {
        rx: 100,
        ry: 25,
        duration: 7,
      },
    },
    { id: "mercury", radius: 3, orbit: { rx: 70, ry: 15, duration: 4 } },
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

<style>
  #sun {
    fill: yellow;
  }
</style>

<svg viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
  {#each planets as planet}
    <path
      id={`${planet.id}-orbit`}
      d={generateOrbitPath(planet.orbit.rx, planet.orbit.ry)}
      stroke="red"
      fill="transparent" />
    <circle r={planet.radius} id={planet.id}>
      <animateMotion dur={planet.orbit.duration} repeatCount="indefinite">
        <mpath xlink:href={`#${planet.id}-orbit`} />
      </animateMotion>
    </circle>
  {/each}
  <circle id="sun" cx={viewWidth / 2} cy={viewHeight / 2} r="10" />
</svg>
