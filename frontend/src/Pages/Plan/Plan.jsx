import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as ApiService from "../../services/ApiService";
import Work from "../../img/Work.webp";
import Study from "../../img/Study.webp";
import EditPlanModel from "../../components/EditPlanModal/EditPlanModel";

const Plan = ({ setRender, render }) => {
  const [plan, setPlan] = useState(null);
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

  return (
    <div className="d-flex justify-content-center mt-3">
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
            <small>Created on :{plan.create_date}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
