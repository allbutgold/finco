
import styles from "./RegisterForm.module.scss"
import { useState } from "react"

const RegisterForm = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")
	const [agreedToTnC, setAgreedToTnC] = useState(false)

	const URL = import.meta.env.VITE_BACKEND_URL

	const handleSubmit = async (e) => {
		e.preventDefault()

    const response = await fetch(URL + 'register', {
      credentials: 'include',
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ account: { username, password, email, agreedToTnC }})

    })
    const data = await response.json();
    console.log(data);
    e.target.reset();
  }
  return ( 
    <section className={styles.RegisterForm}>
      <form onSubmit={handleSubmit}>

        <input placeholder="Name" type="text" name='username' onChange={(e)=> setUsername(e.target.value)}/>

        <input placeholder="Email" type="email" name='email' onChange={(e)=> setEmail(e.target.value)} />

        <input placeholder="Password" type="password" name='password' onChange={(e)=> setPassword(e.target.value)} />
        <div>
          <input type="checkbox" name='T&C' value={true} onChange={(e)=> setAgreedToTnC(e.target.value)} required/>
          <label htmlFor="T&C">Agree to our Terms and Service</label>
        </div>
        <button type='submit'>Register</button>
      </form>
    </section>
  );

}

export default RegisterForm

