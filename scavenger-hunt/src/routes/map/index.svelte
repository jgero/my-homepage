<script>
	// HINT: when top is north then latitude is the y-axis and longitude the x-axis
	import { onMount } from "svelte";
	import { getMyCoords } from "../../stores/my-coords";

	let places = [
		{
			latitude: 48.940226777691045,
			longitude: 10.211456566493025,
			name: "Kreuzung 1",
		},
		{
			latitude: 48.93838948801142,
			longitude: 10.215421225171816,
			name: "Kreuzung 2",
		},
		{
			latitude: 48.945007852237914, longitude: 10.209633169165038, name: "Location 3"
		}
		];
	let markers = [];

	let xOffset, xSpan, yOffset, ySpan;
	let myCoords;

	$: {
		// has to be declared as reactive to trigger when a place changes
		// sorted arrays have to be spread to prevent overwriting
		const latitudeAscending = [
			...places.sort((a, b) => a.latitude - b.latitude),
		];
		const longitudeAscending = [
			...places.sort((a, b) => a.longitude - b.longitude),
		];

		xOffset = longitudeAscending[0].longitude;
		xSpan =
			longitudeAscending[longitudeAscending.length - 1].longitude -
			longitudeAscending[0].longitude;
		yOffset = latitudeAscending[0].latitude;
		ySpan =
			latitudeAscending[latitudeAscending.length - 1].latitude -
			latitudeAscending[0].latitude;
		markers = places.map(place => {
		const yPosition = (place.latitude - yOffset) / ySpan;
		const xPosition = (place.longitude - xOffset) / xSpan;
			return {
				x: xPosition * 300 + 25,
				y: yPosition * 300 + 25,
				name: place.name
			};
		})
	}

	onMount(() => {
		myCoords = getMyCoords();
		myCoords.subscribe((coords) => {
			const existingMeEntryIndex = places.findIndex(place => place.name === "ME");
			if (!coords) {
				if (existingMeEntryIndex >= 0) {
				places.splice(existingMeEntryIndex, 1);
					places = [...places];
				}
				return;
			}
			const { latitude, longitude } = coords;
			if (existingMeEntryIndex >= 0) {
				places[existingMeEntryIndex] = { latitude, longitude, name: "ME" };
			} else {
				places = [...places, { latitude, longitude, name: "ME" }];
			}
		})
	});
</script>

{#if xOffset && xSpan && yOffset && ySpan}
	<svg viewBox="0 0 350 350">
		{#each markers as marker}
			<circle r="10" cy={marker.y} cx={marker.x}/>
			<text x={marker.x} y={marker.y}>{marker.name}</text>
		{/each}
	</svg>
{/if}
