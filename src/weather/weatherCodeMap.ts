interface WeatherCodeDescriptor {
	name: string;
	weatherIconClassName: string;
}

export const weatherCodeMap: Record<number, WeatherCodeDescriptor> = {
	0: { name: 'Unknown', weatherIconClassName: 'wi-day-sunny' },
	1000: { name: 'Clear, Sunny', weatherIconClassName: 'wi-day-sunny' },
	1100: { name: 'Mostly Clear', weatherIconClassName: 'wi-day-sunny-overcast' },
	1101: { name: 'Partly Cloudy', weatherIconClassName: 'wi-day-cloudy' },
	1102: { name: 'Mostly Cloudy', weatherIconClassName: 'wi-day-cloudy-high' },
	1001: { name: 'Cloudy', weatherIconClassName: 'wi-cloudy' },
	2000: { name: 'Fog', weatherIconClassName: 'wi-fog' },
	2100: { name: 'Light Fog', weatherIconClassName: 'wi-fog' },
	4000: { name: 'Drizzle', weatherIconClassName: 'wi-rain' },
	4001: { name: 'Rain', weatherIconClassName: 'wi-rain' },
	4200: { name: 'Light Rain', weatherIconClassName: 'wi-rain' },
	4201: { name: 'Heavy Rain', weatherIconClassName: 'wi-rain' },
	5000: { name: 'Snow', weatherIconClassName: 'wi-day-snow' },
	5001: { name: 'Flurries', weatherIconClassName: 'wi-day-snow' },
	5100: { name: 'Light Snow', weatherIconClassName: 'wi-day-snow' },
	5101: { name: 'Heavy Snow', weatherIconClassName: 'wi-day-snow' },
	6000: { name: 'Freezing Drizzle', weatherIconClassName: 'wi-day-hail' },
	6001: { name: 'Freezing Rain', weatherIconClassName: 'wi-day-hail' },
	6200: { name: 'Light Freezing Rain', weatherIconClassName: 'wi-day-hail' },
	6201: { name: 'Heavy Freezing Rain', weatherIconClassName: 'wi-day-hail' },
	7000: { name: 'Ice Pellets', weatherIconClassName: 'wi-sleet' },
	7101: { name: 'Heavy Ice Pellets', weatherIconClassName: 'wi-sleet' },
	7102: { name: 'Light Ice Pellets', weatherIconClassName: 'wi-sleet' },
	8000: { name: 'Thunderstorm', weatherIconClassName: 'wi-thunderstorm' }
};
