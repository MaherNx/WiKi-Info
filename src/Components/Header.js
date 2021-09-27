import React from "react"; 
import {FiLogOut} from 'react-icons/fi'; 
import {FaUserCircle} from 'react-icons/fa';
import {AiFillControl} from 'react-icons/ai';  
import {FiMenu} from 'react-icons/fi';
import { Dropdown } from "react-bootstrap";
import {NavLink} from 'react-router-dom';

function Header(props) {
  const logOut = ()=>{
  localStorage.clear(); 
  window.location.replace("/");
}
   
    return (<div className="header-view">
      <div className='header-left-side'>
        <NavLink to="/">
          <img 
          src={require("../imgs/WIKI.png").default}
          className="logo-img-header"
          /> 
        </NavLink>
      </div>
    <div className='header-right-side'>
    <p className="header-view-username">{props.userInfo.username}</p> 
    <FaUserCircle size={25} className="header-user-icon"></FaUserCircle>
    {props.userInfo.role ==='admin'|| props.userInfo.role ==='super'?
     <Dropdown className="header-logout-button">
         <Dropdown.Toggle>
           <FiMenu size={25}></FiMenu>
         </Dropdown.Toggle>
       <Dropdown.Menu>
          <Dropdown.Item onClick={logOut}>
            <FiLogOut size={25}></FiLogOut>
            <span>Logout</span>
          </Dropdown.Item>
          <Dropdown.Item >
            <NavLink to="/adminView" replace className="header-admin-link">
               <AiFillControl size={25}></AiFillControl>
               <span>Control Panel</span>
            </NavLink>
          </Dropdown.Item>
        </Dropdown.Menu>
     </Dropdown>:
     <button className="header-logout-button" onClick={logOut}><FiLogOut size={25} ></FiLogOut></button>
    }
    </div> 
    </div>
    );
  }
export default Header;