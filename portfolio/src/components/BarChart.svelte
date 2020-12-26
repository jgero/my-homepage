<script>
  export let data;
  export let heading;
</script>

<style>
  figure {
    margin: 0;
    /* overflow hidden is needed to hide stuff when bars are flying in */
    overflow-x: hidden;
    /* add extra space on the right before the overflow cutoff for the label on the bottom right */
    padding-right: 1rem;
    width: var(--step-4);
    --step-1: 100px;
    --step-2: 150px;
    --step-3: 200px;
    --step-4: 300px;
    margin: 0;
    margin-block-end: 2rem;
    margin-inline-end: 2rem;
  }
  figcaption {
    font-size: 1.5rem;
    margin-block-start: 1.5rem;
  }
  div {
    margin: 0.2em;
    background-color: var(--light-1);
    color: var(--dark-1);
    border-radius: 0 2px 2px 0;
    padding: 0.2em;
    box-sizing: border-box;
    animation: moveIn ease-out 0.6s;
  }
  /* keyframes look better here than svelte animations */
  /* because svelte animations do not support % values in the fly transition */
  @keyframes moveIn {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
  .daily {
    width: var(--step-4);
  }
  .weekly {
    width: var(--step-3);
  }
  .infrequent {
    width: var(--step-2);
  }
  .known {
    width: var(--step-1);
  }
  ul {
    margin: 0;
    padding: 0;
    font-size: 0.6rem;
    margin-top: 0.6em;
    margin-bottom: 2em;
    list-style-type: none;
    border-top: 1px solid var(--dark-4);
    position: relative;
  }
  li {
    position: absolute;
    margin-top: 0.5em;
  }
  li::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 0.5em;
    background-color: var(--dark-4);
    transform: translateY(-100%);
  }
  li:nth-child(1) {
    left: var(--step-1);
  }
  li:nth-child(2) {
    left: var(--step-2);
  }
  li:nth-child(3) {
    left: var(--step-3);
  }
  li:nth-child(4) {
    left: var(--step-4);
  }
  span {
    display: block;
    transform: translateX(-50%);
  }
</style>

<figure>
  <figcaption>{heading}</figcaption>
  {#each data as datapoint}
    <div class={datapoint.frequency}>{datapoint.name}</div>
  {/each}
  <ul>
    <li><span>known</span></li>
    <li><span>infrequent</span></li>
    <li><span>weekly</span></li>
    <li><span>daily</span></li>
  </ul>
</figure>
