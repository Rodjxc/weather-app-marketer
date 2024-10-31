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

  const onOptionSelect = (option: optionType) => {
    setLocation(option.name);
    setSelectedCoords({ lat: option.lat, lon: option.lon });
    setOptions([]);
  };

  const onSubmit = () => {
    if (selectedCoords) {
      fetchWeather(selectedCoords.lat, selectedCoords.lon);
    }
  };

  return {
    location,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  };
};
