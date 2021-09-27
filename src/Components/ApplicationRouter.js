import React from "react"; 
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'; 
import AddQAForm from "./Admin/AddQAForm";
import AddUserForm from "./Admin/AddUserForm";
import AdminView from "./Admin/AdminView";
import Login from "./Admin/Login";
import HomePage from "./HomePage";
import Question from "./Question";
import AdminHeader from "./Admin/AdminHeader";
import FileView from "./Admin/FileView";
const ApplicationRouter = (props)=>{
   return (
     
       <Router>
           <Switch>
               <Route path="/" exact={true}>
                 <HomePage userInfo={props.userInfo}></HomePage>
               </Route>
               <Route path="/login" exact={true}>
                 <Login></Login>
               </Route>
               <Route path="/Question/:id" component={Question}>
              </Route>
              {(props.userInfo.role == 'admin' ||props.userInfo.role == 'super')?<Route path="/AdminView" exact={true} >
               <AdminView userInfo={props.userInfo}></AdminView>
              </Route>: <h1>Unauthorized Admin!</h1>}

              {(props.userInfo.role == 'admin' ||props.userInfo.role == 'super')?<Route path="/AddUser" exact={true} >
               <AddUserForm userInfo={props.userInfo}></AddUserForm>
              </Route>: <h1>Unauthorized Admin!</h1>}

              {(props.userInfo.role == 'admin' ||props.userInfo.role == 'super')?<Route path="/adminAdd" exact={true} >
               <AddQAForm userInfo={props.userInfo}></AddQAForm>
              </Route>: <h1>Unauthorized Admin!</h1>}
              <Route path="/FileView/:id" component={FileView}>

              </Route>
           </Switch>
       </Router>
   )
}
export default ApplicationRouter; 