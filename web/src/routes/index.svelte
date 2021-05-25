<script>
  import Button from '../components/Button.svelte';
</script>

<svelte:head>
  <title>Johannes Gerold</title>
  <meta property="og:title" content="Johannes Gerold" />
  <meta property="og:description" content="This is me." />
  <meta property="og:image" content="https://via.placeholder.com/150" />
  <meta property="og:url" content="https://jgero.me" />
</svelte:head>

<main>
  <h1>hello there!</h1>
  <h2>who am i?</h2>
  <section>
    <div class="material-icons">account_circle</div>
    <p>Read more about me in my portfolio</p>
    <Button label="show me" href="/portfolio" />
  </section>
  <h2>what am i doing?</h2>
  <section>
    <div class="material-icons">article</div>
    <p>
      I am writing a blog about interesting stuff I encounter in my projects
    </p>
    <Button label="show me" href="/blog" />
  </section>
  <section>
    <div class="material-icons">insights</div>
    <p>
      working on a page to visualize data about space travel to practice coding
      and because I love space related things
    </p>
    <Button label="show me" href="/space" />
  </section>
</main>

<style>
  main {
    margin: 0 20vw;
  }
  section {
    position: relative;
    margin-top: 1.5rem;
    height: 7rem;
    display: flex;
    align-items: center;
    border-radius: 3.5rem;
    padding: 0 2rem;
  }
  section > div {
    font-size: 4rem;
    width: 1em;
    height: 1em;
    line-height: 1em;
    color: var(--primary);
  }
  section > p {
    margin: 0;
    margin-left: 1em;
    flex: 1;
  }
</style>
