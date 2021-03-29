<script>
	import { getMap, getPositionOnMap } from "../../stores/map";
	import { getMyCoords } from "../../stores/my-coords";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

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
				`rotate(${360 - rotation}, ${absolutePosition.x}, ${
					absolutePosition.y
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

<style>
	.user {
		transition: all 0.5s ease;
		fill: #0f8817;
	}
</style>

{#if $map && $myCoords}
	<use
		class="user"
		use:registerMarker
		transition:fly={{ y: -40, duration: 200 }}
		xlink:href="#user" />
{/if}
