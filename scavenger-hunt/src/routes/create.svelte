<script>
    import firebase from 'firebase/app';
    import { onMount, onDestroy } from 'svelte';

    import RouteHeader from "../components/RouteHeader.svelte";
    import { getLogger } from '../stores/debug-logger';
    import { getMyCoords } from '../stores/my-coords';
    import { getUserId } from '../stores/user';

    let logger, myCoords, userId;
    let route, latitude, longitude, name;

    let unsubSnapshotListener;
    let unsubscribe;

    onMount(() => {
        logger = getLogger();
        myCoords = getMyCoords();
        userId = getUserId();

        unsubscribe = userId.subscribe((uid) => {
            if (!uid) {
                return;
            }
            unsubSnapshotListener = firebase
                .firestore()
                .collection('routes')
                .doc(uid)
                .onSnapshot(
                    (snapshot) => {
                        if (snapshot.empty) {
                            logger.log({
                                logLevel: 'log',
                                message: 'snapshot of my route is empty',
                            });
                            route = { lastEdit: new Date(), places: [] };
                            return;
                        }
                        logger.log({
                            logLevel: 'log',
                            message: `route of user ${uid} loaded`,
                        });
                        route = snapshot.data();
                    },
                    (error) => {
                        logger.log({
                            logLevel: 'error',
                            message: `could not fetch route data: ${JSON.stringify(
                                error
                            )}`,
                        });
                    }
                );
        });
    });

    async function addCurrentLocation() {
        if (latitude && longitude && name) {
            route.lastEdit = new Date();
            route.places.push({
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                name,
            });
            await firebase
                .firestore()
                .collection('routes')
                .doc($userId)
                .set(route);
        } else {
            logger.log({
                logLevel: 'error',
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
        if (unsubscribe) {
            unsubscribe();
        }
    });
</script>

<RouteHeader title='Route bearbeiten'/>

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

{#if route && route.places}
<ul>
    {#each route.places as place}
        <li>{place.name}</li>
    {/each}
</ul>
{/if}

