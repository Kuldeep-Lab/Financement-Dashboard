import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Dashboard";
import Expenses from "./Pages/Expenses";
import Income from "./Pages/Income";
import Reports from "./Pages/Reports";
import Insights from "./Pages/Insights";
import Transaction from "./Pages/Transaction";
import Budgets from "./Pages/Budgets";
import Setting from "./Pages/Setting";
import Help from "./Pages/Help";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Page = ({ title }) => (
  <div className="p-6 text-xl font-semibold">{title}</div>
);

function App() {

    useEffect(() => {
    AOS.init({
      duration: 1000,   // animation duration (ms)
      once: true,       // animation runs only once
      easing: "ease-in-out",
      offset: 80,      // trigger offset
    });
  }, []);

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
