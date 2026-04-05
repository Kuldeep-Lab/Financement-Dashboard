import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { FiSearch, FiMessageSquare, FiChevronDown } from "react-icons/fi";
import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar } from "recharts";
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

const dataPie = [
  { name: "Paid", value: 234, color: "#111827" },
  { name: "Overdue", value: 514, color: "#6366F1" },
  { name: "Unpaid", value: 345, color: "#E5E7EB" },
];

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

const Card = ({ title, value, change }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
    <span className="text-gray-500 text-sm">{title}</span>
    <h2 className="text-xl font-semibold">{value}</h2>
    <span
      className={`text-sm ${
        change.includes("-") ? "text-red-500" : "text-green-500"
      }`}
    >
      {change} since last week
    </span>
  </div>
);

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [editingId, setEditingId] = useState(null);
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

  const COLORS = ["#f59e0b", "#111827", "#6366F1", " #E5E7EB"];

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

const barData = Object.values(
  transactions.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = {
        category: curr.category,
        income: 0,
        expense: 0,
      };
    }

    if (curr.type === "income") {
      acc[curr.category].income += curr.amount;
    } else {
      acc[curr.category].expense += curr.amount;
    }

    return acc;
  }, {})
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

      <div className="p-5 md:p-6">
        {/* Main */}
        <div className="">
          {/* Header */}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card title="Total Balance" value={`₹${balance}`} change="+6.5%" />
            <Card title="Total Income" value={`₹${income}`} change="+2%" />
            <Card title="Total Expenses" value={`₹${expense}`} change="-1%" />
            <Card title="Savings" value={`₹${balance * 0.2}`} change="+3%" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Donut Chart */}
            <div className="bg-white p-4 rounded-xl shadow flex flex-col">
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

                {/* Legend */}
                <div className="flex flex-col gap-3 text-sm md:mt-12">
                  {categoryData.map((item) => (
                    <div key={item.name}>
                      {item.name}: ₹{item.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-4 rounded-xl shadow flex flex-col">
              <h1 className=" font-semibold mb-4 text-xl">Balance Trends</h1>

              <div className="w-full h-52">
                <ResponsiveContainer>
                  <LineChart data={dataLine}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366F1"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          {/* Insights Section */}
          <div className="bg-white rounded-xl shadow p-5 mb-6">
            <h2 className="text-xl font-semibold mb-4">Insights Overview</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 🔹 Left: Insight Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Top Category */}
                <div className="p-4 border rounded-xl">
                  <p className="text-gray-500 text-sm">Top Category</p>
                  <h3 className="text-lg font-semibold">
                    {categoryData.length > 0
                      ? categoryData.reduce((max, curr) =>
                          curr.value > max.value ? curr : max,
                        ).name
                      : "-"}
                  </h3>
                </div>

                {/* Total Transactions */}
                <div className="p-4 border rounded-xl">
                  <p className="text-gray-500 text-sm">Transactions</p>
                  <h3 className="text-lg font-semibold">
                    {transactions.length}
                  </h3>
                </div>

                {/* Savings Rate */}
                <div className="p-4 border rounded-xl col-span-2">
                  <p className="text-gray-500 text-sm">Savings Rate</p>
                  <h3 className="text-lg font-semibold">
                    {income > 0 ? ((balance / income) * 100).toFixed(1) : 0}%
                  </h3>
                </div>
              </div>

              {/* 🔹 Right: Bar Chart */}
              <div className="w-full h-72">
                <ResponsiveContainer>
                  <BarChart data={barData} barGap={8}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="category" tick={{ fontSize: 12 }} />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        
                      }}
                    />

                    {/* Income */}
                    <Bar dataKey="income" fill="#10B981" radius={[6, 6, 0, 0]} />

                    {/* Expense */}
                    <Bar dataKey="expense" fill="#EF4444" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
            <h3 className="font-semibold text-xl mb-4">Transactions</h3>

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

                      {/* CATEGORY */}
                      <td className="px-2">
                        {editingId === t.id ? (
                          <input
                            value={editData.category}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                category: e.target.value,
                              })
                            }
                            className="border px-2 py-1 rounded"
                          />
                        ) : (
                          t.category
                        )}
                      </td>

                      {/* AMOUNT */}
                      <td className="px-2 font-medium">
                        {editingId === t.id ? (
                          <input
                            type="number"
                            value={editData.amount}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                amount: Number(e.target.value),
                              })
                            }
                            className="border px-2 py-1 rounded"
                          />
                        ) : (
                          `₹${t.amount}`
                        )}
                      </td>

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
                        <td className="px-2 space-x-2">
                          {editingId === t.id ? (
                            <>
                              <button
                                onClick={() => {
                                  setTransactions((prev) =>
                                    prev.map((item) =>
                                      item.id === t.id
                                        ? { ...item, ...editData }
                                        : item,
                                    ),
                                  );
                                  setEditingId(null);
                                }}
                                className="text-green-500 font-medium"
                              >
                                Save
                              </button>

                              <button
                                onClick={() => setEditingId(null)}
                                className="text-gray-500"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingId(t.id);
                                setEditData(t);
                              }}
                              className="text-blue-500 font-medium"
                            >
                              Edit
                            </button>
                          )}
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
    </>
  );
}
