import Feels from "./Icons/Feels";
import Humidity from "./Icons/Humidity";
import Pop from "./Icons/Pop";
import Pressure from "./Icons/Pressure";
import Visibility from "./Icons/Visibility";
import Wind from "./Icons/Wind";

type Props = {
  icon: "wind" | "humidity" | "pressure" | "visibility" | "pop" | "feels";
  title: string;
  info: string | JSX.Element; //because it can be also a Degree component withthe temp
  description: string;
};

const icons = {
  wind: Wind,
  humidity: Humidity,
  pressure: Pressure,
  visibility: Visibility,
  pop: Pop,
  feels: Feels,
};

export const Tile = ({
  icon,
  title,
  info,
  description,
}: Props): JSX.Element => {
  const Icon = icons[icon];
  return (
    <article className="w-[140px] h-[130px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5 text-white">
      <div className="flex items-center text-sm font-bold">
        <Icon />
        <h4 className="ml-1">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg">{info}</h3>
      <p className="text-xs font-bold">{description}</p>
    </article>
  );
};
