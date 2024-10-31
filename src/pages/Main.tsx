import { Forecast } from "../components/Forecast";
import { Search } from "../components/Search";
import { useForecast } from "../hooks/useForecast";
import { Navbar } from "../components/Layout/Navbar";

export const Main = () => {
  const {
    forecast,
    location,
    options,
    onInputChange,
    onOptionSelect,
    onSubmit,
    locationError,
  } = useForecast();

  return (
    <main className="flex flex-col items-center justify-start min-h-screen space-y-8">
      <Navbar
        location={location}
        options={options}
        onInputChange={onInputChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
        locationError={locationError}
      />

      {!forecast ? (
        <Search
          location={location}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
          error={null}
        />
      ) : (
        <Forecast data={forecast} />
      )}
    </main>
  );
};
