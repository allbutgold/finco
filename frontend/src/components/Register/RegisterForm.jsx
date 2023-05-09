import styles from './RegisterForm.module.scss';
import { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToTnC, setAgreedToTnC] = useState(false);

  const URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(URL + 'register', {
      credentials: 'include',
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email, agreedToTnC })
    })
    const data = await response.json();
    console.log(data);
    e.target.reset();
  }
  return ( 
    <section className={styles.RegisterForm}>
      <h1>RegisterForm</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input type="text" name='username' onChange={(e)=> setUsername(e.target.value)}/>
        <label htmlFor="email">email</label>
        <input type="email" name='email' onChange={(e)=> setEmail(e.target.value)} />
        <label htmlFor="password">password</label>
        <input type="password" name='password' onChange={(e)=> setPassword(e.target.value)} />
        <label htmlFor="T&C">agree to T&C</label>
        <input type="checkbox" name='T&C' value={true} onChange={(e)=> setAgreedToTnC(e.target.value)}/>
        <button type='submit'>Register</button>
      </form>
    </section>
  );
}

export default RegisterForm;