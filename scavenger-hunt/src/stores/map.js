import { writable } from "svelte/store";
import { getLogger } from "./debug-logger";

let map;
let logger = getLogger();

export function getMap() {
  if (!map) {
    const { subscribe, update } = writable({
      innerSize: 200,
      padding: 75,
      outerSize: 350,
      xOffset: null,
      yOffset: null,
      xSpan: null,
      ySpan: null,
    });
    map = {
      subscribe,
      updateCoordSystemFromLocations: (locations) => {
        logger.log({
          logLevel: "log",
          message: "resize map coordiante system",
        });
        const xOffset = Math.min(...locations.map((el) => el.longitude));
        const yOffset = Math.min(...locations.map((el) => el.latitude));
        const xSpan =
          Math.max(...locations.map((el) => el.longitude)) - xOffset;
        const ySpan = Math.max(...locations.map((el) => el.latitude)) - yOffset;
        return update((old) => ({ ...old, xOffset, yOffset, xSpan, ySpan }));
      },
    };
  }
  return map;
}

export function getPositionOnMap(map, coords) {
  const { xOffset, yOffset, xSpan, ySpan, innerSize, padding } = map;
  const xPositionPercent = (coords.longitude - xOffset) / xSpan;
  const yPositionPercent = (coords.latitude - yOffset) / ySpan;
  const xPositionAbsolute = xPositionPercent * innerSize + padding;
  const yPositionAbsolute = yPositionPercent * innerSize + padding;
  return {
    x: xPositionAbsolute,
    y: yPositionAbsolute,
  };
}
