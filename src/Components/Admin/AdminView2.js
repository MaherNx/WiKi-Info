import axios from 'axios';
import React, { useEffect , useState} from 'react'; 
import { NavLink } from 'react-router-dom';
import {AiOutlineAppstoreAdd} from 'react-icons/ai';
import {AiOutlineUserAdd} from 'react-icons/ai';
import useToken from '../useToken';

export default function AdminView2 (props){
   const [data, setData] = useState([]); 
   const [users, setUsers] = useState([]); 
   const { token, setToken } = useToken();
   useEffect(() => {
    await axios.get("https://integserver1.paltel.ps:4589/api/QandA").then(
        (res)=>{
           setData(res.data); 
        }
     )
     await axios.get("https://integserver1.paltel.ps:4589/api/users").then(
        (res)=>{
          setUsers(res.data); 
        }
    ) 
    }, [])

    deleteQuestion= (id)=>{
        console.log('hey from delete'); 
        axios.delete(`https://integserver1.paltel.ps:4589/api/QandA/${id}`).then(
         )
    }

    return (
        <div>
             <div className="admin-view-header">
             
              <NavLink 
              className="admin-view-header-title"
              to = '/adminAdd'>إضافة سؤال جديد</NavLink>
              <AiOutlineAppstoreAdd></AiOutlineAppstoreAdd>
             </div>
            <table className= "admin-view-table" >
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Details</th>
                    <th>keywords</th>
                </tr>
                </thead>
                <tbody>
             {data.map((d)=>{
                 return (
                 <tr key= {d.id}>
                    
                     <td>
                         <input
                           name = "question"
                           defaultValue={d.question}
                           />
                     </td>
                     <td>
                     <input
                           name = "answer"
                           defaultValue={d.answer}
                           />
                     </td>
                     <td>
                     <input
                           name = "details"
                           defaultValue={d.details}
                           />
                     </td>
                     <td>
                     <input
                           name="keywords"
                           defaultValue={d.keywords}
                           />
                     </td>
                     <td>
                      <button
                      className= "admin-view-button"
                      value = {d.id}
                      onClick ={
                          async(e)=>{
                              const updatedQuestion = {
                                  question: e.target.parentElement.parentElement.children[0].children[0].value, 
                                  answer: e.target.parentElement.parentElement.children[1].children[0].value, 
                                  details: e.target.parentElement.parentElement.children[2].children[0].value, 
                                  keywords: e.target.parentElement.parentElement.children[3].children[0].value
                              }
                           // console.log(e.target.parentElement.parentElement.children[3].children[0].value)  
                            await axios.put(`https://integserver1.paltel.ps:4589/api/QandA/${d.id}`, updatedQuestion).then(
                                (res)=> console.log(res)
                                ) 
                          }
                      }
                      >Edit</button>
                     </td>
                     <td>
                      <button
                      className= "admin-view-button"
                       onClick={
                        async ()=>{
                            console.log('hey from delete'); 
                            await axios.delete(`https://integserver1.paltel.ps:4589/api/QandA/${d.id}`).then(
                                (res)=>console.log(res)
                                )
                            setData((prevState)=>{
                              return  {data: prevState.data.filter(da => da.id != d.id)}
                            })   
                         }
                      }
                      >Delete</button>
                     </td>
                 </tr>)
             })}
             </tbody>
    
            </table>
            <div className="admin-view-header">
             
             <NavLink 
             className="admin-view-header-title"
             to = '/AddUser'>إضافة مستخدم جديد</NavLink>
             <AiOutlineUserAdd></AiOutlineUserAdd>
            </div>
            <table className= "admin-view-table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {this.state.users.map((d)=>{
                 return (
                 <tr key= {d.username}>
                    
                     <td>
                         <input
                           name = "Username"
                           defaultValue={d.username}
                           />
                     </td>
                     <td>
                     <input
                           name = "Password"
                           defaultValue={d.password}
                           />
                     </td>
                     <td>
                     <input
                           name = "Role"
                           defaultValue={d.role}
                           />
                     </td>
                     <td>
                      <button
                      className= "admin-view-button"
                      onClick ={
                          async(e)=>{
                              const updatedUser = {
                                  username: e.target.parentElement.parentElement.children[0].children[0].value, 
                                  password: e.target.parentElement.parentElement.children[1].children[0].value, 
                                  role: e.target.parentElement.parentElement.children[2].children[0].value, 
                              }
                           // console.log(e.target.parentElement.parentElement.children[3].children[0].value)  
                            await axios.put(`https://integserver1.paltel.ps:4589/api/users/${d.username}`, updatedUser).then(
                                (res)=> console.log(res)
                                ) 
                          }
                      }
                      >Edit</button>
                     </td>
                     <td>
                      <button
                      className= "admin-view-button"
                       onClick={
                        async ()=>{
                            console.log('hey from delete'); 
                            await axios.delete(`https://integserver1.paltel.ps:4589/api/users/${d.username}`).then(
                                (res)=>console.log(res)
                                )
                            this.setState((prevState)=>{
                              return  {users: prevState.users.filter(da => da.username != d.username)}
                            })   
                         }
                      }
                      >Delete</button>
                     </td>
                 </tr>)
             })}

                </tbody>

            </table>
        </div>)

}