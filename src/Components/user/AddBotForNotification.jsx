import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import axiosClient from "../../axiosClientOffline";
export default function AddBotForNotification(user) {
  // console.log(user);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userBot, setUserBot] = useState({
    user_id: user.user.id,
    body: "",
  });
  const handleInputPost = (e) => {
    setUserBot({ ...userBot, [e.target.name]: e.target.value });
  
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userBot);
    try {
      const response = await axiosClient.post("notfi", userBot);
      console.log(response.data);
    if(response.data.message == "Done"){
      window.location.href = "/dashboard/users?notfi=1";
    }
    if(response.data.success == false){
      setErrorMessage(response.data.message);
    }
    } catch (err) {
      console.log(err);
      setErrorMessage("Error adding user.",err);
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
      <h6 className="text-5xl">ارسال اشعار</h6>
        
        <InputGroup size="sm" className="mb-3">
        <Form.Control
              as="textarea"
              placeholder="body"
              name="body"
              // onKeyPress={handleDescKeyPress}
              onChange={handleInputPost}
              rows={6}
              required
            />
        </InputGroup>
      
        <Button type="submit">ارسال اشعار</Button>
      </Form>
    </>
  );
}
