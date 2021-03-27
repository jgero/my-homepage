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

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
