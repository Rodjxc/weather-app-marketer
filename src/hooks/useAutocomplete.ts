import { useState } from "react";
import type { optionType } from "../types";

export const useAutocomplete = () => {
  const [location, setLocation] = useState<string>("");
  const [options, setOptions] = useState<optionType[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);

  const getSearchOptions = async (value: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );

      if (!response.ok) throw new Error("Failed to fetch city suggestions");

      const data = await response.json();

      if (data.length === 0) {
        // No results found
        setLocationError("No matching locations found.");
        setOptions([]);
      } else {
        setOptions(data);
        setLocationError(null);
      }
    } catch (error) {
      // API request failed
      console.error("Error fetching city suggestions:", error);
      setLocationError(
        "Could not retrieve suggestions. Check your connection."
      );
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    setOptions([]);
    setLocationError(null);

    if (value.trim() === "") {
      setLocationError("Please enter a location.");
      return;
    }

    getSearchOptions(value.trim());
  };

  return {
    location,
    options,
    onInputChange,
    setLocation,
    setOptions,
    locationError,
  };
};
