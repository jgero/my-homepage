<script>
  import github from '../../static/images/github.png';

  export let hasShadow;
</script>

<nav class={hasShadow ? 'shadow' : ''}>
  <ul>
    <li><a href="/#top">johannes gerold</a></li>
    <li><a class="button stroked" href="/#contact_me">contact me</a></li>
    <li>
      <a href="https://github.com/jgero" target="_blank">
        <img src={github} alt="github icon" />
      </a>
    </li>
  </ul>
</nav>

<style>
  nav {
    position: sticky;
    top: 0;
    height: 4rem;
    background-color: var(--light-5);
    transition: box-shadow linear 0.3s;
    z-index: 99;
  }
  nav.shadow {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  }
  ul {
    --space: 1em;
    margin: 0;
    padding: var(--space);
    display: flex;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 400;
  }

  li {
    list-style: none;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  li:first-child {
    margin-right: auto;
  }
  img {
    width: 2rem;
    height: 2rem;
  }

  li:not(:first-child) {
    margin-inline-start: calc(2 * var(--space));
  }
</style>
