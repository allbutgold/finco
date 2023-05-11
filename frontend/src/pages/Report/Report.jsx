import styles from './Report.module.scss';
import AllTransactions from '../../components/AllTransactions/AllTransactions.jsx';

const Report = () => {
  return ( 
    <section className={styles.Report}>
      <h1>Report</h1>
      <AllTransactions />
    </section>
  );
}

export default Report;