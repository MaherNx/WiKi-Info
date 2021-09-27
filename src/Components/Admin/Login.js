import React from "react"; 
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useState,useEffect } from "react";
import HomePage from "../HomePage";
import PropTypes from 'prop-types';
import InputTag from "./keywordsTags";


const Login =  ({setToken})=>{
  const [role, setRole] = useState(''); 
  const loginSubmit =   async (e)=>{
  await   e.preventDefault();
  const enteredEmail = e.target.elements.email.value; 
  if (enteredEmail.split('@')[1] != "paltel.ps")
  console.log('not paltel!!')
  else{
    const user = {
      email : e.target.elements.email.value, 
      password : e.target.elements.password.value, 
      role : 'n', 
      username: 'n'
    }
       await axios.post(
      "https://integserver1.paltel.ps:4589/api/Users/login", user
     ).then(
       async(res)=>{
         console.log(res);
          setToken({
         role: res.data.role, 
         username: res.data.username, 
       })
       // await setRole(res.data.role)
      
        // await sessionStorage.setItem('role', JSON.stringify(role));
       }
     )
  }
    
  }
   
    return (
      
      <div className='login-page'>
        <div className='login-page-left-side'>
       <img 
       src={require('../../imgs/Wiki-white.png').default}
       className= 'logo-img'
       />   
       <img 
       src={require('../../imgs/Group 8.png').default}
       className= 'login-img'
       />
       </div>
       {role!='user' || role!='admin'? (
        <form className="login-form" 
        onSubmit={loginSubmit}
        >
          
        <h2 className='login-title'>Login Page</h2>
        <fieldset>
          <ul>
            <li>
              <input 
              placeholder="Email" 
              type="email" 
              id="email" 
              className="login-form-input"
              required/>
            </li>
            <li>
              <input 
              placeholder="Password" 
              type="password" 
              id="password"
              className="login-form-input" 
              required/>
            </li>
            {/* <li>
              <i/>
              <a  href="#">Forgot Password?</a>
            </li> */}
          </ul>
        </fieldset>
        <button className="login-button">Login</button>
        {/* <button type="button">Create an Account</button> */}
      </form>): <Redirect to={{pathname:'/'}}></Redirect>

      }
      </div>
        
    )

}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
export default Login