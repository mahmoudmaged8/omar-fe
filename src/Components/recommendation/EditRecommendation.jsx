/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import Select from "react-select";
import axiosClient from "../../axiosClientOffline";
import axiosClientImage from "../../axios_img_offline";

const EditRecommendation = ({ recommendation, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(recommendation.title);
  const [id] = useState(recommendation.id);
  const [errorMessage, setErrorMessage] = useState("");
  const [currency, setCurrency] = useState(recommendation.currency);
  const [images, setImages] = useState([]);
  const [img] = useState(recommendation.target.map((target) => target.target));
  const [description, setDescription] = useState(recommendation.desc);
  // const [entryPrice, setEntryPrice] = useState(recommendation.entry_price);
  // const [stopPrice, setStopPrice] = useState(recommendation.stop_price);
  const [recommendations, setRecommendation] = useState({
    id: recommendation.id,
    title: title,
    currency: currency,
    desc: description,
    // target: img,
    // video: images,
    // entry_price: entryPrice,
    // stop_price: stopPrice,
    // planes_id: 0,
    totalPlan: [],
    user_id: localStorage.getItem("user_id"),
    // number_show: 0,
    plan_title: [],
    // targets: [],
  });
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans2();
    const selectedIds = recommendation.plan.map((plans) => plans.id);
    const selectedTitles = recommendation.plan.map((plans) => plans.name);
    setRecommendation((prevPost) => ({
      ...prevPost,
      totalPlan: selectedIds,
      plan_title: selectedTitles,
    }));
    const selectedTarget = recommendation.target.map((target) => target.target);
    setRecommendation((prevPost) => ({
      ...prevPost,
      targets: selectedTarget,
    }));
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axiosClient.get("adminPlan");
      setPlans(response.data.data);
    } catch (err) {
      console.log(err);
    }finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    const selectedTitles = selectedOptions.map((option) => option.label);
    setRecommendation((prevPost) => ({
      ...prevPost,
      totalPlan: selectedIds,
      plan_title: selectedTitles,
    }));
  };

  const options = plans.map((plan) => ({
    value: plan.id,
    label: plan.name,
  }));

  const fetchPlans2 = async () => {
    try {
      const response = await axiosClient.get("plan");
      setPlans(response.data.data);
    } catch (err) {
      console.log(err);
      fetchPlans();
    }finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (images>0) {
      const formData = new FormData();
      images.forEach((img) => {
        formData.append('img[]', img);
      });
      formData.append('title', recommendations.title);
      formData.append('desc', recommendations.desc);
      recommendations.totalPlan.forEach((plan) => {
        formData.append('totalPlan[]', plan);
      });
      formData.append('user_id', localStorage.getItem('user_id'));
      formData.append('currency', recommendations.currency);
      // formData.append('planes_id', 1);
      formData.append('targets', JSON.stringify(recommendations.targets));
      try {
         await axiosClientImage.post("Recommendation", formData);
      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false);
      }
    }else{
    try {
      const response = await axiosClient.put(`Recommendation/${id}`, recommendations);
      if (response.data.success === false) {
        setErrorMessage(response.data.message);
      } else {
        window.location.href = "/dashboard/recommendation?success=1";
      }
      if (response.data.message === "Recommendation updated successfully") {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
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
      <Form className="p-0">
        <InputGroup size="sm" className="mb-3 justify-center">
          <Select
          className="my-react-select-container px-2"
          classNamePrefix="my-react-select"
            options={options}
            isMulti
            value={recommendations.totalPlan.map((id, index) => ({
              value: id,
              label: recommendations.plan_title[index],
            }))}
            onChange={handleSelectChange}
            placeholder="Select plans"
          />
        </InputGroup>
        <Form.Group className="mb-3 w-80">
          <Form.Control
            type="text"
            value={title}
            placeholder="عنوان النصيحة"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="اسم العملة"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            maxLength={10}
            required
          />
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="قيمة العملة"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
          />
        </Form.Group> */}
        {/* <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="توقف الخسارة"
            value={stopPrice}
            onChange={(e) => setStopPrice(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group className="mb-3 w-80">
          <Form.Control
            as="textarea"
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        {/* {recommendations.targets.map((field, index) => (
          <InputGroup size="sm" className="mb-3" key={index} id={index + 1}>
            <Form.Control
              type="text"
              placeholder="الاهداف"
              name="target"
              value={field.targets ? field.targets : field}
              onChange={(e) => handleInputPost(e, index)}
            />
          </InputGroup>
        ))} */}
        {/* <InputGroup size="sm" className="mb-3 justify-center">
          <Button type="button" className="mt-3" onClick={handleAddField}>
            اضافة اهداف
          </Button>
          {recommendations.targets.length > 0 && (
            <Button type="button" className="mt-3" onClick={handleDeleteField}>
              مسح اخر هدف
            </Button>
          )}
        </InputGroup> */}
         {img ? (
                    <div className="d-flex flex-col">
                      {img.map((item, index) => (
                       <div key={index +1}>
                         <img
                        src={`${axiosClientImage.defaults.baseURL}Advice/${item}`}
                        alt={"No Photo"}
                        style={{ width: "10rem", cursor: "pointer" }}
                      />
                       </div>
                      ))}
                    </div>
                  ) : (
                    null
                  )}
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        <Button type="button" className="mt-3" onClick={handleUpdate}>
            Update
          </Button>
      </Form>
    )}
    </>
  );
};

export default EditRecommendation;
