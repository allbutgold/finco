import { useState } from 'react';
import { useEffect } from 'react';
import { userStore } from "../../utils/userStore.js";
import "./TransactionList.css"
import styles from './TransactionList.module.scss';
import circle from "../../assets/img/bg.svg";


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

console.log(transactions)
  return (
    <section className={styles.TransactionSection}>
      <h1>TransactionList</h1>
      <article className={styles.TransactionList}>
        {Object.entries(transactions).map(([key, array]) => (
          <div className={styles.TransactionContainer}  key={key}>
            <h1>{key}</h1>
            {array.map((transaction, index) => (
              <div className={styles.SingleTransaction} style={{ padding: '20px' }} key={index}>
                <img src={circle} alt="" className={styles.TransactionImage}/>
                <div className={styles.TransactionDetails}>
                  <h4>{transaction.category}</h4>    
                  <div className={styles.DateTime}>
                    <p>{transaction.time}</p>
                    <p>{transaction.date}</p>
                  </div>        
                  
                </div>
              <p className={transaction.type === 'expense' ? 'red' : 'green'}>{transaction.amount}</p>
            </div>
            ))}
            
          </div>
        ))}
        </article>
    </section>  
  )
}

export default TransactionList;