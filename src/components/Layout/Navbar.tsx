import { SearchInput } from "../SearchInput";
import type { optionType } from "../../types";
import { Logo } from "../Logo";

type NavbarProps = {
  location: string;
  options: optionType[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
  locationError: string | null;
};

export const Navbar = ({
  location,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
  locationError,
}: NavbarProps): JSX.Element => {
  return (
    <nav className="w-full bg-navbar text-white flex justify-center items-center shadow-md">
      <div className="text-lg font-semibold mr-auto">
        <Logo />
      </div>

      <div className="mx-4">
        <SearchInput
          location={location}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
          locationError={locationError}
        />
      </div>
    </nav>
  );
};
