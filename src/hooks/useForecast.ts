import { useState, useEffect } from "react";
import type { optionType, forecastType } from "../types";

export const useForecast = () => {
  const [location, setLocation] = useState<string>("");
  // the main value the user types, to get a list of locations. Comes from the input

  const [options, setOptions] = useState<optionType[]>([]);
  // the list of locations that the user can select from

  const [city, setCity] = useState<optionType | null>(null);
  // the selected location

  const [forecast, setForecast] = useState<forecastType | null>(null);
  // the forecast for the selected location
  const [error, setError] = useState<string | null>(null);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      // I trimmed the value because the API doesn't like spaces
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
      });
  };
  // we search for the location using the API

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.trim() === "") return; // Only skip if the trimmed value is entirely empty

    getSearchOptions(value.trim()); // Trim only before sending the request
  };

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${
        city.lon
      }&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = { ...data.city, list: data.list.slice(0, 7) };
        //we'll only get the first 7 days of the forecast
        setForecast(forecastData);
      })
      .catch((e) => console.log(e));
  };

  const onSubmit = () => {
    if (!city && options.length === 0) {
      setError("No matching cities found. Please try a different location.");
    } else {
      setError(null); // Clear any previous errors
      if (city) getForecast(city); // Only fetch if a city is selected
    }
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setLocation(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    location,
    error,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  };
};
