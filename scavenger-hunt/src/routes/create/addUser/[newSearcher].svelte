<script context="module">
    export async function preload({ params }) {
        return { newSearcher: params.newSearcher };
    }
</script>

<script>
import firebase from 'firebase/app';
import { onDestroy, onMount } from 'svelte';
import { getUserId } from "../../../stores/user.js";

export let newSearcher;

let userId;
let isLoading = true;

let unsubUser;

onMount(() => {
    userId = getUserId();
    unsubUser = userId.subscribe(addUser);
});

onDestroy(() => {
    if (unsubUser) {
        unsubUser();
    }
});

async function addUser(routeOwnerId) {
    if (!newSearcher || !routeOwnerId) {
        return;
    }
    // get the route
    const doc = await firebase.firestore().collection("routes").doc(routeOwnerId).get();
    let route = doc.data();
    // add the new searcher
    if (route.searchers && Array.isArray( route.searchers )) {
        route.searchers.push(newSearcher);
    } else {
        route.searchers = [newSearcher];
    }
    // update the route
    await firebase.firestore().collection("routes").doc(routeOwnerId).set(route);
    isLoading = false;
}
</script>

{#if isLoading}
{#if !$userId || !newSearcher}
   <h1>loading...</h1>
{:else}
    <h1>Adding user {$userId} to route</h1>
{/if}

{:else}
    <h1>User {$userId} added to route</h1>
    <a href="/create">OK</a> 
{/if}
