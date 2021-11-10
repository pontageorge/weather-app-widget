import React, { useContext } from "react";
import { AppContext } from "context/appContext";

import styles from "./FavouriteCities.module.css";

import WeatherWidget from "../WeatherWidget/WeatherWidget";

export default function FavouriteCities() {
  const appContext = useContext(AppContext);

  return (
    <div className={styles.citiesSection}>
      <h2>Favourite locations</h2>
      <div className={styles.weatherWidgetsWrap}>
        {appContext.favouriteCities.map((city, i) => (
          <WeatherWidget key={city} query={city} isFavourite />
        ))}
        {appContext.favouriteCities.length === 0 && <h3>You have no favourite cities</h3>}
      </div>
    </div>
  );
}
