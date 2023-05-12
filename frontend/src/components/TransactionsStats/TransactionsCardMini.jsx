import { useState, useRef } from "react";
import { userStore } from "../../utils/userStore";

import styles from "./TransactionsStats.module.scss";
import more from "../../assets/img/more-horizontal.svg";

function TransactionsCardMini({ img, style, content, options, amount }) {
  const userID = userStore((state) => state.userID);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [budget, setBudget] = useState(amount);

  const changeBudget = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL + "setBudget?id=" + userID, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ budget }),
      });
      const data = await response.json();
      console.log(data);
      dialogRef.current.close();
    } catch (error) {
      console.log(error);
    }
  };

  const dialogRef = useRef();

  return (
    <article className={styles.TransactionCardMini}>
      <img src={img} alt="icon" style={style} />
      <div>
        <p>{content}</p>
        <h4>
          {content === "Expense" || content === "Current" ? "-" : "+"} {amount}
        </h4>
      </div>
      {options ? (
        <button
          onClick={() => {
            dialogRef.current.showModal();
          }}
        >
          <img src={more} alt="show more" />
        </button>
      ) : (
        ""
      )}
      <dialog ref={dialogRef}>
        <form onSubmit={changeBudget}>
          <label htmlFor="budget">Change your budget</label>
          <input
            type="number"
            name="budget"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder={amount}
          />
          <div>
            <button type="submit">CHANGE</button>
            <button onClick={() => dialogRef.current.close()}>Close</button>
          </div>
        </form>
      </dialog>
    </article>
  );
}

export default TransactionsCardMini;
