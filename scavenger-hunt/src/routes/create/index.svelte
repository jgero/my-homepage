<script>
  import { onMount } from 'svelte';
  import { getUserId } from '../../stores/user';

  let userId;
  onMount(() => {
    userId = getUserId();
  });
</script>

{#if $userId}
  <h1>Meine eigene Route bearbeiten</h1>
  <a href="/create/{$userId}">bearbeiten</a>
{/if}
