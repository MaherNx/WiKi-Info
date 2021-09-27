import React from'react'; 
import { Alert } from "react-bootstrap";
const ErrorAlert = (props)=>{
  return <Alert variant="danger" onClose={props.onClose} dismissible>
  <Alert.Heading>
    {props.msg}
  </Alert.Heading>
</Alert>
}
export default ErrorAlert; 