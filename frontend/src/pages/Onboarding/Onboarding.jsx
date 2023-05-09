import styles from "./Onboarding.module.scss";
import { useEffect, useState } from "react";

import bankcard from "../../assets/img/bankcard.svg";
import giftcard from "../../assets/img/giftcard.svg";

import WelcomeScreen from "../../components/WelcomeScreen/WelcomeScreen";
import SplashScreen from "../../components/splashscreen/Splashscreen";

const Onboarding = () => {
	const [activeSplash, setActiveSplash] = useState(true);
	const [next, setNext] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveSplash(false);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles.Onboarding}>
			{activeSplash && <SplashScreen />}

			{!next ? (
				<WelcomeScreen
					img={bankcard}
					title="Track your spend and income"
					subtitle="Manage your finances more effectively with our intuitive app."
					button="Next"
					onclick={() => {
						setNext(true);
					}}
				/>
			) : (
				<WelcomeScreen
					img={giftcard}
					title="Analyze your
          spending"
					subtitle="Track and analyze your expenses to improve your financial health."
					button="Get Started"
					onclick={() => {}}
				/>
			)}
		</div>
	);
};

export default Onboarding;
