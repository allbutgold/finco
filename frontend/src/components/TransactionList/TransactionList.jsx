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
      setTransactions(data);
    }
    getTransactions();
  }, []) 

console.log(transactions)
  return (
    <section>
      <h1>TransactionList</h1>
      <article>
        {Object.entries(transactions).map(([key, array]) => (
          <div style={{padding:'40px'}} key={key}>
            <h1>{key}</h1>
            {array.map((transaction, index) => (
              <div style={{ padding: '20px' }} key={index}>
              <p>{transaction.category}</p>
              <p className={transaction.type === 'expense' ? 'red' : 'green'}>{transaction.amount}</p>
              <p>{transaction.date}</p>
            </div>
            ))}
            
          </div>
        ))}
        </article>
    </section>  
  )
}

export default TransactionList;