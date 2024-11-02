import { useState, useEffect } from "react";
import type { optionType, forecastType } from "../types";
import { useAutocomplete } from "./useAutocomplete";
import { useWeatherFetch } from "./useWeatherFetch";

export const useForecast = () => {
  const { location, options, onInputChange, setLocation, setOptions } =
    useAutocomplete();
  const [recentSearches, setRecentSearches] = useState<forecastType[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<{
    coords: { lat: number; lon: number } | null;
    forecast: forecastType | null;
  }>({
    coords: null,
    forecast: null,
  });

  const { data: forecast } = useWeatherFetch(
    selectedLocation.coords?.lat || 0,
    selectedLocation.coords?.lon || 0
  );

  const onOptionSelect = (option: optionType) => {
    setLocation(option.name);
    setSelectedLocation({
      coords: { lat: option.lat, lon: option.lon },
      forecast: null,
    });
    setOptions([]);
  };

  useEffect(() => {
    if (forecast) {
      setSelectedLocation((prev) => ({ ...prev, forecast }));
      setRecentSearches((prev) => [forecast, ...prev.slice(0, 4)]);
      setLocation("");
    }
  }, [forecast, setLocation]);

  const resetForecast = () => {
    setSelectedLocation({ coords: null, forecast: null });
  };

  return {
    location,
    options,
    forecast: selectedLocation.forecast,
    recentSearches,
    onInputChange,
    onOptionSelect,
    resetForecast,
  };
};
