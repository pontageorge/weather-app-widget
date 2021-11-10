import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "context/appContext";

import { getSuggestionsForString } from "requests/weather.requests";

import styles from "./FindCity.module.css";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import WeatherWidget from "components/Homepage/WeatherWidget/WeatherWidget";

export default function FindCity() {
  const appContext = useContext(AppContext);

  const [city, setCity] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getSuggestionsList = async () => {
      if (city) {
        const listOfSuggestedCities = await getSuggestionsForString(city);
        setCitySuggestions(listOfSuggestedCities);
      }
    };
    getSuggestionsList();
  }, [city]);

  const handleCityChange = (event, newValue) => {
    setCity(newValue);
  };

  const getCityNameOnly = (fullString) => {
    return fullString.split(",")[0];
  };

  const isCurrentLocationFavourite = () => {
    return appContext.favouriteCities.includes(selectedCity);
  };

  return (
    <div className={styles.componentWrap}>
      <h2>Lookup locations </h2>
      <Autocomplete
        className={styles.autocompleteInput}
        disablePortal
        id="autocomplete-cities"
        options={citySuggestions}
        getOptionDisabled={(option) => {
          return (
            appContext.favouriteCities.includes(getCityNameOnly(option)) ||
            getCityNameOnly(option) === selectedCity
          );
        }}
        sx={{ width: 300 }}
        inputValue={city}
        value={null}
        onInputChange={handleCityChange}
        onChange={(event, newValue) => {
          event.defaultMuiPrevented = true;
          if (newValue) {
            setSelectedCity(getCityNameOnly(newValue));
            setCitySuggestions([]);
            setCity("");
          }
        }}
        renderInput={(params) => <TextField {...params} label="Cities" />}
      />
      {selectedCity && !appContext.favouriteCities.includes(selectedCity) && (
        <WeatherWidget
          key={selectedCity}
          name={selectedCity}
          isFavourite={isCurrentLocationFavourite()}
        />
      )}
    </div>
  );
}
