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
	const [sortedTransactions, setSortedTransactions] = useState([]);
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
			console.log("data", data);

			const sorted = Object.entries(data).sort(
				(a, b) => new Date(b[0]) - new Date(a[0])
			);
			const sortAsc = Object.entries(data).sort(
				(a, b) => new Date(a[0]) - new Date(b[0])
			);
			setSortedTransactions(sorted);
			setTransactions(sortAsc);

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

	return (
		<section className={styles.Report}>
			<Header profile title="Report" />
			{/* <h1>Report</h1> */}
			<TranscactionsStats
				mini
				incomeAmount={formatToDollar(total.income)}
				expenseAmount={formatToDollar(total.expense)}
				expensePath="/report/expense"
				incomePath="/report/income"
			/>
			<div className={styles.scrollable}>
				<div className={styles.graph}>
					<MultiAxis filteredTransaction={transactions} />
				</div>
				<div className={styles.sticky}>
					<h3>Total Transactions</h3>
				</div>
				<AllTransactions transactions={sortedTransactions} />
			</div>
		</section>
	);
};

export default Report;
