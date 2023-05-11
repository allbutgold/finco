import styles from './Report.module.scss';
import AllTransactions from '../../components/AllTransactions/AllTransactions.jsx';
import Header from '../../components/Header/Header.jsx';

const Report = () => {
  return ( 
    <section className={styles.Report}>
      <Header profile />
      <h1>Total Transactions</h1>
      <AllTransactions />
    </section>
  );
}

export default Report;