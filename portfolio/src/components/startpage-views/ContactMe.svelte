<script>
  import { fly } from "svelte/transition";

  let email = "";
  let name = "";
  let message = "";
  let resultMessage = "";

  const messageRegExp = new RegExp("^[\\w\\näöüÄÖÜ .,-?!]+$");

  function checkMessage() {
    document
      .getElementById("message")
      .setCustomValidity(
        messageRegExp.test(message) ? "" : "Please match the requested format."
      );
  }

  async function sendContactInfo() {
    document.getElementById("submit-button").disabled = true;
    resultMessage = "Sending E-Mail...";
    const res = await fetch("/contact.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });
    const response = await res.json();
    if (response.success) {
      // show snackbar
      resultMessage = "E-Mail was sent successfully!";
      setTimeout(() => {
        resultMessage = "";
      }, 5000);
      // clear inputs
      email = "";
      name = "";
      message = "";
    } else {
      resultMessage = "Something went wrong";
      setTimeout(() => {
        resultMessage = "";
      }, 5000);
      console.error(`Sending mail failed with: ${response.message}`);
    }
    document.getElementById("submit-button").disabled = false;
  }
</script>

<style>
  div.container {
    display: grid;
    height: 100%;
    padding: 10vh 2rem;
    box-sizing: border-box;
    grid-template-columns: 1fr 3fr;
    grid-template-areas: "header form";
  }
  @media screen and (max-width: 600px) {
    div.container {
      padding: 5vh 2rem;
      grid-template-columns: auto;
      grid-template-rows: 1fr 3fr;
      grid-template-areas: "header" "form";
    }
  }
  header {
    grid-area: header;
    width: max-content;
    justify-self: center;
  }
  @media screen and (max-width: 600px) {
    header {
      justify-self: unset;
    }
  }
  header > div {
    background-color: var(--dark-4);
    height: 2px;
  }
  header > h1 {
    margin-top: 1em;
  }
  h1,
  h2 {
    margin: 1rem 0;
  }

  form {
    grid-area: form;
    width: 400px;
    padding: 10vh;
    justify-self: center;
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    form {
      padding: 0;
      width: 200px;
      justify-self: unset;
    }
  }

  form:invalid > button,
  button:disabled {
    opacity: 0.4;
  }

  .input-container {
    position: relative;
    margin-top: 0.4rem;
    margin-block-end: 1em;
  }
  .input-container > label {
    position: absolute;
    color: var(--dark-5);
    top: 0.4rem;
    left: 0.4rem;
    transition: all 0.2s ease-out;
  }
  .input-container > input:focus + label,
  .input-container > textarea:focus + label,
  .input-container > label.stowed {
    top: -0.5rem;
    font-size: 0.5rem;
  }
  .input-container > input:invalid + label.stowed,
  .input-container > textarea:invalid + label.stowed {
    color: var(--warn);
  }
  div.input-container:nth-child(3) {
    flex: 1;
  }
  input,
  textarea {
    outline: none;
    box-shadow: none;
    padding: 0.4rem;
    width: 100%;
    font-size: 1rem;
    font-family: "DM Sans", sans-serif;
    background-color: var(--light-4);
    color: var(--dark-2);
    border: none;
    border-bottom: 2px solid;
    border-bottom-color: var(--light-3);
    transition: border-bottom-color 0.2s linear;
    border-radius: 4px 4px 0 0;
    box-sizing: border-box;
  }
  textarea {
    resize: none;
    height: 100%;
  }
  input:focus,
  textarea:focus {
    border-bottom-color: var(--light-1);
  }
  p.snackbar {
    position: fixed;
    bottom: 5em;
    left: 10em;
    background: var(--light-3);
    padding: 0.5em 2em;
    max-width: 300px;
    border-radius: 0.4em;
  }
</style>

<svelte:head>
  <title>Johannes Gerold - contact me</title>
</svelte:head>

<div class="container">
  <header out:fly={{ x: -200, duration: 200 }}>
    <h1 in:fly={{ x: -200, duration: 1500, delay: 0 }}>contact me</h1>
    <div in:fly={{ x: -200, duration: 1500, delay: 200 }} />
    <h2 in:fly={{ x: -200, duration: 1500, delay: 400 }}>mail@jgero.me</h2>
  </header>

  <form
    out:fly={{ x: 200, duration: 200 }}
    on:submit|preventDefault={sendContactInfo}>
    <div in:fly={{ x: 200, duration: 1500, delay: 0 }} class="input-container">
      <input type="email" id="email" required bind:value={email} />
      <label for="email" class={email ? 'stowed' : ''}>E-Mail</label>
    </div>
    <div
      in:fly={{ x: 200, duration: 1500, delay: 200 }}
      class="input-container">
      <input
        type="text"
        id="name"
        required
        pattern="^[\wäöüÄÖÜ .-]+$"
        bind:value={name} />
      <label for="name" class={name ? 'stowed' : ''}>Name</label>
    </div>
    <div
      in:fly={{ x: 200, duration: 1500, delay: 400 }}
      class="input-container">
      <textarea
        id="message"
        required
        on:change={checkMessage}
        bind:value={message} />
      <label for="message" class={message ? 'stowed' : ''}>Message</label>
    </div>
    <button
      type="submit"
      id="submit-button"
      in:fly={{ x: 200, duration: 1500, delay: 600 }}
      class="primary">send message</button>
  </form>
</div>
{#if resultMessage !== ''}
  <p transition:fly={{ y: 70, duration: 200 }} class="snackbar">
    {resultMessage}
  </p>
{/if}
