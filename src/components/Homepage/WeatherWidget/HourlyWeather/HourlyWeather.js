/** @jsxImportSource @emotion/react */
import { useState, useRef, useContext } from "react";
import { AppContext } from "context/appContext";
import { css } from "@emotion/react";

import styles from "./HourlyWeather.module.css";

import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HourlyWeather({ forecast, isExpanded }) {
  const appContext = useContext(AppContext);

  const HOUR_FORECASTS_PER_SLIDE = 6;
  const HOUR_FORECASTS_ELEMENT_PIXEL_SIZE = 45;

  const HOUR_FORECAST_SECTION_PIXEL_SIZE =
    HOUR_FORECASTS_PER_SLIDE * HOUR_FORECASTS_ELEMENT_PIXEL_SIZE;

  const MAX_HOUR_SLIDE_INDEX = 3;

  const [hourSlideIndex, setHourSlideIndex] = useState(0);

  const slideContentRef = useRef();

  const ForecastCSS = css`
    display: flex;
    justify-content: flex-start;

    opacity: ${isExpanded ? "1" : "0"};

    position: relative;

    padding: 10px;
    margin: 0 10px 0 0;

    transition: all ease-in-out 0.75s;
    transition-property: opacity;

    margin: 10px 0 0 0;
  `;

  const HoursForecastWrapCSS = css`
    overflow: hidden;
  `;
  const HoursForecastCSS = css`
    display: flex;
    justify-content: flex-start;

    position: relative;

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
        return (
          <div key={i + "weather"} className={styles.weatherHour}>
            <h3>{i === 0 ? <strong>Now</strong> : weather.hour}</h3>
            <img src={weather.condition} alt={"weatherHour" + i} />
            <h3>{Math.round(weather.temperature) + "°" + appContext.temperatureUnit}</h3>
          </div>
        );
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
        <FontAwesomeIcon className={styles.buttonicon} icon={["fas", "arrow-left"]} />
      </Button>
      <div css={HoursForecastWrapCSS} className={styles.hourlyForecast}>
        <div ref={slideContentRef} css={HoursForecastCSS}>
          {getHourlyForecast()}
        </div>
      </div>
      <Button
        onClick={() =>
          hourSlideIndex < MAX_HOUR_SLIDE_INDEX && setHourSlideIndex(hourSlideIndex + 1)
        }
        size={"small"}
        variant="outlined"
      >
        <FontAwesomeIcon className={styles.buttonicon} icon={["fas", "arrow-right"]} />
      </Button>
    </div>
  );
}
