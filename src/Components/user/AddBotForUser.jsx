import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import axiosClient from "../../axiosClientOffline";
export default function AddBotForUser(user) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userBot, setUserBot] = useState({
    id: user.user.id,
    binanceApiKey: user.user.binanceApiKey?user.user.binanceApiKey:"",
    binanceSecretKey: user.user.binanceSecretKey?user.user.binanceSecretKey:"",
    num_orders: user.user.num_orders?user.user.num_orders:"",
    orders_usdt: user.user.orders_usdt?user.user.orders_usdt:"",
    is_bot: 1,
  });
  const handleInputPost = (e) => {
    setUserBot({ ...userBot, [e.target.name]: e.target.value });
  
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("add-bot-status-for-user", userBot);
    if(response.data.message == "Bot Created Successfully"){
      window.location.href = "/dashboard/userbotactive?added=1";
    }
    if(response.data.success == false){
      setErrorMessage(response.data.message);
    }
    } catch (err) {
      console.log(err);
      setErrorMessage("Error adding user.",err);
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
      <Form onSubmit={handleSubmit} className="sign-in-form">
      <h6 className="text-5xl">Add Bot</h6>
        
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="text"
            placeholder="binanceApiKey"
            name="binanceApiKey"
            value={userBot.binanceApiKey}
            required
            onChange={handleInputPost}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="text"
            placeholder="binanceSecretKey"
            name="binanceSecretKey"
            value={userBot.binanceSecretKey}
            required
            onChange={handleInputPost}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="number"
            placeholder="num_orders"
            name="num_orders"
            required
            value={userBot.num_orders}
            onChange={handleInputPost}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="number"
            placeholder="orders_usdt"
            name="orders_usdt"
            required
            value={userBot.orders_usdt}
            onChange={handleInputPost}
          />
        </InputGroup>
        <Button type="submit">Add to Bot</Button>
      </Form>
    </>
  );
}
