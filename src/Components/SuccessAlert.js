import React from'react'; 
import { Alert } from "react-bootstrap";
const SuccessAlert = (props)=>{
  return <Alert variant="success" onClose={props.onClose} dismissible>
  <Alert.Heading>
    {props.msg}
  </Alert.Heading>
</Alert>
}
export default SuccessAlert; 