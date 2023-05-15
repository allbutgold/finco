import SingleTransaction from "../TransactionList/SingleTransaction.jsx";

import styles from "./AllTransactions.module.scss";

const TransactionList = ({ transactions }) => {
	return (
		<div className={styles.TransactionContainer}>
			{Object.entries(transactions)
				.flatMap(([key, array]) => array)
				.map((transaction, index) => (
					<SingleTransaction transaction={transaction} key={index} />
				))}
		</div>
	);
};

export default TransactionList;
