type LogoProps = {
  onClick?: () => void;
};

export const Logo = ({ onClick }: LogoProps): JSX.Element => {
  return (
    <img
      src="/logo-white.png"
      alt="Weather App Logo"
      className="w-24 h-auto hover:cursor-pointer"
      onClick={onClick || undefined}
    />
  );
};
