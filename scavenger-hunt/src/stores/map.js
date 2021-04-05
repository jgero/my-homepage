import { writable } from 'svelte/store';
import { getLogger } from './debug-logger';
import {
  getDistanceFromLatLonDiffInKm,
  getLatDiffForKm,
  getLonDiffForKm,
} from '../utils/coordinates-to-meters';

let map;
let logger = getLogger();

export function getMap() {
  if (!map) {
    const { subscribe, update } = writable({
      innerSize: 200,
      padding: 75,
      outerSize: 350,
      lonMin: null,
      latMin: null,
      lonDelta: null,
      latDelta: null,
      lonKmInDeg: null,
      latKmInDeg: null,
      kmLengthOnMap: null,
    });
    map = {
      subscribe,
      updateCoordSystemFromLocations: (locations) => {
        return update((oldMap) => {
          const newMap = {
            ...oldMap,
            ...buildCoordSystemFromLocations(locations),
          };
          newMap.kmLengthOnMap = getPositionOnMap(newMap, {
            latitude: newMap.latMin,
            longitude: newMap.lonMin + newMap.lonKmInDeg,
          }).x;
          return newMap;
        });
      },
    };
  }
  return map;
}

function buildCoordSystemFromLocations(locations) {
  let lonMin = Math.min(...locations.map((el) => el.longitude));
  let latMin = Math.min(...locations.map((el) => el.latitude));
  let lonDelta = Math.max(...locations.map((el) => el.longitude)) - lonMin;
  let latDelta = Math.max(...locations.map((el) => el.latitude)) - latMin;
  // both ned a longitude as reference
  const lonKmInDeg = getLonDiffForKm(lonMin, 1);
  const latKmInDeg = getLatDiffForKm(lonMin, 1);
  const lonFrameKm = getDistanceFromLatLonDiffInKm(0, lonDelta);
  const latFrameKm = getDistanceFromLatLonDiffInKm(latDelta, 0);

  if (lonFrameKm > latFrameKm) {
    // longitude span is larger
    // what lat delta is the same length as the lon frame?
    const latDeltaForLonFrameSize = getLatDiffForKm(lonMin, lonFrameKm);
    // subtract the latDelta from the lat delta for the lon frame to get how much "padding" is needed
    // divided by 2 because it gets added on both sides
    const latPaddingToLonFrame = (latDeltaForLonFrameSize - latDelta) / 2;
    // remove the padding from the latMin because we want to stretch the lat frame
    latMin = latMin - latPaddingToLonFrame;
    latDelta = latDeltaForLonFrameSize;
  } else {
    // latitude span is larger
    // what lat delta is the same length as the lat frame?
    const lonDeltaForLatFrameSize = getLonDiffForKm(latMin, latFrameKm);
    // subtract the lonDelta from the lon delta for the lat frame to get how much "padding" is needed
    // divided by 2 because it gets added on both sides
    const lonPaddingToLatFrame = (lonDeltaForLatFrameSize - lonDelta) / 2;
    // remove the padding from the latMin because we want to stretch the lat frame
    lonMin = lonMin - lonPaddingToLatFrame;
    lonDelta = lonDeltaForLatFrameSize;
  }

  // calculate deviation between adding up the one meter degs compared to the distance between the map size in degs
  const deviationLonInM =
    Math.round(getDistanceFromLatLonDiffInKm(0, lonKmInDeg) * 1000) - 1000;
  const deviationLatInM =
    Math.round(getDistanceFromLatLonDiffInKm(latKmInDeg, 0) * 1000) - 1000;
  if (deviationLatInM + deviationLonInM < 40) {
    logger.log({
      logLevel: 'log',
      message: 'calculated map dimensions with minimal unit deviation',
    });
  } else if (deviationLonInM + deviationLatInM < 120) {
    logger.log({
      logLevel: 'warning',
      message: `calculated map with deviation lon: ${deviationLonInM}m and deviation lat: ${deviationLatInM}m`,
    });
  } else {
    logger.log({
      logLevel: 'error',
      message: `calculated map with deviation lon: ${deviationLonInM}m and deviation lat: ${deviationLatInM}m`,
    });
  }
  return { lonMin, lonDelta, lonKmInDeg, latMin, latDelta, latKmInDeg };
}

export function getPositionOnMap(map, coords) {
  // x: longitude; y: latitude
  const {
    lonMin,
    lonDelta,
    latMin,
    latDelta,
    innerSize,
    padding,
    outerSize,
  } = map;
  const xPositionPercent = (coords.longitude - lonMin) / lonDelta;
  const yPositionPercent = (coords.latitude - latMin) / latDelta;
  // to work for ° east calculate from left
  const xPositionAbsolute = xPositionPercent * innerSize + padding;
  // to work for ° north calculate from bottom
  const yPositionAbsolute =
    outerSize - (yPositionPercent * innerSize + padding);

  return {
    x: xPositionAbsolute,
    y: yPositionAbsolute,
  };
}
