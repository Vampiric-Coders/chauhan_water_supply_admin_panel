import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EditIcon, Trash2 } from "lucide-react";

const Societies = () => {
  const [societies, setSocieties] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", address: "" });

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("societies")) || [];
    setSocieties(data);
  }, []);

  const saveData = (data) => {
    localStorage.setItem("societies", JSON.stringify(data));
  };

  /* ---------------- CREATE / UPDATE ---------------- */
  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.address) return;

    let updated;
    if (form.id) {
      updated = societies.map((s) =>
        s.id === form.id ? form : s
      );
    } else {
      updated = [...societies, { ...form, id: Date.now() }];
    }

    setSocieties(updated);
    saveData(updated);
    setForm({ id: null, name: "", address: "" });
  };

  /* ---------------- ACTIONS ---------------- */
  const editHandler = (soc) => setForm(soc);

  const deleteHandler = (id) => {
    const filtered = societies.filter((s) => s.id !== id);
    setSocieties(filtered);
    saveData(filtered);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-8 py-10">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-semibold text-gray-900">
            Society Management
          </h1>
          <p className="text-gray-500 mt-1">
            Admin panel to manage societies
          </p>
        </motion.div>

        {/* ================= FORM ================= */}
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Society Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="e.g. Green Valley"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Society Address
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                placeholder="Full address"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 rounded-xl bg-indigo-600 px-10 py-3 text-white font-medium shadow-sm hover:bg-indigo-700"
          >
            {form.id ? "Update Society" : "Create Society"}
          </motion.button>
        </motion.form>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Societies List
            </h2>
            <span className="text-sm text-gray-500">
              Total: {societies.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-500 text-sm sticky top-0">
                <tr>
                  <th className="px-6 py-4 font-medium text-left">
                    Society
                  </th>
                  <th className="px-6 py-4 font-medium text-left">
                    Address
                  </th>
                  <th className="px-6 py-4 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence>
                  {societies.map((soc) => (
                    <motion.tr
                      key={soc.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ backgroundColor: "#f8fafc" }}
                      className="border-b last:border-none group"
                    >
                      {/* Society Name */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                          <span className="font-medium text-gray-800">
                            {soc.name}
                          </span>
                        </div>
                      </td>

                      {/* Address */}
                      <td className="px-6 py-5 text-gray-500">
                        {soc.address}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-6">
                          <button
                            onClick={() => editHandler(soc)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                           <EditIcon/>
                          </button>
                          <button
                            onClick={() => deleteHandler(soc.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            <Trash2/>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {societies.length === 0 && (
            <div className="py-14 text-center text-gray-400">
              No societies available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Societies;
