<script>
  import { onMount, onDestroy } from 'svelte';

  let fragment;

  onMount(() => {
    window.addEventListener('hashchange', updateFragment);
    if (!window.location.hash) {
      window.location.hash = 'top';
    } else {
      fragment = window.location.hash;
    }
  });

  onDestroy(() => {
    try {
      window.removeEventListener('hashchange', updateFragment);
    } catch (e) {
      fragment = undefined;
    }
  });

  function updateFragment() {
    fragment = window.location.hash;
  }
</script>

<aside>
  <nav>
    <ul>
      <li>
        <a
          aria-current={!fragment || fragment === '#top' ? 'page' : undefined}
          href="/#top">home</a
        >
      </li>
      <li>
        <a
          aria-current={fragment === '#project_showcase' ? 'page' : undefined}
          href="/#project_showcase">project showcase</a
        >
      </li>
      <li>
        <a
          aria-current={fragment === '#about_me' ? 'page' : undefined}
          href="/#about_me">about me</a
        >
      </li>
      <li>
        <a
          aria-current={fragment === '#contact_me' ? 'page' : undefined}
          href="/#contact_me">contact me</a
        >
      </li>
    </ul>
  </nav>
  <div>scroll</div>
</aside>

<style>
  aside {
    --sidebar-width: 5rem;
    --nav-width: calc(var(--sidebar-width) / 3);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: var(--sidebar-width);
  }

  nav {
    margin: auto 0;
  }

  ul {
    margin: 0;
    padding: 0;
    width: var(--nav-width);
  }

  li {
    list-style: none;
  }

  li:not(:first-child) {
    margin-block-start: 1em;
  }

  a {
    color: rgba(0, 0, 0, 0);
    font-size: 0;
    width: calc(var(--nav-width) / 2);
    height: 3px;
    background-color: var(--light-2);
    display: block;
    transition: width 0.25s ease-out, background-color 0.25s ease-out;
  }

  [aria-current] {
    width: var(--nav-width);
    background-color: var(--light-1);
  }

  div {
    --line-spacing: 1em;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 400;
    color: var(--light-3);
    text-transform: uppercase;
    writing-mode: vertical-rl;
    line-height: var(--sidebar-width);
    padding-inline-end: var(--line-spacing);
  }

  div::after {
    content: '';
    display: block;
    width: 2px;
    height: 10em;
    background-color: var(--light-3);
    float: right;
    transform: translateX(calc(1px - var(--sidebar-width) / 2))
      translateY(var(--line-spacing));
  }
</style>
