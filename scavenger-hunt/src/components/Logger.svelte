<script>
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
	import { getLogger } from "../stores/debug-logger";

	const logger = getLogger();
	let isHidden = false;

	function getIconForLogLevel(node) {
		const logLevel = node.parentElement.className;
		switch (logLevel) {
			case "log":
				node.textContent = "";
				return;
			case "warning":
				node.textContent = "info";
				return;
			case "error":
				node.textContent = "warning";
				return;
		}
	}

	function getTimestampString(t) {
		return `${t
			.getHours()
			.toString()
			.padStart(2, "0")}:${t
			.getMinutes()
			.toString()
			.padStart(2, "0")}:${t.getSeconds().toString().padStart(2, "0")}`;
	}

	function scrollNewEntryIntoView(node) {
		node.scrollIntoView();
	}

	function toggleHidden() {
		isHidden = !isHidden;
	}
</script>

<style>
	section {
		position: fixed;
		bottom: 0;
		left: 0;
		margin: 0 0.5rem;
		width: calc(100% - 2 * 0.5rem);
		max-height: 30vh;
		overflow: scroll;
		background-color: white;
		border-radius: 0.5rem 0.5rem 0 0;
	}
	button {
		font-family: "Material Icons";
		border: none;
		background-color: white;
		outline: none;
		font-size: 1.5rem;
		width: 100%;
		padding: 0;
		border-radius: 0.5rem;
		position: sticky;
		top: 0;
	}
	table {
		display: block;
		padding: 0.2rem;
		width: 100%;
	}
	tr {
		width: 100%;
		display: flex;
	}
	tr:not(:last-child) {
		border-bottom: 1px solid lightgrey;
	}

	td:first-child {
		font-family: "Material Icons";
		font-size: 1.5rem;
		flex: 0 0 2rem;
	}
	td:nth-child(2) {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		flex: 1;
	}
</style>

<section>
	<button on:click={toggleHidden}>
		{#if isHidden}keyboard_arrow_up{:else}keyboard_arrow_down{/if}
	</button>
	{#if !isHidden}
		<table>
			{#each $logger as item (item.timestamp.toString())}
				<tr
					class={item.logLevel}
					use:scrollNewEntryIntoView
					animate:flip={{ duration: 200 }}
					in:fly={{ y: 40, duration: 200 }}>
					<td use:getIconForLogLevel />
					<td>{item.message}</td>
					<td>
						<time
							datetime={item.timestamp}>{getTimestampString(item.timestamp)}</time>
					</td>
				</tr>
			{/each}
		</table>
	{/if}
</section>
