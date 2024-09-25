import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import axiosClient from "../../axiosClientOffline";

export default function AddGlobelPoll() {

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [globelPoll, setglobelPoll] = useState({
    percentage: "",
    percentage_rank: "",
  });
  const handleInputPost = (e) => {
    let value = e.target.value;
  
      setglobelPoll({ ...globelPoll, [e.target.name]: value });
    
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axiosClient.post("globel_poll", globelPoll).then((res) => {
        if (res.data.success == false){
          setErrorMessage(res.data.message);
        }else {
          window.location.href = "/dashboard/globelpoll?success=1";
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage("")}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}
      
        <Form onSubmit={handleSubmit} className="sign-in-form">
          {/* <h3>Add Globel Poll</h3> */}
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="percentage"
              name="percentage"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
         
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="percentage_rank"
              name="percentage_rank"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
      
          <Button type="submit">Add</Button>
        </Form>
      
    </>
  );
}
