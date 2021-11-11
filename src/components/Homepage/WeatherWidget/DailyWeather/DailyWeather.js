/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { AppContext } from "context/appContext";
import { css } from "@emotion/react";

import styles from "./DailyWeather.module.css";

export default function DailyWeather({ forecast }) {
  const appContext = useContext(AppContext);

  const ForecastCSS = css`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    padding: 10px;
  `;

  const getDailyForecast = () => {
    if (forecast) {
      let next7DaysForecast = [];

      for (var i = 1; i <= 7; i++) {
        if (forecast.forecast.forecastday[i]) {
          var theDayForecast = forecast.forecast.forecastday[i].day;
          next7DaysForecast.push({
            min_temp: theDayForecast["mintemp_" + appContext.temperatureUnit.toLowerCase()],
            max_temp: theDayForecast["maxtemp_" + appContext.temperatureUnit.toLowerCase()],
            date: forecast.forecast.forecastday[i].date,
            condition: theDayForecast.condition.icon,
          });
        }
      }

      return next7DaysForecast.map((day) => {
        return <DayWeatherElement key={day.date} day={day} />;
      });
    }
  };

  return <div css={ForecastCSS}>{getDailyForecast()}</div>;
}

function DayWeatherElement({ day }) {
  const arrayOfDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className={styles.dayForecast} key={day.date}>
      <h4>{arrayOfDays[new Date(day.date).getDay()]}</h4>
      <img src={day.condition} alt={day.date} />
      <h4 className={styles.temperatures}>{Math.round(day.max_temp)}</h4>
      <h4 className={styles.temperatures}>{Math.round(day.min_temp)}</h4>
    </div>
  );
}
