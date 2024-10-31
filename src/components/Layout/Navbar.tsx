import { FaMapMarkerAlt } from "react-icons/fa";
import { useGeolocation } from "../../hooks/useGeolocation";
import { SearchInput } from "../SearchInput";
import type { optionType } from "../../types";
import { useEffect, useState } from "react";

type NavbarProps = {
  location: string;
  options: optionType[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
  locationError: string | null;
};

export const Navbar = ({
  location,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
  locationError,
}: NavbarProps): JSX.Element => {
  const { coords, error: geolocationError } = useGeolocation();
  const [locationName, setLocationName] = useState("Your Location");
  const [countryCode, setCountryCode] = useState("");
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    if (coords) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          coords.lat
        }&lon=${coords.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLocationName(data.city.name);
          setCountryCode(data.city.country);
          setTemperature(Math.round(data.list[0].main.temp));
        })
        .catch(() => {
          console.error("Unable to retrieve weather data for your location.");
        });
    }
  }, [coords]);

  return (
    <nav className="w-full bg-navbar text-white p-4 flex items-center shadow-md justify-between">
      {/* Left side: Location and Temperature */}
      <div className="text-lg font-semibold flex items-center space-x-2">
        <FaMapMarkerAlt className="inline-block mr-1" />
        <span>
          {geolocationError ? "Location Unavailable" : `${locationName}, `}
          {countryCode && <span className="font-thin">{countryCode} -</span>}
        </span>
        {temperature !== null && <span>{temperature}°C</span>}
      </div>

      {/* Right side: Search Input */}
      <div>
        <SearchInput
          location={location}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
          locationError={locationError}
        />
      </div>
    </nav>
  );
};
