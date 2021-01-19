<script>
  export let code;
  export let language;
</script>

<style>
  div {
    background-image: linear-gradient(
      to right,
      var(--primary),
      var(--secondary)
    );
    padding: 0.2rem;
    border-radius: 0.2rem;
    margin-top: 1em;
  }
  pre {
    background-color: white;
    padding: 1rem;
    margin: 0;
  }
</style>

<div>
  <pre><code class={`language-${language}`}>{@html code}</code></pre>
</div>
