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
          transactionDate >= startDate && transactionDate <= new Date(endDate.getTime() + 86400000)
        );
      });
      return filteredTransactions;
    }
    return transactions;
  };
console.log(transactions)
	return (
		<div className={styles.TransactionContainer}>
      <div className={styles.FilterContainer}>
        {/* <label htmlFor="startDatePicker">Start Date:</label> */}
        <DatePicker
          id="startDatePicker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          isClearable
          placeholderText="Select start date"
        />

       {/*  <label htmlFor="endDatePicker">End Date:</label> */}
        <DatePicker
          id="endDatePicker"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          isClearable
          placeholderText="Select end date"
        />
      </div>
			{filterTransactions().map(([date, array]) => (
        <div key={date}>
          {array.map((transaction, index) => (
            <SingleTransaction transaction={transaction} key={index} />
          ))}
        </div>
      ))}
		</div>
	);
};

export default TransactionList;
