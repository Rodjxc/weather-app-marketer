export const App = () => {
	return (
		<main className="flex justify-center items-center h-[100vh] w-full">
			<section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-zinc-200">
				<h1 className="text-4xl font-thin">
					Weather <span className="font-black">Forecast</span>
				</h1>
				<p className="text-sm mt-8">
					Enter a place you want to know the weather of and select an option
					from dropdown
				</p>
				<div className="flex mt-4">
					<input
						type="text"
						value={""}
						placeholder="Check the weather of..."
						className="px-2 py-1 rounded-l-md border-2 border-white"
					/>
					<button
						type="button"
						className="rounded-r-md border-2 border-zinc-100 hover:bg-blue-400 hover:text-black px-2 py-2 cursor-pointer"
					>
						Search
					</button>
				</div>
			</section>
		</main>
	);
};
