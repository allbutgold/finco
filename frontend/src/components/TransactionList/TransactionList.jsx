import { useState } from "react";
import { useEffect } from "react";
import { userStore } from "../../utils/userStore.js";
import "./TransactionList.css";
import styles from "./TransactionList.module.scss";
import { formatToWeekday } from "../../utils/helper.js";
import SingleTransaction from "./SingleTransaction.jsx";

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

			const sortedTransactions = Object.entries(data).sort(
				(a, b) => new Date(b[0]) - new Date(a[0])
			);

			setTransactions(sortedTransactions);
		};

		getTransactions();
	}, []);

	// console.log(transactions);

	return (
		<article className={styles.TransactionList}>
			{transactions.map(([date, array]) => (
				<div className={styles.TransactionContainer} key={date}>
					<h3>{formatToWeekday(date)}</h3>
					<h2>{date}</h2>
					{array.map((transaction, index) => (
						<SingleTransaction transaction={transaction} key={index} />
					))}
				</div>
			))}
		</article>
	);
};

export default TransactionList;
