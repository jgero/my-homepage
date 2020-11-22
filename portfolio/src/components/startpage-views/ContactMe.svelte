<script>
  import { fly } from "svelte/transition";

  let email = "";
  let name = "";
  let message = "";

  async function sendContactInfo() {
    // sanatize input here and add regexes
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
    const json = await res.json();
    let result = JSON.stringify(json);
    console.log(result);
  }
</script>

<style>
  div.container {
    display: grid;
    grid-template-rows: 1fr 3fr 1fr;
    grid-template-columns: min-content auto;
    grid-template-areas: ". ." "header form" ". .";
    padding: 2rem;
    box-sizing: border-box;
    height: 100%;
  }
  header {
    grid-area: header;
  }
  header > div {
    background-color: var(--dark-4);
    height: 2px;
  }

  form {
    grid-area: form;
    width: 400px;
    justify-self: center;
    display: flex;
    flex-direction: column;
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
  div.input-container:nth-child(3) {
    flex: 1;
  }
  input,
  textarea {
    outline: none;
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
</style>

<div class="container">
  <header out:fly={{ x: -200, duration: 200 }}>
    <h1 in:fly={{ x: -200, duration: 1500, delay: 0 }}>contact me</h1>
    <div in:fly={{ x: -200, duration: 1500, delay: 200 }} />
    <h2 in:fly={{ x: -200, duration: 1500, delay: 400 }}>
      johannes.gerold.ext@gmail.com
    </h2>
  </header>

  <form
    out:fly={{ x: 200, duration: 200 }}
    on:submit|preventDefault={sendContactInfo}>
    <div in:fly={{ x: 200, duration: 1500, delay: 0 }} class="input-container">
      <input type="text" id="email" bind:value={email} />
      <label for="email" class={email ? 'stowed' : ''}>E-Mail</label>
    </div>
    <div
      in:fly={{ x: 200, duration: 1500, delay: 200 }}
      class="input-container">
      <input type="text" id="name" bind:value={name} />
      <label for="name" class={name ? 'stowed' : ''}>Name</label>
    </div>
    <div
      in:fly={{ x: 200, duration: 1500, delay: 400 }}
      class="input-container">
      <textarea id="message" bind:value={message} />
      <label for="message" class={message ? 'stowed' : ''}>Message</label>
    </div>
    <button in:fly={{ x: 200, duration: 1500, delay: 600 }} class="primary">send
      message</button>
  </form>
</div>
