import { useState } from "react";
import type { forecastType } from "../types";

export const useWeatherFetch = () => {
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const fetchWeather = async (
    lat: number,
    lon: number
  ): Promise<forecastType | null> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      const forecastData = { ...data.city, list: data.list.slice(0, 16) };
      setForecast(forecastData);
      return forecastData;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  return { forecast, fetchWeather };
};
