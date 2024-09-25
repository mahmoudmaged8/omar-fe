/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button, Form, InputGroup, ProgressBar } from "react-bootstrap";
import { Facebook } from "react-content-loader";
import Select from "react-select";
import axiosClientF from "../../axiosClientFront";
import axiosClient from "../../axiosClientOffline";

export default function AddRecommendation() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userId, setUserId] = useState("");
  const [plans, setPlans] = useState([]);
    const [count, setCount] = useState(null);
  const [text, setText] = useState({});
  const [ticker, setTicker] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [entryPrice, setEntryPrice] = useState("");
  const [stopPrice, setStopPrice] = useState("");
  const [currencyName, setCurrencyName] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  useEffect(() => {
    fetchPlans2();
    fetchCount();
    fetchPusher();
    fetchTickers();
  }, []);
  useEffect(() => {
    setRecommendation({ ...recommendation, entry_price: entryPrice });
    setRecommendation({ ...recommendation, stop_price: stopPrice });
  }, [stopPrice]);
  const fetchTickers = async () => {
    try {
      const response = await axiosClient.get("all-tickers");
      setTicker(response.data.allticker);
      setLoading(false);
    } catch (err) {
      console.log(err);
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

  const fetchPlans2 = async () => {
    try {
      const response = await axiosClient.get("plan");
      setPlans(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      fetchPlans();
    }
  };
    const fetchCount = async () => {
    try {
      const response = await axiosClient.post("count_all_blance_user");
      setCount(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      fetchPlans();
    }
  };
  const fetchPusher = async () => {
    try {
      const response = await axiosClientF.post("me");
      setUserId(response.data.user.id);
    } catch (err) {
      console.log(err);
    }
  };
  const [recommendation, setRecommendation] = useState({
    title: "",
    currency: "",
    desc: "",
    entry_price: entryPrice ? entryPrice : "",
    stop_price: stopPrice ? stopPrice : "",
    // planes_id: 1,
    totalPlan: [],
    user_id: userId,
    number_show: 0,
    targets: [], // Store additional fields dynamically
    // img: [],
  });

  const handleInputPost = (e, index) => {
    if (index !== undefined) {
      const targets = [...recommendation.targets];
      targets[index] = e.target.value;
      setRecommendation({ ...recommendation, targets });
    } else {
      setRecommendation({ ...recommendation, [e.target.name]: e.target.value });
    }
  };

  const handleChange = (event) => {
    setRecommendation({
      ...recommendation,
      desc: event ? event.target.value : recommendation.desc,
    });
    const newText = event ? event.target.value : recommendation.desc;
    const currencyNameMatch = newText.match(/اسم العملة:\s*(.+)\s*\/\s*USDT/);
    if (currencyNameMatch) {
      const extractedCurrencyName = currencyNameMatch[1].trim();
      const foundOption = optionsTickers.find(
        (o) => o.value === extractedCurrencyName
      );
      if (foundOption) {
        setCurrencyName(foundOption);
        setSelectedCurrency({
          label: extractedCurrencyName,
          value: extractedCurrencyName,
        });
      }
    } else {
      setCurrencyName("");
      setSelectedCurrency(null);
    }
    const numbers = newText.match(/\d+(\.\d+)?/g);
  
    if (numbers) {
      if (numbers[0] == 1 || numbers[0] == 3) {
        numbers.splice(0, 1);
      }
      const entryPriceNmber = numbers.splice(0, 2, "/");
      const entryPriceString = entryPriceNmber.toString().replace(/,/g, " - ");
      setEntryPrice(entryPriceString);
      setRecommendation({ ...recommendation, entry_price: entryPriceString });
      const stopPriceNmber = numbers.pop();
      setStopPrice(stopPriceNmber);
      setRecommendation({ ...recommendation, stop_price: stopPriceNmber });
      const targetsnumber = numbers.slice(1, 3);
      const myFrist = entryPriceNmber.slice(1, 2) * 1.02;
      
      if (myFrist > targetsnumber[0]) {
        const updatedTargets = [...targetsnumber];
        updatedTargets[0] = myFrist;
        setRecommendation({ ...recommendation, targets: updatedTargets });
        setText(updatedTargets);
      } else {
        setRecommendation({ ...recommendation, targets: targetsnumber });
        setText(targetsnumber);
      }
    }
  };

  const handleAddField = () => {
    const targets = [...recommendation.targets];
    targets.push({ target: "" });
    setRecommendation({ ...recommendation, targets });
  };
  const handleDeleteField = () => {
    const targets = [...recommendation.targets];
    targets.pop();
    setRecommendation({ ...recommendation, targets });
  };

  const handleOptionCheckboxChange = (optionValue) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== optionValue));
      setRecommendation(selectedOptions.filter((o) => o !== optionValue));
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
      setRecommendation({ ...recommendation, totalPlan: optionValue });
    }
  };
  const handleSelectChange2 = (selectedOptions) => {
    setRecommendation({ ...recommendation, currency: selectedOptions.value });
  };
  // const handleImageChange = (e) => {
  //   const selectedImages = Array.from(e.target.files);
  //   setImages(selectedImages);
  // };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (selectedOptions.length === 0) {
      setErrorMessage("الرجاء اختيار خطة");
      setLoading(false);
      return; // Prevent form submission
    }
    try {
      const formData = new FormData();
      // images.forEach((img) => {
      //   formData.append("img[]", img);
      // });
      formData.append("title", recommendation.title);
      // const formattedDesc = recommendation.desc.replace(/\n/g, '\\n'); // Replace newline characters with escape sequence
      // formData.append('desc', formattedDesc);
      formData.append("desc", recommendation.desc);
      selectedOptions.forEach((plan) => {
        formData.append("totalPlan[]", plan); // Append each plan individually with the key 'totalPlan[]'
      });
      formData.append("user_id", userId);
      formData.append("number_show", 0);
      formData.append("entry_price", entryPrice);
      formData.append("entryPrice[]", entryPrice);
      formData.append("stop_price", stopPrice);
      formData.append("planes_id", 1);
      formData.append("admin_id", 520);
      formData.append(
        "currency",
        recommendation.currency ? recommendation.currency : currencyName.value
      );
      text.forEach((my_text) => {
        formData.append("targets[]", my_text);
      });
  
      const config = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      };
      const response = await axiosClient.post(
        "Recommendation",
        formData,
        config
      );
      if (response.data.success) {
        window.location.href = "/dashboard/Recommendation?added";
      }
      if (response.data.success === false) {
        setErrorMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDescKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedDesc = `${e.target.value}\n`; // Append newline character
      setRecommendation({ ...recommendation, desc: updatedDesc });
    }
    setRecommendation({ ...recommendation, desc: e.target.value });
  };

  const filteredPlans = plans.filter((plan) => plan.id !== 7);

  const options = filteredPlans.map((plan) => ({
    value: plan.id,
    label: plan.name,
    checked_label: plan.totalMoney,
  }));

  const optionsTickers = ticker.map((tickers) => ({
    value: tickers.ticker.slice(0, -4),
    label: tickers.ticker.slice(0, -4),
  }));

  return (
    <>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      {uploadProgress > 0 && uploadProgress < 100 ? (
        <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
      ) : loading ? (
       < >
    <Facebook/>
  </> 
      ) : (
        <Form onSubmit={handleSubmit} className="sign-in-form">
          <div>{count !== null ? `count of user: ${count.count}` : "...... count of user is Loading"} </div>
          <InputGroup size="sm" className="mb-3 justify-center">
            {options.map((option) => (
              <div className="ms-2" key={option.value}>
              <span
                className={`badge ${
                  option.checked ? "bg-success" : "bg-danger"
                }`}
              >
                {option.checked && option.checked_label}
                {option.label} : $ {option.checked_label}
              </span>
            </div>
            ))}
          </InputGroup>
          <InputGroup size="sm" className="mb-3 justify-center">
            {options.map((option) => (
              <label key={option.value} style={{ marginLeft: "15px" }}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionCheckboxChange(option.value)}
                  style={{ marginLeft: "15px" }}
                />
                {option.label} {option.checked && option.checked_label}
              </label>
            ))}
          </InputGroup>

          <InputGroup size="sm" className="mb-3 justify-center">
            <Select
            className="my-react-select-container"
            classNamePrefix="my-react-select"
              options={optionsTickers}
              onChange={(selected) => {
                handleSelectChange2(selected);
                setSelectedCurrency(selected);
              }}
              placeholder="Select currency"
              value={selectedCurrency}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="عنوان التوصية"
              name="title"
              onChange={handleInputPost}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="قيمة العملة"
              name="entry_price"
              value={entryPrice.length > 0 ? entryPrice : ""}
              onChange={(e) => {
                handleInputPost(e);
                setEntryPrice(e.target.value);
              }}
              // required
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="توقف الخسارة"
              value={stopPrice}
              name="stop_price"
              onChange={(e) => {
                handleInputPost(e);
                setStopPrice(e.target.value);
              }}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="desc"
              onKeyUp={handleDescKeyPress}
              // onKeyPress={handleDescKeyPress}
              onChange={handleChange}
              rows={6}
              required
            />
          </InputGroup>
          {recommendation.targets ? (
            recommendation.targets.map((field, index) => (
              <InputGroup size="sm" className="mb-3" key={index}>
                <Form.Control
                  type="text"
                  placeholder="الاهداف"
                  name="target"
                  value={field}
                  onChange={(e) => {
                    handleInputPost(e, index);
                    setText(text.concat(e.target.value));
                  }}
                />
              </InputGroup>
            ))
          ) : (
            <InputGroup size="sm" className="mb-3" />
          )}
          <InputGroup size="sm" className="mb-3 justify-center">
            <Button type="button" className="mt-3" onClick={handleAddField}>
              اضافة اهداف
            </Button>
            {recommendation.targets ? (
              recommendation.targets.length > 0 && (
                <Button
                  type="button"
                  className="mt-3"
                  onClick={handleDeleteField}
                >
                  مسح اخر هدف
                </Button>
              )
            ) : (
              <InputGroup size="sm" className="mb-3" />
            )}{" "}
          </InputGroup>
          {/* <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />

          <br /> */}
          <Button type="submit" className="mt-3">
            نشر
          </Button>
        </Form>
      )}
    </>
  );
}
