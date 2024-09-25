import { useEffect, useState } from "react";
import { Alert, Button, Form, FormSelect, InputGroup } from "react-bootstrap";
import { Facebook } from "react-content-loader";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { useLocation } from "react-router-dom";
import axiosClient from "../../axiosClientOffline";
import Select from "react-select";
import axios from "axios";
import { API_BASE_URL } from "../../config";

export default function AddBuffer({
  fetchUser,
  handleCloseCreateBuffer,
  modalType,
  modalData,
}) {
  const [bufferData, setBufferData] = useState({
    email: "",
    buffer_id: "",
    start_subscrip: "",
    end_subscrip: "",
    amount: "",
    per_month: "",
    // phone: "",
  });
  useEffect(() => {
    if (modalType === "edit") {
      setBufferData({
        email: modalData.email,
        buffer_id: modalData.buffer_id,
        start_subscrip: modalData.start_subscrip,
        end_subscrip: modalData.end_subscrip,
        amount: modalData.amount,
        per_month: modalData.per_month,
        // phone: modalData.phone,
      });
    }
  }, [modalData]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState();
  const [bufferPlans, setbufferPlans] = useState([]);
  const location = useLocation();

  const handleSelectChange = (selectedOption) => {
    setBufferData({ ...bufferData, buffer_id: selectedOption.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (modalType === "edit") {
        const response = await axios.put(
          API_BASE_URL + "/buffer/wifiBuffer/" + modalData.id,
          {
            email: bufferData.email,
            buffer_id: bufferData.buffer_id,
            start_subscrip: bufferData.start_subscrip,
            end_subscrip: bufferData.end_subscrip,
            amount: bufferData.amount,
            per_month: bufferData.per_month,
            // phone: value,
          },
          config
        );
        fetchUser();
        handleCloseCreateBuffer();
        setSuccessMessage("تم تعديل المستخدم بنجاح");
        setBufferData({
          email: "",
          buffer_id: "",
          start_subscrip: "",
          end_subscrip: "",
          amount: "",
          per_month: "",
          // phone: "",
        });
      } else {
        const response = await axios.post(
          API_BASE_URL + "/buffer/wifiBuffer",
          {
            email: bufferData.email,
            buffer_id: bufferData.buffer_id,
            start_subscrip: bufferData.start_subscrip,
            end_subscrip: bufferData.end_subscrip,
            amount: bufferData.amount,
            per_month: bufferData.per_month,
            // phone: value,
          },
          config
        );
        setSuccessMessage("تم اضافة المستخدم بنجاح");
        fetchUser();
        handleCloseCreateBuffer();
        setBufferData({
          email: "",
          buffer_id: "",
          start_subscrip: "",
          end_subscrip: "",
          amount: "",
          per_month: "",
          // phone: "",
        });
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Error adding user: " + err.message);
    }
  };
  const handleInputPerMount = (e) => {
    const perMonthValue = e.target.value;

    // Parse the start_subscrip date
    const startDate = new Date(bufferData.start_subscrip);

    // Calculate the end date by adding the per_month value
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + parseInt(perMonthValue));

    // Format endDate as a string in the same format as start_subscrip
    const formattedEndDate = endDate.toISOString().split("T")[0];

    // Update the state with the per_month value and the calculated end_subscrip
    setBufferData((prevData) => ({
      ...prevData,
      per_month: perMonthValue,
      end_subscrip: formattedEndDate,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the start_subscrip changes, we may need to recalculate the end_subscrip
    if (name === "start_subscrip" && bufferData.per_month) {
      const startDate = new Date(value);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + parseInt(bufferData.per_month));
      const formattedEndDate = endDate.toISOString().split("T")[0];

      setBufferData((prevData) => ({
        ...prevData,
        [name]: value,
        end_subscrip: formattedEndDate,
      }));
    } else {
      setBufferData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fetchBufferPlans = async () => {
    try {
      const response = await axiosClient.get("buffers");
      console.log(response.data, "response.data");
      setbufferPlans(
        response.data.map((plan) => ({ value: plan.id, label: plan.name }))
      );
    } catch (err) {
      console.log(err);
      setErrorMessage("Error adding user: " + err.message);
    }
  };

  useEffect(() => {
    // Placeholder for any logic you need when the component loads.
    setLoading(false);
    fetchBufferPlans();
  }, []);

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
          <h6 className="text-5xl my-4">Add New Buffer</h6>

          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              value={bufferData.email}
              required
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3 justify-center">
            <FormSelect
              name="buffer_id"
              id="state"
              className="my-react-select-container px-2"
              classNamePrefix="my-react-select"
              value={bufferData.buffer_id}
              onChange={handleSelectChange}
            >
              {[{ value: "", label: "Select Buffer" }, ...bufferPlans].map(
                (plan) => (
                  <option key={plan.value} value={plan.value}>
                    {plan.label}
                  </option>
                )
              )}
            </FormSelect>
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="date"
              placeholder="Start Subscription"
              name="start_subscrip"
              value={bufferData.start_subscrip}
              required
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="date"
              placeholder="End Subscription"
              name="end_subscrip"
              value={bufferData.end_subscrip}
              required
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Amount"
              name="amount"
              value={bufferData.amount}
              required
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Per Month"
              name="per_month"
              value={bufferData.per_month}
              required
              onChange={handleInputPerMount}
            />
          </InputGroup>

          <Button type="submit">
            {modalType === "edit" ? "Update" : "Create"}
          </Button>
        </Form>
      )}
    </>
  );
}
