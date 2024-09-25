/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import axiosClient from '../../axiosClientOffline';

export const EditPlan = ({ plan }) => {
  const [post, setPost] = useState({
    title: "title",
    id: plan.id,
    name: plan.name,
    nameChannel: plan.nameChannel,
    desc: plan.desc,
    discount: plan.discount,
    description: plan.plan_desc ? plan.plan_desc.map((desc) => desc.desc) : [],
    number_point: plan.number_point,
    price: plan.price,
    percentage1: plan.percentage1,
    percentage2: plan.percentage2,
    percentage3: plan.percentage3,
    telegram_id: [],
    telegram_title: [],
    number_bot:plan.number_bot,
  });
  const [telegrams, setTelegrams] = useState([]);

  const handleInputPost = (e) => {
    let value = e.target.value;
    if (e.target.name === "name") {
      const valueFinal = value.trim().replace(/\s+/g, "");
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
  const addDescription = () => {
    setPost({ ...post, description: [...post.description, ""] });
  };
  const removeDescription = (index) => {
    const newDescs = [...post.description];
    newDescs.splice(index, 1);
    setPost({ ...post, description: newDescs });
  };
  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    const selectedTitles = selectedOptions.map((option) => option.label);
    setPost((prevPost) => ({
      ...prevPost,
      telegram_id: selectedIds,
      telegram_title: selectedTitles,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(`plan/${plan.id}`, post);
      if (response.data.Massage === 'Updated Success') {
        window.location.href = '/dashboard/plans?update';
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTelegram();
    const selectedIds = plan.telegram_groups.map((telegram) => telegram.id);
    const selectedTitles = plan.telegram_groups.map((telegram) => telegram.title);
    setPost((prevPost) => ({
      ...prevPost,
      telegram_id: selectedIds,
      telegram_title: selectedTitles,
    }));

  }, []);

  const fetchTelegram = async () => {
    try {
      const response = await axiosClient.get('telegram');
      setTelegrams(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const options = telegrams.map((telegram) => ({
    value: telegram.id,
    label: telegram.title,
  }));

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Edit Plans</h3>
        <InputGroup size="sm" className="mb-3 justify-center">
          <Select
          className="my-react-select-container px-2"
          classNamePrefix="my-react-select"
            options={options}
            isMulti
            value={post.telegram_id.map((id, index) => ({
              value: id,
              label: post.telegram_title[index],
            }))}
            onChange={handleSelectChange}
            placeholder="Select telegram"
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={post.name}
            onChange={handleInputPost}
          />
        </InputGroup>
        {/* <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Description"
            name="desc"
            value={post.desc}
            onChange={handleInputPost}
          />
        </InputGroup> */}
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="number"
            placeholder="Price"
            name="price"
            value={post.price}
            onChange={handleInputPost}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="number"
            placeholder="number_bot"
            name="number_bot"
            value={post.number_bot}
            onChange={handleInputPost}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="number"
            placeholder="discount"
            name="discount"
            value={post.discount}
            onChange={handleInputPost}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="number"
            max={100}
            placeholder="Percentage level 1"
            name="percentage1"
            value={post.percentage1}
            onChange={handleInputPost}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="number"
            placeholder="Percentage level 2"
            name="percentage2"
            value={post.percentage2}
            onChange={handleInputPost}
            max={100}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            type="number"
            placeholder="Percentage level 3"
            name="percentage3"
            value={post.percentage3}
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
        <Button type="submit">Edit</Button>
      </Form>
    </>
  );
};

export default EditPlan;
