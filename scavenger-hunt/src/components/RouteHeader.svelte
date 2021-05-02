<script>
    import { onMount } from 'svelte';
    import { getMyCoords } from '../stores/my-coords';

    export let title;
    let myCoords;

    onMount(() => {
        myCoords = getMyCoords();
    });

    function toggleCoordFetching() {
        if ($myCoords) {
            myCoords.reset();
        } else {
            myCoords.startInterval();
        }
    }
</script>

<header>
    <h1>{title}</h1>
    <div class="spacer" />
    <a href="/" class="material-icons up">home</a>
    <button
        class:down={$myCoords}
        class:up={!$myCoords}
        class="material-icons"
        on:click={toggleCoordFetching}
        >{$myCoords ? 'gps_fixed' : 'gps_off'}</button
    >
</header>

<style>
    header {
        background-color: var(--primary);
        display: flex;
        align-items: center;
        height: 4rem;
        padding: 0 1rem;
    }
    h1 {
        font-size: 1rem;
        font-weight: normal;
        color: var(--primary-contrast);
        margin: 0;
        height: min-content;
    }
    .spacer {
        flex: 1;
    }
    a,
    button {
        text-decoration: none;
        outline: none;
        border: none;
        background-color: var(--primary);
        color: var(--primary-contrast);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;
        padding: 0;
        margin: 0 0 0 0.7rem;
        border-radius: 50%;
        cursor: pointer;
    }
    a.up,
    button.up {
        box-shadow: -2px -2px 4px 0px #ffffff25, 2px 2px 4px 0px #00000025;
    }
    button.down {
        box-shadow: inset -2px -2px 4px 0px #ffffff25,
            inset 2px 2px 4px 0px #00000025;
    }
</style>
