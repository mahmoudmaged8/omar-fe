import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import axiosClient from "../../axiosClientOffline";
export default function AddExpert() {
    const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [Post, setPost] = useState({
    title:"",
    merchant: "",
    plan_id: [],
    token: "",
    
  });
  const handleInputPost = (e) => {
    setPost({ ...Post, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
       await axiosClient.post("/telegram", Post).then((res) => {
        if (res.data.success == false){
          setErrorMessage(res.data.message);
        }else {
          window.location.href = "/dashboard/Telegram?success=1";
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>

    {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
            {errorMessage}
          </Alert>
        )}
        
      <Form onSubmit={handleSubmit} className="p-0">
        <h3>Add Telegram</h3>
        <Form.Group size="sm" className="mb-3 col-9">
        <Form.Control
          type="text"
          placeholder="title"
          name="title"
          required
          onChange={handleInputPost}
        />
        </Form.Group>
        <Form.Group size="sm" className="mb-3 col-9">
        <Form.Control
          type="text"
          placeholder="merchant"
          name="merchant"
          required
          onChange={handleInputPost}
        />
        </Form.Group>
        <Form.Group size="sm" className="mb-3 col-9">
        <Form.Control
          type="text"
          placeholder="token"
          name="token"
          required
          onChange={handleInputPost}
        />
        </Form.Group>
        <Button type="submit" >
          Add
        </Button>
      </Form>
     
    </>
  );
}
