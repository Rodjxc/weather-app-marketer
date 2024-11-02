import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Forecast } from "../pages/Forecast";
import type { forecastType } from "../types";

const mockForecast: forecastType = {
  name: "London",
  country: "GB",
  sunrise: 1600000000,
  sunset: 1600050000,
  list: [
    {
      dt: 1600000000,
      visibility: 10000,
      main: {
        temp: 18,
        feels_like: 17,
        temp_min: 16,
        temp_max: 20,
        pressure: 1012,
        humidity: 80,
        visibility: 10000,
      },
      weather: [{ description: "cloudy", icon: "03d", main: "Clouds" }],
      clouds: { all: 90 },
      wind: { speed: 5, deg: 250, gust: 8 },
      pop: 0.3,
    },
  ],
};

describe("Forecast Component", () => {
  it("renders location name and temperature", () => {
    render(<Forecast data={mockForecast} />);

    // Check for location name
    expect(screen.getByText(/London/i)).toBeInTheDocument();

    // Find all elements with text `18`
    const tempElements = screen.getAllByText("18");

    // Use a specific attribute or surrounding context to check for the main temperature element
    // For example, you might ensure it's within a `text-3xl` or similar container
    const mainTemperatureElement = tempElements.find(
      (el) =>
        el.closest("h1") && el.closest("h1")?.classList.contains("text-3xl")
    );

    // Ensure the temperature element exists and is in the document
    expect(mainTemperatureElement).toBeInTheDocument();
  });
});
