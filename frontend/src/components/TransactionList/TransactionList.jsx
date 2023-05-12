import { useState } from "react";
import { useEffect } from "react";
import { userStore } from "../../utils/userStore.js";
import "./TransactionList.css";
import styles from "./TransactionList.module.scss";
import circle from "../../assets/img/bg.svg";



const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
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

      const sortedTransactions = Object.entries(data).sort(
        (a, b) => new Date(b[0]) - new Date(a[0])
      );

      setTransactions(sortedTransactions);
    };

    getTransactions();
  }, []);

  console.log(transactions);

  return (
    <article className={styles.TransactionList}>
      {transactions.map(([date, array]) => (
        <div className={styles.TransactionContainer} key={date}>
          <h1>{date}</h1>
          {array.map((transaction, index) => (
            <div className={styles.SingleTransaction} key={index}>
              <img src={circle} alt="" className={styles.TransactionImage} />
              <div className={styles.TransactionDetails}>
                <h4>{transaction.category}</h4>
                <div className={styles.DateTime}>
                  <p>{transaction.time}</p>
                  <p>{transaction.date}</p>
                </div>
              </div>
              <p className={transaction.type === "expense" ? "red" : "green"}>
                {`$${transaction.amount}`}
              </p>
            </div>
          ))}
        </div>
      ))}
    </article>
  );
};

export default TransactionList;

