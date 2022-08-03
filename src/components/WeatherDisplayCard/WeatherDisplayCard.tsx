import clsx from 'clsx';
import React from 'react';
import { weatherCodeMap } from '../../weather/weatherCodeMap';
import WeatherDisplayCardStyles from './WeatherDisplayCard.module.scss';

interface WeatherDisplayCardProps {
	dayLabel: string;
	weatherCode: number;
	temperature: number;
	compact?: boolean;
}

class WeatherDisplayCard extends React.Component<WeatherDisplayCardProps> {
	constructor(props: WeatherDisplayCardProps) {
		super(props);
	}

	render(): React.ReactNode {
		const { dayLabel, temperature, weatherCode, compact } = this.props;
		const weatherInformation = weatherCodeMap[weatherCode];
		return (
			<div
				className={clsx(
					WeatherDisplayCardStyles.container,
					compact && WeatherDisplayCardStyles['container-compact']
				)}
			>
				<div>
					<h3 className={WeatherDisplayCardStyles['day-label']}>{dayLabel}</h3>
					<div
						className={WeatherDisplayCardStyles['weather-content-container']}
					>
						<i
							className={clsx(
								'wi',
								weatherInformation.weatherIconClassName,
								WeatherDisplayCardStyles['weather-icon']
							)}
						/>
						<div>
							<h3 className={WeatherDisplayCardStyles['temperature-label']}>
								{temperature.toFixed(0)}°
							</h3>
							{!compact && (
								<p className={WeatherDisplayCardStyles['weather-description']}>
									{weatherInformation.name}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WeatherDisplayCard;
