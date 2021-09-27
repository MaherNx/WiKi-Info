import React from 'react'; 
import { useEffect, useState } from 'react';
import {FiUser, FiLock} from 'react-icons/fi';
import {HiOutlineMail} from 'react-icons/hi';
import { AiOutlineFileAdd} from 'react-icons/ai';
import axios from 'axios';

const EditUserPopup=(props)=>{
    const roles = ['User', 'Admin', 'super'];
    const EditUser = async(e)=>{
        e.preventDefault(); 
        const updatedUser = {
            username: document.getElementsByName(`username`)[0].value, 
            password: document.getElementsByName(`password`)[0].value, 
            email: document.getElementsByName(`email`)[0].value, 
            role: document.getElementsByName(`role`)[0].value, 
        }
        if(updatedUser.username==''|| updatedUser.password==''|| updatedUser.email==''){
                    props.setShowError(true);
        }
        else{
            await axios.put(`https://integserver1.paltel.ps:4589/api/users/${props.u.username}`, updatedUser).then(
           (res)=> console.log(res));            
           const Log = {
                        action : 'Edit', 
                        TablesName : 'users', 
                        UpdatedObjectId: props.u.username, 
                        UpdatedBy: props.username
                    }
            await axios.post('https://integserver1.paltel.ps:4589/api/logs',Log).then(
                (res)=>{
                        console.log(res.data)
                        })
            props.setShowSuccess(true); 
            props.setShowEdit(false); 
            window.location.reload();
        }
    
    }
    return (
        <div className="edit-popup-outer">
            <div className="edit-popup-inner">
                <div className="edit-popup-inner-top">
                <h2 className="edit-popup-inner-title">Edit</h2>
                <button 
                className="edit-popup-inner-close"
                onClick={()=>{props.setShowEdit(false)}}>X</button>
                </div>
                <form onSubmit= {(e)=>{e.preventDefault()}}>
                    <div className="admin-form-in">
                    <input type='text' defaultValue={props.u.username} name="username"  className="admin-form-input"></input>
                    <div className="amin-form-icon-div">
                        <FiUser  
                        size = {25} 
                        className="admin-form-icon"
                        />
                    </div>
                    </div>
                    <div className="admin-form-in">
                    <input type='text' defaultValue={props.u.password} name="password"  className="admin-form-input"></input>
                    <div className="amin-form-icon-div">
                        <FiLock 
                        size = {25} 
                        className="admin-form-icon"
                        />
                    </div>
                    </div>
                    <div className="admin-form-in">
                    <input type='text' defaultValue={props.u.email} name="email"  className="admin-form-input"></input>
                    <div className="amin-form-icon-div">
                        <HiOutlineMail 
                        size = {25} 
                        className="admin-form-icon"
                        />
                    </div>
                    </div>
                    <div className="admin-form-in">
                    <select  name="role" className="file-id admin-form-input">
                      {roles.map((r)=>{
                          let s = r==props.u.role? true: false
                          return <option selected={s}>{r}</option>
                      })}
                    </select>
                    <div className="amin-form-icon-div">
                      <AiOutlineFileAdd
                       size = {25}
                      className="admin-form-icon"
                     ></AiOutlineFileAdd>
                    </div>
                    </div>
                    <div className="admin-form-button-outer">
                    <button onClick={EditUser}
                    className="admin-form-button"
                    >Edit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditUserPopup; 