<script>
	import Map from "./_Map.svelte";
	import { onMount } from "svelte";
	import firebase from "firebase/app";

	let latitude, longitude, name, places;

	onMount(() => {
		firebase
			.firestore()
			.collection("route")
			.get()
			.then((documentSnapshot) => {
				let res = [];
				documentSnapshot.forEach(doc => {
					const { latitude, longitude, name } = doc.data();
					res.push({ latitude, longitude, name, id: doc.id});
				})
				places = res;
				console.log(places);
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
	//let places = [
		//{
			//latitude: 48.940226777691045,
			//longitude: 10.211456566493025,
			//name: "Kreuzung 1",
		//},
		//{
			//latitude: 48.93838948801142,
			//longitude: 10.215421225171816,
			//name: "Kreuzung 2",
		//},
		//{
			//latitude: 48.945007852237914,
			//longitude: 10.209633169165038,
			//name: "Location 3",
		//},
	//];
</script>

		{#if places}
<Map {places} />
	{/if}

<input type="text" bind:value={latitude} />
<input type="text" bind:value={longitude} />
<input type="text" bind:value={name} />
<button on:click={onStoreNewPlace}>store</button>
