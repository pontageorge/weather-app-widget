import React, { useReducer } from "react";
import { AppContext } from "./appContext";
import PropTypes from "prop-types";

//---Actions------------------------------------------------------------------------------

import * as temperatureUnitActions from "./actions/temperatureUnitActions";
import * as favouriteCitiesActions from "./actions/favouriteCitiesActions";

//---Reducers-----------------------------------------------------------------------------

import { temperatureUnitReducer } from "./reducers/temperatureUnitReducer";
import { favouriteCitiesReducer } from "./reducers/favouriteCitiesReducer";

function AppProvider({ children }) {
  const [temperatureUnit, dispatchTemperatureUnit] = useReducer(temperatureUnitReducer, "C");
  const [favouriteCities, dispatchFavouriteCities] = useReducer(favouriteCitiesReducer, []);

  const appContextValue = {
    temperatureUnit: temperatureUnit,
    setTemperatureUnit: (unit) =>
      temperatureUnitActions.setTemperatureUnit(unit, dispatchTemperatureUnit),

    favouriteCities: favouriteCities,
    addFavouriteCity: (city) =>
      favouriteCitiesActions.addFavouriteCity(city, dispatchFavouriteCities),
    deleteFavouriteCity: (city) =>
      favouriteCitiesActions.deleteFavouriteCity(city, dispatchFavouriteCities),
  };

  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.object,
};

export default AppProvider;
