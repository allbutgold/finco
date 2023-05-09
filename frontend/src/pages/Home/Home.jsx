import CreditCardDetails from "../../components/CreditCard/CreditCardDetails";
import HeaderName from "../../components/HeaderName/HeaderName";

import styles from "./Home.module.scss";

const Home = () => {
	return (
		<section className={styles.Home}>
			<HeaderName name="Jonathan Doe" />
			<CreditCardDetails />
		</section>
	);
};

export default Home;
