import styles from "./Onboarding.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import bankcard from "../../assets/img/bankcard.svg";
import giftcard from "../../assets/img/giftcard.svg";

import WelcomeScreen from "../../components/WelcomeScreen/WelcomeScreen";
import SplashScreen from "../../components/SplashScreen/SplashScreen";

const Onboarding = () => {
	const [activeSplash, setActiveSplash] = useState(true);
	const [next, setNext] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveSplash(false);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles.Onboarding}>
			{activeSplash && <SplashScreen />}

			<WelcomeScreen
				img={giftcard}
				title="Analyze your
		  spending"
				subtitle="Track and analyze your expenses to improve your financial health."
				button="Get Started"
				onclick={() => {
					navigate("/register");
				}}
			/>
			<WelcomeScreen
				img={bankcard}
				title="Track your spend and income"
				subtitle="Manage your finances more effectively with our intuitive app."
				button="Next"
				skip
				next={next}
				onclick={() => {
					setNext(true);
				}}
			/>
		</div>
	);
};

export default Onboarding;
