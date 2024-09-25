import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import axiosClient from "../../axiosClientOffline";

export default function AddBuffer() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
    const [image, setImage] = useState(null);

  const [post, setPost] = useState({
    name: "",
    amount: 0,
  });
  const handleInputPost = (e) => {
    let value = e.target.value;
  
      setPost({ ...post, [e.target.name]: value });
    
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
            const formData = new FormData();
            formData.append('img', image);
            formData.append('name', post.name);
            formData.append('amount', post.amount);
      await axiosClient.post("buffers", formData ,({ headers: { "Content-Type": "multipart/form-data" } })).then((res) => {
        console.log(res.data);
        if (res.data.success == false){
          setErrorMessage(res.data.message);
        }else {
          window.location.href = "/buffer/buffers?success=1";
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="amount"
              name="amount"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
          <InputGroup>
          <label htmlFor="image">Add Image</label> <br />
          <input
            type="file"
            accept="image/*"
            id="image"
            required
            onChange={handleImageChange}
            placeholder="add image"
            className="mb-3"
          />
          <br />
           </InputGroup>
          <Button type="submit">Add</Button>
        </Form>
      }
    </>
  );
}
