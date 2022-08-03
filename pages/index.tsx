import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import TabRoot from '../src/components/Tabs/TabRoot/TabRoot';
import TabContent from '../src/components/Tabs/TabContent/TabContent';
import WeatherDisplay from '../src/components/WeatherDisplay/WeatherDisplay';
import { cityTabMap, cityTabs } from '../src/data/cityTabs';

const Home: NextPage = () => {
	const defaultValue = cityTabMap.get('ottawa')?.value;

	return (
		<main className={styles.main}>
			<TabRoot
				tabTriggers={cityTabs}
				tabsRootProps={{ defaultValue: defaultValue }}
			>
				{cityTabs.map(({ value }) => {
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
