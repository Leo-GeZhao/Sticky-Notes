import React, { useState } from "react";
import Modal from "react-modal";

import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import * as ApiService from "../../services/ApiService";

const customStyles = {
  content: {
    top: "20%",
    borderRadius: "1rem",
    padding: "2rem 1rem",
  },
};

const defaultState = {
  description: "",
  category: "",
};

const EditPlanModel = ({ isOpen, onClose, title, id, setRender }) => {
  const [formData, setFormData] = useState(defaultState);
  const [deadline, setDeadline] = useState(new Date());
  const { description, category } = formData;

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      description,
      category,
      deadline: deadline.toISOString().split("T")[0],
      title,
    };
    await ApiService.editPlan(id, data);
    onClose();
    setRender(true);
    setFormData(defaultState);
  };

  return (
    <div className="">
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <form onSubmit={handleSubmit} className="form">
          <h3>{title}</h3>
          <label htmlFor="description" className="my-2">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            value={description}
            name="description"
            style={{ height: "140px" }}
            onChange={handleChange}
          />
          <div>
            {/* <Calendar date={deadline} onChange={(date) => setDeadline(date)} /> */}
            <Calendar date={deadline} onChange={(date) => setDeadline(date)} />
          </div>
          <div>
            <label htmlFor="category" className="mt-2">
              Category
            </label>
            <select
              name="category"
              id=""
              className="mt-2 form-control"
              value={category}
              onChange={handleChange}
            >
              <option value={""}></option>
              <option value={"Work"}>Work</option>
              <option value={"Study"}>Study</option>
              <option value={"Life"}>Life</option>
            </select>
          </div>
          <button className="btn btn-primary mt-2">Edit Event</button>
        </form>
      </Modal>
    </div>
  );
};

export default EditPlanModel;
