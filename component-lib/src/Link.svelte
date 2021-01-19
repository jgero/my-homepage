<script>
  export let href;
  export let text;
  const target = href.startsWith("http") ? "_blank" : null;
</script>

<style>
  a {
    display: inline-block;
    font-family: "DM Sans", sans-serif;
    outline: none;
    color: var(--font);
    text-decoration: none;
    position: relative;
    z-index: 1;
    transition: transform ease-in 0.1s;
  }
  a:active {
    transform: scale(1.02);
  }
  a::before {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: 2px;
    left: 0;
    background-image: linear-gradient(
      to right,
      var(--primary),
      var(--secondary)
    );
    z-index: -1;
  }
  a::after {
    --overlap: 0.2em;
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: var(--primary);
    opacity: 0;
    z-index: -1;
    transition: opacity ease-in 0.2s;
    padding: var(--overlap);
    border-radius: var(--overlap);
    top: calc(-1 * var(--overlap));
    left: calc(-1 * var(--overlap));
  }
  a:hover::after,
  a:focus::after {
    opacity: 0.3;
  }
</style>

<a {href} {target}>{text}</a>
