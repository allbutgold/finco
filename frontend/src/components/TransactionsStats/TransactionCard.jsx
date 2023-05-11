import React from "react";
import styles from "./TransactionsStats.module.scss";

function TransactionCard({ amount, img, style, content }) {
	return (
		<article className={styles.TransactionCard}>
			<img src={img} alt="icon" style={style} />
			<p>{content}</p>
			<h4>
				{content == "Expense" || content == "Current" ? "-" : "+"} {amount}
			</h4>
		</article>
	);
}

export default TransactionCard;
