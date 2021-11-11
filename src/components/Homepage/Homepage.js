import React, { useEffect, useState } from "react";

import styles from "./Homepage.module.css";

import Controls from "./Controls/Controls";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import FavouriteCities from "./FavouriteCities/FavouriteCities";
import FindCity from "./FindCity/FindCity";

export default function Homepage() {
  const [geolocation, setGeolocation] = useState(undefined);

  const DEFAULT_CITY = "London, City of London, Greater London, United Kingdom";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator]);

  function getPosition(position) {
    setGeolocation(position.coords.latitude + "," + position.coords.longitude);
  }

  return (
    <div className={styles.componentWrap}>
      <h1>My weather App</h1>
      <Controls />
      <div className={styles.contentWrap}>
        <FavouriteCities />
        <div className={styles.citiesSection}>
          <h2>{geolocation ? "Current location" : "Featured location"}</h2>
          <div className={styles.weatherWidgetsWrap}>
            <WeatherWidget query={geolocation ? geolocation : DEFAULT_CITY} />
          </div>
        </div>
        <FindCity />
      </div>
    </div>
  );
}
