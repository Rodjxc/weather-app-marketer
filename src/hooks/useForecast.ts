import { useState } from "react";
import type { optionType } from "../types";
import { useAutocomplete } from "./useAutocomplete";
import { useWeatherFetch } from "./useWeatherFetch";

export const useForecast = () => {
  const { location, options, onInputChange, setLocation, setOptions } =
    useAutocomplete();
  const { forecast, fetchWeather } = useWeatherFetch();
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const onOptionSelect = (option: optionType) => {
    setLocation(option.name);
    setSelectedCoords({ lat: option.lat, lon: option.lon });
    setOptions([]);
    setLocationError(null); // Clear any previous error on valid selection
  };

  const onSubmit = () => {
    // If no location was selected or options list is empty, set error
    if (!selectedCoords) {
      setLocationError("Please select a valid location from the list");
      return;
    }

    // If selectedCoords are available, clear error and fetch weather
    fetchWeather(selectedCoords.lat, selectedCoords.lon);
    setLocationError(null);
  };

  return {
    location,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    locationError,
  };
};
