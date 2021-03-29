<script>
	import { onMount } from "svelte";
	import { writable, derived } from "svelte/store";
	import { getMyCoords } from "../../stores/my-coords";
	import { getLogger } from "../../stores/debug-logger";
	import { getMap } from "../../stores/map";

	import Popup from "./_Popup.svelte";
	import Location from "./_Location.svelte";
	import User from "./_User.svelte";

	// store for popup state
	const { subscribe: subscribePopup, update: updatePopup } = writable({
		x: 0,
		y: 0,
		isVisible: false,
		data: {},
	});
	let popupState = {
		subscribe: subscribePopup,
		show: ({ x, y, data }) =>
			updatePopup(() => ({ x, y, isVisible: true, data })),
		hide: () => updatePopup(() => ({ x: 0, y: 0, isVisible: false, data: {} })),
	};
	// store for rotation
	const { subscribe: subscribeRotation, update: updateRotation } = writable(0);
	let mapRotation = {
		subscribe: subscribeRotation,
		setRotation: (newRotation) => updateRotation(() => newRotation),
	};
	// external stores
	let myCoords, logger, map;

	// places loaded from firestore
	export let places;

	onMount(() => {
		myCoords = getMyCoords();
		logger = getLogger();
		map = getMap();
		// merge all the stores to update when data changes
		// the value of the store is just a random number because the value has to change to cause an emit
		const notifier = derived([places, myCoords], () => Math.random());
		notifier.subscribe(() => {
			const locations = [...$places];
			if ($myCoords) {
				locations.push($myCoords);
			}
			map.updateCoordSystemFromLocations(locations);
		});
	});

	function rotationGestureListener(node) {
		node.style.transform = `rotate(${$mapRotation}deg)`;
		let rotationStart, lastMeasurement;
		const mc = new Hammer.Manager(node, {
			recognizers: [[Hammer.Rotate]],
		});
		mc.on("rotatestart", (event) => {
			rotationStart = Math.floor(event.rotation);
		});
		mc.on("rotatemove", (event) => {
			let delta;
			if (lastMeasurement) {
				delta = Math.floor(event.rotation) - lastMeasurement;
				if (delta < 20 && delta > -20) {
					const newRoatation = $mapRotation + delta;
					mapRotation.setRotation(newRoatation % 360);
				}
			}
			lastMeasurement = Math.floor(event.rotation);
			node.style.transform = `rotate(${$mapRotation}deg)`;
		});
		mc.on("rotateend", (event) => {
			let delta = Math.floor(event.rotation) - rotationStart;
			logger.log({
				logLevel: "log",
				message: `rotated map ${delta}° to ${$mapRotation}°`,
			});
		});
	}
</script>

<style>
	div {
		width: 100%;
		overflow: hidden;
		border: 1px solid #c6e4f2;
		border-radius: 0.6rem;
		background-color: white;
		position: relative;
	}
	#overlay {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>

<div>
	{#if $map}
		<svg
			viewBox="0 0 {$map.outerSize} {$map.outerSize}"
			xmlns="http://www.w3.org/2000/svg"
			id="overlay">
			<line
				x1={($map.outerSize - $map.meterLengthOnMap) / 2}
				y1={$map.outerSize - 0.3 * $map.padding - 2}
				x2={($map.outerSize - $map.meterLengthOnMap) / 2}
				y2={$map.outerSize - 0.3 * $map.padding + 2}
				stroke="black" />
			<line
				x1={($map.outerSize - $map.meterLengthOnMap) / 2}
				y1={$map.outerSize - 0.3 * $map.padding}
				x2={$map.outerSize - ($map.outerSize - $map.meterLengthOnMap) / 2}
				y2={$map.outerSize - 0.3 * $map.padding}
				stroke="black" />
			<text
				x={$map.outerSize / 2}
				y={$map.outerSize - 0.3 * $map.padding + 10}
				text-anchor="middle"
				font-size="10">
				1km
			</text>
			<line
				x1={$map.outerSize - ($map.outerSize - $map.meterLengthOnMap) / 2}
				y1={$map.outerSize - 0.3 * $map.padding - 2}
				x2={$map.outerSize - ($map.outerSize - $map.meterLengthOnMap) / 2}
				y2={$map.outerSize - 0.3 * $map.padding + 2}
				stroke="black" />
		</svg>
		<svg
			viewBox="0 0 {$map.outerSize} {$map.outerSize}"
			xmlns="http://www.w3.org/2000/svg"
			use:rotationGestureListener>
			<defs>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 0 24 24"
					width="24"
					id="location"><path d="M0 0h24v24H0z" fill="none" />
					<path
						d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					enable-background="new 0 0 24 24"
					height="24"
					viewBox="0 0 24 24"
					width="24"
					id="user"><g>
						<rect fill="none" height="24" width="24" />
					</g>
					<g>
						<g>
							<g>
								<path
									d="M12,2C8.14,2,5,5.14,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.14,15.86,2,12,2z M12,4c1.1,0,2,0.9,2,2c0,1.11-0.9,2-2,2 s-2-0.89-2-2C10,4.9,10.9,4,12,4z M12,14c-1.67,0-3.14-0.85-4-2.15c0.02-1.32,2.67-2.05,4-2.05s3.98,0.73,4,2.05 C15.14,13.15,13.67,14,12,14z" />
							</g>
						</g>
					</g></svg>
			</defs>
			<g>
				{#each $places as place}
					<Location {place} {mapRotation} {popupState} />
				{/each}
				<User {mapRotation} />
			</g>
		</svg>
	{/if}
</div>
<Popup {popupState} />
