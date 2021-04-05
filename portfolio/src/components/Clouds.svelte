<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
</script>

<div class="container">
  <div
    in:fly={{ x: -500, duration: 2000, easing: quintOut }}
    out:fly={{ x: -100, duration: 200, easing: quintOut }}
    class="cloud-1"
  >
    <div class="positioning-helper">
      <div class="circle" />
      <div class="circle" />
      <div class="circle" />
      <div class="circle" />
      <div class="rectangle" />
    </div>
  </div>
  <div
    in:fly={{ x: 200, duration: 2000, easing: quintOut }}
    out:fly={{ x: 30, duration: 200, easing: quintOut }}
    class="cloud-2"
  >
    <div class="positioning-helper">
      <div class="circle" />
      <div class="circle" />
      <div class="circle" />
      <div class="circle" />
      <div class="rectangle" />
    </div>
  </div>
  <div
    in:fly={{ x: 500, duration: 2000, easing: quintOut }}
    out:fly={{ x: 100, duration: 200, easing: quintOut }}
    class="cloud-3"
  >
    <div class="positioning-helper">
      <div class="circle" />
      <div class="circle" />
      <div class="circle" />
      <div class="circle" />
      <div class="rectangle" />
    </div>
  </div>
</div>

<style>
  .container {
    position: relative;
    height: 450px;
    width: 850px;
    margin: 0 auto;
  }

  div[class^='cloud'] {
    opacity: 0.75;
    position: absolute;
    height: 300px;
    width: 500px;
  }

  .cloud-1 .rectangle,
  .cloud-1 .circle {
    background-color: var(--light-2);
  }
  .cloud-2 .rectangle,
  .cloud-2 .circle {
    background-color: var(--light-3);
  }
  .cloud-3 .rectangle,
  .cloud-3 .circle {
    background-color: var(--light-4);
  }
  .cloud-1 {
    top: 150px;
    left: 0px;
    z-index: 3;
  }
  .cloud-2 {
    top: 0px;
    left: 200px;
    z-index: 1;
  }
  .cloud-3 {
    top: 100px;
    left: 350px;
    z-index: 2;
  }

  .positioning-helper {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .circle,
  .rectangle {
    position: absolute;
  }
  .circle {
    height: 200px;
    width: 200px;
    border-radius: 100px;
  }
  .circle:nth-child(1) {
    top: 100px;
    left: 0px;
  }
  .circle:nth-child(2) {
    top: 100px;
    right: 0px;
  }
  .circle:nth-child(3) {
    top: 0px;
    right: 100px;
  }
  .circle:nth-child(4) {
    top: 0px;
    left: 100px;
  }
  .rectangle {
    top: 150px;
    left: 100px;
    width: 300px;
    height: 150px;
  }
</style>
