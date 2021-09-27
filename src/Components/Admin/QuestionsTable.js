import {React, useState} from 'react'; 
import axios from 'axios';
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert'; 
import { NavLink } from 'react-router-dom';
import {AiOutlinePlusCircle} from 'react-icons/ai'; 
import {FiEdit2} from 'react-icons/fi'; 
import { useEffect } from 'react';
import EditPopup from './EditPopup';
import Modal from 'react-modal'; 


export default function QuestionsTable(props){
    const [showSuccess, setShowSuccess] = useState(false); 
    const [showError, setShowError] = useState(false); 
    const [showEdit, setShowEdit] = useState(false); 
    const [questionBefore, setQuestionBefore] = useState(); 
return (
    <div className = 'successful-alert-custom'>
        {showSuccess && <SuccessAlert
        msg= "تمت العملية بنجاح"
        onClose = {()=>{setShowSuccess(false);}}
         ></SuccessAlert>}
        {showError && <ErrorAlert
        msg= "حدث خطأ ما"
        onClose = {()=>{setShowError(false)}}
        ></ErrorAlert>}
    {showEdit && <EditPopup 
    q={questionBefore}
    setShowError={setShowError}
    setShowSuccess={setShowSuccess}
    username= {props.username}
    setShowEdit={setShowEdit}
    ></EditPopup>}
    <table className= "admin-view-table" >
        <thead>
        <tr>
            <th colSpan={6}> 
             <h3>Table of questions</h3>
            </th>
            <th colspan={2} className="special">
                <button className="admin-view-button">
                <AiOutlinePlusCircle size={25}></AiOutlinePlusCircle>  
                <NavLink 
                 className="admin-view-header-title"
                 to = {
                  {pathname:'/adminAdd', 
                   state: {
                       username: props.username
                   }} 
                   }
                > Add New Question</NavLink>
                </button>
            </th>
        </tr>
        </thead>
    <thead>
    <tr>
        <th>Question</th>
        <th>Answer</th>
        <th>Details</th>
        <th>keywords</th>
        <th>Added by</th>
        <th>File ID</th>
        <th>Page Number</th>
        <th>Edit/Delete</th>
    </tr>
    </thead>
    <tbody>
 {props.data.map((d, index)=>{
     return (
     <tr key= {d.id}>
        
         <td>
             <label name = {`question${index}`} value={d.question}>
              {d.question}
             </label>
               

         </td>
         <td>
         <label name = {`answer${index}`}>
         {d.answer}
         </label>
         </td>
         <td>
         <label name = {`details${index}`}>
         {d.details}
         </label>
        </td>
         <td>
         <label name={`keywords${index}`}>
             {d.keywords}
        </label>
        </td>
         <td>
         <label  
         name="user"
         >
         {d.addedBy}       
         </label>   
         </td>
         <td>
             <label name={`fileID${index}`}> {d.fileID}</label>
         </td>
         {/* <td>
             <input  name={`fileID${index}`}
             defaultValue={d.fileID}
             />
         </td> */}
         <td>
         <label name={`pageNumber${index}`}>
          {d.pageNumber}
         </label>
         </td>
         {props.role == 'super' &&<td>
          <button
          className= "admin-view-button-control"
          value = {d.id}
          onClick ={
              async(e)=>{
                
                  setShowEdit(true); 
                  setQuestionBefore(d); 
            }
          }
          >
        <FiEdit2 size={28}></FiEdit2>
          </button>
          {props.role=='super' &&
          <button
          className= "admin-view-button-control"
           onClick={
            async ()=>{
                console.log('hey from delete'); 
                await axios.delete(`https://integserver1.paltel.ps:4589/api/QandA/${d.id}`).then(
                    (res)=>console.log(res)
                    )
                await props.removeQuestionFromView(d);  
                const DeleteLog = {
                    action : 'Delete', 
                    TablesName : 'QandA', 
                    UpdatedObjectId: d.id.toString(), 
                    UpdatedBy: props.username                   
                }
                await axios.post('https://integserver1.paltel.ps:4589/api/logs',DeleteLog)
                setShowSuccess(true); 
                setShowError(false); 

             }
          }
          >
              <img src={require("../../imgs/Delete-Icon.svg").default}/>
          </button>
         }

         </td>} 
     </tr>)
 })}
 </tbody>

</table>
</div>
)
}