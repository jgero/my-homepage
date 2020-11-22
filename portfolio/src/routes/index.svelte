<script>
  import { onMount, onDestroy } from "svelte";
  import Landingpage from "../components/startpage-views/Landingpage.svelte";
  import ProjectShowcase from "../components/startpage-views/ProjectShowcase.svelte";
  import AboutMe from "../components/startpage-views/AboutMe.svelte";
  import ContactMe from "../components/startpage-views/ContactMe.svelte";

  let fragment;
  const pages = ["#top", "#project_showcase", "#about_me", "#contact_me"];

  onMount(() => {
    window.addEventListener("hashchange", updateFragment);
    window.addEventListener("wheel", onScroll);
    fragment = window.location.hash;
  });

  onDestroy(() => {
    try {
      window.removeEventListener("hashchange", updateFragment);
      window.removeEventListener("wheel", onScroll);
    } catch (e) {
      fragment = undefined;
    }
  });

  function updateFragment() {
    fragment = window.location.hash;
  }

  let timer;
  function onScroll(ev) {
    clearTimeout(timer);
    const currentPageIndex = pages.findIndex((el) => el === fragment);
    if (ev.deltaY > 0) {
      // scroll down
      if (currentPageIndex === pages.length - 1) {
        // when already at the last page do nothing
        return;
      }
      timer = setTimeout(
        () => (window.location.hash = pages[currentPageIndex + 1]),
        100
      );
    } else {
      // scroll up
      if (currentPageIndex === 0) {
        // when already at the first page do nothing
        return;
      }
      timer = setTimeout(
        () => (window.location.hash = pages[currentPageIndex - 1]),
        100
      );
    }
  }
</script>

<style>
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

{#if fragment === '#top'}
  <Landingpage />
{:else if fragment === '#project_showcase'}
  <ProjectShowcase />
{:else if fragment === '#about_me'}
  <AboutMe />
{:else if fragment === '#contact_me'}
  <ContactMe />
{/if}
