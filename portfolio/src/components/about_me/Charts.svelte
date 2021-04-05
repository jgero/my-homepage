<script>
  import BarChart from '../BarChart.svelte';

  const languageData = [
    { name: 'JavaScript', group: 'language', frequency: 'daily' },
    { name: 'WebAssembly', group: 'language', frequency: 'infrequent' },
    { name: 'TypeScript', group: 'language', frequency: 'weekly' },
    { name: 'HTML', group: 'language', frequency: 'daily' },
    { name: 'CSS', group: 'language', frequency: 'daily' },
    { name: 'Java', group: 'language', frequency: 'infrequent' },
    { name: 'C/C++', group: 'language', frequency: 'known' },
    { name: 'Python', group: 'language', frequency: 'infrequent' },
    { name: 'Go', group: 'language', frequency: 'infrequent' },
    { name: 'Dart', group: 'language', frequency: 'known' },
  ];
  const opsData = [
    { name: 'Docker', group: 'ops', frequency: 'daily' },
    { name: 'Kubernetes', group: 'ops', frequency: 'known' },
    { name: 'Podman', group: 'ops', frequency: 'known' },
    { name: 'Google Cloud', group: 'ops', frequency: 'daily' },
    { name: 'Firebase', group: 'ops', frequency: 'weekly' },
  ];
  const frameworkData = [
    { name: 'Angular', group: 'framework', frequency: 'weekly' },
    { name: 'Svelte/Sapper', group: 'framework', frequency: 'weekly' },
    { name: 'Flutter', group: 'framework', frequency: 'known' },
    { name: 'Express.js', group: 'framework', frequency: 'infrequent' },
    { name: 'Hibernate', group: 'framework', frequency: 'infrequent' },
  ];
  const databaseData = [
    { name: 'Firestore', group: 'database', frequency: 'weekly' },
    { name: 'Mongodb', group: 'database', frequency: 'infrequent' },
    { name: 'Redis', group: 'database', frequency: 'known' },
    { name: 'Neo4j', group: 'database', frequency: 'infrequent' },
    { name: 'Cassandra', group: 'database', frequency: 'known' },
    { name: 'SQL', group: 'database', frequency: 'known' },
  ];
</script>

<div class="wrapper">
  <header>
    <h1>Things i know and work with</h1>
    <span />
  </header>
  <div>
    <section>
      <BarChart data={languageData} heading={'Languages'} />
      <p>
        Because I spend a lot of time working on Web Applications most of my
        skills are in the JavaScript, TypeScript, HTML and CSS ecosystem. This
        also includes a bit of SVG for data visualization and as eye-candy.
        <br />
        <br />
        Every once in a while, for lectures or to stay up to date with the developments
        of other parts of the computer science world, I experiment with other languages.
        This means I am also familiar with concepts foreign to JavaScript like pointers
        of C/C++ and the special interfaces of Go.
      </p>
    </section>
    <section>
      <BarChart data={opsData} heading={`Operation Tools`} />
      <p>
        Cloud computing is growing daily to become an even bigger player in
        every aspect of the web. This means at the same time, that
        containerization is a vital skill to be able to smoothly deploy
        applications to production. Also knowing some frameworks of the big
        vendors helps in this regard.
        <br />
        <br />
        But I also grew to like containers as an easy way to develop on different
        operating systems and platforms.
      </p>
    </section>
    <section>
      <BarChart data={frameworkData} heading={'Frameworks'} />
      <p>
        Depending on the job that has to be done I work with a range of
        different frameworks. These span from frontend JavaScript frameworks to
        frameworks for creating APIs and data persistence.
      </p>
    </section>
    <section>
      <BarChart data={databaseData} heading={'Databases'} />
      <p>
        When working with for example firebase, there is not really a choice of
        which database paradigm to use. Even if it is more about modelling data
        to fit into a database, and still enabling efficient queries, knowing
        different types of databases and being aware of their strengths and
        weaknesses helps me achieve what I want with a given database.
        <br />
        <br />
        Taking several classes about modern data technologies and databases, as well
        as trying out some of these systems allowed me to have knowledge about them.
      </p>
    </section>
  </div>
</div>

<style>
  .wrapper {
    background-color: var(--light-5);
    padding: var(--box-spacing);
    margin-top: calc(var(--box-spacing) * -1);
    margin-bottom: 50vh;
  }
  .wrapper > header {
    margin: 0;
    width: max-content;
    margin-block-start: 5rem;
    margin-block-end: calc(var(--box-spacing) / 4);
  }
  @media screen and (max-width: 1100px) {
    .wrapper > header {
      width: 100%;
    }
  }
  header > span {
    background-color: var(--dark-4);
    display: block;
    height: 2px;
    width: 100%;
  }
  section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  section > p {
    flex: 1 1 210px;
    margin-inline: auto;
  }
</style>
