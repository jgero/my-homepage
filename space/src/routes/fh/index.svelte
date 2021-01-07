<script>
  import FHRecoveryChart from "./_fhRecoveryChart.svelte";
</script>

<style>
  div {
    width: 100%;
    background-color: black;
  }
  section {
    background-image: url("/images/fh.jpg");
    background-size: cover;
    background-position-y: center;
    height: 100vh;
    display: flex;
    align-items: center;
    box-shadow: inset 0px -20px 20px 10px rgba(0, 0, 0, 1);
  }
  header {
    margin-left: 10vw;
  }
</style>

<div>
  <section>
    <header>
      <h1>Falcon Heavy</h1>
      <h2>The world's most powerful rocket</h2>
    </header>
  </section>
  <FHRecoveryChart />
</div>
