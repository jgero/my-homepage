<script>
    import { getMap, getPositionOnMap } from '../../stores/map';
    import { getMyCoords } from '../../stores/my-coords';
    import { getDistanceFromLatLonInKm } from '../../utils/coordinates-to-meters';
    import { cubicOut } from 'svelte/easing';
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import { derived } from 'svelte/store';

    export let place;
    export let mapRotation;
    export let popupState;

    let map, myCoords, diffInKm;

    onMount(() => {
        map = getMap();
        myCoords = getMyCoords();
        diffInKm = derived(
            [myCoords, popupState],
            ([$myCoords, $popupState]) => {
                if (!$myCoords || !$popupState.data) {
                    return '??';
                }
                return (
                    Math.round(
                        getDistanceFromLatLonInKm(
                            $myCoords.latitude,
                            $myCoords.longitude,
                            $popupState.data.latitude,
                            $popupState.data.longitude
                        ) * 10
                    ) / 10
                );
            }
        );
    });

    function registerMarker(node) {
        // position of the marker has to be offset a bit so the tip of the marker points to the exact location on the map
        const unsubscribeMap = map.subscribe(() => {
            const absolutePosition = getPositionOnMap($map, place);
            node.setAttribute('x', absolutePosition.x - 12);
            node.setAttribute('y', absolutePosition.y - 24);
        });
        const unsubscribeRotation = mapRotation.subscribe((rotation) => {
            const absolutePosition = getPositionOnMap($map, place);
            node.setAttribute(
                'transform',
                `rotate(${360 - rotation}, ${absolutePosition.x}, ${
                    absolutePosition.y
                })`
            );
        });
        return {
            destroy() {
                unsubscribeMap();
                unsubscribeRotation();
            },
        };
    }

    function drawDistanceLine(node) {
        const unsubscribeMap = map.subscribe(() => {
            if ($myCoords) {
                console.log();
                const circles = node.querySelectorAll('circle');
                const { x: x1, y: y1 } = getPositionOnMap($map, place);
                const { x: x2, y: y2 } = getPositionOnMap($map, $myCoords);
                circles[0].setAttribute('cx', x1);
                circles[0].setAttribute('cy', y1);
                circles[1].setAttribute('cx', x2);
                circles[1].setAttribute('cy', y2);
                const line = node.querySelector('line');
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
            }
        });
        return {
            destroy() {
                unsubscribeMap();
            },
        };
    }

    function openPopup(event, place) {
        if ($popupState.isVisible) {
            popupState.hide();
            setTimeout(() => {
                const x = event.clientX;
                const y = event.clientY;
                popupState.show({ x, y, data: place });
            }, 300);
        } else {
            const x = event.clientX;
            const y = event.clientY;
            popupState.show({ x, y, data: place });
        }
    }

    function dash(node, { duration }) {
        return {
            duration,
            css: (t) => {
                const eased = cubicOut(t);
                return `
 						stroke-dasharray: ${Math.ceil(node.getTotalLength())}px;
 						stroke-dashoffset: ${Math.ceil(node.getTotalLength()) * (eased - 1)};
					`;
            },
        };
    }
    /* alignment-baseline="top" */
</script>

{#if $map}
    {#if $popupState.data === place}
        <g use:drawDistanceLine class="connector">
            <circle r="3" transition:fade={{ duration: 200 }} />
            <circle r="3" transition:fade={{ duration: 200 }} />
            <line id="connection" transition:dash={{ duration: 200 }} />
            <text transition:fade={{ duration: 200 }}>
                <textPath
                    xlink:href="#connection"
                    startOffset="50%"
                    text-anchor="middle">{$diffInKm} km</textPath
                >
            </text>
        </g>
    {/if}
    <use
        class="location"
        class:active={$popupState.data === place}
        use:registerMarker
        transition:fly={{ y: -40, duration: 200 }}
        on:click|stopPropagation={(event) => openPopup(event, place)}
        xlink:href="#location"
    />
{/if}

<style>
    .location {
        transition: all 0.5s ease;
        fill: var(--font-color);
    }
    .location.active {
        fill: var(--primary);
    }
    .connector line {
        stroke: var(--font-color);
    }
    .connector circle {
        fill: var(--font-color);
    }
    .connector text {
        color: var(--font-color);
    }
</style>
