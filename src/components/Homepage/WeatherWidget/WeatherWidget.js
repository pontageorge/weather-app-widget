/** @jsxImportSource @emotion/react */
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppContext } from "context/appContext";
import { css } from "@emotion/react";

import { getCityWeather } from "requests/weather.requests";
import { getCityForecast } from "requests/weather.requests";
import { exactMinuteUpdate } from "utils/timing.utils";

import styles from "./WeatherWidget.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HourlyWeather from "./HourlyWeather/HourlyWeather";
import DailyWeather from "./DailyWeather/DailyWeather";

export default function WeatherWidget({ name, isFavourite }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [forecast, setForecast] = useState(undefined);
  const [weatherData, setWeatherData] = useState(undefined);

  useEffect(() => {
    const getForecast = async (name) => {
      const cityForecast = await getCityForecast(name);
      if (cityForecast.status === 200) {
        setForecast(cityForecast.data);
      } else {
        console.log("Error 500: API Not Responing");
      }
    };
    const getWeatherData = async () => {
      const currentLocation = await getCityWeather(name);
      if (currentLocation.status === 200) {
        console.log(currentLocation.data);
        setWeatherData(currentLocation.data);
        getForecast(currentLocation.data.location.name);
      } else {
        console.log("Error 500: API Not Responing");
      }
    };
    getWeatherData();

    return exactMinuteUpdate(getWeatherData);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const WidgetCSS = css`
    position: relative;

    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 5px;

    padding: 10px;
    margin: 0 10px 0 0;

    height: ${isExpanded ? "260" : "80"}px;
    width: ${isExpanded ? "420" : "200"}px;

    transition: all ease-in-out 0.75s;

    overflow: hidden;
  `;

  return (
    <div css={WidgetCSS} className={styles.componentWrap}>
      {weatherData && (
        <Fragment>
          {isExpanded && (
            <Helmet>
              <title>{"Viewing " + name}</title>
            </Helmet>
          )}
          <WidgetHeader weatherData={weatherData} />
          <HourlyWeather isExpanded={isExpanded} forecast={forecast} />
          <DailyWeather forecast={forecast} isExpanded={isExpanded} />
          <WidgetFooter
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            isFavourite={isFavourite}
            weatherData={weatherData}
          >
            <TemperatureMain weatherData={weatherData} />
            <Controls
              weatherData={weatherData}
              isFavourite={isFavourite}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          </WidgetFooter>
        </Fragment>
      )}
    </div>
  );
}

function WidgetHeader({ weatherData }) {
  const getCityLocalTime = (date) => {
    if (date) return date.split(" ")[1];
  };

  return (
    <div className={styles.headerWrap}>
      <h2 className={styles.headerCityName}>{weatherData.location.name}</h2>
      <h3 className={styles.headerCityTime}>{getCityLocalTime(weatherData.location.localtime)}</h3>
    </div>
  );
}

function WidgetFooter({ children }) {
  return <div className={styles.contentWrap}>{children}</div>;
}

function TemperatureMain({ weatherData }) {
  const appContext = useContext(AppContext);
  return (
    <div className={styles.temperatureWrap}>
      <h1 className={styles.temperature}>
        {(appContext.temperatureUnit === "C"
          ? weatherData.current.temp_c
          : weatherData.current.temp_f) +
          "°" +
          appContext.temperatureUnit}
      </h1>
      <img
        className={styles.conditionImage}
        src={weatherData.current.condition.icon}
        alt={"condition_icon"}
      />
    </div>
  );
}

function Controls({ weatherData, isFavourite, isExpanded, setIsExpanded }) {
  const appContext = useContext(AppContext);

  return (
    <div className={styles.cityControls}>
      <FontAwesomeIcon
        className={styles.favourite}
        icon={[isFavourite ? "fas" : "far", "heart"]}
        onClick={() =>
          isFavourite
            ? appContext.deleteFavouriteCity(weatherData.location.name)
            : appContext.addFavouriteCity(weatherData.location.name)
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
