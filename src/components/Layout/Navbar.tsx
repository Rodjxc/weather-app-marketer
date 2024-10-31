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
};

export const Navbar = ({
  location,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: NavbarProps): JSX.Element => {
  const { coords, error } = useGeolocation();
  const [locationName, setLocationName] = useState("Your Location");
  const [countryName, setCountryName] = useState("");
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
          setCountryName(data.city.country); // Set the country name
          setTemperature(Math.round(data.list[0].main.temp));
        })
        .catch(() => {
          console.error("Unable to retrieve weather data for your location.");
        });
    }
  }, [coords]);

  return (
    <nav className="w-full bg-navbar text-white p-4 flex justify-center items-center shadow-md">
      <div className="text-lg font-semibold mr-auto">
        <FaMapMarkerAlt className="inline-block mr-1" />
        {error || `${locationName}, ${countryName}`}{" "}
        {/* Display city and country */}
      </div>

      <div className="mx-4">
        <SearchInput
          location={location}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      </div>

      {temperature !== null && (
        <div className="text-lg font-semibold ml-auto">{temperature}°C</div>
      )}
    </nav>
  );
};
