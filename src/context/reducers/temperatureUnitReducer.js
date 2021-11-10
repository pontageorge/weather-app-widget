import { SET_TEMPERATURE_UNIT } from "context/actionTypes";

export const temperatureUnitReducer = (state, action) => {
  switch (action.type) {
    case SET_TEMPERATURE_UNIT:
      return action.payload;
    default:
      return state;
  }
};
