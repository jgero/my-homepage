<script>
  import BarChart from "../BarChart.svelte";

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
  div {
    background-color: var(--light-5);
    padding: var(--box-spacing);
    margin-top: calc(var(--box-spacing) * -1);
  }
  div > header {
    margin: 0;
    width: max-content;
    margin-bottom: calc(var(--box-spacing) / 4);
  }
  @media screen and (max-width: 1100px) {
    div > header {
      width: 100%;
    }
  }
  header > span {
    background-color: var(--dark-4);
    display: block;
    height: 2px;
    width: 100%;
  }
  div > section {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
  }
</style>

<div>
  <header>
    <h1>Things i know and work with</h1>
    <span />
  </header>
  <section>
    <BarChart data={languageData} heading={'Languages'} />
    <BarChart data={opsData} heading={`Operation Tools`} />
    <BarChart data={frameworkData} heading={'Frameworks'} />
    <BarChart data={databaseData} heading={'Databases'} />
  </section>
</div>
