import axios from "axios";

export const getCityWeather = async (city) => {
  let response = await axios
    .post(
      "https://api.weatherapi.com/v1/current.json?key=" +
        process.env.REACT_APP_WEATHER_API_KEY +
        "&q=" +
        city +
        "&aqi=no"
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });

  return response;
};

export const getCityForecast = async (city) => {
  let response = await axios
    .post(
      "https://api.weatherapi.com/v1/forecast.json?key=" +
        process.env.REACT_APP_WEATHER_API_KEY +
        "&q=" +
        city +
        "&days=8&aqi=noo&alerts=no"
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const getSuggestionsForString = async (string) => {
  let response = await axios
    .post(
      "https://api.weatherapi.com/v1/search.json?key=" +
        process.env.REACT_APP_WEATHER_API_KEY +
        "&q=" +
        string
    )
    .then((res) => {
      return res.data.map((suggestion) => suggestion.name);
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};
