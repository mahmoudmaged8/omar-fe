/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import axiosClient from '../../axiosClientOffline';

export const EditGlobelPoll = ({ globelPoll }) => {
  console.log(globelPoll);
  const [post, setPost] = useState({
    percentage: globelPoll.percentage,
    percentage_rank: globelPoll.percentage_rank,
  });

  const handleInputPost = (e) => {
      setPost({ ...post, [e.target.name]:e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(`globel_poll/${globelPoll.id}`, post);
      console.log(response.data);
      if (response.data === 'Success Updating Data') {
        window.location.href = '/dashboard/globelpoll?update';
      }
    } catch (err) {
      console.log(err);
    }
  };






  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Edit Plans</h3>
      
        <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="percentage"
              name="percentage"
              value={post.percentage}
              onChange={handleInputPost}
              required
            />
          </InputGroup>
         
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="percentage_rank"
              name="percentage_rank"
              value={post.percentage_rank}
              onChange={handleInputPost}
              required
            />
          </InputGroup>
        <Button type="submit">Edit</Button>
      </Form>
    </>
  );
};

export default EditGlobelPoll;
