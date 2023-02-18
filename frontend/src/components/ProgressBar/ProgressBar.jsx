import React from "react";
import { useParams } from "react-router-dom";
import * as ApiService from "../../services/ApiService";

const ProgressBar = ({ progress, complete, date, id, setRender }) => {
  const params = useParams();
  const handleDelete = async () => {
    await ApiService.deleteProgress(id);
    setRender(true);
  };

  const handleToggleCompletion = async () => {
    const data = {
      progress,
      create_date: date,
      plan: params.id,
      is_complete: complete ? false : true,
    };
    await ApiService.toggleProgress(id, data);
    setRender(true);
  };

  return (
    <div className="card mt-3">
      <div className="card-body d-flex justify-content-around">
        <div>
          <h5 className="card-title">{progress}</h5>
          <p className="card-text text-muted">
            <small>Created on : {date}</small>{" "}
          </p>
        </div>
        <div className="btn-group" role="group">
          {complete ? (
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => handleToggleCompletion()}
            >
              Completed
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleToggleCompletion()}
            >
              In Progress
            </button>
          )}
          <button
            type="button"
            className="btn btn-primary btn-sm ms-1"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
