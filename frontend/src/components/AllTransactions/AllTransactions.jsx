import { useState } from 'react';
import { useEffect } from 'react';
import { userStore } from "../../utils/userStore.js";
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

  return (
    <section>
      <article>
        <div style={{ padding: '40px' }}>
          {Object.entries(transactions)
            .flatMap(([key, array]) => array)
            .map((transaction, index) => (
              <div style={{ padding: '20px' }} key={index}>
                <img src={circle} alt="" />
                <p>{transaction.category}</p>
                <p className={transaction.type === 'expense' ? 'red' : 'green'}>{transaction.amount}</p>
                <p>{transaction.date}</p>
              </div>
            ))}
        </div>
      </article>
    </section>
  );
}

export default TransactionList;