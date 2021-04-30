<script context="module">
  export async function preload({ params }) {
    return { userId: params.userId };
  }
</script>

<script>
  import firebase from 'firebase/app';
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { getLogger } from '../../stores/debug-logger';

  import RouteHeader from '../../components/RouteHeader.svelte';
  import Map from '../../components/map/Map.svelte';
  import LocationDetails from '../../components/LocationDetails.svelte';
  import Logger from '../../components/Logger.svelte';

  export let userId;

  let logger;
  const places = writable([]);
  let unsubSnapshotListener;

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

  onMount(() => {
    logger = getLogger();
    unsubSnapshotListener = firebase
      .firestore()
      .collection('routes')
      .doc(userId)
      .onSnapshot(
        (doc) => {
          if (!doc.exists) {
            logger.log({
              logLevel: 'log',
              message: 'snapshot is empty',
            });
            return;
          }
          logger.log({
            logLevel: 'log',
            message: `route of user ${userId} loaded`,
          });
          places.update(() => doc.data().places);
        },
        (error) => {
          logger.log({
            logLevel: 'error',
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

<RouteHeader title={'Route von Max Mustermann'} />
<main>
  <Map {places} {popupState} />
  {#if $popupState.isVisible}
    <LocationDetails location={$popupState.data} />
  {/if}
</main>
<Logger />

<style>
  main {
    width: 100%;
    overflow: hidden;
    padding: 1rem;
    box-sizing: border-box;
  }
</style>
