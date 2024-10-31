import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useGeolocation } from "../../hooks/useGeolocation";

export const Navbar = (): JSX.Element => {
  const [locationName, setLocationName] = useState("Your Location");
  const { coords, error } = useGeolocation();
  const [country, setCountry] = useState<string | null>(null);
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
          setCountry(data.city.country);
          setTemperature(Math.round(data.list[0].main.temp));
        })
        .catch(() => {
          console.error("Unable to retrieve weather data for your location.");
        });
    }
  }, [coords]);

  return (
    <nav className="w-full bg-navbar text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-lg font-semibold">
        {error || (
          <>
            <FaMapMarkerAlt className="inline-block mr-1" /> {locationName}
            {country && <span className="font-thin">, {country}</span>}
          </>
        )}
      </div>
      {temperature !== null && (
        <div className="text-lg font-semibold">{temperature}°C</div>
      )}
    </nav>
  );
};
