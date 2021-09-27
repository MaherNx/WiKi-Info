import React from "react"; 
import axios from "axios";
import { post } from 'axios';
import {AiOutlineQuestionCircle, AiOutlineFileAdd} from 'react-icons/ai';
import {RiQuestionAnswerLine} from 'react-icons/ri';
import { MdDescription} from 'react-icons/md';
import {CgHashtag} from 'react-icons/cg';
import { useState } from "react";
import SuccessAlert from "../SuccessAlert";
import ErrorAlert from "../ErrorAlert";
import Header from "../Header";
import InputTag from "./keywordsTags";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
/////////
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";


const AddQAForm =(props)=>{
    let k =''; 
    const [show, setShow] = useState(false); 
    const [Error, setError] = useState(false); 
    //e7temal teltagha
    const [text, setText] = useState(); 
    const [file, setFile] = useState(); 
    const [filename, setFileName] = useState(); 

    const onClose  = ()=>{
      setShow(false); 
    }
    const onCloseError = ()=>{
      setError(false); 
    }
    const saveKeywords =  (keywordString)=>{
         k = keywordString; 
    }  
    const showFile = async (e) => {
      e.preventDefault()
      const reader = new FileReader()
      reader.onload = async (e) => { 
        const text1 = (e.target.result)
        setText(text1)
        console.log(text1)
        alert(text1)
      };
      reader.readAsText(e.target.files[0])
    }

    return(<div>
            <Header userInfo ={props.userInfo}></Header>
                       
            
            {Error&& <ErrorAlert
                  onClose={onCloseError}
                  msg = "حدث خطأ ما"
            
            ></ErrorAlert>
          }
          
            {show&&<SuccessAlert 
                onClose={onClose}
                msg = "تمت العملية بنجاح"
        ></SuccessAlert>}
            {/* <DocViewer documents={docs} 
             pluginRenderers={DocViewerRenderers}
            /> */}
             
    <div className="admin-form">
        <form onSubmit={
             
              async  (e)=>{
                    await console.log(e.target.elements.keywords.value)
                    e.preventDefault();
                     const quest = {
                        question : e.target.elements.question.value, 
                        answer :  e.target.elements.answer.value, 
                        details : e.target.elements.description.value,
                        keywords : k, 
                        counterForToday : 0,
                        AddedBy: props.userInfo.username, 
                        pageNumber: parseInt(e.target.elements.pageNumber.value)
                     
                    }
                     console.log (quest)
                    if(quest.question =='' || quest.answer == '' ||
                      quest.details==''){
                        setError(true); 
                        setShow(false); 
                      }
                      
                  else{ 
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('addedBy', props.userInfo.username);
                    console.log(formData);
                    const url = `https://integserver1.paltel.ps:4589/api/File/fileSystem/${props.userInfo.username}`
                     await post(url, formData);
                     console.log("file name =", filename.split(".")[0])
                     const f= filename.split(".")[0]
                     await axios.get(`https://integserver1.paltel.ps:4589/api/File/${f}`).then(
                       (res)=>{
                         console.log(res.data)
                         quest.fileID = res.data.id; 

                       }

                    )
                    console.log(quest)
                   await axios.post('https://integserver1.paltel.ps:4589/api/QandA', quest)
                  .then(function (response) {
                    console.log(response);
                  })

                  setShow(true);
                  setError(false);
                  e.target.elements.question.value = '';
                  e.target.elements.answer.value = ''; 
                  e.target.elements.description.value = ''; 
                  e.target.elements.keywords.value = ''; 
                  e.target.elements.file.value = ''; 
                  e.target.elements.pageNumber.value = ''; 
                }
              }
            }>
            <p className="admin-form-in-title">إضافة سؤال جديد</p>
           <div className="admin-form-in">
            <input 
            type="text" 
            name = "question"
            placeholder="السؤال"
            className="admin-form-input "></input>
            <div className="amin-form-icon-div">
            <AiOutlineQuestionCircle 
            size = {25} 
            className="admin-form-icon "
            ></AiOutlineQuestionCircle>
            </div>
            </div>
            <div className="admin-form-in">
            <textarea 
            id= "answer"
            type="text" 
            name = "answer"
            placeholder="الإجابة"
            className="admin-form-input admin-form-input-answer" 
            ></textarea>
            <div className="amin-form-icon-div">
            <RiQuestionAnswerLine
             size = {25}
             className="admin-form-icon big"
             ></RiQuestionAnswerLine>
             </div>
           </div>
           {/* <div className="admin-form-in">
            <input 
            type="text" 
            name = "keywords"
            placeholder="الكلمات المفتاحية"
            className="admin-form-input" 
            onChange = {detectKeywords}
            ></input>
            {/* <InputTag></InputTag> */}

            {/* <div className="amin-form-icon-div">
            <CgHashtag
             size = {25}
             className="admin-form-icon"
             ></CgHashtag>
             </div>
           </div> */} 

           <div className="admin-form-in">
             <InputTag
              saveKeywords = {saveKeywords}
             ></InputTag>

            {/* <InputTag></InputTag> */}

            <div className="amin-form-icon-div">
            <CgHashtag
             size = {25}
             className="admin-form-icon"
             ></CgHashtag>
             </div>
           </div>
         {/*/////////////file add ///////////////////*/}
           <div className="admin-form-in">
             <input 
              id = "file"
              name= "file"
              type = "file"
              placeholder="الملف"
              className="admin-form-input"
              accept = ".pdf"
              onChange= {(e)=> {
                console.log(e.target.result); 
                setFile(e.target.files[0])
                setFileName(e.target.files[0].name); 
              }
              }
             />
            <div className="amin-form-icon-div">
            <AiOutlineFileAdd
             size = {25}
             className="admin-form-icon"
             ></AiOutlineFileAdd>
             </div>
           </div>
           {/* ///////////file page////////////// */}
           <div className="admin-form-in">
            <input 
            id='page-number'
            name= 'pageNumber'
            placeholder="رقم الصفحة"
            type= "number"
            className= "admin-form-input "
            >
            </input>


            <div className="amin-form-icon-div">
            <CgHashtag
             size = {25}
             className="admin-form-icon"
             ></CgHashtag>
             </div>
           </div>

           <div className="admin-form-in">
            <textarea 
            id="descripton" 
            name="description"
            placeholder="الوصف" 
            className="admin-form-input admin-form-input-answer admin-form-input-answer-customized" 
            rows="4" 
            cols="50"></textarea>
            <div className="amin-form-icon-div">
            <MdDescription
             size = {25}
             className="admin-form-icon big"
             ></MdDescription>
             </div>
            </div>
            <div className="admin-form-button-outer">
           <button 
              className="admin-form-button"
              >إضافة</button>
            </div>
        </form>
         </div>
         </div>)


}
export default AddQAForm