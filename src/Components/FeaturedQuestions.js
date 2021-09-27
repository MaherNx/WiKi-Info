import React from 'react'; 
import QuestionCard from './QuestionCard';
import AccordionQuestionCard from './AccordionQuestionCard';

const FeaturedQuestions=(props)=>{
   
    return(<div className="container featured">
        <p className="featured-title">الأسئلة الأكثر شيوعًا</p>  
       {props.data.map(t =>(<AccordionQuestionCard
        key ={`f${t.id}`}
        id = {t.id}
        dataForCard= {t}
        incrementCounter = {props.incrementCounter}
        userInfo ={props.userInfo}

        ></AccordionQuestionCard>)
       
       )} 
    </div>)
}
export default FeaturedQuestions;