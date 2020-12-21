<script>
  import { fly } from "svelte/transition";

  const topics = [
    {
      icon: "directions_run",
      text: `Sport is a very important part of my life. I have been doing acrobatics for 13 years at a local
            club, at which I am a coach for multiple groups as well. Additionally to the organized sport, I am
            inline skating and running outside, so I am active more or less every day.`,
    },
    {
      icon: "public",
      text: `Space, astronomy, space probes and space travel are a fascinating science. Seeing the wonders
            of our universe and how they are discovered inspires and motivates me to be productive every day.`,
    },
    {
      icon: "code",
      text: `Programming is the largest part of my life. Most of the time I work with Web-Aplications,
            because I love the web fIor the open plattform it is.`,
    },
  ];
</script>

<style>
  div {
    margin-top: calc(var(--box-spacing) * -1.5);
    padding: var(--box-spacing);
    background-color: var(--light-1);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 0;
  }
  div > section {
    background-color: var(--light-5);
    box-shadow: 7px 7px 10px 0 rgba(0, 0, 0, 0.25);
    border-radius: 2rem;
    padding: 2rem;
    width: calc(var(--max-text-width) * 0.7);
    margin-bottom: calc(var(--box-spacing) * 0.5);
  }
  div > section > span {
    width: calc(var(--max-text-width) / 2);
    height: calc(var(--max-text-width) / 2);
    line-height: calc(var(--max-text-width) / 2);
    font-size: calc(var(--max-text-width) / 2);
    display: block;
    margin: 0 auto;
  }
</style>

<div in:fly={{ y: 200, duration: 1000 }}>
  {#each topics as topic}
    <section>
      <span class="material-icons">{topic.icon}</span>
      <p>{topic.text}</p>
    </section>
  {/each}
</div>
