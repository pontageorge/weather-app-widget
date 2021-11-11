import React, { useContext } from "react";
import { AppContext } from "context/appContext";

import styles from "./CurrentTemperature.module.css";

export default function CurrentTemperature({ weatherData }) {
  const appContext = useContext(AppContext);

  return (
    <div className={styles.temperatureWrap}>
      <h1 className={styles.temperature}>
        {Math.round(
          appContext.temperatureUnit === "C"
            ? weatherData.current.temp_c
            : weatherData.current.temp_f
        ) +
          "°" +
          appContext.temperatureUnit}
      </h1>
      <img
        className={styles.conditionImage}
        src={weatherData.current.condition.icon}
        alt={"main_temp_condition_icon"}
      />
    </div>
  );
}
