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

const Page = ({ title }) => (
  <div className="p-6 text-xl font-semibold">{title}</div>
);

function App() {
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
