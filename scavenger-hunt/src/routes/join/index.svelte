<script>
    import { onMount } from 'svelte';
    import { getUserId } from '../../stores/user';
    import RouteHeader from '../../components/RouteHeader.svelte';

    let userId;
    onMount(() => {
        userId = getUserId();
    });
</script>

<RouteHeader title="Route beitreten"/>
{#if $userId}
    <h1>Meiner eigenen Route beitreten</h1>
    <a href="/join/{$userId}">beitreten</a>
{/if}
