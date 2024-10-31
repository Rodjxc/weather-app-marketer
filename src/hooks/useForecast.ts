import type { optionType } from "../types";
import { useAutocomplete } from "./useAutocomplete";
import { useGeolocation } from "./useGeolocation";
import { useWeatherFetch } from "./useWeatherFetch";

export const useForecast = () => {
  const { coords, error: geolocationError } = useGeolocation();
  const { location, options, onInputChange, setLocation } = useAutocomplete();
  const { forecast, fetchWeather } = useWeatherFetch();

  const onOptionSelect = (option: optionType) => {
    setLocation(option.name);
    fetchWeather(option.lat, option.lon);
  };

  const onSubmit = () => {
    if (coords) {
      fetchWeather(coords.lat, coords.lon);
    }
  };

  return {
    location,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    error: geolocationError,
  };
};
