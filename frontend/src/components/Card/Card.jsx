import React from "react";
import Work from "../../img/Work.webp";
import Study from "../../img/Study.webp";
import { Link } from "react-router-dom";

import * as ApiService from "../../services/ApiService";

const Card = ({
  category,
  title,
  start,
  deadline,
  desc,
  priority,
  id,
  setRender,
}) => {
  const findImg = (category) => {
    return category === "Work" ? Work : category === "Study" ? Study : "";
  };

  const handleDetail = async () => {
    const plan = await ApiService.getPlan(id);
    console.log(plan);
  };

  const handleDelete = async () => {
    await ApiService.deletePlan(id);
    setRender(true);
  };
  return (
    <div className="card mb-4 align-items-start" style={{ width: "18rem" }}>
      <img
        src={findImg(category)}
        alt=""
        className="card-img-top"
        style={{ height: "160px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column align-items-start">
        <h5 className="card-title">
          {" "}
          {title} {priority ? "yes" : "no"}
        </h5>
        <p className="card-text">{desc}</p>
        <p className="card-text">
          <small className="text-muted">{deadline}</small>
        </p>
        <div className="btn-group" role="group" aria-label="">
          <Link
            className="btn btn-primary me-1 btn-sm"
            type="button"
            onClick={() => handleDetail()}
            to={`/${id}`}
          >
            Detail
          </Link>
          <button
            className="btn btn-primary me-1 btn-sm"
            type="button"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
          <button className="btn btn-primary me-1 btn-sm" type="button">
            Archive
          </button>
        </div>
        <div class="dropdown">
          <button
            className="btn btn-primary dropdown-toggle mt-1 btn-sm"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Progress
          </button>
          <ul class="dropdown-menu">
            <li>
              <Link class="dropdown-item" href="#">
                Action
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" href="#">
                Another action
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" href="#">
                Something else here
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
