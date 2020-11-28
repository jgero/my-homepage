<script>
  import image1 from "images/portfolio_project_1.png";
  import image2 from "images/roesena_mobile.png";

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

  const features = [
    {
      name: "authentication",
      icon: "person",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas pharetra leo, accumsan aliquam ante ornare eget. Nulla at imperdiet ligula. Duis vitae dolor eu purus eleifend sollicitudin. Duis imperdiet nunc sit amet turpis posuere, quis molestie tortor tristique.",
    },
    {
      name: "user groups",
      icon: "groups",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas pharetra leo, accumsan aliquam ante ornare eget. Nulla at imperdiet ligula. Duis vitae dolor eu purus eleifend sollicitudin. Duis imperdiet nunc sit amet turpis posuere, quis molestie tortor tristique.",
    },
    {
      name: "upload images",
      icon: "insert_photo",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas pharetra leo, accumsan aliquam ante ornare eget. Nulla at imperdiet ligula. Duis vitae dolor eu purus eleifend sollicitudin. Duis imperdiet nunc sit amet turpis posuere, quis molestie tortor tristique.",
    },
    {
      name: "write articles",
      icon: "article",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas pharetra leo, accumsan aliquam ante ornare eget. Nulla at imperdiet ligula. Duis vitae dolor eu purus eleifend sollicitudin. Duis imperdiet nunc sit amet turpis posuere, quis molestie tortor tristique.",
    },
    {
      name: "create events",
      icon: "today",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas pharetra leo, accumsan aliquam ante ornare eget. Nulla at imperdiet ligula. Duis vitae dolor eu purus eleifend sollicitudin. Duis imperdiet nunc sit amet turpis posuere, quis molestie tortor tristique.",
    },
    {
      name: "search content",
      icon: "search",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas pharetra leo, accumsan aliquam ante ornare eget. Nulla at imperdiet ligula. Duis vitae dolor eu purus eleifend sollicitudin. Duis imperdiet nunc sit amet turpis posuere, quis molestie tortor tristique.",
    },
    {
      name: "mobile and desktop",
      icon: "phonelink",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas pharetra leo, accumsan aliquam ante ornare eget. Nulla at imperdiet ligula. Duis vitae dolor eu purus eleifend sollicitudin. Duis imperdiet nunc sit amet turpis posuere, quis molestie tortor tristique.",
    },
    {
      name: "progressive web app",
      icon: "apps",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas pharetra leo, accumsan aliquam ante ornare eget. Nulla at imperdiet ligula. Duis vitae dolor eu purus eleifend sollicitudin. Duis imperdiet nunc sit amet turpis posuere, quis molestie tortor tristique.",
    },
  ];
</script>

<style>
  .hero-section {
    display: flex;
    justify-content: space-evenly;
    margin-top: 10rem;
  }
  header {
    width: max-content;
  }
  header > div {
    background-color: var(--dark-4);
    height: 2px;
  }
  figure {
    margin: 0;
    margin-right: -8vw;
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

  .tech-section {
    background-color: var(--light-1);
  }
  .tech-section > header,
  .feature-section > header {
    margin-left: 10rem;
    margin-top: 10rem;
  }
  .tech-section > header > h1,
  .feature-section > header > h1 {
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

  .feature-section {
    background-color: var(--light-2);
  }
  .feature-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10rem;
  }
  .feature-section section {
    --spacing: 3rem;
    --box-width: 35vw;
    --size-minus-space: calc(var(--box-width) - 2 * var(--spacing));
    display: flex;
    box-sizing: border-box;
    padding: var(--spacing);
    margin-bottom: var(--spacing);
    width: var(--box-width);
    border-radius: var(--spacing);
    background-color: var(--light-5);
    box-shadow: 7px 7px 10px 0 rgba(0, 0, 0, 0.25);
  }
  .feature-section section .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .feature-section section .text-wrapper {
    margin-left: var(--spacing);
  }
  .feature-section section span {
    color: var(--dark-3);
    width: calc(var(--box-width) / 7);
    height: calc(var(--box-width) / 7);
    font-size: calc(var(--box-width) / 7);
  }
</style>

<div class="hero-section">
  <header>
    <h1>RöSeNa - App</h1>
    <div />
    <h2>web-app for a carnival club</h2>
  </header>

  <figure>
    <img src={image1} alt="webpage screenshot desktop" />
    <img src={image2} alt="webpage screenshot mobile" />
  </figure>
</div>

<div class="tech-section">
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

<div class="feature-section">
  <header>
    <h1>features</h1>
    <div />
  </header>
  <div class="feature-container">
    {#each features as feature}
      <section>
        <div class="icon-wrapper">
          <span class="material-icons">{feature.icon}</span>
        </div>
        <div class="text-wrapper">
          <h2>{feature.name}</h2>
          <p>{feature.text}</p>
        </div>
      </section>
    {/each}
  </div>
</div>
