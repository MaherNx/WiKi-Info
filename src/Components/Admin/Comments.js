import axios from 'axios';
import React from 'react'; 
import {useState, useEffect} from 'react'; 
import {FaRegUserCircle} from 'react-icons/fa'; 
import SuccessAlert from '../SuccessAlert'; 

const Comments = ()=>{
  const [pendingComments, setPendingComments] =useState([]); 
  const [done, setDone]= useState(false); 
  useEffect(async() => {
    await axios.get("https://integserver1.paltel.ps:4589/api/comment/pending").then((res)=>{
      setPendingComments (res.data); 
    
    })
    console.log(pendingComments); 

    }, [])
  return (
          pendingComments.length>0? pendingComments.map((c)=> {
            let question =''; 
            axios.get(`https://integserver1.paltel.ps:4589/api/QandA/${c.questionId}`).then(
              (res)=>{ question = res.data}
            )
            return(<div>
                     {done && <SuccessAlert
                     msg= "تمت العملية بنجاح"
                    onClose = {()=>{setDone(false)}}
                    ></SuccessAlert>}
                    <div className="Comment">
                    <div className="comment-addedBy ">
                    <FaRegUserCircle size={20} className="comment-icon"/>
                    <p>{c.addedBy}</p>
                    </div>
                    <p>Question ID: {c.questionId}</p>
                    <p>Question : {c.questionBody}</p>
                    <p>{c.commentBody}</p>
                    <button 
                    className="comment-button accept"
                    onClick = {async()=>{
                      await axios.put(`https://integserver1.paltel.ps:4589/api/comment/${c.commentId}`).then (
                        ()=>{setPendingComments(pendingComments.filter(co=> co.commentId != c.commentId))}
                      )
                       setDone(true); 
                    }}
                    >Accept</button>
                    <button 
                    className="comment-button deny"
                    onClick = {async()=>{
                      console.log(c.commentId)
                      await axios.delete(`https://integserver1.paltel.ps:4589/api/comment/${c.commentId}`).then(
                        ()=>{setPendingComments (pendingComments.filter(co => co?.commentId != c.commentId))}
                      )
                      setDone(true); 
                    }}
                    >Deny</button>
                  </div>
                  </div>
                  )}): <div>No Requests</div>
          
                  )
}
export default Comments; 