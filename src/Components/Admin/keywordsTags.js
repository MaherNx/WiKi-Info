import React from 'react'; 
import { useState } from 'react';

const InputTag = (props) => {
    const [tags, setTags] = useState([
    ]);
    
    const removeTag = (i) => {
      const newTags = [ ...tags ];
      newTags.splice(i, 1);
      setTags(newTags);
    };
  
    const  inputKeyDown = async(e) => {
      const val = e.target.value;
      if (e.keyCode == 32 && val) {
        if (tags.find(tag => tag === val)) {
          return;
        }
        
        await setTags([...tags, val]);
        e.target.value = '';
      } else if (e.key === 'Backspace' && !val) {
        removeTag(tags.length - 1);
      }
      await props.saveKeywords(tags.toString());
      
    };
  
  
    return (
      <div  className="admin-form-input input-tag__div">
        <ul  className="input-tag__tags">
          { tags.map((tag, i) => (
           <li key={tag} className="input-tag__tagsــtag">
                <span  onClick={() => { removeTag(i); }}>
                  X
                </span>  
              {tag}
            </li>
          ))}
          <li className="input-tag__tags__input">
              <input 
              type="text" 
              name = "keywords"
              onKeyDown={inputKeyDown} 
              className="input-tag__tags__input_in"
              placeholder="الكلمات المفتاحية"/>
          </li>
        </ul>
      </div>
    );
  }
  
export default InputTag; 