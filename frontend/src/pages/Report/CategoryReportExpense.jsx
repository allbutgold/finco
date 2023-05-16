import { useEffect, useState } from "react";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import Header from "../../components/Header/Header";
import SingleTransaction from "../../components/TransactionList/SingleTransaction";
import TransactionCard from "../../components/TransactionsStats/TransactionCard";
import img from "../../assets/img/trending-down.svg";
import { expenseStyles, formatToDollar } from "../../utils/helper";
import styles from "./Report.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CategoryReport() {
	const url = import.meta.env.VITE_BACKEND_URL;
	const [transactions, setTransactions] = useState([]);
	const [expenses, setExpenses] = useState(null);
	const [totalExpenses, setTotalExpenses] = useState(null);
	const [categories, setCategories] = useState(null);
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});

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
					let expenses = {
						labels: Object.keys(cat),
						data: Object.values(cat),
					};
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

	useEffect(() => {
		const filteredTransactions = transactions.filter((transaction) => {
			const transactionDate = new Date(transaction.date);
			const { startDate, endDate } = dateRange;
			return (
				(!startDate || transactionDate >= startDate) &&
				(!endDate || transactionDate <= new Date(endDate.getTime() + 86400000))
			);
		});
		let cat = {};
		filteredTransactions.forEach((transaction) => {
			if (!cat.hasOwnProperty(transaction.category)) {
				cat[transaction.category] = +transaction.amount;
			} else {
				cat[transaction.category] += +transaction.amount;
			}
		});
		let expenses = {
			labels: Object.keys(cat),
			data: Object.values(cat),
		};
		setExpenses(expenses);
		setTotalExpenses(calculateTotalExpenses(filteredTransactions));
		setCategories(cat);
	}, [dateRange]);

	const calculateTotalExpenses = (filteredTransactions) => {
		return filteredTransactions.reduce((total, transaction) => {
			return total + parseFloat(transaction.amount);
		}, 0);
	};

	console.log(transactions);
	return (
		<section className={styles.Expenses}>
			<Header profile back title="Expenses" />
			{/* <h2>Expenses</h2> */}
			<TransactionCard
				mini
				content="Current"
				img={img}
				style={expenseStyles}
				amount={formatToDollar(totalExpenses)}
			/>

			<div className={styles.graph}>
				{expenses && <DoughnutChart type={expenses} />}
			</div>

			<div className={styles.FilterContainer}>
				<DatePicker
					id="startDatePicker"
					selected={dateRange.startDate}
					onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
					dateFormat="yyyy-MM-dd"
					isClearable
					placeholderText="Select start date"
				/>

				<DatePicker
					id="endDatePicker"
					selected={dateRange.endDate}
					onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
					dateFormat="yyyy-MM-dd"
					isClearable
					placeholderText="Select end date"
				/>
			</div>

			{/*   <h3>Categories</h3> */}
			<div className={styles.container} key={transactions._id}>
				{transactions
					.filter((transaction) => {
						const transactionDate = new Date(transaction.date);
						return (
							(!dateRange.startDate ||
								transactionDate >= dateRange.startDate) &&
							(!dateRange.endDate ||
								transactionDate <=
									new Date(dateRange.endDate.getTime() + 86400000))
						);
					})
					.sort((a, b) => new Date(b.date) - new Date(a.date))
					.map((transaction) => (
						<SingleTransaction transaction={transaction} key={transaction.id} />
					))}
			</div>
		</section>
	);
}

export default CategoryReport;
