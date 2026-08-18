/**
 * Calculates the distance between two coordinates using the Haversine formula.
 * @param {Object} coords1 - { latitude: Number, longitude: Number }
 * @param {Object} coords2 - { latitude: Number, longitude: Number }
 * @returns {Number|null} Distance in kilometers
 */
export const calculateHaversineDistance = (coords1, coords2) => {
  if (!coords1 || !coords2) return null;

  const toRadian = (angle) => (Math.PI / 180) * angle;
  const distance = (a, b) => (Math.PI / 180) * (a - b);
  
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const dLat = distance(coords2.latitude, coords1.latitude);
  const dLon = distance(coords2.longitude, coords1.longitude);

  const lat1 = toRadian(coords1.latitude);
  const lat2 = toRadian(coords2.latitude);

  // Haversine formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  
  const c = 2 * Math.asin(Math.sqrt(a));

  return RADIUS_OF_EARTH_IN_KM * c; 
};