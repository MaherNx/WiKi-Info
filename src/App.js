import {React, useState} from 'react';
import './Styles/styles.scss'; 
import Header from './Components/Header';
import Login from './Components/Admin/Login';
import ApplicationRouter from './Components/ApplicationRouter';
import { BrowserRouter, Link} from 'react-router-dom';
import HomePage from './Components/HomePage';
import useToken from './Components/useToken'; 
import AdminHeader from './Components/Admin/AdminHeader'; 
import Example from './Components/counter';


export default function App (){
   //had kan zabet 
    //const [token, setToken] = useState();
   // const token = getToken(); 
   const { token, setToken } = useToken();
   //console.log(token)
   if(!token) {
    return <Login setToken={setToken}></Login>
   }
      return(
            
            <BrowserRouter>
           <div>
            {/* <Header userInfo ={token}></Header> */}
           <ApplicationRouter userInfo ={token}>
           </ApplicationRouter>
           </div>
           </BrowserRouter>

         )
   }
