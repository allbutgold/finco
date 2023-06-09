import SingleTransaction from "../TransactionList/SingleTransaction.jsx";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./AllTransactions.module.scss";

const TransactionList = ({ transactions }) => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const filterTransactions = () => {
		if (startDate && endDate) {
			const filteredTransactions = transactions.filter(([date]) => {
				const transactionDate = new Date(date);
				return (
					transactionDate >= startDate &&
					transactionDate <= new Date(endDate.getTime() + 86400000)
				);
			});
			return filteredTransactions;
		}
		return transactions;
	};
	if (!transactions) return;
	return (
		<div className={styles.TransactionContainer}>
			<div className={styles.FilterContainer}>
				<DatePicker
					id="startDatePicker"
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					dateFormat="yyyy-MM-dd"
					isClearable
					placeholderText="Select start date"
				/>

				<DatePicker
					id="endDatePicker"
					selected={endDate}
					onChange={(date) => setEndDate(date)}
					dateFormat="yyyy-MM-dd"
					isClearable
					placeholderText="Select end date"
				/>
			</div>

			<div className={styles.List}>
				{filterTransactions().map(([date, array]) => (
					<div key={date}>
						{array.map((transaction, index) => (
							<SingleTransaction transaction={transaction} key={index} />
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default TransactionList;
