<script>
  import { onMount } from 'svelte';
  import { getMyCoords } from '../stores/my-coords';

  export let segment;
  let myCoords;

  onMount(() => {
    myCoords = getMyCoords();
    console.log(segment);
  });

  function toggleLocationService() {
    if ($myCoords) {
      myCoords.reset();
    } else {
      myCoords.startInterval();
    }
  }
</script>

{#if !segment.startsWith('join')}
  <nav>
    <ul>
      <li>
        <a href="/" aria-current={segment === undefined ? 'page' : undefined}>
          <span class="material-icons">home</span>
          HOME
        </a>
      </li>
    </ul>
    <a href="/map" aria-current={segment === 'map' ? 'page' : undefined}>Map</a>
    <div class="spacer" />
    <button on:click={toggleLocationService}>
      {#if $myCoords === null}gps_off{:else}gps_fixed{/if}
    </button>
  </nav>
{/if}

<style>
  nav {
    display: flex;
  }
  .spacer {
    flex: 1;
  }
  button {
    font-family: 'Material Icons';
    font-size: 1.5rem;
    background-color: white;
    border: none;
    outline: none;
    padding: 0.5rem;
    line-height: 1.5rem;
    border-radius: 50%;
    margin: 0.5rem;
    cursor: pointer;
    box-shadow: 0 0 10px 0 #c5f1ff;
  }
</style>
