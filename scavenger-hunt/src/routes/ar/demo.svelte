<script>
	import { onMount } from "svelte";
	onMount(() => {
			console.log("I am alive!");
			// 48.937930742030865, 10.209591656625395
		setInterval(() => {
			const distanceMsg = document.querySelector('[gps-entity-place]').getAttribute('distanceMsg');
			console.log("measuring: ");
			console.log(distanceMsg);
		}, 3000);
	});
	// <a-box material="color: yellow" gps-entity-place="latitude: <your-latitude>; longitude: <your-longitude>"/>
</script>

<a-scene
	vr-mode-ui="enabled: true"
	embedded
	arjs="sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: true;">
	<a-camera gps-camera rotation-reader />
	<a-box material="color: yellow"  gps-entity-place="latitude: 48.938411863997246; longitude: 10.209873807386952"/>
</a-scene>
