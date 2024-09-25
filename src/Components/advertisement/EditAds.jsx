/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import axiosClient from '../../axiosClientOffline';

export const EditAds = ({ post }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);

  const [posts, setPost] = useState({
    id: post.id,
    title:post.title,// post.title,
    // text: post.text,
    // plan_id: post.plan_id ? post.plan_id : 1,
    status: post.status,// post.status,
    img: post.img,// post.img,
    description: post.description,
    link: post.link,
  });



  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPost({ ...posts, image: image });
  };

  const handleInputPost = (e) => {
    setPost({ ...posts, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(`post/${posts.id}`, posts);
      if (response.data.Massage === "Request is Updated") {
        window.location.href = "/dashboard/posts?update";
      }
      if (response.data.success == false) {
        setErrorMessage(response.data.message);
        
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
     {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage("")}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <h3>Edit Plans</h3>
        
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text   style={{ direction: "ltr" }}>title</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleInputPost}
              value={posts.title}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text   style={{ direction: "ltr" }}>Status</InputGroup.Text>
            <Form.Select
              name="status"
              onChange={handleInputPost}
              value={posts.status}
              aria-label="Discount"
            >
              <option value={1}>تعمل</option>
              <option value={0}>لا تعمل</option>
            </Form.Select>
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text   style={{ direction: "ltr" }}>Description</InputGroup.Text>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              onChange={handleInputPost}
              value={posts.description}
              rows={6}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text   style={{ direction: "ltr" }}>Link</InputGroup.Text>
            <Form.Control
              type="url"
              placeholder="link share"
              name="link"
              onChange={handleInputPost}
              value={posts.link}
            />
          </InputGroup>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        <Button type="submit">Edit</Button>
      </Form>
      
    </>
  );
};

export default EditAds;
