<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { derived } from 'svelte/store';
  import { getLogger } from '../../stores/debug-logger';
  import { getMyCoords } from '../../stores/my-coords';
  import { getDistanceFromLatLonInKm } from '../../utils/coordinates-to-meters';
  export let popupState;
  let popupComponent, myCoords, logger, diffInKm;

  onMount(() => {
    logger = getLogger();
    myCoords = getMyCoords();
    diffInKm = derived([myCoords, popupState], ([$myCoords, $popupState]) => {
      if (!$myCoords || !$popupState.data) {
        return '??';
      }
      return (
        Math.round(
          getDistanceFromLatLonInKm(
            $myCoords.latitude,
            $myCoords.longitude,
            $popupState.data.latitude,
            $popupState.data.longitude
          ) * 10
        ) / 10
      );
    });
    popupState.subscribe(({ isVisible }) => {
      // when setting to visible attach the listener to close the popup
      if (isVisible) {
        document.documentElement.addEventListener('click', onClickOutside);
      }
    });
  });

  function onClickOutside(event) {
    if (!$popupState.isVisible) {
      logger.log({
        logLevel: 'error',
        message: 'popup listener still catched click while popup was invisible',
      });
      return;
    }
    // check all parents
    parent = event.target;
    while (parent) {
      // close the popup if clicked inside the map
      if (parent.tagName === 'svg') {
        document.documentElement.removeEventListener('click', onClickOutside);
        popupState.hide();
        return;
      }
      parent = parent.parentNode;
    }
  }

  function setPosition(node) {
    node.style.top = `calc(${$popupState.y}px - 40vw - 1rem)`;
    node.style.left = `calc(${$popupState.x}px - 20vw - 0rem)`;
  }
</script>

{#if $popupState.isVisible}
  <aside
    bind:this={popupComponent}
    use:setPosition
    transition:fly={{ y: -40, duration: 200 }}
  >
    <div>
      <h4><strong>{$popupState.data.name}</strong></h4>
      <p>
        <span
          >latitude:
          {Math.round($popupState.data.latitude * 100000) / 100000}</span
        >
        <br />
        <span
          >longitude:
          {Math.round($popupState.data.longitude * 100000) / 100000}</span
        >
        <br />
        <!--<span>Hier könnte noch mehr Text stehen...</span>-->
        <span>ca. {$diffInKm} km entfernt</span>
      </p>
    </div>
  </aside>
{/if}

<style>
  aside {
    position: fixed;
    font-size: 0.6rem;
    width: 40vw;
    height: 40vw;
    box-sizing: border-box;
    border: 1px solid black;
    padding: 0.6rem;
    border-radius: 0.6rem;
    background-color: white;
  }
  div {
    position: relative;
    height: 100%;
  }
  div::after {
    position: absolute;
    content: '';
    left: calc(50% - 0.5rem);
    bottom: -1.6rem;
    border-top: 1rem solid black;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
  }
</style>
