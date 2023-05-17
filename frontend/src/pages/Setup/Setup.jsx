import styles from "./Setup.module.scss";
import SetupForm from "../../components/SetupForm/SetupForm.jsx";
import Header from "../../components/Header/Header";
import { userStore } from "../../utils/userStore.js";

const Setup = () => {
	const userPic = userStore.getState().userPic;
	return (
		<section className={styles.Setup}>
			<Header
				title={userPic !== null ? "Edit your account" : "Setup your account"}
			/>
			<SetupForm />
		</section>
	);
};

export default Setup;
