<script>
  let email;
  let name;
  let message;
</script>

<style>
  header {
    width: fit-content;
  }
  header > div {
    background-color: var(--dark-4);
    height: 2px;
  }

  .input-container {
    position: relative;
    margin-top: 0.4rem;
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
  input,
  textarea {
    outline: none;
    padding: 0.4rem;
    font-size: 1rem;
    font-family: "DM Sans", sans-serif;
    background-color: var(--light-4);
    color: var(--dark-2);
    border: none;
    border-bottom: 2px solid;
    border-bottom-color: var(--light-3);
    transition: border-bottom-color 0.2s linear;
    border-radius: 4px 4px 0 0;
  }
  input:focus,
  textarea:focus {
    border-bottom-color: var(--light-1);
  }
</style>

<header>
  <h1>contact me</h1>
  <div />
  <h2>johannes.gerold.ext@gmail.com</h2>
</header>

<div class="input-container">
  <input type="text" id="email" bind:value={email} />
  <label for="email" class={email ? 'stowed' : ''}>E-Mail</label>
</div>
<div class="input-container">
  <input type="text" id="name" bind:value={name} />
  <label for="name" class={name ? 'stowed' : ''}>Name</label>
</div>
<div class="input-container">
  <textarea id="message" cols="30" rows="10" bind:value={message} />
  <label for="message" class={message ? 'stowed' : ''}>Message</label>
</div>
