import FilterTransactionList from "../../components/FilterTransactionList/FilterTransactionList.jsx";
import Header from "../../components/Header/Header.jsx";

import styles from "./FilterTransactions.module.scss"

const FilterTransactions = () => {

  return (
    <section className={styles.Transactions}>
      <Header back profile />

      <h1>All Transactions</h1>
      <h2>Choose a Category</h2>
      <FilterTransactionList />
    </section >
  );
};

export default FilterTransactions;
