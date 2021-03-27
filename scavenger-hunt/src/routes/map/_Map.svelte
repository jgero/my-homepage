<script>
	import { onMount } from "svelte";
	import { writable, derived } from "svelte/store";
	import { getMyCoords } from "../../stores/my-coords";
	import { getLogger } from "../../stores/debug-logger";
	import Popup from "./_Popup.svelte";

	// store for popup state
	const { subscribe, update } = writable({
		x: 0,
		y: 0,
		isVisible: false,
		data: {},
	});
	let popupState = {
		subscribe,
		show: ({ x, y, data }) => update(() => ({ x, y, isVisible: true, data })),
		hide: () => update(() => ({ x: 0, y: 0, isVisible: false, data: {} })),
	};

	// coordinate system dimensions (maybe could change depending on device size?)
	const coordSystemDimensions = {
		innerSize: 200,
		padding: 75,
		getOuterSize: function () {
			return this.innerSize + 2 * this.padding;
		},
	};
	let xOffset, xSpan, yOffset, ySpan;
	let myCoords, logger;
	let mapRotation = 0;

	export let places;

	onMount(() => {
		myCoords = getMyCoords();
		logger = getLogger();
		// merge all the stores to update when data changes
		// the value of the store is just a random number because the value has to change to cause an emit
		const notifier = derived([places, myCoords], () => Math.random());
		notifier.subscribe(() => {
			caclculateCoordSystem();
		});
	});

	function caclculateCoordSystem() {
		const locations = [...$places];
		if ($myCoords) {
			locations.push($myCoords);
		}
		xOffset = Math.min(...locations.map((el) => el.longitude));
		yOffset = Math.min(...locations.map((el) => el.latitude));
		xSpan = Math.max(...locations.map((el) => el.longitude)) - xOffset;
		ySpan = Math.max(...locations.map((el) => el.latitude)) - yOffset;
	}

	function getPositionOnMap(coords) {
		const xPositionPercent = (coords.longitude - xOffset) / xSpan;
		const yPositionPercent = (coords.latitude - yOffset) / ySpan;
		const xPositionAbsolute =
			xPositionPercent * coordSystemDimensions.innerSize +
			coordSystemDimensions.padding;
		const yPositionAbsolute =
			yPositionPercent * coordSystemDimensions.innerSize +
			coordSystemDimensions.padding;
		return {
			x: xPositionAbsolute,
			y: yPositionAbsolute,
		};
	}

	function placeMarkerOnMap(node, coords) {
		const absolutePosition = getPositionOnMap(coords);
		// offset a bit so tip of the marker points to actual position on the map
		node.setAttribute("x", absolutePosition.x - 12);
		node.setAttribute("y", absolutePosition.y - 24);
	}

	function placeUserOnMap(node, coords) {
		const absolutePosition = getPositionOnMap(coords);
		// offset icon so actual point on the map is the center of the icon
		node.setAttribute("x", absolutePosition.x - 12);
		node.setAttribute("y", absolutePosition.y - 12);
	}

	function rotationGestureListener(node) {
		node.style.transform = `rotate(${mapRotation}deg)`;
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
					const newRoatation = mapRotation + delta;
					mapRotation = newRoatation % 360;
					caclculateCoordSystem();
				}
			}
			lastMeasurement = Math.floor(event.rotation);
			node.style.transform = `rotate(${mapRotation}deg)`;
		});
		mc.on("rotateend", (event) => {
			let delta = Math.floor(event.rotation) - rotationStart;
			logger.log({
				logLevel: "log",
				message: `rotated map ${delta}° to ${mapRotation}°`,
			});
		});
	}

	function openPopup(event, place) {
		if ($popupState.isVisible) {
			popupState.hide();
		} else {
			const x = event.clientX;
			const y = event.clientY;
			popupState.show({ x, y, data: place });
		}
	}
</script>

<style>
	div {
		width: 100%;
		overflow: hidden;
	}
</style>

<div>
	{#if xOffset && xSpan && yOffset && ySpan}
		<svg
			viewBox="0 0 {coordSystemDimensions.getOuterSize()} {coordSystemDimensions.getOuterSize()}"
			xmlns="http://www.w3.org/2000/svg"
			id="map"
			use:rotationGestureListener>
			<defs>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 0 24 24"
					width="24"
					id="navigation"><path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					enable-background="new 0 0 24 24"
					height="24"
					viewBox="0 0 24 24"
					width="24"
					id="mode_standby"><g>
						<path d="M0,0h24v24H0V0z" fill="none" />
					</g>
					<g>
						<g>
							<path
								d="M12,2C6.49,2,2,6.49,2,12s4.49,10,10,10s10-4.49,10-10S17.51,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M15,12c0,1.66-1.34,3-3,3s-3-1.34-3-3s1.34-3,3-3S15,10.34,15,12z" />
						</g>
					</g></svg>
			</defs>
			<g>
				{#each $places as place}
					<use
						use:placeMarkerOnMap={place}
						on:click|stopPropagation={(event) => openPopup(event, place)}
						xlink:href="#mode_standby" />
				{/each}
				{#if $myCoords}
					<use use:placeUserOnMap={$myCoords} xlink:href="#navigation" />
				{/if}
			</g>
		</svg>
	{/if}
</div>
<p>{mapRotation} degrees</p>
<Popup {popupState} />
