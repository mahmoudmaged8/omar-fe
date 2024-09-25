/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import axiosClient from '../../axiosClientOffline';


export const EditArchive = ({ Archive }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [post, setPost] = useState({
    id: Archive.id,
    title:Archive.title,
    desc: Archive.desc,
    user_id: localStorage.getItem('user_id'),
    recomondation_id: Archive.recomindation.id,
  });
  
  



  const handleInputPost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`archive/${Archive.id}`, post);    
    } catch (err) {
      console.log(err);
      if(err.message =="Network Error"){
        setErrorMessage(`الانترنت لا يعمل`);
      }else{
        setErrorMessage(`Error fetching archive : ${err.message}`);
      }
    }
  };

  return (
    <>
    
    {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <h3>Edit Plans</h3>
        
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            name="title"
            value={post.title}
            onChange={handleInputPost}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <Form.Control
          as="textarea"
            placeholder="Description"
            rows={6}
            name="desc"
            value={post.desc}
            onChange={handleInputPost}
          />
        </InputGroup>
        <Button type="submit">Edit</Button>
      </Form>
    </>
  );
};

export default EditArchive;
