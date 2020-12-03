<script>
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
  }
</style>

<svelte:head>
  <title>Johannes Gerold - About Me</title>
</svelte:head>

<main>
  <h1>About this site</h1>

  <p>This is the 'about' page. There's not much here.</p>

  <BarChart data={languageData} heading={'Languages'} />
  <BarChart data={opsData} heading={`Operation Tools`} />
  <BarChart data={frameworkData} heading={'Frameworks'} />
  <BarChart data={databaseData} heading={'Databases'} />
</main>
