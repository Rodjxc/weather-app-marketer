import { useState } from "react";
import type { optionType } from "../types";

export const useAutocomplete = () => {
  const [location, setLocation] = useState<string>("");
  const [options, setOptions] = useState<optionType[]>([]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    setOptions([]);
    if (value.trim() === "") return;

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch(() => console.error("Error fetching city suggestions"));
  };

  return { location, options, onInputChange, setLocation, setOptions };
};
