import { useState } from "react";
import { Forecast } from "../components/Forecast";
import { Search } from "../components/Search";
import { useForecast } from "../hooks/useForecast";
import { Navbar } from "../components/Layout/Navbar";

export const Main = () => {
  const [isSearching, setIsSearching] = useState(true); // Start with Search by default
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

      {/* Conditionally render Search or Forecast based on isSearching state */}
      {isSearching ? (
        <Search
          location={location}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={() => {
            onSubmit();
            setIsSearching(false); // Switch to Forecast after submission
          }}
          error={null}
        />
      ) : (
        forecast && <Forecast data={forecast} />
      )}

      {/* Toggle button for Search */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setIsSearching((prev) => !prev)}
      >
        {isSearching ? "View Forecast" : "Search for Another Location"}
      </button>
    </main>
  );
};
