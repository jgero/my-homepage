<script>
  export let label = 'label missing';
  export let href;
  export let target;
  export let style = 'stroked';
</script>

<div class={style}>
  {#if href}
    <a {href} {target}>{label}</a>
  {:else}<button on:click>{label}</button>{/if}
</div>

<style>
  div,
  button,
  a {
    cursor: pointer;
  }
  /* sizing is the same for all variants */
  div {
    --border-size: 0.2em;
    display: flex;
    position: relative;
    z-index: 1;
    width: max-content;
    padding: var(--border-size);
    margin: 1em;
    border-radius: var(--border-size);
    transition: all ease-out 0.2s;
  }
  /* stroked button has the gradient border */
  div.stroked {
    background: linear-gradient(to right, var(--primary), var(--secondary));
  }
  /* element to create the shade effect */
  div::before {
    content: '';
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    /* to offset the padding of the parent div element */
    margin: calc(-1 * var(--border-size));
    background-color: var(--font);
    border-radius: var(--border-size);
    opacity: 0;
    transform: translate(0px, 0px);
    transition: all ease-in 0.1s;
  }
  /* show shade in all variants when active or focued, but also on hover in flat variant */
  div.flat:hover::before,
  div.flat:hover::before,
  div:active::before,
  div:focus-within::before {
    opacity: 0.1;
  }
  /* shift shadow a bit in stroked mode on active an focus */
  div.stroked:active::before,
  div.stroked:focus-within::before {
    transform: translate(var(--border-size), var(--border-size));
  }
  /* button and link sizing is always the same */
  button,
  a {
    outline: none;
    border: none;
    text-decoration: none;
    color: var(--font);
    padding: calc(2 * var(--border-size));
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    background-color: transparent;
    transition: all ease-in 0.1s;
  }
  /* make text bigger when active */
  button:active,
  a:active {
    transform: scale(1.05);
  }
  /* color of button has to be set in stroked variant to overlay the gradient of the div container to make it look like a border */
  div.stroked > button,
  div.stroked > a {
    background-color: var(--background);
  }
  /* background to transparent in stroked variant when active or hovered to make gradient of border visible on entire button */
  div.stroked:hover > button,
  div.stroked:hover > a,
  div.stroked > button:hover,
  div.stroked > a:hover,
  div.stroked > button:focus,
  div.stroked > a:focus {
    background-color: transparent;
  }
</style>
