import axios from "axios";

export const getPlans = async () => {
  return await axios.get("http://localhost:8000/api/plans/");
};

export const createPlan = async (data) => {
  return await axios.post("http://localhost:8000/api/create-plan/", data);
};

export const getPlan = async (id) => {
  return await axios.get(`http://localhost:8000/api/plan/${id}/`);
};

export const editPlan = async (id, data) => {
  return await axios.put(`http://localhost:8000/api/plan/${id}/`, data);
};

export const deletePlan = async (id) => {
  return await axios.delete(`http://localhost:8000/api/plan/${id}/`);
};

//Progress

export const addProgress = async (data) => {
  return await axios.post(`http://localhost:8000/api/add-progress/`, data);
};

export const getProgress = async (id) => {
  return await axios.get(`http://localhost:8000/api/plan/${id}/progress/`);
};

export const deleteProgress = async (id) => {
  return await axios.delete(
    `http://localhost:8000/api/progress/${id}/delete-progress/`
  );
};

export const toggleProgress = async (id, data) => {
  return await axios.put(
    `http://localhost:8000/api/progress/${id}/toggle-completion/`,
    data
  );
};
