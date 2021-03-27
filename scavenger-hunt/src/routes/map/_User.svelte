<script>
	import { getMap, getPositionOnMap } from "../../stores/map";
	import { getMyCoords } from "../../stores/my-coords";
	import { onMount } from "svelte";

	export let mapRotation;

	let map, myCoords;

	onMount(() => {
		map = getMap();
		myCoords = getMyCoords();
	});

	function registerMarker(node) {
		// position of the marker has to be offset a bit so the tip of the marker points to the exact location on the map
		const unsubscribeMap = map.subscribe(() => {
			const coords = $myCoords;
			if (coords) {
				const absolutePosition = getPositionOnMap($map, coords);
				node.setAttribute("x", absolutePosition.x - 12);
				node.setAttribute("y", absolutePosition.y - 24);
			}
		});
		const unsubscribeRotation = mapRotation.subscribe((rotation) => {
			const absolutePosition = getPositionOnMap($map, $myCoords);
			node.setAttribute(
				"transform",
				`rotate(${360 - rotation}, ${absolutePosition.x - 12}, ${
					absolutePosition.y - 24
				})`
			);
		});
		return {
			destroy() {
				unsubscribeMap();
				unsubscribeRotation();
			},
		};
	}
</script>

{#if $map && $myCoords}
	<use use:registerMarker xlink:href="#user" />
{/if}
