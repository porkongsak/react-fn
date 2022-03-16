import React, { useState } from 'react'
import Swal from 'sweetalert2'


const Login = () =>{
  
  const [email, setEmail] = useState('')
  const [password, setPassword ] = useState('')

  async function loginUser (event) {
    event.preventDefault()
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
          email,
          password
      }),
    })
    
    //stringif what
    const data = await response.json()
    if  ( data.user ) {
      Swal.fire({
        icon: 'success',
        title: 'เข้าสู้ระบบ..อะไรวะ',
        text: 'Login Succesfull',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href='/dashboard'
        }
      }).catch(error => {
          console.log( error)
      })
      //.then(window.location.href='/quote') 
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please check your username and password',
      })
    }

    console.log(data)
  }

  return  (
    <div>
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <input type="text"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
          <input type="submit" value="Login" /><br/><br/><br/>
         
        </form>
    </div>
  );
}

export default Login;
 