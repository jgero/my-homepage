<script>
	// HINT: when top is north then latitude is the y-axis and longitude the x-axis
	import { onMount } from "svelte";

	import Map from "./_Map.svelte";
	import { getMyCoords } from "../../stores/my-coords";
	import { getLogger } from "../../stores/debug-logger";

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
			latitude: 48.945007852237914,
			longitude: 10.209633169165038,
			name: "Location 3",
		},
	];
</script>

<Map {places} />
