import styles from "./TransactionList.module.scss";
import "./TransactionList.css";
import { formatToDollar, mapEmoji } from "../../utils/helper.js";

function SingleTransaction({ transaction }) {
	if (transaction)
		return (
			<div className={styles.SingleTransaction}>
				<div
					className={styles.TransactionImage}
					style={{ backgroundColor: "var(--bg-100)" }}>
					<h3>{mapEmoji(transaction)}</h3>
				</div>
				<div className={styles.TransactionDetails}>
					<h4>{transaction.category}</h4>
					<div className={styles.DateTime}>
						<p>{transaction.time}</p>
						<p>{transaction.date}</p>
					</div>
				</div>
				<p className={transaction.type === "expense" ? "negative" : "positive"}>
					{transaction.type === "expense"
						? "-" + formatToDollar(transaction.amount)
						: "+" + formatToDollar(transaction.amount)}
				</p>
			</div>
		);
}

export default SingleTransaction;
