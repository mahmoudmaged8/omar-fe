/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
// import { Facebook } from "react-content-loader";
import { Facebook } from "react-content-loader";
import axiosClient from "../../axiosClientOffline";

export default function BuyTicker(post) {
  console.log(post.selectedPost.ticker);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [plans, setPlans] = useState([]);
  const [ticker, setTicker] = useState({
    ticker: post.selectedPost.ticker.slice(0, -4),
    type: "buy",
    target1: 2,
    target2: 4,
    stoplose: 6,
    totalPlan: [1, 4, 5, 6],
  });
  const thisTicker = post.selectedPost.ticker;
  useEffect(() => {
    fetchPlans2();
  }, []);
  useEffect(() => {
    setSelectedOptions(ticker.totalPlan);
  }, [ticker]);
  const handleInputPost = (e) => {
    setTicker({ ...ticker, [e.target.name]: e.target.value });
  };
  const fetchPlans2 = async () => {
    try {
      const response = await axiosClient.get("plan");
      setPlans(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      fetchPlans();
    }
  };
  const handleOptionCheckboxChange = (optionValue) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== optionValue));
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  };
  const fetchPlans = async () => {
    try {
      const response = await axiosClient.get("adminPlan");
      setPlans(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    console.log(ticker);
    setLoading(true);
    try {
      e.preventDefault();
      await axiosClient.post("buyNowAdmin", ticker).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          window.location.href = "/dashboard/recommendation?added=1";
        }
        if (res.data.success == false) {
          setErrorMessage(res.data.message);
          console.log(res.data);
        }
      });
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }
  };
  const filteredPlans = plans.filter((plan) => plan.id !== 7);

  const options = filteredPlans.map((plan) => ({
    value: plan.id,
    label: plan.name,
    checked: selectedOptions.includes(plan.id),
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
          <h3 className="mb-3">هل أنت متأكد أنك تريد شراء عملة {thisTicker}؟</h3>
          {showEdit ? (
            <>
              <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">
              target1
          </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="target1"
                  name="target1"
                  value={ticker.target1}
                  onChange={handleInputPost}
                  required
                />
              <InputGroup.Text id="inputGroup-sizing-sm">
              target2
          </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="target2"
                  name="target2"
                  value={ticker.target2}
                  required
                  onChange={handleInputPost}
                />
              </InputGroup>

              <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">
              stoplose
          </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="stoplose"
                  name="stoplose"
                  value={ticker.stoplose}
                  required
                  onChange={handleInputPost}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3 justify-center">
                {options.map((option) => (
                  <label key={option.value} style={{ marginLeft: "15px" }}>
                    <input
                      type="checkbox"
                      value={option.value}
                      onChange={() => handleOptionCheckboxChange(option.value)}
                      checked={selectedOptions.includes(option.value)} // Set the checked attribute
                      style={{ marginLeft: "15px" }}
                    />
                    {option.label} {option.checked && option.checked_label}
                  </label>
                ))}
              </InputGroup>
              <Button
                onClick={() => setShowEdit(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </Button>
              <Button type="submit">Buy</Button>
            </>
          ) : (
            <div className="">
              <Button onClick={() => setShowEdit(true)} variant="success">
                Edit
              </Button>
              <Button type="submit">Confirm</Button>
            </div>
          )}
        </Form>
      )}
    </>
  );
}
