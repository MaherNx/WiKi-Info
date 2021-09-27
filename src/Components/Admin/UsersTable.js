import { func } from 'prop-types';
import React from 'react'; 
import axios from 'axios';
import { useState } from 'react';
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert'; 
import { NavLink } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import EditUserPopup from './EditUserPopup';

export default function UsersTable(props){
    const [showSuccess, setShowSuccess] = useState(false); 
    const [showError, setShowError] = useState(false); 
    const [showEdit, setShowEdit] = useState(false);
    const [userBefore, setUserBefore] = useState();  
    return (
        <div className = 'successful-alert-custom'>
            {showSuccess && <SuccessAlert
             msg= "تمت العملية بنجاح"
             onClose = {()=>{
                setShowSuccess(false);}}
            ></SuccessAlert>}
            {showError && <ErrorAlert
             msg= "حدث خطأ ما"
             onClose = {()=>{setShowError(false)}}
             
            ></ErrorAlert>}
            {showEdit && <EditUserPopup 
            u = {userBefore}
            setShowError={setShowError}
            setShowSuccess={setShowSuccess}
            username= {props.username}
            setShowEdit={setShowEdit}
    ></EditUserPopup>}
        <table className= "admin-view-table">
        <thead>
        <tr>
            <th colSpan={4}> 
             <h3>Table of Users</h3>
            </th>
            <th colspan={1}>
                <button className="admin-view-button">
                <AiOutlinePlusCircle size={25}></AiOutlinePlusCircle>  
                <NavLink 
                 className="admin-view-header-title"
                 to = {
                  {pathname:'/addUser', 
                   state: {
                       username: props.username
                   }} 
                   }
                > Add New User</NavLink>
                </button>

            </th>
        </tr>
        </thead>    
        <thead>
        <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit/ Delete</th>
        </tr>
        </thead>
        <tbody>
        {props.users.map((d, index)=>{
         return (
         <tr key= {d.username}>
            
             <td>
                 <label 
                 name = "Username" 
                 id = {`Username${index}`}
                 >
                {d.username}
                </label>
             </td>
             <td>
             <label 
                name = "Password"
                id = {`Password${index}`}
                 >
                {d.password}
                </label>
             </td>
             <td>
               <label 
                name = "email"
                id = {`email${index}`}
                 >
                {d.email}
                </label>
             </td>
             <td>
             <label 
                name = "role"
                id = {`role${index}`}
                 >
               {d.role} 
                </label>
             </td>
             <td>
              <button
              className= "admin-view-button-control"
              onClick ={
                  async(e)=>{  
                    setUserBefore(d);   
                    setShowEdit(true)
                }
              }
              >
              <FiEdit2 size={28}></FiEdit2>
              </button>
                   
              <button
              className= "admin-view-button-control"
               onClick={
                async ()=>{
                    console.log('hey from delete'); 
                    await axios.delete(`https://integserver1.paltel.ps:4589/api/users/${d.username}`).then(
                        (res)=>console.log(res)
                        )
                    props.removeUserFromView(d);
                    const DeleteLog = {
                        action : 'Delete', 
                        TablesName : 'Users', 
                        UpdatedObjectId: d.username, 
                        UpdatedBy: props.username                   
                    }
                    await axios.post('https://integserver1.paltel.ps:4589/api/logs',DeleteLog) 
                    setShowSuccess(true);  
                    setShowError(false);
                 }
              }
              >
                  <img src= {require("../../imgs/Delete-Icon.svg").default}></img>
              </button>
         
             </td>
  
         </tr>)
     })}

        </tbody>

    </table>
    </div>
    )
}