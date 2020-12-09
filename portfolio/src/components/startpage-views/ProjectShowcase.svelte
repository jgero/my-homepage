<script>
  import { fly } from "svelte/transition";

  import image1 from "../../../static/images/portfolio_project_1.png";
  import image2 from "../../../static/images/portfolio_project_2.png";
  import image3 from "../../../static/images/portfolio_project_3.png";
</script>

<style>
  .wrapper {
    display: grid;
    height: 100%;
    padding: 10vh 2rem;
    box-sizing: border-box;
    grid-template-columns: 1fr 3fr;
    grid-template-areas: "text images";
  }
  @media screen and (max-width: 600px) {
    .wrapper {
      padding: 5vh 2rem;
      grid-template-columns: auto;
      grid-template-rows: 3fr 2fr;
      grid-template-areas: "text" "images";
    }
  }

  div.spacer {
    background-color: var(--dark-4);
    height: 2px;
    width: 100%;
  }

  section {
    grid-area: text;
  }

  h1 {
    white-space: nowrap;
  }
  h1,
  h2 {
    margin: 1rem 0;
  }

  a {
    margin-inline-end: 1em;
    display: inline-block;
  }

  figure {
    grid-area: images;
    position: relative;
    width: max-content;
    padding-left: 10vw;
    height: max-content;
    padding-bottom: 10vw;
    margin: 0;
    align-self: center;
    justify-self: center;
  }
  img:nth-child(2),
  img:nth-child(3) {
    position: absolute;
    top: 0;
    right: 0;
  }
  img:nth-child(2) {
    transform: translate(-5vw, 5vw);
  }
  img:nth-child(3) {
    transform: translate(-10vw, 10vw);
  }

  img {
    width: 30vw;
  }
</style>

<svelte:head>
  <title>Johannes Gerold - project showcase</title>
</svelte:head>

<div class="wrapper">
  <section out:fly={{ x: -200, duration: 200 }}>
    <header>
      <h1>
        <h1 in:fly={{ x: -200, duration: 1500, delay: 0 }}>project showcase</h1>
        <div in:fly={{ x: -200, duration: 1500, delay: 200 }} class="spacer" />
        <h2 in:fly={{ x: -200, duration: 1500, delay: 400 }}>
          web-app for a carnival club
        </h2>
      </h1>
    </header>
    <p in:fly={{ x: -200, duration: 1500, delay: 600 }}>
      Webpage with login and user groups, user created articles, image upload,
      appointment system with participants and administrative functions.
    </p>
    <p in:fly={{ x: -200, duration: 1500, delay: 800 }}>
      Developed as Angular app, deployed via CI through Github-Actions to the
      Google cloud Firebase service.
    </p>
    <div in:fly={{ x: -200, duration: 1500, delay: 1000 }}>
      <a href="/project_showcases/roesena" class="button primary">see more</a>
      <a href="https://rösena.de" class="button stroked" target="_blank">visit
        webpage</a>
    </div>
  </section>
  <figure out:fly={{ x: 200, y: -200, duration: 200 }}>
    <img
      in:fly={{ x: 200, y: -200, duration: 1500, delay: 400 }}
      src={image1}
      alt="project showcase screenshot 1" />
    <img
      in:fly={{ x: 200, y: -200, duration: 1500, delay: 200 }}
      src={image2}
      alt="project showcase screenshot 2" />
    <img
      in:fly={{ x: 200, y: -200, duration: 1500, delay: 0 }}
      src={image3}
      alt="project showcase screenshot 3" />
  </figure>
</div>
