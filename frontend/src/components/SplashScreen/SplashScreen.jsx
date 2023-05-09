import styles from "./SplashScreen.module.scss";

import logo from "../../assets/img/logo.svg";

function SplashScreen() {
	return (
		<div className={styles.SplashScreen}>
			<img src={logo} alt="Logo" />
		</div>
	);
}

export default SplashScreen;
