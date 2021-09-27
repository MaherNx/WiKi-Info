import React from "react";
import { useState, useEffect } from "react";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import axios from "axios";
import Header from "./Header";
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import {FaRegUserCircle} from 'react-icons/fa'; 
import SuccessAlert from './SuccessAlert.js';


//styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { NavLink } from "react-router-dom";



const Question = (props)=>{
    const [relatedQuestions, setRelatedQuestions] = useState([]); 
    const [comments, setComments] = useState([]); 
    const [done, setDone] = useState(false); 


    const getAllRelatedQuestions = async ()=>{
        await axios.get(`https://integserver1.paltel.ps:4589/api/qanda/related/${props.location.state.data.fileID}`).then(
        async(res)=>{
             await setRelatedQuestions(res.data)
             console.log(relatedQuestions)
        })
    }
    const getAllCommentsForQuestion =async()=>{
        await axios.get(`https://integserver1.paltel.ps:4589/api/comment/accepted/${props.location.state.data.id}`).then(
            async (res)=>{
               await setComments(res.data); 
               console.log("comments", comments)
            }
        )
    }
    const submitComment = async(e)=>{
        e.preventDefault(); 
        
        const comment = {
             QuestionId: props.location.state.data.id, 
             CommentBody : document.getElementById("commentsBody").value, 
             AddedBy : props.location.state.user.username,
             Accepted: false, 
             Counter: 0
        }
        console.log(comment)
        await axios.post("https://integserver1.paltel.ps:4589/api/comment", comment); 
        document.getElementById("commentsBody").value = ""; 
        setDone(true); 
    }

    useEffect(async() => {
            await getAllRelatedQuestions(); 
            await getAllCommentsForQuestion();   
        }, []) 

    return (
        <div>
            <Header userInfo ={props.location.state.user}></Header>
            {done && <SuccessAlert
             msg= "تمت العملية بنجاح"
             onClose = {()=>{setDone(false)}}
             
            ></SuccessAlert>}
        <div className="question-page" id="question-page">
            <div className="question-page-question">{props.location.state.data.question}</div>
            <div className="question-page-answer">{props.location.state.data.answer}</div>
            <div className="question-page-details">{props.location.state.data.details}</div>
            {/* <div className= "question-file-viewer">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                 <Viewer fileUrl={`https://integserver1.paltel.ps:4589/api/file/download/${props.location.state.data.fileID}`} initialPage={props.location.state.data.pageNumber-1} defaultScale={1.0}/>
                </Worker>
            </div> */}
            <div className="question-page-commentSection">
                <div className="question-page-commentSection-out">
                <p className="question-page-commentSection-counter">{comments.length}</p>
                <h3 className="question-page-commentSection-header">التعليقات</h3>
                </div>
                
                    {comments && comments.map(co =>{
                       return (<div className="comment">
                       <div className="comment-addedBy right">
                        <p>{co.addedBy}</p>
                       <FaRegUserCircle size={20} className="comment-icon"/>
                       </div>
                       <p className="comment-body">{co.commentBody}</p>
                        </div>
                       )
                    })}
               
                <h5 className="question-page-commentSection-header1">أضف تعليقك</h5>
                <div>
                  <form 
                    onSubmit = {submitComment}
                    className="question-page-commentSection-form">
                    <button 
                      className="question-page-commentSection-button"
                    >إضافة</button>
                    <textarea 
                    id="commentsBody"
                    className="question-page-commentSection-area"></textarea>
                  </form>
                </div>
            </div>
            <div className= "question-page-related-questions">
                <div className= "question-page-related-questions-title" >:أسئلة ذات صلة</div>
             {relatedQuestions && relatedQuestions.map(r=>{
                 return (<div>
                         <NavLink 
                            to = {
                                {pathname: `/question/${r.id}`,
                                state : {
                                  data : r
                                }
                                }
                            } 
                            onClick= {()=>{
                                window.scrollTo(0, 0)
                            }}
                         >{r.question}
                         </NavLink>
                         </div>)
             })}
            </div>
        </div>
        </div>
    )
}
export default Question; 