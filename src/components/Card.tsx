import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useGeolocation } from "../hooks/useGeolocation";
import type { forecastType } from "../types";

type CurrentWeatherType = {
  location: string;
  country: string;
  temp: number;
  icon: string;
};

type CardProps = {
  recentSearches: forecastType[];
};

export const Card = ({ recentSearches }: CardProps): JSX.Element => {
  const { coords } = useGeolocation();
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherType | null>(null);

  useEffect(() => {
    if (coords) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          coords.lat
        }&lon=${coords.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCurrentWeather({
            location: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            icon: data.weather[0].icon,
          });
        })
        .catch(() => console.error("Unable to retrieve weather data."));
    }
  }, [coords]);

  return (
    <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-zinc-200">
      <Logo />
      <h1 className="text-4xl font-thin">
        Weather <span className="font-black">Forecast</span>
      </h1>
      {currentWeather && (
        <div className="mt-4 flex flex-col items-center space-y-2">
          <p className="text-xl font-semibold">
            Your location: {currentWeather.location},{" "}
            <span className="font-thin">{currentWeather.country}</span>
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
            alt="Current weather icon"
            className="w-16 h-16"
          />
          <p className="text-2xl font-bold">{currentWeather.temp}°C</p>
        </div>
      )}

      {/* Display recent searches */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
        <ul className="space-y-2">
          {recentSearches.map((search, index) => (
            <li key={index} className="text-sm">
              <span className="font-bold">{search.name}</span>, {search.country}{" "}
              - {Math.round(search.list[0].main.temp)}°C
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
