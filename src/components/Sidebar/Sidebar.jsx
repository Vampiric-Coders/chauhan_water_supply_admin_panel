import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiUsers,
  FiGrid,
  FiFileText,
  FiSettings,
  FiMenu,
  FiX
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {

  const menu = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Users", icon: <FiUsers />, path: "/users" },
    { name: "Societies", icon: <FiGrid />, path: "/societies" },
    { name: "Reports", icon: <FiFileText />, path: "/reports" },
    { name: "Settings", icon: <FiSettings />, path: "/settings" },
  ];

  return (
    <>

      {/* ----------- MOBILE TOP NAV ---------- */}
      {/* <div className="md:hidden mt-[1.6rem] ml-3">
  

        <button onClick={() => setOpen(true)}>
          <FiMenu size={26} />
        </button>
      </div> */}


      {/* ----------- DARK OVERLAY ---------- */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ----------- DESKTOP SIDEBAR ---------- */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm z-50">
        <SidebarContent />
      </div>


      {/* ----------- MOBILE SIDEBAR ---------- */}
    {/* ----------- MOBILE SIDEBAR ---------- */}
<motion.div
  initial={{ x: -260 }}
  animate={{ x: open ? 0 : -260 }}
  transition={{ duration: 0.25 }}
  className="
    fixed 
    top-0 left-0 
    h-screen w-64 
    bg-white 
    border-r 
    shadow-xl 
    z-50 
    md:hidden
    overflow-y-auto
  "
>
  <SidebarContent close={() => setOpen(false)} />
</motion.div>


    </>
  );
}


function SidebarContent({ close }) {

  const menu = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Users", icon: <FiUsers />, path: "/users" },
    { name: "Societies", icon: <FiGrid />, path: "/societies" },
    { name: "Reports", icon: <FiFileText />, path: "/reports" },
    { name: "Settings", icon: <FiSettings />, path: "/settings" },
        { name: "Manage Orders", icon: <FiSettings />, path: "/orders" },
  ];

  return (
    <>
      {/* Header */}
      <div className="p-5 text-xl font-bold flex justify-between items-center">
        {/* <div>
          AquaPure
          <p className="text-sm text-gray-500 font-normal">Admin Panel</p>
        </div> */}

        {/* close only in mobile */}
        {close && (
          <button onClick={close} className="md:hidden">
            <FiX size={22} />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-2 space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={close}
            className={({ isActive }) =>
              `flex gap-3 items-center px-5 py-3 text-gray-700 
              hover:bg-blue-50 hover:text-blue-600
              ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""}`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
