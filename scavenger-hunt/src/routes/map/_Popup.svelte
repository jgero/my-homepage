<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { getLogger } from "../../stores/debug-logger";
  import firebase from "firebase/app";
  export let popupState;
  let popupComponent, logger;

  onMount(() => {
    logger = getLogger();
    popupState.subscribe(({ isVisible }) => {
      // when setting to visible attach the listener to close the popup
      if (isVisible) {
        document.documentElement.addEventListener("click", onClickOutside);
      }
    });
  });

  function onClickOutside(event) {
    if (!$popupState.isVisible) {
      return;
    }
    var parent = event.target;
    while (parent) {
      if (parent === popupComponent) {
        return;
      }
      parent = parent.parentNode;
    }
    // remove the listener when closing the popup
    document.documentElement.removeEventListener("click", onClickOutside);
    popupState.hide();
  }

  function setPosition(node) {
    node.style.top = `calc(${$popupState.y}px - 40vw - 1rem)`;
    node.style.left = `calc(${$popupState.x}px - 20vw - 0rem)`;
  }

  function onDeleteLocation() {
    logger.log({
      logLevel: "warning",
      message: `deleting location ${$popupState.data.id}`,
    });
    firebase
      .firestore()
      .collection("route")
      .doc($popupState.data.id)
      .delete()
      .then(() => {
        logger.log({
          logLevel: "log",
          message: "location deleted successfully",
        });
        popupState.hide();
      })
      .catch((error) => {
        logger.log({
          logLevel: "error",
          message: `could not delete location ${$popupState.data.id} because of ${error}`,
        });
      });
  }
</script>

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
  button {
    font-size: 0.6rem;
  }
  div {
    position: relative;
    height: 100%;
  }
  div::after {
    position: absolute;
    content: "";
    left: calc(50% - 0.5rem);
    bottom: -1.6rem;
    border-top: 1rem solid black;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
  }
</style>

{#if $popupState.isVisible}
  <aside
    bind:this={popupComponent}
    use:setPosition
    transition:fly={{ y: -40, duration: 200 }}>
    <div>
      <h4><strong>{$popupState.data.name}</strong></h4>
      <p>
        <span>latitude:
          {Math.round($popupState.data.latitude * 100000) / 100000}</span>
        <br />
        <span>longitude:
          {Math.round($popupState.data.longitude * 100000) / 100000}</span>
        <br />
        <span>Hier könnte noch mehr Text stehen...</span>
      </p>
      <button on:click={onDeleteLocation}>delete this location</button>
    </div>
  </aside>
{/if}
