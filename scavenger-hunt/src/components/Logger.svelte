<script>
	import { getLogger } from "../stores/debug-logger";

	const logger = getLogger();

	function getIconForLogLevel(node) {
		const logLevel = node.parentElement.className;
		switch (logLevel) {
			case "log":
				node.textContent = "list";
				return;
			case "warning":
				node.textContent = "info";
				return;
			case "error":
				node.textContent = "warning";
				return;
		}
	}

	function scrollNewEntryIntoView(node) {
		node.scrollIntoView();
	}
</script>

<style>
	section {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		max-height: 30vh;
		overflow: scroll;
	}
	table {
		padding: 0.5rem;
	}

	td:first-child {
		font-family: "Material Icons";
		font-size: 1.5rem;
	}
</style>

<section>
	<table>
		{#each $logger as item}
		<tr class={item.logLevel} use:scrollNewEntryIntoView>
				<td use:getIconForLogLevel />
				<td>{item.message}</td>
				<td>
					<time
						datetime={item.timestamp}>{item.timestamp.getHours()}:{item.timestamp.getMinutes()}:{item.timestamp.getSeconds()}</time>
				</td>
			</tr>
		{/each}
	</table>
</section>
