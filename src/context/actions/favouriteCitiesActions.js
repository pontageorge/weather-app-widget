import { ADD_FAVOURITE_CITY, DELETE_FAVOURITE_CITY } from "context/actionTypes";

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
