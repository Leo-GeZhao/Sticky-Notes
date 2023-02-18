import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as ApiService from "../../services/ApiService";
import Work from "../../img/Work.webp";
import Study from "../../img/Study.webp";
import EditPlanModel from "../../components/EditPlanModal/EditPlanModel";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const Plan = ({ setRender, render }) => {
  const [plan, setPlan] = useState(null);
  const [newProgress, setNewProgress] = useState("");
  const [progress, setProgress] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const params = useParams();

  const findImg = (category) => {
    return category === "Work" ? Work : category === "Study" ? Study : "";
  };

  useEffect(
    function () {
      const getPlan = async () => {
        const plan = await ApiService.getPlan(params.id);

        setPlan(plan.data);
      };
      getPlan();
      setRender(false);
    },
    [render]
  );

  useEffect(
    function () {
      const getProgress = async () => {
        const progress = await ApiService.getProgress(params.id);

        setProgress(progress.data);
      };
      getProgress();
      setRender(false);
    },
    [render]
  );

  const handleAddProgress = async (e) => {
    e.preventDefault();
    const data = {
      progress: newProgress,
      plan: plan.id,
    };
    await ApiService.addProgress(data);
    setNewProgress("");
    setRender(true);
  };

  return (
    <div className="d-flex justify-content-around align-items-center">
      <div className="d-felx flex-column mt-3">
        <div>
          <h5>Add Progress</h5>
        </div>
        <div>
          <form
            className="form"
            onSubmit={(e) => handleAddProgress(e)}
            autoComplete="off"
          >
            <div className="d-flex flex-column justify-content-center align-items-center ">
              <label htmlFor="newProgress"></label>
              <input
                type="text"
                name="newProgress"
                id="newProgress"
                className="form-control m-2"
                value={newProgress}
                onChange={(e) => setNewProgress(e.target.value)}
                required
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-success m-3"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center mt-3">
        {plan && (
          <div className="card text-center" style={{ width: "712px" }}>
            <div className="card-header">
              <h3>{plan.title}</h3>
            </div>
            <img
              src={findImg(plan.category)}
              alt=""
              className="mx-auto d-block"
              style={{ height: "400px", width: "710px" }}
            />
            <div className="card-body mt-1">
              <p className="ccard-title">{plan.description}</p>
              <p className="card-text">
                <small class="text-muted"> Deadline: {plan.deadline}</small>
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setModalOpen(true)}
              >
                Edit Plan
              </button>
              <EditPlanModel
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={plan.title}
                id={params.id}
                setRender={setRender}
              />
            </div>
            <div className="card-footer text-muted">
              <small>Created on : {plan.create_date}</small>
            </div>
          </div>
        )}
        <div className="mt-1">
          {progress &&
            progress.map((p) => (
              <ProgressBar
                progress={p.progress}
                complete={p.is_complete}
                date={p.create_date}
                id={p.id}
                setRender={setRender}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Plan;
