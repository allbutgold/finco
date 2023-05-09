
import styles from './Setup.module.scss';
import SetupForm from '../../components/SetupForm/SetupForm.jsx';

const Setup = () => {


  return ( 
    <section className={styles.Setup}>
      <h1>Setup</h1>
      <SetupForm/>
    </section>

  );
}

export default Setup;