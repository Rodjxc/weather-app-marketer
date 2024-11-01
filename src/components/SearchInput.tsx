import React, { useState } from "react";
import type { optionType } from "../types";
import { FaMagnifyingGlass } from "react-icons/fa6";

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
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveOptionIndex((prevIndex) =>
        prevIndex < options.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setActiveOptionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : options.length - 1
      );
    } else if (e.key === "Enter") {
      // Select the highlighted option or submit
      if (activeOptionIndex >= 0 && activeOptionIndex < options.length) {
        onOptionSelect(options[activeOptionIndex]);
        setActiveOptionIndex(-1); // Reset index after selection
      } else {
        onSubmit();
      }
    }
  };

  return (
    <div className="relative w-full max-w-[600px]">
      <div className="flex items-center">
        <input
          type="text"
          value={location}
          onChange={(e) => {
            onInputChange(e);
            setActiveOptionIndex(-1); // Reset index when input changes
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search for a location..."
          className="w-full px-4 py-2 rounded-l-md border-2 border-white text-black"
        />
        <button
          type="button"
          onClick={onSubmit}
          title="Search"
          aria-label="Search for location"
          className="rounded-r-md border-2 border-zinc-100 hover:bg-zinc-400 hover:text-black px-3 py-3 cursor-pointer"
        >
          <FaMagnifyingGlass />
        </button>
      </div>
      {options.length > 0 && location && (
        <ul className="absolute top-12 left-0 w-full bg-white rounded-b-md shadow-md text-gray-800 z-10">
          {options.map((option, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => onOptionSelect(option)}
                className={`block w-full text-left px-4 py-2 ${
                  index === activeOptionIndex
                    ? "bg-zinc-700 text-white"
                    : "hover:bg-zinc-700 hover:text-white"
                }`}
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
