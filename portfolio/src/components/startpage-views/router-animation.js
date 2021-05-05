import { crossfade, fly } from 'svelte/transition';

export const [send, receive] = crossfade({
  duration: 1400,
  fallback: (node, params) => {
    const { duration } = params;
    return fly(node, { duration, x: -200 });
  },
});
