<script>
	import { getLogger } from "../stores/debug-logger";
	const logger = getLogger();
</script>

<section>
	{#each $logger as item}<span>{item.message}</span> <br />{/each}
</section>
