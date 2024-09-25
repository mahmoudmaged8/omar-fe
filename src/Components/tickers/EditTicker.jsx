/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import axiosClient from '../../axiosClientOffline';

export const EditTicker = ({ post }) => {

  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPost] = useState({
    ticker_old:post.ticker,
    ticker_new:post.ticker,
    price: post.price,
    time: post.time,
  });


  const handleInputPost = (e) => {
    setPost({ ...posts, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(`update-tickers`, posts);
      if (response.data.message === "Ticker Updated Successfully") {
        window.location.href = "/dashboard/tickers?update";
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
    { <Form onSubmit={handleSubmit}>
        <h3>Edit Ticker</h3>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="ticker"
              name="ticker_new"
              onChange={handleInputPost}
              value={posts.ticker_new}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number" 
              placeholder="price"
              name="price"
              onChange={handleInputPost}
              value={posts.price}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="time"
              name="time"
              onChange={handleInputPost}
              value={posts.time}
            />
          </InputGroup>
        
        <Button type="submit">Edit</Button>
      </Form>
      }
    </>
  );
};

export default EditTicker;
