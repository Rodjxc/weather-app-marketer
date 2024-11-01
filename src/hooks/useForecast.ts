import { useState } from "react";
import type { optionType, forecastType } from "../types";
import { useAutocomplete } from "./useAutocomplete";
import { useWeatherFetch } from "./useWeatherFetch";

export const useForecast = () => {
  const { location, options, onInputChange, setLocation, setOptions } =
    useAutocomplete();
  const { fetchWeather } = useWeatherFetch();
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const [recentSearches, setRecentSearches] = useState<forecastType[]>([]);

  const onOptionSelect = (option: optionType) => {
    setLocation(option.name);
    setSelectedCoords({ lat: option.lat, lon: option.lon });
    setOptions([]);
    setLocationError(null);
  };

  const onSubmit = async () => {
    setLocationError(null);

    if (!selectedCoords) {
      setLocationError("Please select a valid location from the list");
      return;
    }

    const fetchedForecast = await fetchWeather(
      selectedCoords.lat,
      selectedCoords.lon
    );
    if (fetchedForecast) {
      setForecast(fetchedForecast);
      setRecentSearches((prev) => [fetchedForecast, ...prev.slice(0, 4)]); // Keep last 5 searches
    } else {
      setLocationError("Unable to fetch weather data. Please try again.");
    }
  };

  return {
    location,
    options,
    forecast,
    recentSearches,
    onInputChange,
    onOptionSelect,
    onSubmit,
    locationError,
  };
};
