import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";
import type { optionType } from "../types";
import { Search } from "../components/Search";

export const Main = () => {
	const [location, setLocation] = useState<string>("");
	const [options, setOptions] = useState<optionType[]>([]);
	const [city, setCity] = useState<optionType | null>(null);

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
			.then((data) => {
				console.log(data);
			});
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

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Logo />
			<Search
				location={location}
				options={options}
				onInputChange={onInputChange}
				onOptionSelect={onOptionSelect}
				onSubmit={onSubmit}
			/>
		</div>
	);
};
