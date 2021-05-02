// radius of the earth in km
const R = 6371;

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    return getDistanceFromLatLonDiffInKm(lat2 - lat1, lon2 - lon1);
}

export function getDistanceFromLatLonDiffInKm(latDiff, lonDiff) {
    // deg to rad
    var dLat = deg2rad(latDiff);
    var dLon = deg2rad(lonDiff);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(0)) *
            Math.cos(deg2rad(latDiff)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // distance in km
    var d = R * c;
    return d;
}

export function getLatDiffForKm(lat, km) {
    const getDiffFor = km * 1000;
    // calculate how many meters are in 1° lat
    const metersIn1DegLat =
        111132.954 -
        559.822 * Math.cos(2 * deg2rad(lat)) +
        1.175 * Math.cos(4 * deg2rad(lat));
    // get ratio of these meters and the provided meters
    // this is the same as the lat diff, because the meters were calculated for one °
    return getDiffFor / metersIn1DegLat;
}

export function getLonDiffForKm(lat, km) {
    const getDiffFor = km * 1000;
    const metersIn1DegLon =
        (Math.PI / 180) * (R * 1000) * Math.cos(deg2rad(lat));
    return getDiffFor / metersIn1DegLon;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
