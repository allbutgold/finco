import React, { useEffect, useState } from "react";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import Header from "../../components/Header/Header";
import SingleTransaction from "../../components/TransactionList/SingleTransaction";
import TransactionCard from "../../components/TransactionsStats/TransactionCard";
import img from "../../assets/img/trending-down.svg";
import { expenseStyles, formatToDollar } from "../../utils/helper";
import styles from "./Report.module.scss";
function CategoryReport() {
	const url = import.meta.env.VITE_BACKEND_URL;
	const [transactions, setTransactions] = useState([]);
	const [expenses, setExpenses] = useState();
	const [totalExpenses, setTotalExpenses] = useState();
	const [categories, setCategories] = useState();

	useEffect(() => {
		const getTransactions = async () => {
			try {
				const response = await fetch(url + "transactions?type=expense", {
					credentials: "include",
				});
				if (response.ok) {
					const data = await response.json();
					let cat = {};
					data.transactions.forEach((transaction) => {
						if (!cat.hasOwnProperty(transaction.category)) {
							cat[transaction.category] = +transaction.amount;
						} else {
							cat[transaction.category] += +transaction.amount;
						}
					});
					let expenses = { labels: Object.keys(cat), data: Object.values(cat) };
					setExpenses(expenses);
					setTransactions(data.transactions);
					setTotalExpenses(data.total);
					setCategories(cat);
				} else {
					const message = await response.text();
					throw new Error(message);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getTransactions();
	}, []);

	if (!expenses && !categories) return;

	return (
		<section className={styles.Expenses}>
			<Header profile />
			<h2>Expenses</h2>

			<TransactionCard
				mini
				content="Current"
				img={img}
				style={expenseStyles}
				amount={formatToDollar(totalExpenses)}
			/>
			<div className={styles.graph}>
				<DoughnutChart type={expenses} />
			</div>
			<h3>Categories</h3>
			<div className={styles.container}>
				{transactions.map((transaction) => (
					<SingleTransaction transaction={transaction} />
				))}
				{/* {Object.entries(categories).map(([key, value]) => (
					<div>
						<h4>{key}</h4>
						<p>{value}</p>
					</div>
				))} */}
			</div>
		</section>
	);
}

export default CategoryReport;
