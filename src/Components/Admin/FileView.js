import React from 'react'; 
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
export default function FileView (props){
   console.log('my props', props)
    return (
        <div >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
         <Viewer fileUrl={`https://integserver1.paltel.ps:4589/api/file/download/${props.location.state.data.id}`}/>
        </Worker>
        </div>
    )
}