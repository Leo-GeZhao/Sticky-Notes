import React, { useState } from "react";
import Card from "../../components/Card/Card";

import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import * as ApiService from "../../services/ApiService";

const defaultForm = {
  title: "",
  description: "",
  category: "",
};
const Landing = ({ plans, setRender }) => {
  const [deadline, setDeadline] = useState(new Date());
  const [isPriority, setIsPriority] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const { title, description, category } = formData;

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      category,
      deadline: deadline.toISOString().split("T")[0],
      is_priority: isPriority,
    };
    await ApiService.createPlan(data);
    setRender(true);
  };

  return (
    <div className="d-flex flex-row justify-content-between mt-5">
      <div className="ms-5 d-flex flex-column justify-content-center">
        <h5>Add a Plan</h5>
        <form className="form" onSubmit={handleSubmit} autoComplete="off">
          <div className="d-flex flex-column justify-content-center align-items-center ">
            <label htmlFor="category" className="mt-2">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-control m-2"
              value={category}
              onChange={handleChange}
              required
            >
              <option value={""}></option>
              <option value={"Work"}>Work</option>
              <option value={"Study"}>Study</option>
              <option value={"Life"}>Life</option>
            </select>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control m-2"
              value={title}
              onChange={handleChange}
              required
            />
            <label htmlFor="description">Description</label>
            <textarea
              type="text-area"
              name="description"
              id="description"
              className="form-control m-2"
              style={{ height: "140px" }}
              value={description}
              onChange={handleChange}
              required
            />
            <label htmlFor="description" className="mt-2">
              Deadline
            </label>
            <Calendar date={deadline} onChange={(date) => setDeadline(date)} />

            <div>
              <label htmlFor="checkbox"> is Priority? </label>
              <input
                type="checkbox"
                name="checkbox"
                className="ms-2"
                onClick={() => setIsPriority(!isPriority)}
              />
            </div>

            <input
              type="submit"
              value="Submit"
              className="btn btn-success m-3"
            />
          </div>
        </form>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {plans.map((p) => (
            <div className="col-lg">
              <Card
                title={p.title}
                desc={p.description}
                deadline={p.deadline}
                priority={p.is_priority}
                category={p.category}
                start={p.create_date}
                id={p.id}
                setRender={setRender}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
