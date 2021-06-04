<script>
	import Button from './Button.svelte';
	import ThemeSwitcher from '../theming/ThemeSwitcher.svelte';
</script>

<header>
	<a href="/">Johannes Gerold</a>
	<ThemeSwitcher />
	<span />
	<nav>
		<Button href="/blog" label="blog" style="flat" />
		<Button href="/about" label="about" style="flat" />
		<Button href="/contact_me" label="contact me" style="flat" />
		<a href="https://github.com/jgero" target="_blank">
			<img src="github.png" alt="github logo">
		</a>
	</nav>
</header>

<style>
	header {
		display: flex;
		background-image: linear-gradient(
			to right,
			var(--primary),
			var(--secondary)
		);
		margin: 3em;
		margin-bottom: 0;
		border-radius: 0.5em;
		align-items: center;
	}
	header > a {
		text-transform: uppercase;
		outline: none;
		text-decoration: none;
		color: var(--font);
		font-size: 1.5rem;
		margin: 1em;
		font-family: 'Barlow Condensed', sans-serif;
		font-weight: 400;
	}
	header > a:focus,
	header > a:active {
		text-decoration: underline;
	}
	span {
		flex: 1;
	}
	nav {
		display: flex;
		margin-inline-end: 2rem;
	}
	nav > a {
		align-self: center;
	}
</style>
