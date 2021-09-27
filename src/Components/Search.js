import React from 'react';
import {BiSearch} from 'react-icons/bi'; 
let x =0;

const Search =(props)=>{
    return (
    <form 
    className="form"
    onSubmit={(e)=>{
        e.preventDefault();
        props.showAnswers(e.target.elements.searchWord.value); 

        }}>
        
        {/* <button className="form-button" >Search</button> */}
    
        <input 
         type='text'
         name='searchWord'
         className="form-input"
         placeholder= "أدخل جملة البحث"
         ></input>
         <div className="form-icon-div">
        <BiSearch  size={30} className="icon"></BiSearch>
        </div>
    </form>)
}
export default Search;