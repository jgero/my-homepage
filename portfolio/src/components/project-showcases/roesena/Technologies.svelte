<script>
  import { fade } from "svelte/transition";

  const technologies = [
    {
      name: "Angular",
      icon: "fullscreen",
      text:
        "The web framework used for building the app is angular with it's component library angular-material. To manage the state of the app the Redux Pattern is used with the help of NgRx.",
    },
    {
      name: "CI with GitHub actions",
      icon: "cached",
      text:
        "Continuous integration is used to automatically test and deploy security rules for the firebase services, cloud functions, database indexes and the hosted files.",
    },
    {
      name: "deployed to Firebase",
      icon: "cloud",
      text:
        "All the services the app provides are running on the google firebase plattform. This includes the authentication, image storage, database, cloud functions and hosting.",
    },
  ];
</script>

<style>
  .tech-section {
    background-color: var(--light-1);
  }
  .tech-section > header {
    margin-left: 10rem;
    margin-top: 10rem;
  }
  header {
    width: max-content;
  }
  header > div {
    background-color: var(--dark-4);
    height: 2px;
  }
  .tech-section > header > h1 {
    color: var(--light-5);
  }
  .tech-section section {
    --spacing: 4rem;
    --box-width: 400px;
    --size-minus-space: calc(var(--box-width) - 2 * var(--spacing));
    width: var(--box-width);
    border-radius: var(--spacing);
    background-color: var(--light-5);
    position: relative;
    box-shadow: 7px 7px 10px 0 rgba(0, 0, 0, 0.25);
  }
  .tech-section section > h2 {
    height: var(--box-width);
    line-height: var(--box-width);
    margin: 0;
    text-align: center;
  }
  .tech-section section > span {
    color: var(--dark-3);
    opacity: 0.2;
    position: absolute;
    top: var(--spacing);
    left: var(--spacing);
    width: var(--size-minus-space);
    height: var(--size-minus-space);
    font-size: var(--size-minus-space);
  }
  .tech-section section > p {
    margin: 0 var(--spacing);
    padding-bottom: var(--spacing);
  }
  .tech-cards-container {
    padding: 10rem;
    margin-bottom: -15rem;
    display: flex;
    justify-content: space-between;
  }
</style>

<div in:fade class="tech-section">
  <header>
    <h1>technologies</h1>
    <div />
  </header>

  <div class="tech-cards-container">
    {#each technologies as tech}
      <section>
        <span class="material-icons">{tech.icon}</span>
        <h2>{tech.name}</h2>
        <p>{tech.text}</p>
      </section>
    {/each}
  </div>
</div>
