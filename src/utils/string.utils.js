export const getFullLocationName = (weatherLocation) => {
  return weatherLocation.name + ", " + weatherLocation.region + ", " + weatherLocation.country;
};
