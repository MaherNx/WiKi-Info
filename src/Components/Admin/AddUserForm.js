import React from "react"; 
import axios from "axios";
import {FiUser, FiLock} from 'react-icons/fi';
import {RiLockPasswordFill} from 'react-icons/ri';
import {AiFillInfoCircle} from 'react-icons/ai';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {HiOutlineMail} from 'react-icons/hi';
import ErrorAlert from "../ErrorAlert";
import SuccessAlert from "../SuccessAlert";
import Header from "../Header";
const AddUserForm =(props)=>{

  const [show, setShow] = useState(false); 
  const [Error, setError] = useState(false); 
  const onClose  = ()=>{
    setShow(false); 
  }
  const onCloseError = ()=>{
    setError(false); 
  }
    return(<div>
            <Header userInfo ={props.userInfo}></Header>
            <div className="admin-form">

            <form onSubmit={
              async  (e)=>{
                    e.preventDefault();
                    const u = {
                        username : e.target.elements.username.value, 
                        password :  e.target.elements.password.value, 
                        role : e.target.elements.role.value,
                        email: e.target.elements.email.value
                    }
                  if(u.username == '' || u.password==''|| u.role==''){
                    setError(true); 
                    setShow(false); 
                  }
                  else{
                  await axios.post('https://integserver1.paltel.ps:4589/api/users/register', u)
                  .then(function (response) {
                    console.log(response);
                  })
                  setShow(true);
                  setError(false);
                } 
                }
            }>

            
            <p className="admin-form-in-title">إضافة مستخدم جديد</p>
            {Error&& <ErrorAlert
                  onClose={onCloseError}
                  msg = "حدث خطأ ما"
            
            ></ErrorAlert>
          }
            {show&&<SuccessAlert 
                onClose={onClose}
                msg = "تمت العملية بنجاح"
        ></SuccessAlert>}
           <div className="admin-form-in">
            <input 
            type="text" 
            name = "username"
            placeholder="اسم المستخدم"
            className="admin-form-input "></input>
            <div className="amin-form-icon-div">
            <FiUser 
            size = {25} 
            className="admin-form-icon"
            ></FiUser>
            </div>
            </div>
            <div className="admin-form-in">
            <input 
            type="password" 
            name = "password"
            placeholder="كلمة المرور"
            className="admin-form-input" 
            ></input>
            <div className="amin-form-icon-div">
            <FiLock
             size = {25}
             className="admin-form-icon"
             ></FiLock>
             </div>
           </div>
           <div className="admin-form-in">
            <input 
            type="text" 
            name = "email"
            placeholder="البريد الإلكتروني"
            className="admin-form-input" 
            ></input>
            <div className="amin-form-icon-div">
            <HiOutlineMail
             size = {25}
             className="admin-form-icon"
             ></HiOutlineMail>
             </div>
           </div>
            <div className="admin-form-in">
            {/* <input 
            type="text" 
            name = "role"
            placeholder="Enter the role"
            className="admin-form-input" 
            ></input> */}
            <select name="role" id="role" className="admin-form-input admin-form-input-select" required>
            <option value=""  disabled selected hidden>الوظيفة</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="super">Super</option>
            </select>
            <div className="amin-form-icon-div">
             <img src={require("../../imgs/Role-icon.svg").default}
                  className="admin-form-icon"
            />
             </div>
           </div>
           <div className="admin-form-button-outer" >
           <button 
              className="admin-form-button"
              >إضافة</button>
           </div>
        </form>
        {/* {show?<Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      </Alert>: <p>no</p>} */}
         </div>
         </div>)


}
export default AddUserForm