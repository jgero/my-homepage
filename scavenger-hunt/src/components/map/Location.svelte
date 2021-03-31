<script>
	import { getMap, getPositionOnMap } from "../../stores/map";
	import { getMyCoords } from "../../stores/my-coords";
	import { cubicOut } from "svelte/easing";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	export let place;
	export let mapRotation;
	export let popupState;

	let map, myCoords;

	onMount(() => {
		map = getMap();
		myCoords = getMyCoords();
	});

	function registerMarker(node) {
		// position of the marker has to be offset a bit so the tip of the marker points to the exact location on the map
		const unsubscribeMap = map.subscribe(() => {
			const absolutePosition = getPositionOnMap($map, place);
			node.setAttribute("x", absolutePosition.x - 12);
			node.setAttribute("y", absolutePosition.y - 24);
		});
		const unsubscribeRotation = mapRotation.subscribe((rotation) => {
			const absolutePosition = getPositionOnMap($map, place);
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

	function drawDistanceLine(node) {
		const unsubscribeMap = map.subscribe(() => {
			if ($myCoords) {
				const { x: x1, y: y1 } = getPositionOnMap($map, place);
				const { x: x2, y: y2 } = getPositionOnMap($map, $myCoords);
				node.setAttribute("x1", x1);
				node.setAttribute("y1", y1);
				node.setAttribute("x2", x2);
				node.setAttribute("y2", y2);
			}
		});
		return {
			destroy() {
				unsubscribeMap();
			},
		};
	}

	function openPopup(event, place) {
		if ($popupState.isVisible) {
			popupState.hide();
			setTimeout(() => {
				const x = event.clientX;
				const y = event.clientY;
				popupState.show({ x, y, data: place });
			}, 300);
		} else {
			const x = event.clientX;
			const y = event.clientY;
			popupState.show({ x, y, data: place });
		}
	}

	function dash(node, { duration }) {
		return {
			duration,
			css: (t) => {
				const eased = cubicOut(t);
				return `
 						stroke-dasharray: ${Math.ceil(node.getTotalLength())}px;
 						stroke-dashoffset: ${Math.ceil(node.getTotalLength()) * (eased - 1)};
					`;
			},
		};
	}
</script>

<style>
	.location {
		transition: all 0.5s ease;
		fill: #8c7dd7;
	}
	line {
		stroke: #8c7dd7;
	}
</style>

{#if $map}
	<use
		class="location"
		use:registerMarker
		transition:fly={{ y: -40, duration: 200 }}
		on:click|stopPropagation={(event) => openPopup(event, place)}
		xlink:href="#location" />
	{#if $popupState.data === place}
		<line use:drawDistanceLine transition:dash={{ duration: 200 }} />
	{/if}
{/if}
