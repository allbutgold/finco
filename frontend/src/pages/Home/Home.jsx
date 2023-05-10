import CreditCardDetails from "../../components/CreditCard/CreditCardDetails";
import Header from "../../components/Header/Header";

import styles from "./Home.module.scss";

const Home = () => {
	return (
		<section className={styles.Home}>
			<Header name />
			<CreditCardDetails />
		</section>
	);
};

export default Home;
