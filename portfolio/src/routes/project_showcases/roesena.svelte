<script>
  import image1 from "images/portfolio_project_1.png";
  import image2 from "images/roesena_mobile.png";
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
  section {
    --spacing: 4rem;
    --box-width: 400px;
    --size-minus-space: calc(var(--box-width) - 2 * var(--spacing));
    width: var(--box-width);
    border-radius: var(--spacing);
    background-color: var(--light-5);
    position: relative;
  }
  section > h2 {
    height: var(--box-width);
    line-height: var(--box-width);
    margin: 0;
    text-align: center;
  }
  section > span {
    color: var(--dark-3);
    opacity: 0.2;
    position: absolute;
    top: var(--spacing);
    left: var(--spacing);
    width: var(--size-minus-space);
    height: var(--size-minus-space);
    font-size: var(--size-minus-space);
  }
  section > p {
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
    <section>
      <span class="material-icons">fullscreen</span>
      <h2>Angular</h2>
      <p>
        The web framework used for building the app is angular with it's
        component library angular-material. To manage the state of the app the
        Redux Pattern is used with the help of NgRx.
      </p>
    </section>
    <section>
      <span class="material-icons">cached</span>
      <h2>CI with GitHub actions</h2>
      <p>
        Continuous integration is used to automatically test and deploy security
        rules for the firebase services, cloud functions, database indexes and
        the hosted files.
      </p>
    </section>
    <section>
      <span class="material-icons">cloud</span>
      <h2>deployed to Firebase</h2>
      <p>
        All the services the app provides are running on the google firebase
        plattform. This includes the authentication, image storage, database,
        cloud functions and hosting.
      </p>
    </section>
  </div>
</div>

<div class="feature-section">
  <header>
    <h1>features</h1>
    <div />
  </header>
</div>
