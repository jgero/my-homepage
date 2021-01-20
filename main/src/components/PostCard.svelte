<script>
  import Button from "./Button.svelte";
  export let title;
  export let description;
  export let pubdate;
  export let slug;

  pubdate = new Date(pubdate);
  let dateString = `${pubdate.getDate()}/${
    pubdate.getMonth() + 1
  }/${pubdate.getFullYear()}`;
</script>

<style>
  section {
    --border-size: 0.2rem;
    padding: var(--border-size);
    background-image: linear-gradient(
      to right,
      var(--primary),
      var(--secondary)
    );
    border-radius: var(--border-size);
    width: 20rem;
    height: 15rem;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  article {
    background-color: var(--background);
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h2 {
    font-size: 1.5rem;
    margin: 0;
  }
  h2::before {
    display: none;
  }
  time {
    font-family: "DM Sans", sans-serif;
  }
  div {
    position: absolute;
    background-image: linear-gradient(
      to right,
      var(--primary),
      var(--secondary)
    );
    border-bottom-left-radius: var(--border-size);
    border-bottom-right-radius: var(--border-size);
    width: 100%;
    left: 0;
    bottom: 0;
    transform-origin: bottom;
    transform: scaleY(0);
    transition: all ease-in 0.2s;
    overflow: hidden;
  }
  section:hover > div {
    transform: scaleY(1);
  }
</style>

<section>
  <article>
    <h2>{title}</h2>
    <p>{description}</p>
    <time datetime={pubdate}>{dateString}</time>
  </article>
  <div>
    <Button label="read" href={`/blog/${slug}`} style="flat" />
  </div>
</section>
