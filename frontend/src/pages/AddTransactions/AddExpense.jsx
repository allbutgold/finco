import styles from "./AddExpense.module.scss";
import CreditCardDetails from "../../components/CreditCard/CreditCardDetails";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import toast, { Toaster } from "react-hot-toast";

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
		const form = new FormData(event.target);
		form.append("type", "expense");
		const expenseFetch = fetch(URL + "addTransaction", {
			method: "POST",
			credentials: "include",
			body: form,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Could not add expense");
				}
				return response.text();
			})
			.then((message) => {
				console.log(message);
				return message;
			})
			.catch((err) => {
				console.error(err);
				throw new Error("Could not add expense. Please try again later.");
			});

		await toast.promise(expenseFetch, {
			loading: "Submitting..",
			success: (message) => {
				console.log(message);
				return "Added expense!";
			},
			error: (err) => {
				console.error(err);
				return "Could not add expense. Please try again later.";
			},
		});

		navigateWithDelay(navigate, "/", 1000);
	};
	return (
		<section className={styles.AddExpense}>
			<Header back profile />
			<h1>Add Expense</h1>
			<CreditCardDetails />
			<TransactionForm type="expense" handleSubmit={addExpense} />
			<Toaster />
		</section>
	);
};

export default AddExpense;
