<script>
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
  .feature-section > header {
    margin-left: 10rem;
    margin-top: 10rem;
  }
  header {
    width: max-content;
  }
  header > div {
    background-color: var(--dark-4);
    height: 2px;
  }
  .feature-section > header > h1 {
    color: var(--light-5);
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
