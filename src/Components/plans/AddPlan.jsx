import { useEffect, useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import Select from "react-select";
import axiosClient from "../../axiosClientOffline";

export default function AddPlan() {
  const [telegrams, setTelegrams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [post, setPost] = useState({
    name: "",
    nameChannel: "",
    description: [], // Array to store multiple descriptions
    price: "",
    discount: "",
    percentage1: 0,
    percentage2: null,
    percentage3: null,
    telegram_id: [],
    number_bot: "",
  });
  const handleInputPost = (e) => {
    let value = e.target.value;
    if (e.target.name === "name") {
      const valueFinal = value.trim().replace(/\s+/g, "").toUpperCase();
      setPost({ ...post, name: value, nameChannel: valueFinal });
    } else if (e.target.name.startsWith("desc")) {
      const index = e.target.name.slice(4);
      const newDescs = [...post.description];
      newDescs[index] = value;
      setPost({ ...post, description: newDescs });
    } else {
      setPost({ ...post, [e.target.name]: value });
    }
  };
  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setPost({ ...post, telegram_id: selectedIds });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axiosClient.post("plan", post).then((res) => {
        if (res.data.success == false){
          setErrorMessage(res.data.message);
        }else {
          window.location.href = "/dashboard/plans?success=1";
        }
      });
    } catch (err) {
      console.log(err);
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
  useEffect(() => {
    fetchTelegram();
  }, []);
  const fetchTelegram = async () => {
    try {
      const response = await axiosClient.get("telegram");
      setTelegrams(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const options = telegrams.map((telegram) => ({
    value: telegram.id,
    label: telegram.title,
  }));

  const addDescription = () => {
    setPost({ ...post, description: [...post.description, ""] });
  };

  const removeDescription = (index) => {
    const newDescs = [...post.description];
    newDescs.splice(index, 1);
    setPost({ ...post, description: newDescs });
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
          <h3>Add Plans</h3>
          <InputGroup size="sm" className="mb-3 justify-center">
            <Select
            className="my-react-select-container px-2"
            classNamePrefix="my-react-select"
              options={options}
              isMulti
              onChange={handleSelectChange}
              placeholder="Select telegram"
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
         
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="price"
              name="price"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="bot number"
              name="number_bot"
              onChange={handleInputPost}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="percentage level 1"
              name="percentage1"
              onChange={handleInputPost}
              max={100}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="percentage level 2"
              name="percentage2"
              onChange={handleInputPost}
              max={100}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="percentage level 3"
              name="percentage3"
              onChange={handleInputPost}
              max={100}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="discount"
              name="discount"
              onChange={handleInputPost}
              max={100}
            />
          </InputGroup>
          {post.description.map((desc, index) => (
            <InputGroup size="sm" className="mb-3" key={index}>
              <Form.Control
                type="text"
                placeholder={`Description ${index + 1}`}
                name={`desc${index}`}
                value={desc}
                onChange={handleInputPost}
                required
              />
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeDescription(index)}
              >
                Remove
              </Button>
            </InputGroup>
          ))}
          <Button
            variant="primary"
            size="sm"
            className="mb-3"
            onClick={addDescription}
          >
            Add Description
          </Button>
          <Button type="submit">Add</Button>
        </Form>
      )}
    </>
  );
}
