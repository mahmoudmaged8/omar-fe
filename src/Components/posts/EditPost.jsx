/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Alert, Button, Form, FormSelect, InputGroup } from "react-bootstrap";
import { Facebook } from "react-content-loader";
import axiosClient from "../../axiosClientOffline";

export const EditPost = ({ post }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);

  const [posts, setPost] = useState({
    id: post.id,
    title: post.title,
    text: post.text,
    plan_id: post.plan_id ? post.plan_id : 1,
    status: post.status,
    img: post.img,
  });
  useEffect(() => {
    fetchPlans2();
  }, []);
  const fetchPlans2 = async () => {
    try {
      const response = await axiosClient.get("plan");
      setPlans(response.data.data);
    } catch (err) {
      console.log(err);
      fetchPlans();
    } finally {
      setLoading(false);
    }
  };
  const fetchPlans = async () => {
    try {
      const response = await axiosClient.get("adminPlan");
      setPlans(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPost({ ...posts, image: image });
  };

  const handleInputPost = (e) => {
    setPost({ ...posts, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(`post/${posts.id}`, posts);
      if (response.data.Massage === "Request is Updated") {
        window.location.href = "/dashboard/posts?update";
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
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      {loading ? (
        <Facebook />
      ) : (
        <Form onSubmit={handleSubmit}>
          <h3>Edit Plans</h3>
          <FormSelect
            className="my-react-select-container"
            classNamePrefix="my-react-select"
            name="plan_id"
            id="plan_id"
            value={posts.plan_id}
            onChange={handleInputPost}
            style={{ marginBottom: "10px" }}
          >
            <option>إختر الخطة</option>
            {plans.length > 0 ? (
              plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))
            ) : (
              <option>لا يوجد خطة</option>
            )}
          </FormSelect>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleInputPost}
              value={posts.title}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Select
              name="status"
              onChange={handleInputPost}
              value={posts.status}
              aria-label="Discount"
            >
              <option>اين تريد نشرها</option>
              <option value="is_advice">النصائح</option>
              <option value="is_post">الارشيف</option>
            </Form.Select>
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="text"
              onChange={handleInputPost}
              value={posts.text}
              rows={6}
            />
          </InputGroup>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Button type="submit">Edit</Button>
        </Form>
      )}
    </>
  );
};

export default EditPost;
