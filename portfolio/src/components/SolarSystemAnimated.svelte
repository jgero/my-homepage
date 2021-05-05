<figure>
  <div class="solar-system">
    <div class="orbit-1">
      <div class="body planet-1" />
      <div class="orbit-2">
        <div class="body planet-2" />
        <div class="orbit-3">
          <div class="body planet-3" />
          <div class="orbit-4">
            <div class="body planet-4" />
            <div class="body sun" />
          </div>
        </div>
      </div>
    </div>
  </div>
</figure>

<style>
  figure {
    transform: rotate(10deg);
  }
  .solar-system,
  figure {
    width: fit-content;
  }
  .solar-system {
    padding: 10px;
    transform: skew(-55deg, 10deg);
  }
  div[class^='orbit'],
  figure {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div[class^='orbit'] {
    border: 2px solid #d0d0d0;
    border-radius: 50%;
    position: relative;
  }
  .orbit-1 {
    height: 250px;
    width: 250px;
    animation: orbit 25s linear infinite;
  }
  .orbit-2 {
    height: 200px;
    width: 200px;
    animation: orbit 16s linear infinite;
  }
  .orbit-3 {
    height: 150px;
    width: 150px;
    animation: orbit 13s linear infinite;
  }
  .orbit-4 {
    height: 100px;
    width: 100px;
    animation: orbit 11s linear infinite;
  }

  .body {
    position: absolute;
    width: 15px;
    height: 15px;
    top: calc(-15px / 2);
    left: calc(50% - 15px / 2);
    border-radius: 50%;
  }
  .body.sun {
    background-color: #ffc700;
    position: unset;
    width: 25px;
    height: 25px;
  }
  .planet-1 {
    background-color: #449b00;
  }
  .planet-2 {
    background-color: #6e7cfc;
  }
  .planet-3 {
    background-color: #ba00a7;
  }
  .planet-4 {
    background-color: #ff7a00;
  }

  @keyframes orbit {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
