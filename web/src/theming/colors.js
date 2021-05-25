import { writable } from 'svelte/store';

const themes = {
  dark: {
    primary: '#ff2020',
    secondary: '#dba915',
    background: '#3c3c3c',
    font: '#eeeded',
  },
  light: {
    primary: '#78ffce',
    secondary: '#c1f0ff',
    background: '#ffffff',
    font: '#000000',
  },
};

function createThemeStore() {
  const { subscribe, set, update } = writable(themes.light);
  return {
    subscribe,
    select: (themeName) =>
      update(() => {
        themeNameStore.set(themeName);
        return themes[themeName];
      }),
    reset: () => set(themes.light),
  };
}

export const theme = createThemeStore();
export const themeNameStore = writable('light');
