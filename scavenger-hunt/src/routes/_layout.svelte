<script>
	import Nav from "../components/Nav.svelte";
	import Logger from "../components/Logger.svelte";
	import { onMount } from "svelte";
	import { getLogger } from "../stores/debug-logger";

	export let segment;

	let userId;
	let logger;

	onMount(() => {
		logger = getLogger();
		let id = window.localStorage.getItem("userId");
		if (id) {
			// the user already has an id
			userId = id;
			logger.log({
				logLevel: "log",
				message: `restored userId ${userId} from localStorage`,
			});
		} else {
			id = Math.random().toString().substring(2, 12);
			userId = id;
			window.localStorage.setItem("userId", userId);
			logger.log({ logLevel: "log", message: `created new userId ${userId}` });
		}
	});
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment} />

<main>
	<slot />
</main>
<Logger />
