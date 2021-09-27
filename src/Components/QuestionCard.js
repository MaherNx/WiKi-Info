import React from 'react'; 
import { Card } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const QuestionCard = (props)=>{
  let x = props.dataForCard.keywords + "";
  x = x.split(",");
  return (
<div className="cardd">
    
    <div >
      <button 
      className='question-card-question-button'
      onClick ={
        ()=>{props.incrementCounter(props.dataForCard.id)}
      }
      >
      <NavLink 
      to = {
        {pathname: `/question/${props.id}`,
        state : {
          data : props.dataForCard, 
          user : props.userInfo
        }
        }
      } 
      className='mcard-title'

      >{props.dataForCard.question}</NavLink>
      </button>
      <div className="mcard-answer">
      {props.dataForCard.answer}
      </div>
    </div>
    {/* {  props.dataForCard.keywords+"".split(" ").map((k)=>{
      return <span className="keywords-badge">{k}</span>
    })} */}
  
    {x.map((xi)=><span 
    className="keywords-badge"
    key = {xi}
    >{xi}</span>)}
    <div >
      <img 
      src= {require("../imgs/Dislike-Icon.svg").default}
      className="recommendation-icon"
      />
      <img 
      src= {require("../imgs/Like-Icon.svg").default}
      className="recommendation-icon"
      />
      <span> هل كانت هذه الإجابة مفيدة؟</span>
    </div>
   
  </div>
  )
}
export default QuestionCard; 
