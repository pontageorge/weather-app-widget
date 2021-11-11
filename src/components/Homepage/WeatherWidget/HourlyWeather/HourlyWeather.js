/** @jsxImportSource @emotion/react */
import { useState, useContext } from "react";
import { AppContext } from "context/appContext";
import { css } from "@emotion/react";

import styles from "./HourlyWeather.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "@mui/material/Button";

export default function HourlyWeather({ forecast }) {
  const appContext = useContext(AppContext);

  const HOUR_FORECASTS_PER_SLIDE = 6;
  const HOUR_FORECASTS_ELEMENT_PIXEL_SIZE = 45;

  const HOUR_FORECAST_SECTION_PIXEL_SIZE =
    HOUR_FORECASTS_PER_SLIDE * HOUR_FORECASTS_ELEMENT_PIXEL_SIZE;

  const MAX_HOUR_SLIDE_INDEX = 3;

  const [hourSlideIndex, setHourSlideIndex] = useState(0);

  const ForecastCSS = css`
    display: flex;
    justify-content: flex-start;

    padding: 10px;

    margin: 10px 0 0 0;
  `;

  const HoursForecastWrapCSS = css`
    overflow: hidden;
  `;
  const HoursForecastCSS = css`
    display: flex;
    justify-content: flex-start;

    transform: translateX(-${HOUR_FORECAST_SECTION_PIXEL_SIZE * hourSlideIndex}px);

    transition: all ease-in-out 0.5s;
  `;

  const getHourlyForecast = () => {
    if (forecast) {
      let currentHour = new Date(forecast.location.localtime).getHours();

      let weatherForEachNext24Hours = [];

      let hoursLeftCurrentDay = [];

      for (var i = currentHour; i < 24; i++) {
        var theHourForecast = forecast.forecast.forecastday[0].hour[i];
        hoursLeftCurrentDay.push({
          temperature: theHourForecast["temp_" + appContext.temperatureUnit.toLowerCase()],
          hour: i,
          condition: theHourForecast.condition.icon,
        });
      }

      let hoursAfterNextDay = [];

      for (var j = 0; j < currentHour; j++) {
        var theHourForecastNextDay = forecast.forecast.forecastday[1].hour[j];
        hoursAfterNextDay.push({
          temperature: theHourForecastNextDay["temp_" + appContext.temperatureUnit.toLowerCase()],
          hour: j,
          condition: theHourForecastNextDay.condition.icon,
        });
      }

      weatherForEachNext24Hours = [...hoursLeftCurrentDay, ...hoursAfterNextDay];

      return weatherForEachNext24Hours.map((weather, i) => {
        return <HourWeatherElement key={"weather" + i} weather={weather} index={i} />;
      });
    }
  };

  return (
    <div css={ForecastCSS}>
      <Button
        onClick={() => hourSlideIndex > 0 && setHourSlideIndex(hourSlideIndex - 1)}
        size={"small"}
        variant="outlined"
      >
        <FontAwesomeIcon icon={["fas", "arrow-left"]} />
      </Button>
      <div css={HoursForecastWrapCSS}>
        <div css={HoursForecastCSS}>{getHourlyForecast()}</div>
      </div>
      <Button
        onClick={() =>
          hourSlideIndex < MAX_HOUR_SLIDE_INDEX && setHourSlideIndex(hourSlideIndex + 1)
        }
        size={"small"}
        variant="outlined"
      >
        <FontAwesomeIcon icon={["fas", "arrow-right"]} />
      </Button>
    </div>
  );
}

function HourWeatherElement({ weather, index }) {
  const appContext = useContext(AppContext);

  return (
    <div className={styles.hourWeatherElement}>
      <h3>{index === 0 ? <strong>Now</strong> : weather.hour}</h3>
      <img src={weather.condition} alt={"weatherHour" + index} />
      <h3>{Math.round(weather.temperature) + "°" + appContext.temperatureUnit}</h3>
    </div>
  );
}
