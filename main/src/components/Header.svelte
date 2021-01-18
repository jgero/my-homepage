<script>
  import { Button } from "component-lib";
</script>

<style>
  header {
    display: flex;
    background-image: linear-gradient(
      to right,
      var(--primary),
      var(--secondary)
    );
    margin: 3em;
    border-radius: 0.5em;
    align-items: center;
  }
  a {
    text-transform: uppercase;
    outline: none;
    text-decoration: none;
    color: var(--font);
    font-size: 1.5rem;
    margin: 1em;
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 400;
  }
  a:focus,
  a:active {
    text-decoration: underline;
  }
  span {
    flex: 1;
  }
  nav {
    display: flex;
  }
</style>

<header>
  <a href="/">Johannes Gerold</a>
  <span />
  <nav>
    <Button href="/blog" label="blog" style="flat" />
    <Button
      href="https://portfolio.jgero.me"
      target="_blank"
      label="portfolio"
      style="flat" />
    <Button href="/contact_me" label="contact me" style="flat" />
  </nav>
</header>
