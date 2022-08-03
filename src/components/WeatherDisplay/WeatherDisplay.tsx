import React from 'react';
import WeatherDisplayCard from '../WeatherDisplayCard/WeatherDisplayCard';
import WeatherDisplayStyles from './WeatherDisplay.module.scss';
import { add, format } from 'date-fns';
import clsx from 'clsx';
import withSWRHOC, { WithUseSWRHOCProps } from '../../api/swr/withSWRHOC';
import {
	WeatherForeCastResponse,
	WEATHER_API
} from '../../api/weather/weather';

interface WeatherDisplayProps
	extends WithUseSWRHOCProps<WeatherForeCastResponse, any> {
	coords: {
		lat: number;
		long: number;
	};
}

class WeatherDisplay extends React.Component<WeatherDisplayProps> {
	constructor(props: WeatherDisplayProps) {
		super(props);
	}

	render(): React.ReactNode {
		const { data, error } = this.props.queryData;

		const errorWhileFetchingWeatherForecast = typeof error !== 'undefined';
		const isFetchingWeatherForecast =
			!errorWhileFetchingWeatherForecast && !data;

		return (
			<section className={WeatherDisplayStyles.container}>
				{errorWhileFetchingWeatherForecast ? (
					<h1>Error while fetching weather forecast</h1>
				) : isFetchingWeatherForecast ? (
					<h1>Fetching weather forecast...</h1>
				) : (
					data!.data.timelines[0].intervals.map(
						({ startTime, values: { temperature, weatherCode } }, index) => {
							const shouldCardBeCompact = index !== 0;
							const shouldBeFullWidth = index === 0;
							const dayLabel =
								index === 0 ? 'Today' : format(new Date(startTime), 'E');
							return (
								<div
									key={`weather-card-data-${startTime}`}
									className={clsx(
										shouldBeFullWidth
											? WeatherDisplayStyles['full-width-item']
											: WeatherDisplayStyles.item
									)}
								>
									<WeatherDisplayCard
										dayLabel={dayLabel}
										temperature={temperature}
										weatherCode={weatherCode}
										compact={shouldCardBeCompact}
									/>
								</div>
							);
						}
					)
				)}
			</section>
		);

		return null;
	}
}

export default withSWRHOC<
	WeatherForeCastResponse,
	unknown,
	WeatherDisplayProps
>(({ coords: { lat, long } }) => ({
	key: WEATHER_API.FORECAST.key(lat, long),
	queryFn: () => WEATHER_API.FORECAST.queryFunction(lat, long),
	options: {}
}))(WeatherDisplay);
