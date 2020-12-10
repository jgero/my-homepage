<script>
  import Topics from "../components/about_me/Topics.svelte";
  import Charts from "../components/about_me/Charts.svelte";
</script>

<style>
  main {
    position: absolute;
    overflow-y: auto;
    top: 4rem;
    height: calc(100% - 4rem);
    width: 100%;
    --box-spacing: 20rem;
    --max-text-width: 350px;
  }
  @media screen and (max-width: 1300px) {
    main {
      --box-spacing: 10rem;
    }
  }
  @media screen and (max-width: 800px) {
    main {
      --box-spacing: 3rem;
    }
  }
  @media screen and (max-width: 600px) {
    main {
      --box-spacing: 1rem;
    }
  }
  header {
    width: max-content;
    margin-block-start: calc(var(--box-spacing) / 3);
    margin-inline-start: var(--box-spacing);
  }
  header > div {
    background-color: var(--dark-4);
    height: 2px;
    width: 100%;
  }
  :not(.topic-wrapper) > section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 4rem 2rem;
    margin: var(--box-spacing);
    margin-top: calc(var(--box-spacing) / 4);
    /* z-index for overlap and position relative to make z-index take effect, because it would not otherwise for some reason */
    z-index: 2;
    position: relative;
    background-color: var(--light-5);
    box-shadow: 7px 7px 10px 0 rgba(0, 0, 0, 0.25);
    border-radius: 2rem;
  }
  img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
  section > p {
    max-width: var(--max-text-width);
  }
</style>

<svelte:head>
  <title>Johannes Gerold - About Me</title>
</svelte:head>

<main>
  <header>
    <h1>who am i?</h1>
    <div />
  </header>

  <section>
    <img src="/images/me.webp" alt="me" />
    <p>
      I am a passionate software developer born in 1998 in Baden-Württemberg,
      Germany. While studying for my Bachelors degree in Aalen from 2016 to
      2020, programming became not only my future job, but also a loved
      free-time activity. Right after finishing my Bachelors degree i started my
      Masters degree in 2020.
      <br />
      Web development has been my main focus, most of my bigger projects are
      showcased on this website.
    </p>
  </section>
  <Topics />
  <Charts />
</main>
