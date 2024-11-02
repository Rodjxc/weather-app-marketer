import { useQuery } from "react-query";
import type { forecastType } from "../types";

const fetchWeather = async (
  lat: number,
  lon: number
): Promise<forecastType> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  if (!response.ok) throw new Error("Failed to get weather data");

  const data = await response.json();
  return { ...data.city, list: data.list.slice(0, 16) };
};

export const useWeatherFetch = (lat: number, lon: number) => {
  return useQuery(["weather", lat, lon], () => fetchWeather(lat, lon), {
    retry: 2,
    staleTime: 1000 * 60 * 5,
    enabled: lat !== 0 && lon !== 0,
  });
};
