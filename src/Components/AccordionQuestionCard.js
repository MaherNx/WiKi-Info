import React from 'react'; 
import { NavLink } from 'react-router-dom';
import {AiFillPlusCircle}  from 'react-icons/ai';
import {AiFillMinusCircle} from 'react-icons/ai';  
import {useState} from 'react'; 


export default function AccordionQuestionCard(props){
    const [plus, setPlus] = useState(false); 
    const togglePlus = ()=>{
        setPlus(!plus); 
    }

    return(
        <div className={!plus?"cardd": "clicked-card"}>
    
       <div className="special-card-container">
        {!plus?<AiFillPlusCircle
              size={25}
              onClick= {togglePlus}
              className= "special-card-icon"
              ></AiFillPlusCircle>:
              <AiFillMinusCircle
              size={25}
              onClick= {togglePlus}
              className= "special-card-icon minus-icon"
              ></AiFillMinusCircle>
  

         }

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
      className='special-mcard-title mcard-title'

      >{props.dataForCard.question}</NavLink>
      </button>


    </div>
    <div>
    {plus &&<div className="mcard-answer">
              {props.dataForCard.answer}
             </div> 
      }
    </div>
    {/* {  props.dataForCard.keywords+"".split(" ").map((k)=>{
      return <span className="keywords-badge">{k}</span>
    })} */}
  
    {/* {x.map((xi)=><span 
    className="keywords-badge"
    key = {xi}
    >{xi}</span>)} */}


  </div>
    )
}