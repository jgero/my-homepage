<script>
import Topics from "./_Topics.svelte";

  const topics = [
    {
      icon: 'directions_run',
      text: `Sport is a very important part of my life. I have been doing acrobatics for 13 years at a local
            club, at which I am a coach for multiple groups as well. Additionally to the organized sport, I am
            inline skating and running outside, so I am active more or less every day.`,
    },
    {
      icon: 'public',
      text: `Space, astronomy, space probes and space travel are a fascinating science. Seeing the wonders
            of our universe and how they are discovered inspires and motivates me to be productive every day.`,
    },
  ];
</script>

<main>
<h1>who am i?</h1>

<p>I am a passionate software developer born in 1998 in Baden-Württemberg, Germany. While studying
for my Bachelors degree in Aalen from 2016 to 2020, programming became not only my future
profession, but also a beloved free-time activity. Right after finishing my Bachelors degree I
started my Masters degree in 2020.  Web development has been my main focus, most of my bigger
projects are showcased on this website.  </p>

{#each topics as topic}
	<section>
	<h2>
      <span class="material-icons">{topic.icon}</span>
	</h2>
      <p>{topic.text}</p>
	</section>
{/each}

</main>


