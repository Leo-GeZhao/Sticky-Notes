import axios from "axios";

export const getPlans = async () => {
  return await axios.get("http://localhost:8000/api/plans");
};

export const createPlan = async (data) => {
  return await axios.post("http://localhost:8000/api/create-plan", data);
};

export const getPlan = async (id) => {
  return await axios.get(`http://localhost:8000/api/plan/${id}`);
};

export const editPlan = async (id, data) => {
  return await axios.put(`http://localhost:8000/api/plan/${id}`, data);
};

export const deletePlan = async (id) => {
  return await axios.delete(`http://localhost:8000/api/plan/${id}`);
};

export const archivePlan = async (id) => {
  return await axios.put(`http://localhost:8000/api/plan/${id}`);
};
