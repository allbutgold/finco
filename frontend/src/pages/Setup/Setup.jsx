import styles from "./Setup.module.scss";
import SetupForm from "../../components/SetupForm/SetupForm.jsx";
import Header from "../../components/Header/Header";

const Setup = () => {
	return (
		<section className={styles.Setup}>
			<Header />
			<h1>Setup your account</h1>
			<SetupForm />
		</section>
	);
};

export default Setup;
