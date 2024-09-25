/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import axiosClient from "../../axiosClientOffline";

export const EditExpert = ({ telegram }) => {
  const [post, setPost] = useState({
    id: telegram.id,
    title: telegram.title,
    merchant: telegram.merchant,
    plan_id: telegram.plan_id,
    token: telegram.token,
  });

  const handleInputPost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(`telegram/${telegram.id}`, post);
      if (response.data) {
        window.location.href = "/dashboard/Telegram?success=1";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Edit Telegram</h3>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
            merchant
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="merchant"
            name="merchant"
            value={post.merchant}
            onChange={handleInputPost}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
            title
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="title"
            name="title"
            value={post.title}
            onChange={handleInputPost}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
            token
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="token"
            name="token"
            value={post.token}
            onChange={handleInputPost}
          />
        </InputGroup>
        <Button type="submit">Edit</Button>
      </Form>
    </>
  );
};

export default EditExpert;
