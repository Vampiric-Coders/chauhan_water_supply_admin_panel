import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Edit2, Trash } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [filterSociety, setFilterSociety] = useState("");
  const [form, setForm] = useState({
    id: null,
    name: "",
    phone: "",
    societyId: "",
    societyName: "",
    address: "",
    flat: "",
  });

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setSocieties(JSON.parse(localStorage.getItem("societies")) || []);
  }, []);

  const saveUsers = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  };

  /* ---------------- SOCIETY CHANGE ---------------- */
  const handleSocietyChange = (e) => {
    const selectedId = e.target.value;
    const soc = societies.find((s) => s.id === Number(selectedId));

    setForm({
      ...form,
      societyId: selectedId,
      societyName: soc?.name || "",
      address: soc?.address || "",
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.societyId || !form.flat) return;

    let updated;
    if (form.id) {
      updated = users.map((u) => (u.id === form.id ? form : u));
    } else {
      updated = [...users, { ...form, id: Date.now() }];
    }

    setUsers(updated);
    saveUsers(updated);
    setForm({
      id: null,
      name: "",
      phone: "",
      societyId: "",
      societyName: "",
      address: "",
      flat: "",
    });
  };

  const editHandler = (user) => setForm(user);
  const deleteHandler = (id) => {
    const filtered = users.filter((u) => u.id !== id);
    setUsers(filtered);
    saveUsers(filtered);
  };

  const filteredUsers = filterSociety
    ? users.filter((u) => u.societyId === filterSociety)
    : users;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            User Management
          </h1>
          <p className="text-gray-500 mt-1">
            Society wise user management
          </p>
        </div>

        {/* ================= FORM ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-10">
          <h2 className="text-lg font-semibold mb-6">
            Add / Edit User
          </h2>

          <form
            onSubmit={submitHandler}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <input
              placeholder="User Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
            />

            <input
              placeholder="Mobile Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input"
            />

            <select
              value={form.societyId}
              onChange={handleSocietyChange}
              className="input"
            >
              <option value="">Select Society</option>
              {societies.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Society Address"
              value={form.address}
              disabled
              className="input bg-gray-50"
            />

            <input
              placeholder="Flat / House No"
              value={form.flat}
              onChange={(e) => setForm({ ...form, flat: e.target.value })}
              className="input"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="bg-indigo-600 text-white rounded-xl py-3 font-medium sm:col-span-2 lg:col-span-3"
            >
              {form.id ? "Update User" : "Create User"}
            </motion.button>
          </form>
        </div>

        {/* ================= FILTER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold">
            Users List
          </h2>

          <select
            value={filterSociety}
            onChange={(e) => setFilterSociety(e.target.value)}
            className="input sm:w-64"
          >
            <option value="">All Societies</option>
            {societies.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Mobile</th>
                <th className="px-6 py-4 text-left">Society</th>
                <th className="px-6 py-4 text-left">Flat</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">{u.name}</td>
                  <td className="px-6 py-4 text-gray-500">{u.phone}</td>
                  <td className="px-6 py-4">{u.societyName}</td>
                  <td className="px-6 py-4">{u.flat}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button
                      onClick={() => editHandler(u)}
                      className="text-indigo-600 font-medium"
                    >
                      <Edit/>
                    </button>
                    <button
                      onClick={() => deleteHandler(u.id)}
                      className="text-red-500 font-medium"
                    >
                     <Trash/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p className="py-10 text-center text-gray-400">
              No users found
            </p>
          )}
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-4">
          <AnimatePresence>
            {filteredUsers.map((u) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-sm p-5"
              >
                <h3 className="font-semibold text-lg">{u.name}</h3>
                <p className="text-gray-500 text-sm">{u.phone}</p>

                <div className="mt-3 text-sm">
                  <p><span className="font-medium">Society:</span> {u.societyName}</p>
                  <p><span className="font-medium">Flat:</span> {u.flat}</p>
                </div>

                <div className="flex gap-6 mt-4">
                  <button
                    onClick={() => editHandler(u)}
                    className="text-indigo-600 font-medium"
                  >
                  
                  <Edit/>
                  </button>
                  <button
                    onClick={() => deleteHandler(u.id)}
                    className="text-red-500 font-medium"
                  >
                  <Trash/>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              No users found
            </p>
          )}
        </div>
      </div>

      {/* INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            border-radius: 0.75rem;
            border: 1px solid #e5e7eb;
            padding: 0.75rem 1rem;
            outline: none;
          }
          .input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
          }
        `}
      </style>
    </div>
  );
};

export default Users;
