import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axiosClient from "../axiosClientFront";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server to initiate the password reset process
    axiosClient
      .post("/sendOtp", {email: email ,})
      .then((response) => {
        // Display a success message to the user
        console.log(response.data);
        if (response.data.success) {
        setMessage(response.data.message);
        console.log(response.data);
        window.location.href = "Otp/reset";
        }else{
          setMessage(response.data.success);
        }
      })
      .catch((error) => {
        // Handle error response
        setMessage(error.response.data.error);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <Form.Label>Email</Form.Label>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            required
            onChange={handleInputEmail}
          />
        </Form.Group>
        <Button
          type="submit"
          value="Reset Password"
          className="btn"
          style={{ width: "11rem" }}
        >
          Reset Password
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </>
  );
}
