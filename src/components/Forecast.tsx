import type { forecastType } from "../types";

type Props = {
	data: forecastType;
};

export const Forecast = ({ data }: Props): JSX.Element => {
	return <div>Forecast</div>;
};
