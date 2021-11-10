import {
  ADD_FAVOURITE_CITY,
  DELETE_FAVOURITE_CITY,
  RUN_FAVOURITE_CITY_UPDATE,
} from "context/actionTypes";

import { getCityWeather } from "requests/weather.requests";

export const addFavouriteCity = async (city, dispatch) => {
  dispatch({
    type: ADD_FAVOURITE_CITY,
    payload: city,
  });
};

export const deleteFavouriteCity = async (city, dispatch) => {
  dispatch({
    type: DELETE_FAVOURITE_CITY,
    payload: city,
  });
};
