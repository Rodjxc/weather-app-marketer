import type { forecastType } from "../types";
import { FaMapMarkerAlt } from "react-icons/fa";

type RecentSearchesProps = {
  searches: forecastType[];
};

export const RecentSearches = ({ searches }: RecentSearchesProps) => {
  if (searches.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-[900px]">
      <h3 className="text-xl font-semibold mb-6 text-white">Recent Searches</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searches.map((search, index) => (
          <div
            key={index}
            className="p-4 bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-lg shadow-lg flex flex-col items-center"
          >
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-400" />
              <h4 className="text-lg font-bold">
                {search.name}, {search.country}
              </h4>
            </div>
            <p className="text-2xl font-bold my-2">
              {Math.round(search.list[0].main.temp)}°C
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${search.list[0].weather[0].icon}@2x.png`}
              alt="Weather icon"
              className="w-12 h-12"
            />
            <p className="text-sm text-gray-300 mt-2 capitalize">
              {search.list[0].weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
