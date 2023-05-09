import styles from './Register.module.scss';

import RegisterForm from '../../components/Register/RegisterForm.jsx';

const Register = () => {
  return ( 
    <section className={styles.Register}>
      <h1>Register</h1>
      <RegisterForm />
    </section>

  );
}

export default Register;