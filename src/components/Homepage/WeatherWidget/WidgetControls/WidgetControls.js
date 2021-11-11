import React, { useContext } from "react";
import { AppContext } from "context/appContext";

import styles from "./WidgetControls.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFullLocationName } from "utils/string.utils";

export default function WidgetControls({ isExpanded, setIsExpanded, isFavourite, weatherData }) {
  const appContext = useContext(AppContext);

  return (
    <div className={styles.cityControls}>
      <FontAwesomeIcon
        className={styles.favourite}
        icon={[isFavourite ? "fas" : "far", "heart"]}
        onClick={() =>
          isFavourite
            ? appContext.deleteFavouriteCity(getFullLocationName(weatherData.location))
            : appContext.addFavouriteCity(getFullLocationName(weatherData.location))
        }
      />
      <FontAwesomeIcon
        className={styles.expand}
        onClick={() => setIsExpanded(!isExpanded)}
        icon={["fas", isExpanded ? "compress-arrows-alt" : "expand-arrows-alt"]}
      />
    </div>
  );
}
