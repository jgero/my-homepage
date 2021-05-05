<script>
  const features = [
    {
      name: 'authentication',
      icon: 'person',
      text: `For full usage of the features of the app a user has to log in.
            This happens with a E-Mail account and the fireabse auth service.
            The users can then edit their username for easier identification whose account this is.`,
    },
    {
      name: 'user groups',
      icon: 'groups',
      text: `Not everyone is supposed to be able to create and see all content on the page.
            To enable this users can be assigned to a nuber of groups.
            These groups can be roles like author or administrator, but also club-groups to help filtering the users.
            The access and visibility of content is enforced based on these groups.`,
    },
    {
      name: 'upload images',
      icon: 'insert_photo',
      text: `Sharing images about events of the club can be done by uploading images.
            Like all the other content these are tagged with keywords to enable filtering.
            When a image is uploaded it automatically gets resized and compressed to save storage space and ensure a suitable format.`,
    },
    {
      name: 'write articles',
      icon: 'article',
      text: `Articles are composed and formatted with the help of Markdown.
            This way the users can include things like headings, lists and even images without the need of a complex text editor.`,
    },
    {
      name: 'create events',
      icon: 'today',
      text: `Events are a points in time which show up in a calendar and have a text-based description,
            much like already known by many calendar applicaitons. In this app the creator of the event also has the 
            possibilty to add users as participants of the event. These invited users then can see this invitation on ther profile
            and respond if they want to attend it.`,
    },
    {
      name: 'search content',
      icon: 'search',
      text: `For the search the already mentioned tags and keywords come into play.
            These can be freely combined in the search form to filter the content of the page.
            To get even more precise results the kind of content that should be searched can be selected.`,
    },
    {
      name: 'mobile and desktop',
      icon: 'phonelink',
      text: `The purpose of the app is not only to create and view content, but also to keep club members up to date.
            This means the distribution of mobile and desktop useres is spread pretty evenly and requires the app to
            work well on both types of devices.`,
    },
    {
      name: 'progressive web app',
      icon: 'apps',
      text: `Distributing the app to all the club members is very important. To easily target users of different plattforms
            the progressive web app technology was used. This allows to provide a great experience for desktop and mobile
            while not having to worry about compatibility.`,
    },
  ];
</script>

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

<style>
  .feature-section {
    background-color: var(--light-2);
  }
  @media screen and (max-width: 600px) {
    .feature-section {
      --box-spacing: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .feature-section > header {
    margin-left: var(--box-spacing);
    margin-top: var(--box-spacing);
  }
  @media screen and (max-width: 600px) {
    .feature-section > header {
      margin-left: 0;
    }
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
  .feature-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: var(--box-spacing);
  }
  @media screen and (max-width: 600px) {
    .feature-container {
      justify-content: center;
    }
  }
  .feature-section section {
    --spacing: 3rem;
    --box-width: max(300px, 35vw);
    /* --size-minus-space: calc(var(--box-width) - 2 * var(--spacing)); */
    display: flex;
    box-sizing: border-box;
    padding: var(--spacing);
    margin-bottom: var(--spacing);
    width: var(--box-width);
    /* width: var(--box-width); */
    min-width: 300px;
    border-radius: var(--spacing);
    background-color: var(--light-5);
    box-shadow: 7px 7px 10px 0 rgba(0, 0, 0, 0.25);
  }
  @media screen and (max-width: 600px) {
    .feature-section section {
      --spacing: 2rem;
    }
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
