interface Tab {
	value: string;
	label: string;
	coords: { lat: number; long: number };
}

export const cityTabMap = new Map<string, Tab>([
	[
		'ottawa',
		{
			value: 'ottawa',
			label: 'Ottawa',
			coords: {
				lat: 45.4215,
				long: -75.6972
			}
		}
	],
	[
		'calgary',
		{
			value: 'calgary',
			label: 'Calgary',
			coords: {
				lat: 51.049999,
				long: -114.066666
			}
		}
	],
	[
		'vancouver',
		{
			value: 'vancouver',
			label: 'Vancouver',
			coords: {
				lat: 49.246292,
				long: -123.116226
			}
		}
	]
]);

export const cityTabs: Tab[] = [];

cityTabMap.forEach((value) => {
	cityTabs.push(value);
});
