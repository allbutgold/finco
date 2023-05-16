import styles from "./Transactions.module.scss";
import { useState, useEffect } from "react";
import { formatToDollar } from "../../utils/helper.js";
import FilterTransactionList from "../../components/FilterTransactionList/FilterTransactionList";
import TranscactionsStats from "../../components/TransactionsStats/TranscactionsStats";
import Header from "../../components/Header/Header.jsx";

const Transactions = () => {
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);
	const URL = import.meta.env.VITE_BACKEND_URL;

	const getStats = async () => {
		try {
			const response = await fetch(URL + "getTotalTransactions", {
				credentials: "include",
			});
			if (response.ok) {
				const data = await response.json();
				setTotalExpenses(formatToDollar(data.expense));
				setTotalIncome(formatToDollar(data.income));
			} else {
				throw new Error("Could not get info!");
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getStats();
	}, []);

	return (
		<section className={styles.Transactions}>
			<Header profile title="All Transactions" />

			{/* <h1>All Transactions</h1> */}
			<TranscactionsStats
				incomeAmount={totalIncome}
				expenseAmount={totalExpenses}
        expenseContent={"Total Expense"}
        incomeContent={"Total Income"}
				mini
			/>
			<FilterTransactionList />
			{/* <TransactionList /> */}
		</section>
	);
};

export default Transactions;
