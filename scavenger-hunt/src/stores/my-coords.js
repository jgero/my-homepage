import { writable } from "svelte/store";
import { getLogger } from "./debug-logger";

let myCoords;
let interval;
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
      startInterval: () => {
        // check if there is already an interval running
        if (interval) {
          return;
        }
        // update coordiantes every 20 seconds
        const fetchLocation = () => {
          navigator.geolocation.getCurrentPosition((position) => {
            myCoords.updateCoords(position.coords);
          });
        };
        fetchLocation();
        interval = setInterval(fetchLocation, 20000);
      },
      reset: () =>
        update(() => {
          // reset the interval if there was one
          clearInterval(interval);
          interval = null;
          // reset the data
          return null;
        }),
    };
  }
  return myCoords;
}
