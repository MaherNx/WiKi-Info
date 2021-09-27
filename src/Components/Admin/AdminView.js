import axios from 'axios';
import React, { useEffect } from 'react'; 
import { NavLink } from 'react-router-dom';
import {AiOutlineUserAdd} from 'react-icons/ai';
import QuestionsTable from './QuestionsTable'; 
import UsersTable from './UsersTable'; 
import Header from '../Header';
import FilesTable from './FilesTable';
import Tab from 'react-bootstrap/Tab'; 
import Comments from './Comments.js'; 
import { Tabs } from 'react-bootstrap';

class AdminView extends React.Component{
 constructor(props){
        super(props); 
        this.state = {
                   data : [], 
                   users: [], 
                   Files:[],
                   userInfo: {}
               }
               console.log(props.userInfo)
      }

    componentDidMount=async(props)=>{
    
        await axios.get("https://integserver1.paltel.ps:4589/api/QandA").then(
            (res)=>{
               this.setState(()=>({
                  data: res.data
               }))
            }
         )
        await axios.get("https://integserver1.paltel.ps:4589/api/users").then(
            (res)=>{
                this.setState(()=>({
                    users: res.data
                }))
            }
        ) 
        await axios.get("https://integserver1.paltel.ps:4589/api/file").then(
            (res)=>{
                this.setState(()=>({
                    Files: res.data
                }))
            }
        )

    }  

    deleteQuestion= (id)=>{
        console.log('hey from delete'); 
        axios.delete(`https://integserver1.paltel.ps:4589/api/QandA/${id}`).then(
         )
    }
    removeQuestionFromView=(d)=>{
        this.setState((prevState)=>{
            return  {data: prevState.data.filter(da => da.id != d.id)}
          })  
    }
    removeUserFromView=(d)=>{
        console.log(d); 
        this.setState((prevState)=>{
            return  {users: prevState.users.filter(da => da?.username != d.username)}
          })  
    }

    render(){
    return (
        <div>
            <Header userInfo ={this.props.userInfo}></Header>
             <div className="admin-view-header">
                 <h2>Control Panel</h2>
             </div>
             <Tabs defaultActiveKey="Questions" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="Questions" title="Questions">
                <QuestionsTable 
                 data = {this.state.data}
                 role={this.props.userInfo.role}
                 username = {this.props.userInfo.username}
                 removeQuestionFromView = {this.removeQuestionFromView}
              ></QuestionsTable>
                </Tab>
                <Tab eventKey="Files" title="Files">
                {
                (this.props.userInfo.role =='super' || this.props.userInfo.role =='admin') &&
                <div>
                    <FilesTable
                    files= {this.state.Files}
                    >
                    </FilesTable>
                </div>
            }
                </Tab>
                <Tab eventKey="Users" title="Users" >
 
                {this.props.userInfo.role == 'super'&&
                      <div>
                       <UsersTable 
                       users = {this.state.users}
                       username = {this.props.userInfo.username}
                       removeUserFromView = {this.removeUserFromView}
                       ></UsersTable>
                       </div>
                       }
                </Tab>
                <Tab eventKey="Comments Requests" title="Comments Requests">
                 <div>
                 <Comments>
                 </Comments>
                 </div>
                </Tab>
                </Tabs>



        </div>)
 }  

}
export default AdminView