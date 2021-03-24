<script>
  import { onMount } from "svelte";
  let distanceText = "distance: not initialized";
  onMount(() => {
    console.log("I am alive!");
    setInterval(() => {
      const distanceMsg = document
        .querySelector("[gps-entity-place]")
        .getAttribute("distanceMsg");
      distanceText = `distance: ${distanceMsg}`;
    }, 3000);
  });
</script>

<style>
  h1 {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>

<h1>{distanceText}</h1>

<a-scene
  vr-mode-ui="enabled: false"
  embedded
  arjs="sourceType: webcam; debugUIEnabled: false;">
  <a-text
    value="This content will always face you."
    look-at="[gps-camera]"
    scale="120 120 120"
    gps-entity-place="latitude: 48.938411863997246; longitude: 10.209873807386952;" />
  <a-camera gps-camera rotation-reader />
</a-scene>
