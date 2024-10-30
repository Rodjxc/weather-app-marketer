import { Search } from "../components/Search";
import { useForecast } from "../hooks/useForecast";

export const Main = () => {
	const {
		location,
		options,
		forecast,
		onInputChange,
		onOptionSelect,
		onSubmit,
	} = useForecast();

	return (
		<main className="flex justify-center items-center h-[100vh] w-full">
			<div className="flex flex-col items-center justify-center h-screen">
				{forecast ? (
					"We have a forecast"
				) : (
					<Search
						location={location}
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
