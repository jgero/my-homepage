<script>
  import { onMount } from "svelte";

  export let segment;
  let lastScrollTop = 0;
  let isHidden = false;

  onMount(() => {
    document.querySelector("body").addEventListener("scroll", (ev) => {
      const diff = lastScrollTop - ev.target.scrollTop;
      lastScrollTop = ev.target.scrollTop;
      if (diff > 0) {
        isHidden = false;
      } else {
        isHidden = true;
      }
    });
  });
</script>

<style>
  nav {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    transition: transform 0.2s ease-out;
    transition: transform 0.2s ease-out;
    background-color: rgba(90, 90, 90, 0.6);
  }

  div.spacer:first-of-type {
    flex: 1;
  }
  div.spacer:last-of-type {
    flex: 2;
  }

  nav.hidden {
    transform: translateY(-110%);
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: #ffffff;
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
    margin-left: 3rem;
  }

  @media screen and (max-width: 600px) {
    a {
      margin-left: 0;
    }
  }

  a.faded {
    color: #909090;
  }
</style>

<nav class={isHidden ? 'hidden' : ''}>
  <div class="spacer" />
  <ul>
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href=".">Home</a>
    </li>
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'f9' ? 'page' : undefined}
        href="f9">Falcon 9</a>
    </li>
    <li>
      <a aria-current={segment === 'fh' ? 'page' : undefined} href="fh">Falcon
        Heavy</a>
    </li>
    <li>
      <a
        aria-current={segment === 'about' ? 'page' : undefined}
        href="about"
        class="faded">About</a>
    </li>
  </ul>
  <div class="spacer" />
</nav>
