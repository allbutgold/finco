import { Link } from "react-router-dom";
import styles from "./WelcomeScreen.module.scss";

import arrow from "../../assets/img/arrow-right.svg";
import shadow from "../../assets/img/shadow.svg";

function WelcomeScreen({ img, title, subtitle, button, onclick, skip, next }) {
	return (
		<div
			className={
				next
					? `${styles.moveOut} ${styles.WelcomeScreen}`
					: `${styles.WelcomeScreen}`
			}>
			<div className={styles.img}>
				<img src={img} alt="Illustration" />
				<img src={shadow} alt="shadow" />
			</div>
			<section>
				<h2>{title}</h2>
				<p>{subtitle}</p>
			</section>
			<div className={styles.actions}>
				{skip && <Link to="/">Skip</Link>}
				<button onClick={onclick}>
					{button} <img src={arrow} alt="Arrow Icon" width="20px" />
				</button>
			</div>
		</div>
	);
}

export default WelcomeScreen;
