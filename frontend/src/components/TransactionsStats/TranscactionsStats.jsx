import styles from "./TransactionsStats.module.scss";
import { Link } from "react-router-dom";
import trendingUp from "../../assets/img/trending-up.svg";
import trendingDown from "../../assets/img/trending-down.svg";
import TransactionCard from "./TransactionCard";
import { incomeStyles, expenseStyles } from "../../utils/helper.js";


function TranscactionsStats({ incomeAmount, expenseAmount, mini, incomePath, expensePath, incomeContent, expenseContent }) {
	return (
		<div className={styles.TranscactionsStats}>

      <Link to={incomePath}>
        <TransactionCard
          amount={incomeAmount}
          img={trendingUp}
          style={incomeStyles}
          content={incomeContent}
          mini={mini}
        />
      </Link>

      <Link to={expensePath}>
        <TransactionCard
            amount={expenseAmount}
            img={trendingDown}
            style={expenseStyles}
            content={expenseContent}
            mini={mini}
          />
      </Link>
    </div>
  );
}

export default TranscactionsStats;
