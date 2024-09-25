/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {  useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import axiosClient from '../../axiosClientOffline';

export const EditEarning = ({ buffer }) => {
  const [post, setPost] = useState({
    id: buffer.id,
    name: buffer.name,
    amount: buffer.amount,
  });

  const handleInputPost = (e) => {
    let value = e.target.value;
  
      setPost({ ...post, [e.target.name]: value });
    
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(`buffers/${buffer.id}`, post);
      if (response.data.Massage === 'Updated Success') {
        window.location.href = '/dashboard/plans?update';
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Edit Buffers</h3>
      
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={post.name}
            onChange={handleInputPost}
          />
        </InputGroup>
        
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="number"
            placeholder="amount"
            name="amount"
            value={post.amount}
            onChange={handleInputPost}
          />
        </InputGroup>
      
        <Button type="submit">Edit</Button>
      </Form>
    </>
  );
};

export default EditEarning;
