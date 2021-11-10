import { SET_TEMPERATURE_UNIT } from "context/actionTypes";

export const setTemperatureUnit = (unit, dispatch) => {
  dispatch({
    type: SET_TEMPERATURE_UNIT,
    payload: unit,
  });
};
