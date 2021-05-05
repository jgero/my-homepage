<script>
    import firebase from 'firebase/app';
    import { onMount, onDestroy } from 'svelte';

    import RouteHeader from '../components/RouteHeader.svelte';
    import { getLogger } from '../stores/debug-logger';
    import { getMyCoords } from '../stores/my-coords';
    import { getUserId } from '../stores/user';

    let logger, myCoords, userId;
    let route, selectedPlace, form;

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

    async function savePlace() {
        const { name, latitude, longitude, id } = selectedPlace;
        if (form.checkValidity()) {
            route.lastEdit = new Date();
            let index = route.places.findIndex((el) => el.id === id);
            if (index >= 0) {
                route.places[index] = {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    name,
                    id,
                };
            } else {
                route.places.push({
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    name,
                    id
                });
            }
            await firebase
                .firestore()
                .collection('routes')
                .doc($userId)
                .set(route);
            logger.log({
                logLevel: 'log',
                message: `route updated`,
            });
        } else {
            logger.log({
                logLevel: 'error',
                message: `invalid fields`,
            });
        }
    }

    async function deletePlace(place) {
        const { id } = place;
        route.places = route.places.filter(el => el.id !== id);
        route.lastEdit = new Date();
        await firebase
            .firestore()
            .collection('routes')
            .doc($userId)
            .set(route);
        logger.log({
            logLevel: 'log',
            message: `route updated`,
        });
    }

    function useCurrentLocation() {
        selectedPlace.latitude = $myCoords.latitude;
        selectedPlace.longitude = $myCoords.longitude;
    }

    function setupNewLocation() {
        selectedPlace = {
            name: '',
            id: Math.random().toString().substr(2, 12),
        };
        if ($myCoords) {
            useCurrentLocation();
        } else {
            selectedPlace.latitude = '';
            selectedPlace.longitude = '';
        }
        console.log(selectedPlace);
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

<RouteHeader title="Route bearbeiten" />

<main>
    {#if selectedPlace}
        <form on:submit|preventDefault={savePlace} bind:this={form}>
            <input
                id="name"
                type="text"
                bind:value={selectedPlace.name}
                required
                pattern="^[0-9a-zA-ZäöüÄÖÜß _-]*$"
            />
            <label for="latitude">latitude</label>
            <input
                id="latitude"
                type="text"
                bind:value={selectedPlace.latitude}
                required
                pattern="^[0-9]*\.[0-9]*$"
            />
            <label for="longitude">longitude</label>
            <input
                id="longitude"
                type="text"
                bind:value={selectedPlace.longitude}
                required
                pattern="^[0-9]*\.[0-9]*$"
            />
            <button type="submit">SAVE</button>
            {#if $myCoords}
                <button type="button" on:click={useCurrentLocation}
                    >USE MY LOCATION</button
                >
            {/if}
        </form>
    {/if}
</main>

<button on:click={setupNewLocation}>NEW</button>

{#if route && route.places}
    <ul>
        {#each route.places as place}
            <li on:click={() => (selectedPlace = place)}>{place.name}
                <button on:click={() => deletePlace(place)}>DELETE</button>

            </li>
        {/each}
    </ul>
{/if}

<style>
    form {
        display: grid;
        grid-template-rows: 2fr 1fr 1fr;
        grid-template-columns: 25% 75%;
        grid-template-areas: 'h h' 'latn latc' 'lonn lonc';
    }
    form #name {
        font-size: 2rem;
        grid-area: h;
    }
</style>
