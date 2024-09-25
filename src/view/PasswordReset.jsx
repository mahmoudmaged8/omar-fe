import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import axiosClient from "../axiosClientFront";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password == rePassword){
    axiosClient
      .post("reset", { password: password })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setSuccess(res.data.success);
          console.log(res.data.user);
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // Perform password reset request using the provided email
    // Here, you can make an API call to your backend to handle the password reset process
    // Once the password reset request is successful, you can set `success` state to true

    setSuccess(true);
  }else{
    alert("password not match")
  }
  };

  return (
    <div className="container mt-40">
    <div>
      {/* <h2>Reset Password</h2> */}
      {success ? (
        <p>A password reset link has been sent to your email.</p>
      ) : (
        <Form onSubmit={handleSubmit}>
           <InputGroup size="sm" className="mb-3">
          <InputGroup.Text htmlFor="password">Password:</InputGroup.Text>
          <Form.Control
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
          <InputGroup.Text htmlFor="password2">repeat Password:</InputGroup.Text>
          <Form.Control
            type="password"
            id="password2"
            name="password2"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          </InputGroup>
          <Button type="submit" style={{ width: "12rem" }}>Reset Password</Button>
        </Form>
      )}
    </div>
    </div>
  );
};

export default PasswordReset;
