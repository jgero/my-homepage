<script>
  import { onMount } from "svelte";
  export let popupState;
  let popupComponent;

  onMount(() => {
    popupState.subscribe(({ x, y, isVisible }) => {
      popupComponent.style.top = `calc(${y}px - 40vw - 1rem)`;
      popupComponent.style.left = `calc(${x}px - 20vw - 0rem)`;
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
    document.documentElement.removeEventListener("click", onClickOutside);
    popupState.hide();
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
  aside.hidden {
    display: none;
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

<aside
  id="popup"
  bind:this={popupComponent}
  class:hidden={!$popupState.isVisible}>
  <div>
    <span><strong>Popup</strong></span>
    <p>
      There could be some text in the popup. This would probably be something
    </p>
    <button>delete this location</button>
  </div>
</aside>
