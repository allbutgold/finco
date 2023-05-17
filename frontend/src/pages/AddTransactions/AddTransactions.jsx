import styles from "./AddExpense.module.scss";
import CreditCardDetails from "../../components/CreditCard/CreditCardDetails";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import toast, { Toaster } from "react-hot-toast";

import { transactionStore } from "../../utils/transactionStore.js";
// import { userStore } from "../../utils/userStore.js";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { navigateWithDelay } from "../../utils/helper.js";
import { useState } from "react";
import Toggle from "../../components/TransactionForm/Toggle";

function AddTransactions() {
	const URL = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();
	const currentType = transactionStore.getState().transactionType;
	const setCurrentType = (value) =>
		transactionStore.getState().setTransactionType(value);
	const [type, setType] = useState(currentType);

	// const userID = userStore.getState().userID;

	const addTransaction = async (event) => {
		event.preventDefault();
		const form = new FormData(event.target);
		form.append("type", type);
		form.delete("search");
		const transactionFetch = fetch(URL + "addTransaction", {
			method: "POST",
			credentials: "include",
			body: form,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Could not add transaction");
				}
				return response.text();
			})
			.then((message) => {
				console.log(message);
				return message;
			})
			.catch((err) => {
				console.error(err);
				throw new Error("Could not add transaction. Please try again later.");
			});

		await toast.promise(transactionFetch, {
			loading: "Submitting..",
			success: (message) => {
				console.log(message);
				return `Added ${type}!`;
			},
			error: (err) => {
				console.error(err);
				return `Could not add ${type}. Please try again later.`;
			},
		});

		navigateWithDelay(navigate, "/", 1000);
	};

	const handleChange = (e) => {
		setCurrentType(e.target.value);
		setType(e.target.value);
		// window.location.reload(false);
	};

	return (
		<section className={styles.AddExpense}>
			<Header back profile title="Add Transactions" />
			<Toggle onchange={handleChange} />
			<CreditCardDetails />
			<TransactionForm handleSubmit={addTransaction} type={type} />
			<Toaster />
		</section>
	);
}

export default AddTransactions;
