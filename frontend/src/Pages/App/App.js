import { useEffect, useState } from "react";
import * as ApiService from "../../services/ApiService";
import { Routes, Route } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Landing from "../Landing/Landing";
import Plan from "../Plan/Plan";
import Archive from "../Archive/Archive";
import "./App.css";

function App() {
  const [plans, setPlans] = useState([]);
  const [archives, setArchives] = useState([]);
  const [render, setRender] = useState(false);
  useEffect(
    function () {
      const getPlan = async () => {
        const plans = await ApiService.getPlans();
        setPlans(plans.data.filter((p) => p.is_archived === false));
        setArchives(plans.data.filter((p) => p.is_archived === true));
        setRender(false);
      };
      getPlan();
    },
    [render]
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <main className="App">
        <div>
          <Routes>
            <Route
              path="/"
              element={<Landing plans={plans} setRender={setRender} />}
            />
            <Route
              path="/archives"
              element={<Archive archives={archives} setRender={setRender} />}
            />
            <Route
              path="/:id"
              element={<Plan setRender={setRender} render={render} />}
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
