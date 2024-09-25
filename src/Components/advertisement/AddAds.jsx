/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import axiosClient from "../../axiosClientOffline";

export default function AddAds() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  // const [plans, setPlans] = useState([]);


  const [post, setPost] = useState({
    title: "",
    description: "",
    status: 1,
    link: "",
    img: image,
  });
  const handleInputPost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("description", post.description);
      formData.append("plan_id", post.plan_id);
      formData.append("status", post.status);
      formData.append("link", post.link);
      formData.append("image", image);
      
      await axiosClient.post("ads", formData).then((res) => {
        if (res.data.data === "Ads created successfully") {
          window.location.href = "/dashboard/advertisement?success=1";
        }
        if (res.data.success == false) {
          setErrorMessage(res.data.message);
          
        }
      });
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
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
      {
        <Form onSubmit={handleSubmit} className="sign-in-form">
          <h3>Add Advertisement</h3>
      
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="url"
              placeholder="link share"
              name="link"
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            
            <Form.Select
              name="status"
              onChange={handleInputPost}
              aria-label="Discount"
              required
            >
              {/* <option>اين تريد نشرها</option> */}
              <option value={1}>تعمل</option>
              <option value={0}>لا تعمل</option>
            </Form.Select>
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              onChange={handleInputPost}
              rows={6}
              required
            />
          </InputGroup>
          <input type="file" accept="image/*" onChange={handleImageChange} required/>
          <Button type="submit">Add</Button>
        </Form>
      }
    </>
  );
}
