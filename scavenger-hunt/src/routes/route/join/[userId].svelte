<script context="module">
	export async function preload({ params }) {
		return { userId: params.userId };
	}
</script>

<script>
	import firebase from "firebase/app";
	import { onMount, onDestroy } from "svelte";
	import { writable } from "svelte/store";
	import { getLogger } from "../../../stores/debug-logger";

	import Map from "../../../components/map/Map.svelte";

	export let userId;

	let logger;
	const places = writable([]);
	let unsubSnapshotListener;

	onMount(() => {
		logger = getLogger();
		unsubSnapshotListener = firebase
			.firestore()
			.collection("routes")
			.onSnapshot(
				(snapshot) => {
					if (snapshot.empty) {
						logger.log({ logLevel: "log", message: "snapshot is empty" });
						return;
					}
					snapshot.forEach((doc) => {
						logger.log({
							logLevel: "log",
							message: `route of user ${userId} loaded`,
						});
						places.update(() => doc.data().places);
					});
				},
				(error) => {
					logger.log({
						logLevel: "error",
						message: `could not fetch route data: ${JSON.stringify(error)}`,
					});
				}
			);
	});

	onDestroy(() => {
		if (unsubSnapshotListener) {
			unsubSnapshotListener();
		}
	});
</script>

<Map {places} />
