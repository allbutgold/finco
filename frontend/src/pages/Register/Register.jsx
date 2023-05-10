import styles from './Register.module.scss';

import RegisterForm from '../../components/Register/RegisterForm.jsx';

const Register = () => {
  return ( 
    <section className={styles.Register}>
      <h1>Create an account</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adip
sicing elit, sed do eiusmod.</p>
      <RegisterForm />
    </section>

  );
}

export default Register;