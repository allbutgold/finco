import { useState } from 'react';
import { useEffect } from 'react';
import { userStore } from "../../utils/userStore.js";
import "./TransactionList.css"


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
      const sortedTransactions = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sortedTransactions);
      setTransactions(data);
    }
    getTransactions();
  }, [])


  return (
    <section>
      <h1>TransactionList</h1>
      <article>
        {transactions.map((transaction) => (
          <div style={{padding:'20px'}} key={transaction._id}>
            <p>{transaction.category}</p>
            <p className={transaction.type === 'expense' ? 'red' : 'green'}>{transaction.amount}</p>
            <p>{transaction.date}</p>
          </div>
        ))}
        </article>
    </section>  
  )
}

export default TransactionList;