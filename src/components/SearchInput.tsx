import React from "react";
import type { optionType } from "../types";

type SearchInputProps = {
  location: string;
  options: optionType[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
  locationError: string | null;
};

export const SearchInput = ({
  location,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
  locationError,
}: SearchInputProps): JSX.Element => {
  return (
    <div className="relative w-full max-w-[600px]">
      <div className="flex items-center">
        <input
          type="text"
          value={location}
          onChange={onInputChange}
          placeholder="Search for a location..."
          className="w-full px-4 py-2 rounded-l-md border-2 border-white text-black"
        />
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-r-md border-2 border-zinc-100 hover:bg-blue-400 hover:text-black px-2 py-2 cursor-pointer"
        >
          Search
        </button>
      </div>
      {options.length > 0 && (
        <ul className="absolute top-12 left-0 w-full bg-white rounded-b-md shadow-md text-gray-800 z-10">
          {options.map((option, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => onOptionSelect(option)}
                className="block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white"
              >
                {option.name}, {option.country}
              </button>
            </li>
          ))}
        </ul>
      )}
      {locationError && (
        <p className="text-red-500 text-xs mt-1">
          We couldn't find that location. Please check again
        </p>
      )}
    </div>
  );
};
