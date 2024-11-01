import Feels from "./Icons/Feels";
import Humidity from "./Icons/Humidity";
import Pop from "./Icons/Pop";
import Pressure from "./Icons/Pressure";
import Visibility from "./Icons/Visibility";
import Wind from "./Icons/Wind";

type Props = {
  icon: "wind" | "humidity" | "pressure" | "visibility" | "pop" | "feels";
  title: string;
  info: string | JSX.Element;
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
    <article className="p-4 text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg mb-5 text-white">
      <div className="flex items-center text-sm font-bold mb-1">
        <Icon />
        <h4 className="ml-1">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg">{info}</h3>
      <p className="text-xs mt-2 font-bold text-center break-words">
        {description}
      </p>
    </article>
  );
};
