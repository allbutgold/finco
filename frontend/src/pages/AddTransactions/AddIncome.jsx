import CreditCardDetails from "../../components/CreditCard/CreditCardDetails";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import styles from "./AddIncome.module.scss";
import toast, { Toaster } from "react-hot-toast";

// import { userStore } from "../../utils/userStore.js";
import Header from "../../components/Header/Header";

import { useNavigate } from "react-router-dom";
import { navigateWithDelay } from "../../utils/helper.js";

const AddIncome = () => {
	const URL = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();

	// const userID = userStore.getState().userID;
	const addIncome = async (event) => {
		event.preventDefault();
		const form = new FormData(event.target);
		form.append("type", "income");

		const incomeFetch = fetch(URL + "addTransaction", {
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
				throw new Error("Could not add income. Please try again later.");
			});

		await toast.promise(incomeFetch, {
			loading: "Submitting..",
			success: (message) => {
				console.log(message);
				return "Added income!";
			},
			error: (err) => {
				console.error(err);
				return "Could not add income. Please try again later.";
			},
		});

		navigateWithDelay(navigate, "/", 1000);
	};

	return (
		<section className={styles.AddIncome}>
			<Header back profile />
			<h1>Add Income</h1>
			<CreditCardDetails />
			<Toaster />

			<TransactionForm type="income" handleSubmit={addIncome} />
		</section>
	);
};

export default AddIncome;
