import type { optionType } from "../types";
import { Logo } from "./Logo";

type Props = {
  location: string;
  error: string | null;
  options: optionType[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

export const Search = ({
  location,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
  error,
}: Props): JSX.Element => {
  return (
    <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-zinc-200">
      <Logo />
      <h1 className="text-4xl font-thin">
        Weather <span className="font-black">Forecast</span>
      </h1>
      <p className="text-sm mt-8">
        Enter a place you want to know the weather of and select an option from
        the dropdown
      </p>
      <div className="relative flex mt-4 w-full md:max-w-[500px]">
        {" "}
        {/* Add relative positioning here */}
        <input
          type="text"
          onChange={onInputChange}
          value={location}
          placeholder="Enter city or place..."
          className="px-2 py-1 rounded-l-md border-2 border-white text-black w-full"
        />
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-r-md border-2 border-zinc-100 hover:bg-blue-400 hover:text-black px-2 py-2 cursor-pointer"
        >
          Search
        </button>
        {options.length > 0 && (
          <ul className="absolute top-full left-0 mt-1 w-full bg-white rounded-b-md text-gray-600 shadow-lg max-h-48 overflow-y-auto z-10">
            {options.map((option: optionType, index: number) => (
              <li key={`${option.name}-${index}`}>
                <button
                  type="button"
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}, {option.country}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
};
