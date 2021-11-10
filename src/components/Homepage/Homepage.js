import React, { useContext } from "react";
import { AppContext } from "context/appContext";

import styles from "./Homepage.module.css";

import Controls from "./Controls/Controls";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import FavouriteCities from "./FavouriteCities/FavouriteCities";
import FindCity from "./FindCity/FindCity";

export default function Homepage() {
  const appContext = useContext(AppContext);

  const isCurrentLocationFavourite = () => {
    return appContext.favouriteCities.includes("London");
  };

  return (
    <div className={styles.componentWrap}>
      <h1>My weather App</h1>
      <Controls />
      <div className={styles.contentWrap}>
        <FavouriteCities />
        <div className={styles.citiesSection}>
          <h2>Current location</h2>
          <div className={styles.weatherWidgetsWrap}>
            <WeatherWidget name={"London"} isFavourite={isCurrentLocationFavourite()} />
          </div>
        </div>
        <FindCity />
      </div>
    </div>
  );
}
