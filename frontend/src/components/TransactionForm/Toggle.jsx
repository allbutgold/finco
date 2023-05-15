import React from "react";
import style from "./TransactionForm.module.scss";
import { transactionStore } from "../../utils/transactionStore";
function Toggle({ onchange }) {
	const type = transactionStore.getState().transactionType;
	const setType = (value) =>
		transactionStore.getState().setTransactionType(value);
	return (
		<div className={style.Toggle}>
			<input
				type="radio"
				name="type"
				id="expense"
				value="expense"
				onChange={onchange}
				checked={type == "expense"}
			/>
			<label htmlFor="expense">Expense</label>
			<input
				type="radio"
				name="type"
				id="income"
				value="income"
				onChange={onchange}
				// onChange={(e) => setType(e.target.value)}
				checked={type == "income"}
			/>
			<label htmlFor="income">Income</label>
		</div>
	);
}

export default Toggle;
