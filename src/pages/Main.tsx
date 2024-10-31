import { Forecast } from "../components/Forecast";
import { Search } from "../components/Search";
import { useForecast } from "../hooks/useForecast";

export const Main = () => {
  const {
    location,
    options,
    error,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  } = useForecast();

  return (
    <main className="flex justify-center items-center h-[100vh] w-full">
      <div className="flex flex-col items-center justify-center h-screen">
        {forecast ? (
          <Forecast data={forecast} />
        ) : (
          <Search
            location={location}
            error={error}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </main>
  );
};
