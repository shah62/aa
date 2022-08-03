import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

const TOMORROW_API_KEY = process.env.TOMORROW_API_KEY;
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL as string;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN as string;

const redis = new Redis({
	url: UPSTASH_REDIS_REST_URL,
	token: UPSTASH_REDIS_REST_TOKEN
});

const ONE_HOUR_IN_SECONDS = 60 * 60;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { lat, long, startTime, endTime } = req.query;

	if (!lat || !long || !startTime || !endTime) {
		return res.status(400).send({ error: 'Invalid query params' });
	}

	const startTimeDate = new Date(startTime as string).toDateString();
	const endTimeDate = new Date(endTime as string).toDateString();

	/**
	 * The cachekey is dependent only the start time's and end time's date part as
	 * those are sent as an ISO string which makes it hard to cache for a given date
	 * since the time value in date can change per request.
	 */
	const cacheKey = `${lat}-${long}-${startTimeDate}-${endTimeDate}`;

	const cacheValue = await redis.get(cacheKey);

	if (cacheValue) {
		// Logging for debugging issues
		console.log(`Cache hit`, { lat, long, startTime, endTime });
		return res.status(200).json(cacheValue);
	}

	const URL = `https://api.tomorrow.io/v4/timelines?location=${lat},${long}&startTime=${startTime}&endTime=${endTime}&fields=temperature,weatherCode&timesteps=1d&units=metric&apikey=${TOMORROW_API_KEY}`;

	const data = await fetch(URL, { method: 'GET' });
	const result = await data.json();

	if (data.ok) {
		/**
		 * Caching the API response in redis as the API has a rate limit of 50queries/hour
		 * which causes issues when testing out in quick sucession.
		 */
		await redis.set(cacheKey, JSON.stringify(result), {
			ex: ONE_HOUR_IN_SECONDS
		});
	}

	return res.status(200).json(result);
}
