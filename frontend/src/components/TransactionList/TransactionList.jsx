import { useState } from "react";
import { useEffect } from "react";
import { userStore } from "../../utils/userStore.js";
import "./TransactionList.css";
import styles from "./TransactionList.module.scss";
import { formatToWeekday } from "../../utils/helper.js";
import SingleTransaction from "./SingleTransaction.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const userID = userStore((state) => state.userID);

  const [categoryFilter, setCategoryFilter] = useState("");

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


  const filterTransactions = () => {
    let filteredTransactions = transactions;
    if (startDate && endDate) {
      filteredTransactions = filteredTransactions.filter(([date]) => {
        const transactionDate = new Date(date);
        return (
          transactionDate >= startDate &&
          transactionDate <= new Date(endDate.getTime() + 86400000)
        );
      });
    }
    if (categoryFilter) {
      filteredTransactions = filteredTransactions.filter(([_, array]) =>
        array.some((transaction) =>
          transaction.category
            .toLowerCase()
            .includes(categoryFilter.toLowerCase())
        )
      );
    }
    return filteredTransactions;
  };


  return (
    <article className={styles.TransactionList}>
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

      <div className={styles.CategoryFilterContainer}>
        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
      </div>

      {filterTransactions().length > 0 ? (
        filterTransactions().map(([date, array]) => (
          <div className={styles.TransactionContainer} key={date}>
            <h3>{formatToWeekday(date)}</h3>
            <h2>{date}</h2>
            {array.map((transaction, index) => (
              <SingleTransaction transaction={transaction} key={index} />
            ))}
          </div>
        ))
      ) : (
        <p className={styles.Sorry}>Sorry, category not found.</p>
      )}
    </article>
  );
};


export default TransactionList;
