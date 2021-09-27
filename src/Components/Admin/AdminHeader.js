//not gonna be used, delete this file with its styles 
import React from 'react'; 
import { NavLink } from 'react-router-dom';
import {IoHome } from 'react-icons/io5'; 
import {AiFillControl} from 'react-icons/ai'
export default function AdminHeader (){

    return (<div className="admin-header">
           <NavLink to="/adminView" >
               <AiFillControl></AiFillControl>
               Control Panel</NavLink>
           <NavLink to="/"> 
                <IoHome></IoHome>
                  Home</NavLink>
           </div>
           )
}