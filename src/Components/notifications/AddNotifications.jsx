/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { Facebook } from "react-content-loader";
import Select from "react-select";
import axiosClient from "../../axiosClientOffline";

export default function AddNotifications() {
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [image, setImage] = useState(null);
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    fetchPlans2();
  }, []);
  const fetchPlans2 = async () => {
    try {
      const response = await axiosClient.get('plan');
      setPlans(response.data.data);
    } catch (err) {
      console.log(err);
      fetchPlans();
    }finally {
      setLoading(false);
    }
  };
  const fetchPlans = async () => {
    try {
      const response = await axiosClient.get('adminPlan');
      setPlans(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [post, setPost] = useState({
    text: "",
    totalPlan:[],
  });
  const handleInputPost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      await axiosClient.post("NotificationPlans", post).then((res) => {
        if (res.data.message === "Notification created successfully") {
          window.location.href = "/dashboard/notifications?success=1";
        }
        if (res.data.success == false) {
          setErrorMessage(res.data.message);  
        }
      });
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setPost({ ...post, totalPlan: selectedIds });
  };
  const filteredPlans = plans.filter((plan) => plan.id !== 7);
  const options = filteredPlans.map((plan) => ({
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
        <Alert
          variant="danger"
          onClose={() => setErrorMessage("")}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}
      {loading ? <Facebook /> : (
        <Form onSubmit={handleSubmit} className="sign-in-form">
          <h3>Add Notifications</h3>
        
          <InputGroup size="sm" className="mb-3 justify-center">
              <Select
              className="my-react-select-container px-2"
              classNamePrefix="my-react-select"
                options={options}
                isMulti
                onChange={handleSelectChange}
                placeholder="Select plans"
              />
            </InputGroup>
          {/* <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              onChange={handleInputPost}
            />
          </InputGroup> */}
          {/* <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="url"
              placeholder="link share"
              name="link"
              onChange={handleInputPost}
            />
          </InputGroup> */}
          {/* <InputGroup size="sm" className="mb-3">
            
            <Form.Select
              name="status"
              onChange={handleInputPost}
              aria-label="Discount"
              required
            >
              <option>اين تريد نشرها</option> 
              <option value="is_advice">النصائح</option>
              <option value="is_post">الارشيف</option>
            </Form.Select>
          </InputGroup> */}
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="text"
              onChange={handleInputPost}
              rows={6}
              required
            />
          </InputGroup>
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          <Button type="submit">Add</Button>
        </Form>
      )}
    </>
  );
}
