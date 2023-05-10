import CreditCardDetails from "../../components/CreditCard/CreditCardDetails";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import styles from "./AddIncome.module.scss";

import { userStore } from "../../utils/userStore.js";
import Header from "../../components/Header/Header";

const AddIncome = () => {
	const URL = import.meta.env.VITE_BACKEND_URL;

	const userID = userStore.getState().userID;

	const addIncome = async (event) => {
		event.preventDefault();
		try {
			const form = new FormData(event.target);
			form.append("type", "income");
			console.log([...form.entries()]);

			const response = await fetch(URL + "addTransaction", {
				method: "POST",
				credentials: "include",
				body: form,
			});
			if (response.ok) {
			} else {
				throw new Error("Could not add income");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className={styles.AddIncome}>
			<Header back />
			<h1>Add Income</h1>
			<CreditCardDetails />

			<TransactionForm type="income" handleSubmit={addIncome} />
		</section>
	);
};

export default AddIncome;
