/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
// import { Facebook } from "react-content-loader";
import axiosClient from "../../axiosClientOffline";

export default function AddTicker() {
  // const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [ticker, setTicker] = useState({
    ticker: "",
    price: 0,
    time: 0,
  });
  const handleInputPost = (e) => {
    setTicker({ ...ticker, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    try {
      e.preventDefault();
      await axiosClient.post("add-tickers", ticker).then((res) => {
        if (res.data.message === "Ticker Added Successfully") {
          window.location.href = "/dashboard/tickers?success=1";
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
          <h3>Add Post</h3>
        
      
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="ticker"
              name="ticker"
              required
              onChange={handleInputPost}
            />
          </InputGroup>
          
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="price"
              name="price"
              onChange={handleInputPost}
            />
          </InputGroup>
          
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="time"
              name="time"
              onChange={handleInputPost}
            />
          </InputGroup>
          
          <Button type="submit">Add</Button>
        </Form>
      }
    </>
  );
}
