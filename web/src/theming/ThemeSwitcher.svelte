<script>
	import { themeNameStore, theme } from './colors.js';

	function toggleTheme() {
		if ($themeNameStore === 'light') {
			theme.select('dark');
		} else {
			theme.select('light');
		}
	}
</script>

<span on:click={toggleTheme} class:toggled={$themeNameStore === 'light'} />

<style>
	span {
		display: block;
		cursor: pointer;
		position: relative;
		font-size: 1.5rem;
		width: 2.5em;
		height: 1em;
		background-color: var(--background);
		border: 1px solid var(--font);
		border-radius: 0.5em;
		margin: 1rem;
	}
	span::before {
		position: absolute;
		top: 0.1em;
		left: 0.1em;
		content: '';
		height: 0.8em;
		width: 0.8em;
		border-radius: 0.4em;
		background-color: var(--primary);
		transition: left ease-in 0.2s;
	}
	span.toggled::before {
		left: 1.5em;
	}
	span::after {
		content: 'Theme';
		color: var(--font);
		font-size: 0.7rem;
		font-family: 'Barlow Condensed', sans-serif;
		position: absolute;
		top: -1.1em;
		left: 1em;
	}
</style>
