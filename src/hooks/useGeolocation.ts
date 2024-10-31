import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setError("Unable to retrieve your location.");
      }
    );
  }, []);

  return { coords, error };
};

// With this hook we can get the user's location on initial load. We then pass the coords to the navbar