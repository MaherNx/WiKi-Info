import React from "react"; 

const Filters = (props)=>{
   let f1 = {selected: false, 
             name : 'عامة'};
   let f2 = {selected:false, 
              name : 'الاتصالات'};
   let f3 = {selected:false,
            name : 'kkk'
           };
   return (
       <div className="filters" 
       onChange={
           (e)=>{
               e.target.value == 'all'? props.showAll(): props.showAnswers(e.target.value);
               console.log(e.target.value)
              

           }
       }>
           <div className="filter"> 
           <label>الأسعار</label>
           <input 
            type = "radio"
            name = "filter"
            value = "الأسعار"
            />
          
            </div>
            <div className="filter">
            <label>الحملات</label>
            <input 
            type = "radio"
            name = "filter"
            value = "الحملات"
            />
           
            </div>
            <div className="filter">
            <label>All</label>
            <input 
            type = "radio"
            name = "filter"
            value ="all"
            />
            
            </div>
       </div>

          
     
   )
}
export default Filters; 