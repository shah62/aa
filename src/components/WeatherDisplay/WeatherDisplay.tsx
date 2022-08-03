import React from 'react';
import WeatherDisplayCard from '../WeatherDisplayCard/WeatherDisplayCard';
import WeatherDisplayStyles from './WeatherDisplay.module.scss';
import { add, format } from 'date-fns';
import clsx from 'clsx';

interface WeatherDisplayProps {
	coords: {
		lat: number;
		long: number;
	};
}

interface Data {
	timelines: Timeline[];
}

interface Timeline {
	timestep: string;
	endTime: string;
	startTime: string;
	intervals: Interval[];
}

interface Interval {
	startTime: string;
	values: Values;
}

interface Values {
	temperature: number;
	weatherCode: number;
}

interface WeatherDisplayState {
	isLoading: boolean;
	isError: boolean;
	data?: { data: Data };
}

class WeatherDisplay extends React.Component<
	WeatherDisplayProps,
	WeatherDisplayState
> {
	constructor(props: WeatherDisplayProps) {
		super(props);
		this.state = {
			isLoading: true,
			isError: false,
			data: undefined
		};
	}

	async componentDidMount() {
		const {
			coords: { lat, long }
		} = this.props;
		const startTime = new Date().toISOString();
		const endTime = add(new Date(), { days: 4 }).toISOString();
		const data = await fetch(
			`/api/weather?lat=${lat}&long=${long}&startTime=${startTime}&endTime=${endTime}`
		);
		const res = await data.json();
		this.setState({ isLoading: false, data: res });
	}

	render(): React.ReactNode {
		if (typeof this.state.data !== 'undefined') {
			return (
				<section className={WeatherDisplayStyles.container}>
					{this.state.data.data.timelines[0].intervals.map(
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
					)}
				</section>
			);
		}

		return null;
	}
}

export default WeatherDisplay;
