<script>
  import { onMount } from 'svelte';

  // all data about the cores and the launches
  let baseData;
  // how big is the percentage of starlink missions of the reused boosters
  let starlinkPercentage;
  const scale = 60;

  onMount(() => {
    // get all cores from the api

    baseData = Promise.all([
      fetch('https://api.spacexdata.com/v4/cores/query', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: { block: 5 },
          options: { limit: 100 },
        }),
      })
        // just keep the json part of it
        .then((response) => response.json())
        .then((responseJSON) => {
          responseJSON = responseJSON.docs.map((core) => ({
            flights: core.launches.length,
            isLost: core.status === 'expended' || core.status === 'lost',
            id: core.id,
          }));
          return responseJSON;
        }),
      // get all f9 starlink launches
      fetch('https://api.spacexdata.com/v4/launches/query', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: { $text: { $search: 'starlink' } },
          options: { limit: 100 },
        }),
      })
        // just keep the json part of it
        .then((response) => response.json())
        .then((responseJSON) => {
          // only keep launches with one core
          responseJSON = responseJSON.docs.filter(
            (launch) => launch.cores.length === 1
          );
          responseJSON = responseJSON.map((launch) => launch.cores[0].core);
          return responseJSON;
        }),
    ]).then(([cores, starlinkLaunches]) => {
      const coreMap = new Map();
      cores.forEach(({ id, flights, isLost }) => {
        coreMap.set(id, { flights, isLost, starlinkLaunches: 0 });
      });
      starlinkLaunches.forEach((coreId) => {
        if (!coreMap.has(coreId)) {
          console.log('core map has not core with that id');
          return;
        }
        const { id, flights, isLost, starlinkLaunches } = coreMap.get(coreId);
        coreMap.set(coreId, {
          id,
          flights,
          isLost,
          starlinkLaunches: starlinkLaunches + 1,
        });
      });
      return Array.from(coreMap)
        .map(([id, data]) => ({ id, ...data }))
        .map((core) => {
          const { starlinkLaunches, flights } = core;
          // do nothing when no flights yet happeded
          if (flights === 0) {
            return core;
          }
          return {
            ...core,
            starlinkLaunches:
              Math.round((starlinkLaunches / flights) * 100) / 100,
          };
        });
    });

    starlinkPercentage = baseData.then((cores) => {
      const test = new Map();
      cores
        .filter((c) => c.flights > 1)
        .forEach((core) => {
          if (test.has(core.starlinkLaunches)) {
            test.set(
              core.starlinkLaunches,
              test.get(core.starlinkLaunches) + core.flights
            );
          } else {
            test.set(core.starlinkLaunches, core.flights);
          }
        });
      console.log(cores.filter((c) => c.flights > 1));
      return cores;
    });
  });
</script>

<figure>
  {#await baseData}
    <p>loading...</p>
  {:then cores}
    <svg viewBox="0 0 1400 700">
      <g class="legend">
        <g class="labels">
          <text x={700 - 8 * scale - 10} y="700" text-anchor="end"
            >100% Starlink</text
          >
          <text x={700 + 8 * scale + 10} y="700" text-anchor="start"
            >0% Starlink</text
          >
          <text text-anchor="middle" x="700" y={700 - 1 * scale - 2}
            >1 Flight</text
          >
          <text text-anchor="middle" x="700" y={700 - 4 * scale - 2}
            >4 Flights</text
          >
          <text text-anchor="middle" x="700" y={700 - 8 * scale - 2}
            >8 Flights</text
          >
        </g>
        <circle cx="700" cy="700" r={8 * scale} />
        <circle cx="700" cy="700" r={4 * scale} />
        <circle cx="700" cy="700" r={1 * scale} />
      </g>
      <g class="cores">
        {#if cores}
          {#each cores as core}
            <rect
              x="700"
              y="685"
              rx="5"
              ry="5"
              width={core.flights * scale}
              height="30"
              transform="rotate({core.starlinkLaunches * -180} 700 700)"
            />
          {/each}
        {/if}
      </g>
    </svg>
  {/await}
  <figcaption>
    <h3>booster flights</h3>
    <p>
      The diagram shows the amount of flights of the boosters that have flown
      since 2014 sorted by date of the first flight
    </p>
  </figcaption>
</figure>

<style>
  svg g.legend circle {
    fill: transparent;
    stroke: #e6e6e6;
  }
  svg g.legend text {
    fill: #e6e6e6;
  }
  svg g.cores rect {
    fill: #f1c46d;
    stroke: #e6e6e6;
    transition: all 0.3s ease-in-out;
  }
  svg g.cores rect:hover {
    fill: red;
  }
  figure {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0;
    padding: 32px;
    box-sizing: border-box;
    position: relative;
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
</style>
