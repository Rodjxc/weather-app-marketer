import { Forecast } from "./Forecast";
import { Card } from "../components/Card";
import { useForecast } from "../hooks/useForecast";
import { Navbar } from "../components/Layout/Navbar";
import { RecentSearches } from "../components/RecentSearches";

export const Main = () => {
  const {
    forecast,
    location,
    options,
    recentSearches,
    onInputChange,
    onOptionSelect,
    onSubmit,
    locationError,
  } = useForecast();

  return (
    <main className="flex flex-col items-center justify-start min-h-screen space-y-8 bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400">
      <Navbar
        location={location}
        options={options}
        onInputChange={onInputChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
        locationError={locationError}
      />
      {!forecast ? (
        <Card />
      ) : (
        <>
          <Forecast data={forecast} />
          <RecentSearches searches={recentSearches} />
        </>
      )}
    </main>
  );
};
