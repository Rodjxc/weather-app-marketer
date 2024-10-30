import { useState, useEffect } from "react";
import type { optionType } from "../types";

export const useForecast = () => {
	const [location, setLocation] = useState<string>("");
	// the main value the user types, to get a list of locations. Comes from the input

	const [options, setOptions] = useState<optionType[]>([]);
	// the list of locations that the user can select from

	const [city, setCity] = useState<optionType | null>(null);
	// the selected location

	const [forecast, setForecast] = useState<null>(null);
	// the forecast for the selected location

	const getSearchOptions = (value: string) => {
		fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${import.meta.env.VITE_API_KEY}`,
		)
			// I trimmed the value because the API doesn't like spaces
			.then((res) => res.json())
			.then((data) => {
				setOptions(data);
			});
	};
	// we search for the location using the API

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();
		// We trim upfront so the value doesn't have trailing spaces
		setLocation(value);

		if (value === "") return;

		getSearchOptions(value);
	};

	const getForecast = (city: optionType) => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`,
		)
			.then((res) => res.json())
			.then((data) => setForecast(data));
	};

	const onSubmit = () => {
		if (!city) return;
		getForecast(city);
	};

	const onOptionSelect = (option: optionType) => {
		setCity(option);
	};

	useEffect(() => {
		if (city) {
			setLocation(city.name);
			setOptions([]);
		}
	}, [city]);

	return {
		location,
		options,
		forecast,
		onInputChange,
		onOptionSelect,
		onSubmit,
	};
};
