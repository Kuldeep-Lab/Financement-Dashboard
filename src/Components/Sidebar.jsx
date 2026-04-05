import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {
  FiGrid,
  FiBox,
  FiShoppingBag,
  FiMessageSquare,
  FiBarChart2,
  FiFileText,
  FiCalendar,
  FiDollarSign,
  FiHelpCircle,
  FiSettings,
  FiLogOut,
  FiChevronLeft,

  FiRepeat,
  FiTrendingUp,
  FiTrendingDown,
  FiPieChart,
  FiActivity,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

// const menuItems = [
//   { name: "Dashboard", icon: FiGrid, path: "/" },
//   { name: "Products", icon: FiBox, path: "/products" },
//   { name: "Store", icon: FiShoppingBag, path: "/store" },
//   { name: "Messages", icon: FiMessageSquare, path: "/messages" },
//   { name: "Statistics", icon: FiBarChart2, path: "/statistics" },
//   { name: "Invoices", icon: FiFileText, path: "/invoices" },
//   { name: "To Do List", icon: FiCalendar, path: "/todo" },
//   { name: "Finances", icon: FiDollarSign, path: "/finances" },
// ];

const menuItems = [
  { name: "Dashboard", icon: FiGrid, path: "/" },
  { name: "Transactions", icon: FiRepeat, path: "/transactions" },
  { name: "Income", icon: FiTrendingUp, path: "/income" },
  { name: "Expenses", icon: FiTrendingDown, path: "/expenses" },
  { name: "Budgets", icon: FiPieChart, path: "/budgets" },
  { name: "Reports", icon: FiBarChart2, path: "/reports" },
  { name: "Insights", icon: FiActivity, path: "/insights" },
  // { name: "Settings", icon: FiSettings, path: "/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false); // desktop
  const [isOpen, setIsOpen] = useState(false); // mobile

  // 🔥 Auto close when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* 🔹 Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 z-50 h-full bg-[#0f172a] text-white flex flex-col
          transition-all duration-300

          ${collapsed ? "md:w-20" : "md:w-64"}
          w-64

          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-semibold">DASHBOARD</h1>
              <p className="text-xs text-gray-300 mt-2">Finances Dashboard</p>
            </div>
          )}

          {/* Collapse button (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block"
          >
            <FiChevronLeft
              className={`transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 px-2 py-4 overflow-y-auto">
          <p className="text-gray-400 text-xs mb-2 px-3">
            {!collapsed && "MAIN MENU"}
          </p>

          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)} // ✅ auto close on mobile
                className={({ isActive }) =>
                  `flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } px-3 py-2 rounded-lg mb-2 transition ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`
                }
              >
                <Icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}

          {/* Support */}
          <div className="mt-8  border-t border-t-gray-700">

          
          <p className="text-gray-400 text-xs mt-6 mb-2 px-3">
            {!collapsed && "HELP & SUPPORT"}
          </p>

          <NavLink
            to="/help"
            onClick={() => setIsOpen(false)}
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800`}
          >
            <FiHelpCircle size={20} />
            {!collapsed && <span>Help Center</span>}
          </NavLink>

          <NavLink
            to="/settings"
            onClick={() => setIsOpen(false)}
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800`}
          >
            <FiSettings size={20} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
          </div>
        </div>

        {/* Logout */}
        <div className="p-3 border-t border-gray-700">
          <button
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800`}
          >
            <FiLogOut size={20} />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
    fixed bottom-4 left-4 z-60 md:hidden
    bg-gray-900/60 text-white
    p-2 rounded-lg shadow-md
    flex items-center justify-center
    transition-all duration-300
    hover:scale-105 active:scale-95
  "
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>
    </>
  );
};

export default Sidebar;
