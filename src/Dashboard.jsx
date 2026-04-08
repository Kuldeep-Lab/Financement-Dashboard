import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { FiSearch, FiMessageSquare, FiChevronDown } from "react-icons/fi";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { HiOutlineSearch } from "react-icons/hi";

const dataLine = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 6000 },
  { name: "Mar", value: 4500 },
  { name: "Apr", value: 5000 },
  { name: "May", value: 7000 },
  { name: "Jun", value: 5200 },
  { name: "Jul", value: 6500 },
  { name: "Aug", value: 5200 },
  { name: "Sep", value: 6000 },
  { name: "Oct", value: 6100 },
  { name: "Nov", value: 6000 },
  { name: "Dec", value: 4000 },
];


const Card = ({ title, value, change, aos, delay }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value);
    if (start === end) return;

    const duration = 1000; // animation duration (ms)
    const incrementTime = 16; // ~60fps
    const step = end / (duration / incrementTime);

    const counter = setInterval(() => {
      start += step;

      if (start >= end) {
        setDisplayValue(end);
        clearInterval(counter);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div
      data-aos={aos}
      data-aos-delay={delay}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col gap-2"
    >
      <span className="text-gray-500 text-sm">{title}</span>

      {/* 👇 animated value */}
      <h2 className="text-xl font-semibold">
        ₹{displayValue.toLocaleString()}
      </h2>

      <span
        className={`text-sm ${
          change.includes("-") ? "text-red-500" : "text-green-500"
        }`}
      >
        {change} since last week
      </span>
    </div>
  );
};

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [editData, setEditData] = useState({});

  // navbar code
  const [role, setRole] = useState("Viewer");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // navbar code ends
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowForm(false);
        setShowEditModal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const [showForm, setShowForm] = useState(false);

  const [newTransaction, setNewTransaction] = useState({
    date: "",
    category: "",
    amount: "",
    type: "expense",
  });

  const handleAddTransaction = () => {
    if (
      !newTransaction.date ||
      !newTransaction.category ||
      !newTransaction.amount
    ) {
      alert("Please fill all fields");
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...newTransaction,
      amount: Number(newTransaction.amount),
    };

    setTransactions((prev) => [newEntry, ...prev]);

    // reset form
    setNewTransaction({
      date: "",
      category: "",
      amount: "",
      type: "expense",
    });

    setShowForm(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowForm(false);
    };

    if (showForm) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [showForm]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2026-04-01",
      category: "Food",
      amount: 500,
      type: "expense",
    },
    {
      id: 2,
      date: "2026-04-02",
      category: "Salary",
      amount: 20000,
      type: "income",
    },
    {
      id: 3,
      date: "2026-04-03",
      category: "Travel",
      amount: 1500,
      type: "expense",
    },
    {
      id: 4,
      date: "2026-04-04",
      category: "Shopping",
      amount: 3000,
      type: "expense",
    },
  ]);

  const filteredTransactions = transactions
    .filter((t) => (filterType === "all" ? true : t.type === filterType))
    .filter((t) => t.category.toLowerCase().includes(search.toLowerCase()));

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  // category chart
  const COLORS = ["#f59e0b", "#111827", "#306EFF", " #E5E7EB"];

  const categoryData = Object.values(
    transactions.reduce((acc, curr) => {
      if (curr.type === "expense") {
        if (!acc[curr.category]) {
          acc[curr.category] = {
            name: curr.category,
            value: 0,
            color: COLORS[Object.keys(acc).length % COLORS.length],
          };
        }
        acc[curr.category].value += curr.amount;
      }
      return acc;
    }, {}),
  );

  return (
    <>
      {/* navbar  */}
      <div className="w-full bg-white border-b border-gray-200 px-6 md:px-10 py-5 flex items-center justify-between">
        {/* 🔹 Left Section */}
        <div>
          <h1 className="text-lg md:text-xl font-medium text-gray-800">
            Welcome Back
          </h1>
        </div>

        {/* 🔹 Right Section */}
        <div className="flex items-center gap-6">
          {/* Divider */}
          <div className="h-6 w-px bg-gray-300" />

          {/* Icons */}
          <FiMessageSquare
            className="text-gray-600 cursor-pointer hidden md:block"
            size={20}
          />
          <FiBell
            className="text-gray-600 cursor-pointer hidden md:block"
            size={20}
          />

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            {/* Trigger */}
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <span className="text-sm font-medium text-gray-700">{role}</span>
              <FiChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                {["Admin", "Viewer"].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setRole(item);
                      setOpen(false);
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      role === item ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* navbar end */}

      <div className="p-3 md:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-6">
          <Card
            title="Total Balance"
            value={balance}
            change="+6.5%"
            aos="zoom-in"
          />
          <Card
            title="Total Income"
            value={income}
            change="+2%"
            aos="zoom-in"
            delay={150}
          />
          <Card
            title="Total Expenses"
            value={expense}
            change="-1%"
            aos="zoom-in"
            delay={300}
          />
          <Card
            title="Savings"
            value={balance * 0.2}
            change="+3%"
            aos="zoom-in"
            delay={500}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-16 mb-6">
          {/* Donut Chart */}
          <div
            data-aos="zoom-in"
              data-aos-delay="200"
            className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex flex-col"
          >
            {/* Heading */}
            <h1 className="text-xl font-semibold mb-4">Spending Breakdown</h1>

            {/* Content */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              {/* Chart */}
              <div className="w-full md:w-1/2 h-52">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* info */}
              <div className="flex flex-col gap-3 text-sm md:mt-12">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    {/* 🔹 Color Dot */}
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>

                    {/* 🔹 Label */}
                    <span>
                      {item.name}: ₹{item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-md flex flex-col"
          >
            <h1 className="font-semibold mb-4 text-xl">Balance Trends</h1>

            <div className="w-full h-55">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataLine}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <Tooltip />

                  {/* 🔥 animated line */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366F1"
                    strokeWidth={2}
                    isAnimationActive={true}
                    animationDuration={800}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Insights Section */}
        <div className="bg-white rounded-xl shadow-md p-4 mt-10 mb-6">
          <h2 className="text-xl font-semibold mb-4">Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {/* Highest Expense Category */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <p className="text-gray-500">Top Spending Category</p>
              <h3 className="font-semibold text-lg">
                {
                  categoryData.reduce((max, curr) =>
                    curr.value > max.value ? curr : max,
                  ).name
                }
              </h3>
            </div>

            {/* Total Transactions */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <p className="text-gray-500">Total Transactions</p>
              <h3 className="font-semibold text-lg">{transactions.length}</h3>
            </div>

            {/* Savings Rate */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <p className="text-gray-500">Savings Rate</p>
              <h3 className="font-semibold text-lg">
                {income > 0 ? ((balance / income) * 100).toFixed(1) : 0}%
              </h3>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md p-4 mt-10 overflow-x-auto">
          <div className="flex justify-between">
            <h3 className="font-semibold text-xl mb-4">Transactions</h3>

            {role === "Admin" && (
              <div className="mb-4 flex justify-end">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 text-sm md:text-lg py-2 rounded-lg"
                >
                  Add Transaction
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="md:hidden flex flex-col gap-3">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t, i) => (
                <div
                  key={t.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  {/* Top Row */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">#{i + 1}</span>
                    <span
                      className={`text-sm font-medium ${
                        t.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {t.type}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1 text-sm">
                    <div>
                      <span className="text-gray-500">Date: </span>
                      {t.date}
                    </div>

                    <div>
                      <span className="text-gray-500">Category: </span>
                      {t.category}
                    </div>

                    <div className="font-medium">
                      <span className="text-gray-500">Amount: </span>₹{" "}
                      {t.amount}
                    </div>
                  </div>

                  {/* Actions */}
                  {role === "Admin" && (
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => {
                          setEditData(t);
                          setShowEditModal(true);
                        }}
                        className="text-blue-500 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-5 text-gray-500">
                No transactions found
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <table className="w-full text-sm text-left border-collapse">
              {/* Header */}
              <thead>
                <tr className="text-gray-500 border-b border-b-gray-300">
                  <th className="py-3 px-2">No</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2">Type</th>
                  {role === "Admin" && <th className="py-3 px-2">Actions</th>}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((t, i) => (
                    <tr
                      key={t.id}
                      className="border-b border-b-gray-300 hover:bg-gray-50 transition"
                    >
                      <td className="py-5 px-2">{i + 1}</td>

                      <td className="px-2 text-gray-500">{t.date}</td>

                      <td className="px-2">{t.category}</td>

                      <td className="px-2 font-medium">₹{t.amount}</td>

                      {/* TYPE */}
                      <td
                        className={`px-2 font-medium ${
                          t.type === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {t.type}
                      </td>

                      {/* ✅ ACTIONS COLUMN */}
                      {role === "Admin" && (
                        <td className="px-2">
                          <button
                            onClick={() => {
                              setEditData(t);
                              setShowEditModal(true);
                            }}
                            className="text-blue-500 font-medium"
                          >
                            Edit
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={role === "Admin" ? 6 : 5}
                      className="text-center py-5 text-gray-500"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* modal */}
      {showForm && role === "Admin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 🔹 Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowForm(false)}
          />

          {/* 🔹 Modal */}
          <div className="relative bg-white w-full mx-5 max-w-lg rounded-xl shadow-xl p-6 z-10 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Transaction</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
                className="border border-gray-300 p-2 rounded"
              />

              <input
                type="text"
                placeholder="Category"
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 rounded"
              />

              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 rounded"
              />

              <select
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    type: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 rounded"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleAddTransaction}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* edit modal */}
      {showEditModal && role === "Admin" && (
        <div className="fixed inset-0 z-50 flex items-center  justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowEditModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white w-full max-w-lg mx-5 rounded-xl shadow-xl p-6 z-10 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Transaction</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={editData.date || ""}
                onChange={(e) =>
                  setEditData({ ...editData, date: e.target.value })
                }
                className="border border-gray-300 p-2 rounded"
              />

              <input
                type="text"
                placeholder="Category"
                value={editData.category || ""}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
                className="border border-gray-300 p-2 rounded"
              />

              <input
                type="number"
                placeholder="Amount"
                value={editData.amount || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    amount: Number(e.target.value),
                  })
                }
                className="border border-gray-300 p-2 rounded"
              />

              <select
                value={editData.type || "expense"}
                onChange={(e) =>
                  setEditData({ ...editData, type: e.target.value })
                }
                className="border border-gray-300 p-2 rounded"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setTransactions((prev) =>
                    prev.map((item) =>
                      item.id === editData.id ? editData : item,
                    ),
                  );
                  setShowEditModal(false);
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
