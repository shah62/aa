import { add } from 'date-fns';

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

export interface WeatherForeCastResponse {
	data: {
		timelines: Timeline[];
	};
}

export const WEATHER_API = {
	FORECAST: {
		key: (lat: number, long: number) => `weather-forecast-for-${lat}-${long}`,
		queryFunction: async (lat: number, long: number) => {
			const currentDate = new Date();
			const startTime = currentDate.toISOString();
			const endTime = add(currentDate, { days: 4 }).toISOString();
			const res = await fetch(
				`/api/weather?lat=${lat}&long=${long}&startTime=${startTime}&endTime=${endTime}`
			);
			return (await res.json()) as WeatherForeCastResponse;
		}
	}
};
