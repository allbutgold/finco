import styles from "./TransactionList.module.scss";
import { formatToDollar, mapType, mapColor } from "../../utils/helper.js";

function SingleTransaction({ transaction }) {
	return (
		<div className={styles.SingleTransaction}>
			<div
				className={styles.TransactionImage}
				style={{ backgroundColor: "var(--bg-100)" }}>
				{/* <img src={mapType(transaction,icon)} alt={transaction.category} /> */}
				<h3>{mapType(transaction, "emoji")}</h3>
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
