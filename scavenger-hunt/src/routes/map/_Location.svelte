<script>
	import { getMap, getPositionOnMap } from "../../stores/map";
	import { onMount } from "svelte";

	export let place;
	export let mapRotation;
	export let popupState;

	let map;

	onMount(() => {
		map = getMap();
	});

	function registerMarker(node, place) {
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
</script>

{#if $map}
	<use
		use:registerMarker={place}
		on:click|stopPropagation={(event) => openPopup(event, place)}
		xlink:href="#location" />
{/if}
