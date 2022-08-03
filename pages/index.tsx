import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import TabRoot, { TabRootProps } from '../src/components/Tabs/TabRoot/TabRoot';
import TabContent from '../src/components/Tabs/TabContent/TabContent';
import WeatherDisplay from '../src/components/WeatherDisplay/WeatherDisplay';

interface Tab {
	value: string;
	label: string;
	coords: { lat: number; long: number };
}
const cityTabMap = new Map<string, Tab>([
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

const tabs: Tab[] = [];

cityTabMap.forEach((value) => {
	tabs.push(value);
});

const Home: NextPage = () => {
	const defaultValue = cityTabMap.get('ottawa')?.value;

	return (
		<main className={styles.main}>
			<TabRoot
				tabTriggers={tabs}
				tabsRootProps={{ defaultValue: defaultValue }}
			>
				{tabs.map(({ value }) => {
					const cityCoords = cityTabMap.get(value)?.coords;
					return (
						<TabContent key={`city-tab-content-${value}`} value={value}>
							<WeatherDisplay coords={cityCoords!} />
						</TabContent>
					);
				})}
			</TabRoot>
		</main>
	);
};

export default Home;
