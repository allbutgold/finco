import { useEffect, useState } from "react";
import { formatToDollar } from "../../utils/helper.js";

import CreditCardDetails from "../../components/CreditCard/CreditCardDetails";
import Header from "../../components/Header/Header";
import TranscactionsStats from "../../components/TransactionsStats/TranscactionsStats";
import TransactionsCardMini from "../../components/TransactionsStats/TransactionsCardMini.jsx";
import AccountBalance from "../../components/AccountBalance/AccountBalance.jsx";
import styles from "./Home.module.scss";
import alert from "../../assets/img/alert.svg";
import { expenseStyles } from "../../utils/helper.js";
import { Toaster } from "react-hot-toast";

const Home = () => {
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);
	const URL = import.meta.env.VITE_BACKEND_URL;

	const getStats = async () => {
		try {
			const response = await fetch(URL + "getTotalTransactionsByMonth", {
				credentials: "include",
			});
			if (response.ok) {
				const data = await response.json();
				setTotalExpenses(formatToDollar(data.totalExpense));
				setTotalIncome(formatToDollar(data.totalIncome));
			} else {
				const data = await response.text();
				throw new Error(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getStats();
	}, []);

	// if (!totalExpenses && !totalIncome) return;

	return (
		<section className={styles.Home}>
			<Header name profile />
			<CreditCardDetails />
			<h3>Total wallet</h3>
			<AccountBalance />
			<TranscactionsStats
				incomeAmount={totalIncome}
				expenseAmount={totalExpenses}
			/>
			<TransactionsCardMini
				img={alert}
				style={expenseStyles}
				content="Monthly spending limit"
				options
			/>
		</section>
	);
};

export default Home;
