import React from 'react'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import {AiOutlineQuestionCircle, AiOutlineFileAdd} from 'react-icons/ai';
import {RiQuestionAnswerLine} from 'react-icons/ri';
import { MdDescription} from 'react-icons/md';
import {CgHashtag} from 'react-icons/cg';
const EditPopup = (props)=>{
    const [fileIDs, setFileIDs] = useState ([]); 
    useEffect(() => {
        console.log('question before:', props.q)
        axios.get("https://integserver1.paltel.ps:4589/api/file/FileIDs").then(
            (res)=>{
                setFileIDs (res.data); 
                console.log(fileIDs)
            }
        )   
    }, [])
    const EditQuestion = async(e)=>{
        e.preventDefault(); 
        const updatedQuestion = {
            question: document.getElementsByName(`question`)[0].value, 
            answer: document.getElementsByName(`answer`)[0].value, 
            details: document.getElementsByName(`details`)[0].value, 
            keywords: document.getElementsByName(`keywords`)[0].value, 
            pageNumber: parseInt(document.getElementsByName(`pageNumber`)[0].value), 
            fileId : parseInt((document.getElementsByName(`fileID`)[0].value))
        }
        if(updatedQuestion.question==''|| updatedQuestion.answer==''|| updatedQuestion.details==''|| updatedQuestion.keywords=='' ||updatedQuestion.updatedQuestion=='' || updatedQuestion.fileId==''){
                    props.setShowError(true);
        }
        else{
            await axios.put(`https://integserver1.paltel.ps:4589/api/QandA/${props.q.id}`, updatedQuestion).then(
           (res)=> console.log(res));            
           const Log = {
                        action : 'Edit', 
                        TablesName : 'QandA', 
                        UpdatedObjectId: props.q.id.toString(), 
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
                    <input type='text' defaultValue={props.q.question} name="question"  className="admin-form-input"></input>
                    <div className="amin-form-icon-div">
                        <AiOutlineQuestionCircle 
                        size = {25} 
                        className="admin-form-icon"
                        />
                    </div>
                    </div>
                    <div  className="admin-form-in admin-form-input-answer-customized">
                    <textarea 
                     type='text'
                     defaultValue={props.q.answer} 
                     name="answer" 
                     className="admin-form-input admin-form-input-answer "/>
                    <div className="amin-form-icon-div">
                     <RiQuestionAnswerLine
                      size = {25}
                      className="admin-form-icon big"
                     ></RiQuestionAnswerLine>
                    </div>
                    </div>
                    <div className="admin-form-in ">
                    <textarea 
                    type='text' 
                    defaultValue={props.q.details} 
                    name="details"
                    className="admin-form-input admin-form-input-answer admin-form-input-answer-customized"/>
                     <div className="amin-form-icon-div">
                     <MdDescription
                     size = {25}
                    className="admin-form-icon big"
                    ></MdDescription>
                    </div>
                    </div>
                    <div className="admin-form-in">
                    <input 
                     type='text' 
                     defaultValue={props.q.keywords} 
                     name="keywords"
                     className="admin-form-input"
                     ></input>
                    <div className="amin-form-icon-div">
                      <CgHashtag
                       size = {25}
                        className="admin-form-icon"
                      ></CgHashtag>
                    </div>
                    </div>
                    <div className="admin-form-in">
                    <select  name={`fileID`} className="file-id admin-form-input">
                      {fileIDs.map((f)=>{
                          let sel= f== props.q.fileID?true: false
                     return(
                         <option selected = {sel}>{f}</option>
                     )
                      })}
                 
                    </select>
                    <div className="amin-form-icon-div">
                      <AiOutlineFileAdd
                       size = {25}
                      className="admin-form-icon"
                     ></AiOutlineFileAdd>
                    </div>
                    </div>
                    <div className="admin-form-in">
                    <input type='number' defaultValue={props.q.pageNumber} name="pageNumber" className="admin-form-input"></input>
                    <div className="amin-form-icon-div">
                     <CgHashtag
                     size = {25}
                     className="admin-form-icon"
                     ></CgHashtag>
                     </div>
                    </div>
                    <div className="admin-form-button-outer">
                    <button onClick={EditQuestion}
                    className="admin-form-button"
                    >Edit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditPopup; 