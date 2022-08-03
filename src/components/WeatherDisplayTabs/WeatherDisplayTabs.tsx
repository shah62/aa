import React from 'react';
import { cityTabs, cityTabMap } from '../../data/cityTabs';
import TabContent from '../Tabs/TabContent/TabContent';
import TabRoot from '../Tabs/TabRoot/TabRoot';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';

class WeatherDisplayTabs extends React.Component {
	constructor(props: Record<string, unknown>) {
		super(props);
	}

	render(): React.ReactNode {
		const defaultValue = cityTabMap.get('ottawa')?.value;
		return (
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
		);
	}
}

export default WeatherDisplayTabs;
