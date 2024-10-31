import { useState } from "react";
import type { optionType } from "../types";

export const useAutocomplete = () => {
  const [location, setLocation] = useState<string>("");
  const [options, setOptions] = useState<optionType[]>([]);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
      });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    if (value.trim() === "") return;
    getSearchOptions(value.trim());
  };

  return { location, options, onInputChange, setLocation };
};
