// TODO: add dark and light theme colors
export const colorPalette = {
  primary: "#78ffce",
  secondary: "#c1f0ff",
  background: "#fcfcfc",
  font: "#000000",
};

// TODO: return dark or light theme depending on the value set in a store
export function getStyleString() {
  let styleString = "";
  for (let color in colorPalette) {
    styleString += `--${color}: ${colorPalette[color]};`;
  }
  return styleString;
}

export function applyColorPalette(node) {
  node.style = getStyleString();
  // TODO: maybe some on destroy logic has to be returned here if the store values are selected by custom events and not by store
  return null;
}
