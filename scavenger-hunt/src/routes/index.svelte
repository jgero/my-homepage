<script>
  import { onMount, onDestroy } from 'svelte';
  import firebase from 'firebase/app';
  import { getLogger } from '../stores/debug-logger';
  let logger;
  let userId;
  let authListener;

  onMount(() => {
    logger = getLogger();
    // listen to auth state changes to restore login on app open
    authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid;
      } else {
        userId = null;
      }
      logger.log({
        logLevel: 'log',
        message: `auth state changed to uid: ${userId}`,
      });
    });
  });

  function createUser() {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        logger.log({
          logLevel: 'log',
          message: `logged in anonymously`,
        });
      })
      .catch((error) => {
        logger.log({
          logLevel: 'error',
          message: `could not log in anonymously: ${JSON.stringify(error)}`,
        });
      });
  }

  function resetUser() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        logger.log({
          logLevel: 'log',
          message: `logged out`,
        });
      })
      .catch((error) => {
        logger.log({
          logLevel: 'error',
          message: `could not log out: ${JSON.stringify(error)}`,
        });
      });
  }

  onDestroy(() => {
    // stop listening to the auth state
    if (authListener) {
      authListener();
    }
  });
</script>

<h1>scavenger hunt!</h1>

{#if userId === null}
  <button on:click={createUser}>START</button>
{:else}
  <a href={`/route/create/${userId}`}>Route erstellen</a>
  <br />
  <a href={`/route/join/${userId}`}>eigener Route beitreten</a>
  <br />
  <a href="/route/join">Route beitreten</a>
  <br />
  <button on:click={resetUser}>RESET</button>
{/if}
