import { useState } from "react";
import type { forecastType } from "../types";

export const useWeatherFetch = () => {
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const fetchWeather = (lat: number, lon: number) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = { ...data.city, list: data.list.slice(0, 16) };
        setForecast(forecastData);
      })
      .catch((error) => console.log("Error fetching weather data:", error));
  };

  return { forecast, fetchWeather };
};
