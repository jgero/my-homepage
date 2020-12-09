<script>
  const topics = [
    {
      icon: "directions_run",
      text: `Sports is a very important part of my life. Since 13 years i do acrobatics in a local club,
            in which i am a trainer for multiple groups aswell. With inline skating and running outside
            of that i am active more or less every day.`,
    },
    {
      icon: "public",
      text: `Space, astronomy and space probes and travel are a fascinating science. Seeing the wonders
            of our universe and how they are discovered inspires and motivates me to be productive every day.`,
    },
    {
      icon: "code",
      text: `Programming is the largest part of my life. Most of the time i work with Web-Aplications,
            because i love the open plattform the web is.`,
    },
  ];
  import BarChart from "../components/BarChart.svelte";
  const languageData = [
    { name: "JavaScript", group: "language", frequency: "daily" },
    { name: "WebAssembly", group: "language", frequency: "infrequent" },
    { name: "TypeScript", group: "language", frequency: "weekly" },
    { name: "HTML", group: "language", frequency: "daily" },
    { name: "CSS", group: "language", frequency: "daily" },
    { name: "Java", group: "language", frequency: "infrequent" },
    { name: "C/C++", group: "language", frequency: "known" },
    { name: "Python", group: "language", frequency: "infrequent" },
    { name: "Go", group: "language", frequency: "infrequent" },
    { name: "Dart", group: "language", frequency: "known" },
  ];
  const opsData = [
    { name: "Docker", group: "ops", frequency: "daily" },
    { name: "Kubernetes", group: "ops", frequency: "known" },
    { name: "Podman", group: "ops", frequency: "known" },
    { name: "Gradle", group: "ops", frequency: "known" },
    { name: "Google Cloud", group: "ops", frequency: "daily" },
    { name: "Firebase", group: "ops", frequency: "weekly" },
  ];
  const frameworkData = [
    { name: "Angular", group: "framework", frequency: "weekly" },
    { name: "Svelte/Sapper", group: "framework", frequency: "weekly" },
    { name: "Flutter", group: "framework", frequency: "known" },
    { name: "Hibernate", group: "framework", frequency: "infrequent" },
  ];
  const databaseData = [
    { name: "Firestore", group: "database", frequency: "weekly" },
    { name: "Mongodb", group: "database", frequency: "infrequent" },
    { name: "Redis", group: "database", frequency: "known" },
    { name: "Neo4j", group: "database", frequency: "infrequent" },
    { name: "Cassandra", group: "database", frequency: "known" },
    { name: "SQL", group: "database", frequency: "known" },
  ];
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
  .topic-wrapper {
    margin-top: calc(var(--box-spacing) * -1.5);
    padding: var(--box-spacing);
    background-color: var(--light-1);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 0;
  }
  .topic-wrapper > section {
    background-color: var(--light-5);
    box-shadow: 7px 7px 10px 0 rgba(0, 0, 0, 0.25);
    border-radius: 2rem;
    padding: 2rem;
    width: calc(var(--max-text-width) * 0.7);
    margin-bottom: calc(var(--box-spacing) * 0.5);
  }
  .topic-wrapper > section > span {
    width: calc(var(--max-text-width) / 2);
    height: calc(var(--max-text-width) / 2);
    line-height: calc(var(--max-text-width) / 2);
    font-size: calc(var(--max-text-width) / 2);
    display: block;
    margin: 0 auto;
  }

  .chart-wrapper {
    background-color: var(--light-5);
    padding: var(--box-spacing);
    margin-top: calc(var(--box-spacing) * -1);
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

  <div class="topic-wrapper">
    {#each topics as topic}
      <section>
        <span class="material-icons">{topic.icon}</span>
        <p>{topic.text}</p>
      </section>
    {/each}
  </div>

  <div class="chart-wrapper">
    <BarChart data={languageData} heading={'Languages'} />
    <BarChart data={opsData} heading={`Operation Tools`} />
    <BarChart data={frameworkData} heading={'Frameworks'} />
    <BarChart data={databaseData} heading={'Databases'} />
  </div>
</main>
