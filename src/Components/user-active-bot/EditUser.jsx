/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
// import { Facebook } from "react-content-loader";
// import PhoneInputWithCountrySelect from "react-phone-number-input";
// import { useLocation } from "react-router-dom";
// import Select from "react-select";
import axiosClient from "../../axiosClientOffline";
function determineWritingDirection(text) {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text) ? 'rtl' : 'ltr';
}
export default function EditUser({ user }) {
  // eslint-disable-next-line no-unused-vars
  const [setValue] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [Post, setPost] = useState({
    id: user.id,
    name: user.name,
    num_orders: user.num_orders,
    orders_usdt: user.orders_usdt,
    money: user.money,
  });

  const handleInputPost = (e) => {
    setPost({
      ...Post,
      [e.target.name]: e.target.value,
      direction: determineWritingDirection(e.target.value), // تحديث اتجاه الكتابة
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

       await axiosClient.post(`update-bot-user`, Post);
      window.location.href = "/dashboard/userbotactive?update=1";
  
    } catch (err) {
      console.log(err);
      if(err.message =="Network Error"){
        setErrorMessage(`الانترنت لا يعمل`);
      }else{
        setErrorMessage(`Error fetching user : ${err.message}`);
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
    
        <Form onSubmit={handleSubmit} className="sign-in-form">
          <h6 className="text-5xl mb-2">Edit Bot</h6>
      
          {/* <FormSelect
  name="plan_id"
  value={Post.plan_id}
  id="plan_id"
  onChange={handleInputPost}
>
  {options_id.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</FormSelect> */}
          {/* <FormSelect
            name="state"
            value={Post.state}
            id="state"
            onChange={handleInputPost}
          >
            <option>Status select menu</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="super_admin">superadmin</option>
          </FormSelect> */}
          <InputGroup size="sm" className="mb-3" style={{ direction: determineWritingDirection(Post.name) }} >
            <InputGroup.Text id="inputGroup-sizing-sm">Fees</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Money"
              name="money"
              value={Post.money}
              onChange={handleInputPost}
              style={{ direction: determineWritingDirection(Post.name) }} 
              
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3" style={{ direction: determineWritingDirection(Post.name) }} >
            <InputGroup.Text id="inputGroup-sizing-sm">User Name</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={Post.name}
              onChange={handleInputPost}
              style={{ direction: determineWritingDirection(Post.name) }} 
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3" style={{ direction: determineWritingDirection(Post.name) }} >
            <InputGroup.Text id="inputGroup-sizing-sm">num_orders</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="num_orders"
              name="num_orders"
              value={Post.num_orders}
              onChange={handleInputPost}
              style={{ direction: determineWritingDirection(Post.name) }} 
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3" style={{ direction: determineWritingDirection(Post.name) }} >
          <InputGroup.Text id="inputGroup-sizing-sm">orders_usdt</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="orders_usdt"
              name="orders_usdt"
              value={Post.orders_usdt}
              onChange={handleInputPost}
              style={{ direction: determineWritingDirection(Post.name) }} 
            />
          </InputGroup>
          {/* <InputGroup size="sm" className="mb-3">
             <InputGroup.Text id="inputGroup-sizing-sm">Phone</InputGroup.Text> 
            <PhoneInputWithCountrySelect
              className="w-80"
              international
              defaultCountry="EG"
              // countryCallingCodeEditable={false}
              placeholder="Phone"
              id="phone"
              name="phone"
              minLength="8"
              maxLength="16"
              autoComplete="Enter phone number"
              required
              value={Post.phone}
              onChange={handlePhoneChange}
            />
          </InputGroup> */}
          <Button type="submit">Edit</Button>
        </Form>
      {/* )} */}
    </>
  );
}
