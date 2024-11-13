import { useForecast } from "../../hooks/useForecast";
import { Forecast } from "../../pages/Forecast";
import { Card } from "../Card";
import { RecentSearches } from "../RecentSearches";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Main = () => {
  const {
    forecast,
    location,
    options,
    recentSearches,
    onInputChange,
    resetForecast,
    onOptionSelect,
  } = useForecast();

  return (
    <main className="flex flex-col items-center justify-start min-h-screen space-y-8 bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400">
      <Navbar
        location={location}
        options={options}
        onInputChange={onInputChange}
        onOptionSelect={onOptionSelect}
        resetForecast={resetForecast}
      />
      {!forecast ? (
        <Card recentSearches={recentSearches} />
      ) : (
        <>
          <Forecast data={forecast} />
          <RecentSearches searches={recentSearches} />
        </>
      )}
      <Footer />
    </main>
  );
};
