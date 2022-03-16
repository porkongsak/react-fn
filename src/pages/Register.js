import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'



const  Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword ] = useState('')
  const [password2, setPassword2 ] = useState('')

  async function registerUser (event) {
    event.preventDefault()
    if(password !== password2) {
      Swal.fire({
        icon: 'error',
        title: 'password ไม่เหมือนกันไอสัส',
        text: 'Please check your password and Confirm password',
      })
      console.log({ error:'not confirm'})
    }else{
      const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
          name,
          email,
          password,
          
      }),
    })
    //stringif what

    const data = await response.json()
    console.log(data)
    
    if  ( !data.error) {
      Swal.fire({
        icon: 'success',
        title: 'ยินดีด้วย สมัครชิก',
        text: 'Login Succesfull',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href='/login'
        }
      }).catch(error => {
          console.log( error)
      })
      //.then(window.location.href='/quote') 
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Email มันซำ้ไอสัส',
        text: 'Please check your username and password',
      })
    }
    }
    
  }

  return  (
    <div>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/><br/>
          <input type="text"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
          <input type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)}/><br/>
          <input type="submit" value="Register" /><br/>
          <Link to="/login"><button>Page Login</button></Link>
        </form>
    </div>
  );
}

export default Register;
 