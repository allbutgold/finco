import styles from "./Report.module.scss";
import AllTransactions from "../../components/AllTransactions/AllTransactions.jsx";
import Header from "../../components/Header/Header.jsx";
import { userStore } from "../../utils/userStore.js";
import { useEffect, useState } from "react";
import MultiAxis from "../../components/Charts/MultiAxis";
import TranscactionsStats from "../../components/TransactionsStats/TranscactionsStats";
import { formatToDollar } from "../../utils/helper.js";

const Report = () => {
	const [transactions, setTransactions] = useState([]);
	const [total, setTotal] = useState({ income: 0, expense: 0 });
	const URL = import.meta.env.VITE_BACKEND_URL;
	const userID = userStore((state) => state.userID);

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
			const total = { income: 0, expense: 0 };
			Object.entries(data).forEach(([key, value]) => {
				value.forEach((transaction) => {
					transaction.type == "income"
						? (total.income += +transaction.amount)
						: (total.expense += +transaction.amount);
				});
			});
			setTotal(total);
		};
		getTransactions();
	}, []);

	// console.log(getBalance(total.expense, total.income));
	return (
		<section className={styles.Report}>
			<Header profile />
			<h1>Report</h1>
			<TranscactionsStats
				mini
				incomeAmount={formatToDollar(total.income)}
				expenseAmount={formatToDollar(total.expense)}
			/>
			<div className={styles.graph}>
				<MultiAxis transactions={transactions} />
			</div>
			<h3>Total Transactions</h3>
			<AllTransactions transactions={transactions} />
		</section>
	);
};

export default Report;
