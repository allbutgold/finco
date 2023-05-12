import React from "react";
import styles from "./TransactionsStats.module.scss";

import trendingUp from "../../assets/img/trending-up.svg";
import trendingDown from "../../assets/img/trending-down.svg";
import TransactionCard from "./TransactionCard";
import { incomeStyles, expenseStyles } from "../../utils/helper.js";

function TranscactionsStats({ incomeAmount, expenseAmount, mini }) {
	return (
		<div className={styles.TranscactionsStats}>
			<TransactionCard
				amount={incomeAmount}
				img={trendingUp}
				style={incomeStyles}
				content="Income"
				mini={mini}
			/>

			<TransactionCard
				amount={expenseAmount}
				img={trendingDown}
				style={expenseStyles}
				content="Expense"
				mini={mini}
			/>
		</div>
	);
}

export default TranscactionsStats;
