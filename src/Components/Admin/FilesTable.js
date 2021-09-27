import React from "react"; 
import { NavLink } from "react-router-dom";

const FilesTable = (props)=>{
    

    return (
        <table className= "admin-view-table">
        <thead>
        <tr>
            <th colSpan={6}> 
             <h3>Table of Files</h3>
            </th>
        </tr>
        </thead>    
        <thead>
        <tr>
            <th>File Id</th>
            <th>File Name</th>
            <th>Extension</th>
            <th>Uploaded by</th>
            <th>Created On</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {props.files.map((f, index)=>{
         return (
         <tr key= {f.name}>
             <td>
                 <span name = "id"   id = {`id${index}`}>
                    {f.id}
                 </span>
             </td>
             <td>
                 <span name = "Name"   id = {`name${index}`}>
                    {f.name}
                 </span>
             </td>
             <td>
                  <span name = "Extension" id = {`extension${index}`}>
                     {f.extension}
                  </span>
             </td>
             <td>
             <span name = "UploadedBy" id = {`uploadedBy${index}`}>
              {f.uploadedBy}
             </span>          
             </td>
             <td>
             <span name = "CreatedOn" id = {`createdOn${index}`}>
              {f.createdOn}
             </span>          
             </td>
             <td>
                 <button 
                 className="admin-view-button"
                 >
                    <NavLink
                     className="file-view-button"
                     to= {{
                          pathname: `/FileView/${f.id}`, 
                          state : {
                              data: {
                                  id :f.id
                              }
                          }
                         }
                     }
                    >View
                    </NavLink> 
                 </button>
             </td>
         </tr>)
     })}

        </tbody>

    </table>
    )


}
export default FilesTable;