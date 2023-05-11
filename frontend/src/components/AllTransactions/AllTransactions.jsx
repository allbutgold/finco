import { useState } from 'react';
import { useEffect } from 'react';
import { userStore } from "../../utils/userStore.js";
import circle from "../../assets/img/bg.svg";
import styles from './AllTransactions.module.scss';


const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const userID = userStore((state) => state.userID);

  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getTransactions = async () => {

      const response = await fetch(URL + 'getAllTransactions?id=' + userID, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      setTransactions(data);
    }
    getTransactions();
  }, []) 

  return (
    <section className={styles.TransactionSection}>
      <article>
        <div className={styles.TransactionContainer}>
          {Object.entries(transactions)
            .flatMap(([key, array]) => array)
            .map((transaction, index) => (
              <div key={index} className={styles.SingleTransaction}>
                <img src={circle} alt="" />
                <div className={styles.TransactionDetails}>
                  <h4>{transaction.category}</h4>
                  <div className={styles.DateTime}>
                    <p>{transaction.time}</p>
                    <p>{transaction.date}</p>
                  </div>
                </div>
                
                <p className={transaction.type === 'expense' ? 'red' : 'green'}>${transaction.amount}</p>
              </div>
            ))}
        </div>
      </article>
    </section>
  );
}

export default TransactionList;