import styles from "./AddExpense.module.scss";
import CreditCardDetails from "../../components/CreditCard/CreditCardDetails";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import toast, { Toaster } from "react-hot-toast";

import { transactionStore } from "../../utils/transactionStore.js";
// import { userStore } from "../../utils/userStore.js";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { categories, navigateWithDelay } from "../../utils/helper.js";
import { useState } from "react";
import Toggle from "../../components/TransactionForm/Toggle";

function AddTransactions() {
	const [valid, setValid] = useState(false);

	const URL = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();
	const currentType = transactionStore.getState().transactionType;
	const setCurrentType = (value) =>
		transactionStore.getState().setTransactionType(value);
	const [type, setType] = useState(currentType);
	const [selectedCat, setCategory] = useState(categories[`${type}`][0].name);

	// const userID = userStore.getState().userID;

	const addTransaction = async (event) => {
		event.preventDefault();
		const form = new FormData(event.target);
		form.append("type", type);
		form.delete("search");
		if (form.get("category") == null) {
			form.append("category", selectedCat);
		}
		const transactionFetch = fetch(URL + "addTransaction", {
			method: "POST",
			credentials: "include",
			body: form,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Invalid input!");
				} else {
					return response.text();
				}
			})
			.then((message) => {
				console.log(message);
				return message;
			})
			.catch((err) => {
				console.error(err);
				throw new Error("Could not add transaction.");
			});

		await toast.promise(transactionFetch, {
			loading: "Submitting..",
			success: (message) => {
				console.log(message);
				return `Added ${type}!`;
			},
			error: (err) => {
				console.error(err.message);
				return `Could not add ${type}.`;
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
