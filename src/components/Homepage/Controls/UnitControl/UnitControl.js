import React, { useContext } from "react";
import { AppContext } from "context/appContext";

import styles from "./UnitControl.module.css";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

export default function UnitControl({}) {
  const appContext = useContext(AppContext);

  const handleTemperatureUnit = (event, newUnit) => {
    if (newUnit) appContext.setTemperatureUnit(newUnit);
  };

  return (
    <ToggleButtonGroup
      value={appContext.temperatureUnit}
      exclusive
      onChange={handleTemperatureUnit}
    >
      <ToggleButton value="C" aria-label="right aligned">
        <h3 className={styles.temperatureButtonText}>°C</h3>
      </ToggleButton>
      <ToggleButton value="F" aria-label="left aligned">
        <h3 className={styles.temperatureButtonText}>°F</h3>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
