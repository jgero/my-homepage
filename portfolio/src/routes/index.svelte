<script>
  import { onMount, onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import Sidebar from '../components/Sidebar.svelte';
  import Landingpage from '../components/startpage-views/Landingpage.svelte';
  import ProjectShowcase from '../components/startpage-views/ProjectShowcase.svelte';
  import AboutMe from '../components/startpage-views/AboutMe.svelte';
  import ContactMe from '../components/startpage-views/ContactMe.svelte';

  let fragment;
  const pages = ['#top', '#project_showcase', '#about_me', '#contact_me'];

  onMount(() => {
    window.addEventListener('hashchange', updateFragment);
    window.addEventListener('wheel', onScroll);
    window.addEventListener('touchmove', onScroll);
    fragment = window.location.hash;
  });

  onDestroy(() => {
    try {
      window.removeEventListener('hashchange', updateFragment);
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('touchmove', onScroll);
    } catch (e) {
      fragment = undefined;
    }
  });

  function updateFragment() {
    fragment = window.location.hash;
  }

  let timer;
  let delta;
  let firstTouchPosition;
  function onScroll(ev) {
    clearTimeout(timer);
    const currentPageIndex = pages.findIndex((el) => el === fragment);
    if (ev.deltaY) {
      // wheel event
      delta = ev.deltaY;
    } else if (ev.changedTouches) {
      // touchmove event
      if (!firstTouchPosition) {
        // set where the touch starts
        firstTouchPosition = ev.changedTouches[0].pageY;
      } else {
        // calculate delta
        delta = firstTouchPosition - ev.changedTouches[0].pageY;
      }
    } else {
      return;
    }

    if (delta > 0) {
      // scroll down
      if (currentPageIndex === pages.length - 1) {
        // when already at the last page do nothing
        return;
      }
      timer = setTimeout(() => {
        window.location.hash = pages[currentPageIndex + 1];
        // reset values
        delta = firstTouchPosition = undefined;
      }, 100);
    } else {
      // scroll up
      if (currentPageIndex === 0) {
        // when already at the first page do nothing
        return;
      }
      timer = setTimeout(() => {
        window.location.hash = pages[currentPageIndex - 1];
        // reset values
        delta = firstTouchPosition = undefined;
      }, 100);
    }
  }
</script>

<main out:fly={{ x: -200, duration: 200 }}>
  <Sidebar />
  <div>
    {#if fragment === '#top'}
      <Landingpage />
    {:else if fragment === '#project_showcase'}
      <ProjectShowcase />
    {:else if fragment === '#about_me'}
      <AboutMe />
    {:else if fragment === '#contact_me'}
      <ContactMe />
    {/if}
  </div>
</main>

<style>
  main {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 4rem;
    overflow: hidden;
    display: flex;
  }

  div {
    flex: 1;
  }
</style>
