import React from 'react'; 
import QuestionCard from './QuestionCard';
const QuestionsContainer = (props)=>{
    
   return (<div className="container">
         <p className="featured-title"> الإجابات</p> 
       {/* <span>إجابات</span>
       <span className="container-questions-number"> {`${props.data.length} `} </span>
       */}
       {props.data.map((d)=>{
       return(
            <QuestionCard 
            key = {d.id}
            id = {d.id}
            dataForCard ={d}
            incrementCounter={props.incrementCounter}
            userInfo ={props.userInfo}
            >

            </QuestionCard>
        )
    })
}
   </div>)
}
export default QuestionsContainer