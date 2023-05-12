import SingleTransaction from "../TransactionList/SingleTransaction.jsx";
import { useState, useEffect } from "react";
import { userStore } from "../../utils/userStore.js";

import styles from "./AllTransactions.module.scss";

const TransactionList = () => {
	const [transactions, setTransactions] = useState([]);
	const userID = userStore((state) => state.userID);

	const URL = import.meta.env.VITE_BACKEND_URL;

	useEffect(() => {
		const getTransactions = async () => {
			const response = await fetch(URL + "getAllTransactions?id=" + userID, {
				credentials: "include",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			setTransactions(data);
		};
		getTransactions();
	}, []);

	return (
		<div className={styles.TransactionContainer}>
			{Object.entries(transactions)
				.flatMap(([key, array]) => array)
				.map((transaction, index) => (
					<SingleTransaction transaction={transaction} key={index} />
				))}
		</div>
	);
};

export default TransactionList;
