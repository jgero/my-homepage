<script>
  import { onMount } from 'svelte';
  import { getUserId } from '../../stores/user';

  let userId;
  onMount(() => {
    userId = getUserId();
  });
</script>

{#if $userId}
  <h1>Meiner eigenen Route beitreten</h1>
  <a href="/join/{$userId}">beitreten</a>
{/if}
