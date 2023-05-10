import styles from './Transactions.module.scss'
import TransactionList from '../../components/TransactionList/TransactionList';

const Transactions = () => {
  return ( 
    <section className={styles.Transactions}>
      <h1>Transactions</h1>
      <TransactionList />
    </section>
  );
}

export default Transactions
