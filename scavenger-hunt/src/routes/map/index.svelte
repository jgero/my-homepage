<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import firebase from "firebase/app";
	import Map from "./_Map.svelte";

	let latitude, longitude, name, places;
	// create store for the active places in the map
	const { subscribe, update } = writable([]);
	places = {
		subscribe,
		set: (newPlaces) => update(() => newPlaces),
	};

	onMount(() => {
		firebase
			.firestore()
			.collection("route")
			.onSnapshot((documentSnapshot) => {
				let res = [];
				documentSnapshot.forEach((doc) => {
					const { latitude, longitude, name } = doc.data();
					res.push({ latitude, longitude, name, id: doc.id });
				});
				places.set(res);
			});
	});

	function onStoreNewPlace() {
		firebase
			.firestore()
			.collection("route")
			.add({ latitude, longitude, name })
			.then((res) => {
				console.log("the result was: " + res);
			});
	}
</script>

<h1>Schatzkarte</h1>
{#if $places.length > 0}
	<Map {places} />
{/if}

<input type="text" bind:value={latitude} />
<input type="text" bind:value={longitude} />
<input type="text" bind:value={name} />
<button on:click={onStoreNewPlace}>store</button>
