/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Alert, Button, Form, FormSelect, InputGroup } from "react-bootstrap";
import { Facebook } from "react-content-loader";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import axiosClient from "../../axiosClientOffline";

export default function EditUser({ user }) {
  // eslint-disable-next-line no-unused-vars
  const [setValue] = useState();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const locations = useLocation();
  const [Post, setPost] = useState({
    name: user.name,
    email: user.email,
    password: "",
    phone: user.phone,
    state: user.state,
    money: user.money,
    number_points: user.number_points,
    plan_id: user.plan ? user.plan.id : user.plan_id,
    start_plan: user.start_plan,
    end_plan: user.end_plan,
    plan: [],
    plan_title: [],
  });
  const admin = locations.pathname === "/dashboard/admins";
  useEffect(() => {
    fetchTelegram();
    if (locations.pathname === "/dashboard/users") {
      setLoading(false);
    } else if (locations.pathname === "/dashboard/admins") {
      fetchTelegram();
      const selectedIds = user.Role ? user.Role.map((plans) => plans.id) : [];
      const selectedTitles = user.Role
        ? user.Role.map((plans) => plans.name)
        : [];
      setPost((prevPost) => ({
        ...prevPost,
        plan: selectedIds,
        plan_title: selectedTitles,
      }));
    } else if (locations.pathname === "/dashboard/super_admin") {
      setLoading(false);
    }
  }, []);
  const handleInputPost = (e) => {
    setPost({
      ...Post,
      [e.target.name]: e.target.value,
    });
  };
  const fetchTelegram = async () => {
    try {
      const response = await axiosClient.get("plan");
      setPlans(response.data.data);
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching plan : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  const handlePhoneChange = (value) => {
    setPost({ ...Post, phone: value });
  };
  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    const selectedTitles = selectedOptions.map((option) => option.label);

    setPost((prevPost) => ({
      ...prevPost,
      plan: selectedIds,
      plan_title: selectedTitles,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Step 1: Create a new object for submission that excludes start_plan and end_plan initially.
    const submissionData = {
      ...Post,
      start_plan: undefined, // Explicitly exclude start_plan
      end_plan: undefined, // Explicitly exclude end_plan
    };
  
    // Step 2: Conditionally add start_plan and end_plan if they are not null.
    if (Post.start_plan) {
      submissionData.start_plan = Post.start_plan;
    }
    if (Post.end_plan) {
      submissionData.end_plan = Post.end_plan;
    }
  
    try {
      // Step 3: Use the adjusted object for your PUT request.
      const response = await axiosClient.put(`User/${user.id}`, submissionData);
      // Your existing redirection logic...
      if (response.data.user.state == "user") {
        window.location.href = "/dashboard/users?update=1";
      } else if (response.data.user.state == "admin") {
        window.location.href = "/dashboard/admins?update=1";
      } else if (response.data.user.state == "super_admin") {
        window.location.href = "/dashboard/super_admin?update=1";
      } else if (response.data.user.state == "support") {
        window.location.href = "/dashboard/support?update=1";
      }
    } catch (err) {
      console.log(err);
      // Your existing error handling logic...
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching User : ${err.message}`);
      }
    }
  };
  
  const filteredPlans = plans.filter((plan) => plan.id !== 7);

  const options = filteredPlans.map((plan) => ({
    value: plan.id,
    label: plan.name,
  }));
  const options_id = filteredPlans.map((plan) => ({
    value: plan.id,
    label: plan.name,
  }));
  return (
    <>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      {loading ? (
        <Facebook />
      ) : (
        <Form onSubmit={handleSubmit} className="sign-in-form">
          <h6 className="text-5xl">Edit</h6>
          {admin && (
            <InputGroup size="sm" className="mb-3 justify-center">
              <Select
              className="my-react-select-container"
              classNamePrefix="my-react-select"
                options={options}
                isMulti
                value={Post.plan.map((id, index) => ({
                  value: id,
                  label: Post.plan_title[index],
                }))}
                onChange={handleSelectChange}
                placeholder="Select plans to add advice and posts"
              />
            </InputGroup>
          )}
          <FormSelect
          className="my-react-select-container"
          classNamePrefix="my-react-select"
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
          </FormSelect>
          <FormSelect
          className="my-react-select-container"
          classNamePrefix="my-react-select"
            name="state"
            value={Post.state}
            id="state"
            onChange={handleInputPost}
          >
            <option>Status select menu</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="super_admin">Super Admin</option>
            <option value="support">Support</option>
          </FormSelect>
          <InputGroup size="sm" className="mb-3" >
            {/* <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text> */}
            <Form.Control
              type="date"
              placeholder="start_plan"
              name="start_plan"
              value={Post.start_plan}
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            {/* <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text> */}
            <Form.Control
              type="date"
              placeholder="end_plan"
              name="end_plan"
              value={Post.end_plan}
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            {/* <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text> */}
            <Form.Control
              type="text"
              placeholder="Money"
              name="money"
              value={Post.money}
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            {/* <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text> */}
            <Form.Control
              type="text"
              placeholder="Fees"
              name="number_points"
              value={Post.number_points}
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            {/* <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text> */}
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={Post.name}
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            {/* <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text> */}
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              value={Post.email}
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            {/* <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text> */}
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            {/* <InputGroup.Text id="inputGroup-sizing-sm">Phone</InputGroup.Text> */}
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
          </InputGroup>
          <Button type="submit">Update</Button>
        </Form>
      )}
    </>
  );
}
