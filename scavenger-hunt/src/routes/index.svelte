<script>
	import { getMyCoords } from "../stores/my-coords";
	import { onMount } from "svelte";
	let myCoords;

	onMount(() => {
		myCoords = getMyCoords();
	});

	function getCoordinates() {
		navigator.geolocation.getCurrentPosition((position) => {
			myCoords.updateCoords(position.coords);
		});
	}
</script>

<h1>scavenger hunt!</h1>

<button on:click={getCoordinates}>get my coordinates</button>

{#if $myCoords}
	<h2>my coordiantes are:</h2>
	<p>latitude: {$myCoords.latitude}</p>
	<p>longitude: {$myCoords.longitude}</p>
	<p>accuracy: {$myCoords.accuracy} m</p>
	<p>heading: {$myCoords.heading}</p>
{/if}
