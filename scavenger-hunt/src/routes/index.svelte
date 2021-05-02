<script>
    import { onMount } from 'svelte';
    import { getUserId } from '../stores/user.js';

    let userId;

    onMount(() => {
        userId = getUserId();
    });
</script>

<main>
    <header>
        <h1>
            <span>Erlebe deine Umgebung neu mit</span> <br />
            <span class="top">einer digitalen</span><span class="big"
                >Schnitzeljagd</span
            >
        </h1>
        <a href="/about">Impressum</a>
    </header>
    <div class="spacer" />
    <section>
        <p>Spiele mit Freunden:</p>
        <a href="/join"
            ><span class="material-icons">moving</span> Route beitreten</a
        >
        <a href={`/create`}
            ><span class="material-icons">edit</span> Route erstellen</a
        >
        <p>Oder erkunde Routen alleine:</p>
        <a href="/join/static"
            ><span class="material-icons">place</span> Routen entdecken</a
        >
    </section>
    <div class="spacer" />
    <svg viewBox="0 0 390 274"
        ><use href="images/illustration.svg#illustration" /></svg
    >
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .spacer {
        flex: 1;
    }
    header {
        display: flex;
        justify-content: center;
    }
    h1 {
        font-size: 16px;
        padding-top: 12vh;
        margin: 0;
        font-weight: normal;
    }
    h1 span.top {
        vertical-align: top;
    }
    h1 span.big {
        font-size: 36px;
        font-weight: bold;
        color: var(--primary);
        margin-left: 0.2rem;
    }
    header a {
        position: fixed;
        top: 8px;
        right: 8px;
        color: var(--primary);
        opacity: 0.6;
    }

    section {
        margin: 0 2rem;
    }
    section a {
        background-color: var(--primary);
        border-radius: 6px;
        color: white;
        text-decoration: none;
        display: flex;
        align-items: center;
        width: max-content;
        padding: 0.2rem 1rem;
        margin: 0.5rem;
    }
    section a span {
        margin-right: 0.2rem;
    }
    section a:nth-of-type(1) {
        margin-left: 1.5rem;
    }
    section a:nth-of-type(2) {
        margin-left: 3rem;
    }
    section a:nth-of-type(3) {
        margin-left: 4.5rem;
    }
    svg {
        width: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
    }
</style>
