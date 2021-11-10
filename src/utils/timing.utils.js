export const exactMinuteUpdate = (callback) => {
  const MINUTE_MS = 60000;

  const SECONDS_IN_CURRENT_MINUTE = new Date().getSeconds();
  const REMAINING_MS_IN_MINUTE = (60 - SECONDS_IN_CURRENT_MINUTE + 1.2) * 1000;

  const updateMinuteStart = setTimeout(() => {
    callback();
    const updateCurrentWeatherInterval = setInterval(() => {
      callback();
    }, MINUTE_MS);
    return () => clearInterval(updateCurrentWeatherInterval);
  }, REMAINING_MS_IN_MINUTE);
  return () => clearTimeout(updateMinuteStart);
};
