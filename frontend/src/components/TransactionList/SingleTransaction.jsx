import styles from "./TransactionList.module.scss";
import { formatToDollar, mapImage } from "../../utils/helper.js";

function SingleTransaction({ transaction }) {
	return (
		<div className={styles.SingleTransaction}>
			<div className={styles.TransactionImage}>
				<img src={mapImage(transaction)} alt={transaction.category} />
			</div>
			<div className={styles.TransactionDetails}>
				<h4>{transaction.category}</h4>
				<div className={styles.DateTime}>
					<p>{transaction.time}</p>
					<p>{transaction.date}</p>
				</div>
			</div>
			<p className={transaction.type === "expense" ? "red" : "green"}>
				{formatToDollar(transaction.amount)}
			</p>
		</div>
	);
}

export default SingleTransaction;
