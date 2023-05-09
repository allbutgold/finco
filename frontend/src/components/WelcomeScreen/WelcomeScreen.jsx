import styles from "./WelcomeScreen.module.scss";

import arrow from "../../assets/img/arrow-right.svg";
import shadow from "../../assets/img/shadow.svg";

function WelcomeScreen({ img, title, subtitle, button, onclick }) {
	return (
		<div className={styles.WelcomeScreen}>
			<div className={styles.img}>
				<img src={img} alt="Illustration" />
				<img src={shadow} alt="shadow" />
			</div>
			<section>
				<h2>{title}</h2>
				<p>{subtitle}</p>
			</section>
			<div className={styles.actions}>
				<button onClick={onclick}>
					{button} <img src={arrow} alt="Arrow Icon" width="20px" />
				</button>
			</div>
		</div>
	);
}

export default WelcomeScreen;
