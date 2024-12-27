export const getDistance = (distance) =>
  distance < 999
    ? `${distance}m away`
    : `${(distance / 1000).toFixed(2)} km away`;
