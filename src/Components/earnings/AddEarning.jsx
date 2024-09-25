import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import axiosClient from "../../axiosClientOffline";

export default function AddEarning() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [post, setPost] = useState({
    total_earnings : "",
    Buffer_VIP1: 1,
    Buffer_VIP2: 2,
    Buffer_DIAMOND: 3,
  });
  const handleInputPost = (e) => {
    let value = e.target.value;
  
      setPost({ ...post, [e.target.name]: value });
    
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axiosClient.post("get_data", post).then((res) => {
        console.log(res);
        if (res.data.success == false){
          setErrorMessage(res.data.message);
          console.log(res);
        }else {
          console.log(res.data);
          // window.location.href = "/buffer/buffers?success=1";
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
      {<Form onSubmit={handleSubmit} className="sign-in-form">
          <h3>Add Buffer</h3>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="total_earnings"
              name="total_earnings"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Buffer VIP1"
              name="Prisentge_VIP1"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Prisentge VIP2"
              name="Prisentge_VIP2"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Buffer DIAMOND"
              name="Prisentge_DIAMOND"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
          <Button type="submit">Add</Button>
        </Form>
      }
    </>
  );
}
