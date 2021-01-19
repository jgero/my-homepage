<script>
  export let header;
</script>

<style>
  h2 {
    color: var(--font);
    font-size: 2.2rem;
    text-transform: uppercase;
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 400;
    margin: 0;
    margin-block-start: 1em;
    position: relative;
  }
  h2::before {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    top: -2px;
    left: 0;
    background-image: linear-gradient(
      to right,
      var(--primary),
      var(--secondary)
    );
  }
</style>

<h2>{header}</h2>
