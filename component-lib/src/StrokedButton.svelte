<script>
  export let label = "label missing";
</script>

<style>
  div,
  button {
    cursor: pointer;
  }
  div {
    --border-size: 0.2em;
    display: flex;
    position: relative;
    z-index: 1;
    width: max-content;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    padding: var(--border-size);
    border-radius: var(--border-size);
    transition: all ease-out 0.2s;
  }
  div::before {
    content: "";
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--font);
    border-radius: var(--border-size);
    opacity: 0;
    transform: translate(0px, 0px);
    transition: all ease-in 0.1s;
  }
  div:active::before,
  div:focus-within::before {
    opacity: 0.1;
    transform: translate(2px, 2px);
  }
  button {
    outline: none;
    border: none;
    color: var(--font);
    padding: calc(2 * var(--border-size));
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    background-color: var(--background);
    transition: all ease-in 0.1s;
  }
  button:active {
    transform: scale(1.05);
  }
  div:hover > button,
  button:hover,
  button:focus {
    background-color: transparent;
  }
</style>

<div><button>{label}</button></div>
