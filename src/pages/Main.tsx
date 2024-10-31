import { useState } from "react";
import { Forecast } from "../components/Forecast";
import { Search } from "../components/Search";
import { useForecast } from "../hooks/useForecast";
import { Navbar } from "../components/Layout/Navbar";

export const Main = () => {
  const [isSearching, setIsSearching] = useState(true);
  const {
    forecast,
    location,
    options,
    onInputChange,
    onOptionSelect,
    onSubmit,
  } = useForecast();

  return (
    <main className="flex flex-col items-center justify-start min-h-screen space-y-8">
      <Navbar />

      {isSearching ? (
        <Search
          location={location}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={() => {
            onSubmit();
            setIsSearching(false);
          }}
          error={null}
        />
      ) : (
        forecast && <Forecast data={forecast} />
      )}
    </main>
  );
};
