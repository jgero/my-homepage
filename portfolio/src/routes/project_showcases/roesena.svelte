<script>
  import { fly } from "svelte/transition";
  import Technologies from "../../components/project-showcases/roesena/Technologies.svelte";
  import Features from "../../components/project-showcases/roesena/Features.svelte";

  import image1 from "../../../static/images/portfolio_project_1.png";
  import image2 from "../../../static/images/roesena_mobile.png";
</script>

<style>
  main {
    position: absolute;
    overflow-y: auto;
    top: 4rem;
    height: calc(100% - 4rem);
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .hero-section {
    display: flex;
    justify-content: space-evenly;
    margin-top: 10rem;
  }
  @media screen and (max-width: 600px) {
    .hero-section {
      flex-direction: column;
      align-items: center;
    }
  }
  header {
    width: max-content;
  }
  header > div {
    background-color: var(--dark-4);
    height: 2px;
  }
  header > a {
    display: inline-block;
  }
  figure {
    margin: 0;
    margin-right: -8vw;
    z-index: 2;
  }
  @media screen and (max-width: 600px) {
    figure {
      margin-top: 2rem;
    }
  }
  figure > img {
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  }
  figure > img:nth-child(1) {
    width: 30vw;
    transform: skew(-23deg, 7deg);
  }
  figure > img:nth-child(2) {
    width: 10vw;
    transform: skew(-23deg, 7deg) translate(-12vw, 10vw);
  }
</style>

<svelte:head>
  <title>Johannes Gerold - RöSeNa-App showcase</title>
</svelte:head>

<main out:fly={{ x: 200, duration: 200 }}>
  <div class="hero-section">
    <header>
      <h1 in:fly={{ duration: 1500, x: -200 }}>RöSeNa - App</h1>
      <div in:fly={{ duration: 1500, x: -200, delay: 200 }} />
      <h2 in:fly={{ duration: 1500, x: -200, delay: 400 }}>
        web-app for a carnival club
      </h2>
      <a
        in:fly={{ duration: 1500, x: -200, delay: 600 }}
        href="https://rösena.de"
        class="button stroked"
        target="_blank">visit webpage</a>
    </header>

    <figure in:fly={{ duration: 1500, x: 200 }}>
      <img src={image1} alt="webpage screenshot desktop" />
      <img src={image2} alt="webpage screenshot mobile" />
    </figure>
  </div>

  <Technologies />
  <Features />
</main>
