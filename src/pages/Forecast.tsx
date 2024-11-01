import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from "../helpers";
import type { forecastType } from "../types";
import Sunrise from "../components/Icons/Sunrise";
import Sunset from "../components/Icons/Sunset";
import { Tile } from "../components/Tile";

type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }) => (
  <span>
    {temp}
    <sup>°</sup>
  </span>
);

export const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0];

  return (
    <div className="w-full max-w-[1200px] py-6 px-4 lg:px-8 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:space-x-8">
        {/* Left Section: City and Forecast Info */}
        <div className="flex flex-col w-full lg:w-1/3">
          <section className="text-center mb-6">
            <h2 className="text-2xl font-black">
              {data.name}
              <span className="font-thin">, {data.country}</span>
            </h2>
            <h1 className="text-3xl font-extrabold">
              <Degree temp={Math.round(today.main.temp)} />
            </h1>
            <p className="text-sm">
              {today.weather[0].main} {today.weather[0].description}
            </p>
            <p className="text-sm">
              Max: <Degree temp={Math.ceil(today.main.temp_max)} /> Min:
              <Degree temp={Math.floor(today.main.temp_min)} />
            </p>
          </section>
          <section className="flex overflow-x-scroll mt-4 pb-2">
            {data.list.map((item, i) => (
              <div
                className="inline-block text-center w-[50px] flex-shrink-0"
                key={i}
              >
                <p className="text-sm">
                  {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                />
                <p className="text-sm font-bold">
                  <Degree temp={Math.round(item.main.temp)} />
                </p>
              </div>
            ))}
          </section>
        </div>

        {/* Center Section - Sunrise/Sunset */}
        <div className="grid grid-cols-2 p-4 lg:grid-cols-1 gap-4 lg:gap-6 w-full lg:w-1/4 mb-4 sm:mb-6">
          <div className="w-full h-[130px] flex flex-col justify-center items-center text-xs font-bold bg-white/20 backdrop-blur-lg rounded-lg p-4">
            <Sunrise />
            <span className="mt-4">Sunrise {getSunTime(data.sunrise)}</span>
          </div>
          <div className="w-full h-[130px] flex flex-col justify-center items-center text-xs font-bold bg-white/20 backdrop-blur-lg rounded-lg p-4">
            <Sunset />
            <span className="mt-4">Sunset {getSunTime(data.sunset)}</span>
          </div>
        </div>

        {/* Right Section. I kept it here due to the complexity of using external dependencies and JS functions */}
        <div className="grid p-4 grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4 w-full lg:w-1/2">
          <Tile
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
          <Tile
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? "colder"
                : "warmer"
            }`}
          />
          <Tile
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity}%`}
            description={getHumidityValue(today.main.humidity)}
          />
          <Tile
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop)} mm`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
          <Tile
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"
            } than standard`}
          />
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={`${getVisibilityValue(today.visibility)}`}
          />
        </div>
      </div>
    </div>
  );
};
