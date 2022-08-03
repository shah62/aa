import type { NextPage } from 'next';
import WeatherDisplayTabs from '../src/components/WeatherDisplayTabs/WeatherDisplayTabs';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
	return (
		<main className={styles.main}>
			<WeatherDisplayTabs />
		</main>
	);
};

export default Home;
