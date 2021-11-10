import { ADD_FAVOURITE_CITY, DELETE_FAVOURITE_CITY } from "context/actionTypes";

export const favouriteCitiesReducer = (state, action) => {
  switch (action.type) {
    case ADD_FAVOURITE_CITY:
      return [action.payload, ...state];
    case DELETE_FAVOURITE_CITY:
      let queryCityIndex = state.findIndex((city) => city === action.payload);

      if (queryCityIndex > -1) {
        state.splice(queryCityIndex, 1);
      }
      return [...state];
    default:
      return state;
  }
};
