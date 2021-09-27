import React from 'react';
import '../Styles/styles.scss'; 
import Header from './Header';
import Search from './Search';
import QuestionsContainer from './QuestionsContainer';
import { data as Data } from '../Data/dummyData';
import Filters from './Filters';
import FeaturedQuestions from './FeaturedQuestions';
import axios from 'axios';
import AdminHeader from './Admin/AdminHeader';
import { Redirect } from 'react-router-dom';
import Login from './Admin/Login';


class HomePage extends React.Component {
   constructor(props){
      console.log(props)
     super(props); 
     this.state = {
                data : [], 
                dataToBeShown : [], 
                topthree :[], 
                role : ''
            }
            console.log(props); 
   }
    getTopQuestions=async()=>{
        let count = 0; 
        let top = []; 
        top = this.state.data.slice(0, 3); 
         // for(let i =0; i< this.state.data.length; i++){
         //    if(this.state.data[i].counterForToday> count){
         //       count = this.state.data[i].counterForToday
         //       top [0] = this.state.data[i];
         //    }
         // }
         await this.setState({topthree: top})
         // console.log(this.state.topthree[0])
   }
   incrementCounter= async(id)=>{
      let foundQ = {}
      await axios.get(`https://integserver1.paltel.ps:4589/api/QandA/${id}`).then(
         (res)=>{
          foundQ = res.data; 

          foundQ.counterForToday =foundQ.counterForToday+1;  
              
         }
      )
      console.log(foundQ); 
      await axios.put(`https://integserver1.paltel.ps:4589/api/QandA/${id}`,foundQ ).then(
         (res) =>{
            console.log(res)
         }
      )
   }
    componentDidMount=async()=>{
        // console.log(this.props)
     //   await this.setState({role: this.props.role})
         // sessionStorage.setItem('role', JSON.stringify(this.state.role));
            await axios.get("https://integserver1.paltel.ps:4589/api/QandA/top").then(
               (res)=>{
                  this.setState(()=>({
                     data: res.data, 
                     AllData : res.data
                  }))        
               }
            )
          
       
      this.getTopQuestions()

   }
   showAll =()=>{
      this.setState((prevState)=> {
         return{data: prevState.AllData}
      })
   }
   toggleFilter1=()=>{
      this.setState((prevState)=>({filter1: !prevState.filter1})); 
      if (this.state.filter1){
         this.showAnswers("عامة"); 
      }
      
   }

   
   pop=(keyword)=>{
     let a = this.state.dataToBeShown; 
     let final = []
      final = a.filter(function(d){ 
      return d.keywords.indexOf(keyword)<0; 
  });
   this.setState(()=>{
      return{dataToBeShown: final}
   })
      this.setState(()=>{
         return{data: final}
      })
   }

   showAnswers=async(keyword)=>{
            let ans = [];  
            // const splitted = keyword.split(" ");
            // splitted.forEach(async s=>{
            //       await this.state.AllData.forEach(d=>{
            //       if(d.keywords.split(" ").find(k1 => k1 == s)) {
            //          if(ans.indexOf(d)<0 && this.state.dataToBeShown.indexOf(d)<0)
            //          {  
            //             ans.push(d);}
            //      }
            //    })
            // })
            const keyy = keyword; 
            const ddddata =  this.state.AllData.filter(d=> d.keywords.includes(keyy)|| d.question.includes(keyy)|| d.answer.includes(keyy))
            console.log(ddddata)
            await this.setState ((prevState)=>({data: ddddata})); 
            // await  this.setState ((prevState)=>({data: prevState.dataToBeShown})); 
              
       
         }
 

   render() { 
   //  if(this.state.role=='user' ||this.state.role=='admin')
   //  {
       return(
      <div>
         <Header userInfo ={this.props.userInfo}></Header>
      {<div className="app">
         <div className="app-body">
         <div className="app-body-search">
         <h2 className="app-body-search-title">مرحبًا، كيف يمكننا المساعدة؟</h2>   
         <Search showAnswers={this.showAnswers}></Search>
         <Filters 
         showAnswers={this.showAnswers}
         pop = {this.pop}
         showAll ={this.showAll}
         ></Filters>
         </div>
         <div className="app-body-left">
         {this.state.topthree.length>0?<FeaturedQuestions   userInfo ={this.props.userInfo} data ={this.state.topthree} incrementCounter={this.incrementCounter} ></FeaturedQuestions>  :"no data"}   
         {/* <FeaturedQuestions data= {this.state.topthree}></FeaturedQuestions> */}
         {this.state.data.length>0?<QuestionsContainer  userInfo ={this.props.userInfo} data ={this.state.data} incrementCounter={this.incrementCounter}></QuestionsContainer>  :"no data"}
         
         
         </div>
         </div>
      </div>}
      </div>
      

   )
    //}
   //  else {
   //     return (<Login></Login>)
   //  }
};
}
 





export default HomePage