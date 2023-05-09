import { useState } from 'react';

const SetupForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [image, setImage] = useState(null);
  let _id = '645a227458e2eb3d5ea37dcd'

  const URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('cardNumber', cardNumber);
    formData.append('expDate', expDate);
    formData.append('profileImage', image);
    formData.append('_id', _id)
  
    const response = await fetch(URL + 'setup', {
      credentials: 'include',
      method: 'POST',
      body: formData
    })
    const data = await response.json();
    console.log(data);
    e.target.reset();
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

  return ( 
    <section>
      <h1>SetupForm</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" name='cardNumber' onChange={(e)=> setCardNumber(e.target.value)}/>
        <label htmlFor="expDate">Expiration Date</label>
        <input type="date" name='expDate' onChange={(e)=> setExpDate(e.target.value)} />
        <label htmlFor="image">Image</label>
        <input type="file" name='profileImage' onChange={handleImageChange} accept="image/*"/>
        <button type='submit'>Register</button>
      </form>
    </section>
  );
}

export default SetupForm;

