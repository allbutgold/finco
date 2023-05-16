import Header from "../../components/Header/Header.jsx";
import { useState, useEffect } from "react";
import { userStore } from "../../utils/userStore.js"
import styles from "../../components/FilterTransactionList/FilterTransactionList.module.scss"
import SingleTransaction from "../../components/TransactionList/SingleTransaction.jsx"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatToWeekday } from "../../utils/helper.js";

const FilterExpenses = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
      setTransactions(data);
    };
    getTransactions();
  }, []);

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const filteredTransactions = Object.entries(transactions)
    .filter(([key, array]) =>
      array.some(
        (transaction) =>
          transaction.type === "expense" && // Only include expenses
          transaction.category.toLowerCase().includes(filterTerm.toLowerCase()) &&
          (!startDate || new Date(transaction.date) >= startDate) &&
          (!endDate || new Date(transaction.date) <= endDate)
      )
    )
    .map(([key, array]) => [
      key,
      array
        .filter(
          (transaction) =>
            transaction.type === "expense" && // Only include expenses
            transaction.category.toLowerCase().includes(filterTerm.toLowerCase()) &&
            (!startDate || new Date(transaction.date) >= startDate) &&
            (!endDate || new Date(transaction.date) <= endDate)
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date)), // Sort expenses by date
    ]);

  filteredTransactions.sort((a, b) => new Date(b[0]) - new Date(a[0]));

  return (
    <section className={styles.Transactions}>
      <Header back profile title="All Expenses" />
      <div className={styles.DateFilterContainer}>
        <label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Select start date"
            shouldCloseOnSelect={true}
          />
        </label>
        <label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Select end date"
            shouldCloseOnSelect={true}
          />
        </label>
      </div>
      <div className={styles.CategoryFilterContainer}>
        <label>
          <input
            type="text"
            value={filterTerm}
            onChange={handleFilterChange}
            placeholder="Filter by Category"
          />
        </label>
      </div>

      <article className={styles.FilteredTransactions}>
        {filteredTransactions.length === 0 ? (
          <p>Sorry, nothing found</p>
        ) : (
          filteredTransactions.map(([key, array]) => (
            <div className={styles.TransactionContainer} key={key}>
              <p>{formatToWeekday(key)}</p>
              <h1>{key}</h1>
              {array.map((transaction, index) => (
                <SingleTransaction transaction={transaction} key={index} />
              ))}
            </div>
          ))
        )}
      </article>
    </section >
  );
};

export default FilterExpenses;

