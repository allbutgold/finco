import styles from "./AddExpense.module.scss";
import CreditCardDetails from "../../components/CreditCard/CreditCardDetails";
import TransactionForm from "../../components/TransactionForm/TransactionForm";

// import { userStore } from "../../utils/userStore.js";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { navigateWithDelay } from "../../utils/helper.js";

const AddExpense = () => {
	const URL = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();

	// const userID = userStore.getState().userID;

	const addExpense = async (event) => {
		event.preventDefault();
		try {
			const form = new FormData(event.target);
			form.append("type", "expense");

			const response = await fetch(URL + "addTransaction", {
				method: "POST",
				credentials: "include",
				body: form,
			});

			if (response.ok) {
				const message = await response.text();
				console.log(message);
				navigateWithDelay(navigate, "/", 1000);
			} else {
				throw new Error("Could not add expense");
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<section className={styles.AddExpense}>
			<Header back />
			<h1>Add Expense</h1>
			<CreditCardDetails />
			<TransactionForm type="expense" handleSubmit={addExpense} />
		</section>
	);
};

export default AddExpense;
