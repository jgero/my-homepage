<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { getLogger } from '../../stores/debug-logger';

    export let popupState;
    let popupComponent, logger;

    onMount(() => {
        logger = getLogger();
        popupState.subscribe(({ isVisible }) => {
            // when setting to visible attach the listener to close the popup
            if (isVisible) {
                document.documentElement.addEventListener(
                    'click',
                    onClickOutside
                );
            }
        });
    });

    function onClickOutside(event) {
        if (!$popupState.isVisible) {
            logger.log({
                logLevel: 'error',
                message:
                    'popup listener still catched click while popup was invisible',
            });
            return;
        }
        // check all parents
        parent = event.target;
        while (parent) {
            // close the popup if clicked inside the map
            if (parent.tagName === 'svg') {
                document.documentElement.removeEventListener(
                    'click',
                    onClickOutside
                );
                popupState.hide();
                return;
            }
            parent = parent.parentNode;
        }
    }

    function setPosition(node) {
        node.style.top = `calc(${$popupState.y}px - 10vw - 1.7rem)`;
        node.style.left = `calc(${$popupState.x}px - 15vw)`;
    }
</script>

{#if $popupState.isVisible}
    <aside
        bind:this={popupComponent}
        use:setPosition
        transition:fly={{ y: -40, duration: 200 }}
    >
        <h4>{$popupState.data.name}</h4>
    </aside>
{/if}

<style>
    aside {
        position: fixed;
        font-size: 0.6rem;
        height: 10vw;
        width: 30vw;
        box-sizing: border-box;
        border-radius: 0.6rem;
        background-color: var(--primary);
    }
    h4 {
        font-weight: bold;
        font-size: 1rem;
        margin: 0;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-contrast);
    }
    h4::after {
        position: absolute;
        content: '';
        left: calc(50% - 0.5rem);
        bottom: -0.5rem;
        border-top: 0.5rem solid var(--primary);
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
    }
</style>
