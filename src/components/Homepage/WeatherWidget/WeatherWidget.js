/** @jsxImportSource @emotion/react */
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppContext } from "context/appContext";
import { css } from "@emotion/react";

import { getCityWeather } from "requests/weather.requests";
import { getCityForecast } from "requests/weather.requests";
import { exactMinuteUpdate } from "utils/timing.utils";

import { WidgetHeader, WidgetFooter, WidgetContent } from "./WidgetSections/WidgetSections";
import HourlyWeather from "./HourlyWeather/HourlyWeather";
import DailyWeather from "./DailyWeather/DailyWeather";
import WidgetControls from "./WidgetControls/WidgetControls";
import CurrentTemperature from "./CurrentTemperature/CurrentTemperature";
import { getFullLocationName } from "utils/string.utils";

export default function WeatherWidget({ query }) {
  const appContext = useContext(AppContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [forecast, setForecast] = useState(undefined);
  const [weatherData, setWeatherData] = useState(undefined);

  useEffect(() => {
    const getForecast = async (query) => {
      const cityForecast = await getCityForecast(query);
      if (cityForecast.status === 200) {
        setForecast(cityForecast.data);
      } else {
        console.log("Error 500: API Not Responing");
      }
    };
    const getWeatherData = async () => {
      const currentLocation = await getCityWeather(query);
      if (currentLocation.status === 200) {
        setWeatherData(currentLocation.data);
        getForecast(currentLocation.data.location.name);
      } else {
        console.log("Error 500: API Not Responing");
      }
    };
    getWeatherData();

    return exactMinuteUpdate(getWeatherData);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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

  const isCurrentLocationFavourite = () => {
    return appContext.favouriteCities.includes(getFullLocationName(weatherData.location));
  };

  return (
    <div css={WidgetCSS}>
      {weatherData && (
        <Fragment>
          {isExpanded && (
            <Helmet>
              <title>{"Viewing " + (weatherData ? weatherData.location.name : query)}</title>
            </Helmet>
          )}
          <WidgetHeader weatherData={weatherData} />
          <WidgetContent isExpanded={isExpanded}>
            <HourlyWeather isExpanded={isExpanded} forecast={forecast} />
            <DailyWeather forecast={forecast} isExpanded={isExpanded} />
          </WidgetContent>
          <WidgetFooter>
            <CurrentTemperature weatherData={weatherData} />
            <WidgetControls
              weatherData={weatherData}
              isFavourite={isCurrentLocationFavourite()}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          </WidgetFooter>
        </Fragment>
      )}
    </div>
  );
}
