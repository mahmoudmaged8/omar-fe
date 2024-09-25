import { useEffect, useState } from "react";
import { Alert, Button, Form, FormSelect, InputGroup } from "react-bootstrap";
import { Facebook } from "react-content-loader";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import axiosClient from "../../axiosClientOffline";
export default function AddUser() {
  const [plans, setPlans] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(true);
  const locations = useLocation();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    state: "",
    plan_id: "",
    comming_afflite: "MEOGKH1N",
    plan: [],
  });

  const handleInputPost = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === "state") {
      if (e.target.value === "admin") {
        fetchTelegram();
      }
    }
  };
  const handleSelectChange2 = (selectedOptions) => {
    const selectedIds = selectedOptions.value;
    setUser((prevPost) => ({
      ...prevPost,
      plan_id: selectedIds,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("User", user);
      if (response.data.user.state == "user") {
        window.location.href = "/dashboard/users?added=1";
      } else if (response.data.user.state == "admin") {
        window.location.href = "/dashboard/admins?added=1";
      } else if (response.data.user.state == "super_admin") {
        window.location.href = "/dashboard/super_admin?added=1";
      }else if (response.data.user.state == "support") {
        window.location.href = "/dashboard/support?added=1";
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Error adding user.", err);
    }
  };
  const admin = locations.pathname === "/dashboard/admins";
  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setUser({ ...user, plan: selectedIds });
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
  useEffect(() => {
    fetchTelegram();
    let defaultState = "";
    if (locations.pathname === "/dashboard/users") {
      defaultState = "user";
      setLoading(false);
    } else if (locations.pathname === "/dashboard/admins") {
      fetchTelegram();
      defaultState = "admin";
    } else if (locations.pathname === "/dashboard/super_admin") {
      defaultState = "super_admin";
      setLoading(false);
    }else if (locations.pathname === "/dashboard/support") {
      defaultState = "support";
      setLoading(false);
    }
    setUser((prevUser) => ({ ...prevUser, state: defaultState }));
    setUser((prevUser) => ({ ...prevUser, phone: value }));
  }, [value, locations]);

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
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      {loading ? (
        <Facebook />
      ) : (
        <Form onSubmit={handleSubmit} className="sign-in-form">
          <h6 className="text-5xl">Add</h6>
          {admin && (
            <InputGroup size="sm" className="mb-3 justify-center">
              <Select
              className="my-react-select-container"
              classNamePrefix="my-react-select"
                key={options.value}
                options={options}
                isMulti
                onChange={handleSelectChange}
                placeholder="Select plans to add advice and posts "
              />
            </InputGroup>
          )}
          <InputGroup size="sm" className="mb-3 justify-center">
            <Select
              name="plan_id"
              className="my-react-select-container"
            classNamePrefix="my-react-select"
              options={options_id}
              // value={Post.plan_id}
              onChange={handleSelectChange2}
              placeholder="Select plans"
            />
          </InputGroup>
          <FormSelect
            name="state"
            id="state"
            className="my-react-select-container px-2"
            classNamePrefix="my-react-select"
            value={user.state}
            onChange={handleInputPost}
          >
            <option>Status select menu</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="super_admin">superadmin</option>
            <option value="support">Support</option>
          </FormSelect>
          <InputGroup size="sm" className="mb-3">
            {/* <Form.Group id="inputGroup-sizing-sm">Name</Form.Group> */}
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={user.name}
              required
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            {/* <InputGroup.Text id="inputGroup-sizing-sm">
            Email
          </InputGroup.Text> */}
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              value={user.email}
              required
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            {/* <InputGroup.Text id="inputGroup-sizing-sm">
            Password
          </InputGroup.Text> */}
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              value={user.password}
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            {/* <InputGroup.Text id="inputGroup-sizing-sm">
            phone
          </InputGroup.Text> */}
            <PhoneInputWithCountrySelect
              className=" w-80"
              international
              defaultCountry="EG"
              countryCallingCodeEditable={false}
              placeholder="phone"
              id="phone"
              name="phone"
              minLength="8"
              maxLength="16"
              autoComplete="Enter phone number"
              required
              value={value}
              onChange={setValue}
              label=""
            />
          </InputGroup>
          <Button type="submit">Add</Button>
        </Form>
      )}
    </>
  );
}
