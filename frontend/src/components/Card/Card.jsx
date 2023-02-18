import React, { useState } from "react";
import Work from "../../img/Work.webp";
import Study from "../../img/Study.webp";
import { Link } from "react-router-dom";

import * as ApiService from "../../services/ApiService";

const Card = ({
  category,
  title,
  deadline,
  desc,
  priority,
  id,
  setRender,
  archive,
}) => {
  const [progress, setProgress] = useState("");
  const findImg = (category) => {
    return category === "Work" ? Work : category === "Study" ? Study : "";
  };

  const handleDetail = async () => {
    await ApiService.getPlan(id);
  };

  const handleDelete = async () => {
    await ApiService.deletePlan(id);
    setRender(true);
  };

  const handleToggleArchive = async () => {
    const data = {
      description: desc,
      category,
      deadline,
      title,
      is_archived: archive ? false : true,
    };
    await ApiService.editPlan(id, data);
    setRender(true);
  };

  const handleGetProgress = async () => {
    const progress = await ApiService.getProgress(id);
    setProgress(progress.data);
  };

  const handlePrioritize = async () => {
    const data = {
      description: desc,
      category,
      deadline,
      title,
      is_archived: archive,
      is_priority: priority ? false : true,
    };
    await ApiService.editPlan(id, data);
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
        <h5 className="card-text">
          {desc}{" "}
          {priority && (
            <span
              className="badge rounded-pill text-bg-danger"
              style={{ fontSize: "12px" }}
            >
              Priority
            </span>
          )}
        </h5>

        <p className="card-text">
          <small className="text-muted">{deadline}</small>
        </p>

        {!archive ? (
          <div className="d-flex flex-column align-items-start">
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
              <button
                className="btn btn-primary me-1 btn-sm"
                type="button"
                onClick={() => handleToggleArchive()}
              >
                Archive
              </button>
            </div>
            <div className="btn-group mt-1">
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handlePrioritize()}
                >
                  Prioritize
                </button>
              </div>
              <div class="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle btn-sm ms-1"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => handleGetProgress()}
                >
                  Progress
                </button>
                <ul class="dropdown-menu">
                  {progress &&
                    progress.map((p) => (
                      <li
                        className={`p-1 ${
                          p.is_complete ? "text-success" : "text-danger"
                        }`}
                      >
                        {p.progress}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-primary me-1 btn-sm"
              type="button"
              onClick={() => handleToggleArchive()}
            >
              Unarchive
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
