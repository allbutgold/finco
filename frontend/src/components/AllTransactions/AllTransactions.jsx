import { useState, useEffect } from "react";
import { userStore } from "../../utils/userStore.js";
import circle from "../../assets/img/bg.svg";
import styles from "./AllTransactions.module.scss";

const TransactionList = ({ transactions }) => {
	return (
		<article className={styles.TransactionSection}>
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

							<p className={transaction.type === "expense" ? "red" : "green"}>
								${transaction.amount}
							</p>
						</div>
					))}
			</div>
		</article>
	);
};

export default TransactionList;
