<script context="module">
  export async function preload({ params }) {
    return { userId: params.userId };
  }
</script>

<script>
  import firebase from "firebase/app";
  import { onMount, onDestroy } from "svelte";
  import { getLogger } from "../../../stores/debug-logger";
  import { getMyCoords } from "../../../stores/my-coords";

  export let userId;

  let logger, myCoords;
  let route, latitude, longitude, name;
  let unsubSnapshotListener;

  onMount(() => {
    logger = getLogger();
    myCoords = getMyCoords();
    unsubSnapshotListener = firebase
      .firestore()
      .collection("routes")
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            logger.log({ logLevel: "log", message: "snapshot is empty" });
            route = { lastEdit: new Date(), places: [] };
            return;
          }
          snapshot.forEach((doc) => {
            logger.log({
              logLevel: "log",
              message: `route of user ${userId} loaded`,
            });
            route = doc.data();
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

  async function addCurrentLocation() {
    if (latitude && longitude && name) {
      route.lastEdit = new Date();
      route.places.push({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        name,
      });
      await firebase.firestore().collection("routes").doc(userId).set(route);
    } else {
      logger.log({
        logLevel: "error",
        message: `did not send data because of missing fields`,
      });
    }
  }

  function useCurrentLocation() {
    latitude = $myCoords.latitude;
    longitude = $myCoords.longitude;
  }

  onDestroy(() => {
    if (unsubSnapshotListener) {
      unsubSnapshotListener();
    }
  });
</script>

<h1>hello {userId}</h1>

<label for="latitude">latitude</label>
<input id="latitude" type="text" bind:value={latitude} />
<label for="longitude">longitude</label>
<input id="longitude" type="text" bind:value={longitude} />
<label for="name">name</label>
<input id="name" type="text" bind:value={name} />
<button on:click={addCurrentLocation}>SAVE</button>
{#if $myCoords}
  <button on:click={useCurrentLocation}>USE MY LOCATION</button>
{/if}

<p>{JSON.stringify(route)}</p>
