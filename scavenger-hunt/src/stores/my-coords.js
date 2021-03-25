import { writable } from "svelte/store";
import { getLogger } from "./debug-logger";

let myCoords;
let logger = getLogger();

export function getMyCoords() {
  if (!myCoords) {
    const { subscribe, update } = writable(null);
    myCoords = {
      subscribe,
      updateCoords: ({ latitude, longitude, accuracy, heading }) => {
        logger.log({ logLevel: "log", message: "location was updated" });
        return update(() => ({ latitude, longitude, accuracy, heading }));
      },
      reset: () => update(() => null),
    };
  }
  return myCoords;
}
