/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button, Form, FormSelect, InputGroup } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";

export default function AddPost() {
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const [plans, setPlans] = useState([]);
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
    } finally {
      setLoading(false);
    }
  };
  const [post, setPost] = useState({
    title: "",
    text: "",
    plan_id: 1,
    status: "is_advice",
    link: "",
    img: image,
  });
  const handleInputPost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("text", post.text);
      formData.append("plan_id", post.plan_id);
      formData.append("status", post.status);
      formData.append("link", post.link);
      formData.append("img", image);

      await axiosClient.post("post", formData).then((res) => {
        if (res.data.Massage === "Request is Sucess") {
          window.location.href = "/dashboard/posts?success=1";
        }
        if (res.data.success == false) {
          setErrorMessage(res.data.message);
          console.log(res.data);
        }
      });
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };
  const Loader = (props) => {
    const random = Math.random() * (1 - 0.7) + 0.7;
    return (
      <ContentLoader
        height={50}
        width={1060}
        speed={2}
        primarycolor="#333"
        secondarycolor="#999"
        {...props}
      >
        <rect x="10" y="13" rx="6" ry="6" width={120 * random} height="12" />
        <rect x="159" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="250" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="360" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="430" y="13" rx="6" ry="6" width={60 * random} height="12" />
        <rect x="530" y="13" rx="6" ry="6" width={100 * random} height="12" />
        <rect x="650" y="13" rx="6" ry="6" width={100 * random} height="12" />

        <rect x="0" y="39" rx="6" ry="6" width="1090" height=".3" />
      </ContentLoader>
    );
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
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      {loading ? (
        <div className="mt-[8rem]">
          {Array(10)
            .fill("")
            .map((e, i) => (
              <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
            ))}
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="sign-in-form">
          <h3>Add Post</h3>

          <FormSelect
            className="my-react-select-container"
            classNamePrefix="my-react-select"
            name="plan_id"
            id="plan_id"
            onChange={handleInputPost}
            style={{ marginBottom: "10px" }}
            required
          >
            {/* <option>إختر الخطة</option> */}
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
              required
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="url"
              placeholder="link share"
              name="link"
              onChange={handleInputPost}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Select
              name="status"
              onChange={handleInputPost}
              aria-label="Discount"
              required
            >
              {/* <option>اين تريد نشرها</option> */}
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
              rows={6}
              required
            />
          </InputGroup>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Button type="submit">Add</Button>
        </Form>
      )}
    </>
  );
}
