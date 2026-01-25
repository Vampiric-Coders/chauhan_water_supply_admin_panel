import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EditIcon, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  getAllSocieties,
  createSociety,
  updateSociety,
  deleteSociety,
} from "../../../apis/Societies/Societies"; // adjust path

const Societies = () => {
  const [societies, setSocieties] = useState([]);
  const [form, setForm] = useState({
    _id: null,
    societyName: "",
    societyAddress: "",
    societyEstimatedDeliveryTimeFrom: "",
    societyEstimatedDeliveryTimeTo: "",
  });

  /* ---------------- LOAD DATA ---------------- */
  const loadSocieties = async () => {
    try {
      const res = await getAllSocieties();
      setSocieties(res?.data?.societies || []);
    } catch (err) {
      console.error("Failed to load societies:", err.response?.data || err.message);
      toast.error("Failed to load societies");
    }
  };

  useEffect(() => {
    loadSocieties();
  }, []);

  /* ---------------- CREATE ---------------- */
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.societyName || !form.societyAddress) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await createSociety(form);
      toast.success("Society created successfully");
      await loadSocieties();
      resetForm();
    } catch (err) {
      console.error("Create failed:", err.response?.data || err.message);
      toast.error("Failed to create society");
    }
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.societyName || !form.societyAddress) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await updateSociety(form._id, form);
      toast.success("Society updated successfully");
      await loadSocieties();
      resetForm();
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error("Failed to update society");
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this society?")) return;
    try {
      await deleteSociety(id);
      setSocieties(societies.filter((s) => s._id !== id));
      toast.success("Society deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      toast.error("Failed to delete society");
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (soc) => {
    setForm({
      _id: soc._id,
      societyName: soc.societyName,
      societyAddress: soc.societyAddress,
      societyEstimatedDeliveryTimeFrom: soc.societyEstimatedDeliveryTimeFrom,
      societyEstimatedDeliveryTimeTo: soc.societyEstimatedDeliveryTimeTo,
    });
  };

  const resetForm = () => {
    setForm({
      _id: null,
      societyName: "",
      societyAddress: "",
      societyEstimatedDeliveryTimeFrom: "",
      societyEstimatedDeliveryTimeTo: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-8 py-10">
      <Toaster position="top-right" reverseOrder={false} /> {/* Toast container */}
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">Society Management</h1>
          <p className="text-gray-500 mt-1">Admin panel to manage societies</p>
        </motion.div>

        {/* ================= FORM ================= */}
        <motion.form
          onSubmit={form._id ? handleUpdate : handleCreate} // Choose correct handler
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-12 space-y-4"
        >
          <div>
            <label className="text-sm font-medium text-gray-600">Society Name</label>
            <input
              type="text"
              value={form.societyName}
              onChange={(e) => setForm({ ...form, societyName: e.target.value })}
              placeholder="e.g. Green Valley"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Address</label>
            <input
              type="text"
              value={form.societyAddress}
              onChange={(e) => setForm({ ...form, societyAddress: e.target.value })}
              placeholder="e.g. Karolbagh Wing A"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">Delivery Time From</label>
              <input
                type="time"
                value={form.societyEstimatedDeliveryTimeFrom}
                onChange={(e) => setForm({ ...form, societyEstimatedDeliveryTimeFrom: e.target.value })}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">Delivery Time To</label>
              <input
                type="time"
                value={form.societyEstimatedDeliveryTimeTo}
                onChange={(e) => setForm({ ...form, societyEstimatedDeliveryTimeTo: e.target.value })}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`mt-4 rounded-xl px-10 py-3 text-white font-medium shadow-sm ${
                form._id ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {form._id ? "Update Society" : "Create Society"}
            </motion.button>

            {form._id && (
              <motion.button
                type="button"
                onClick={resetForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 rounded-xl bg-gray-400 px-10 py-3 text-white font-medium shadow-sm hover:bg-gray-500"
              >
                Cancel
              </motion.button>
            )}
          </div>
        </motion.form>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Societies List</h2>
            <span className="text-sm text-gray-500">Total: {societies.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-500 text-sm sticky top-0">
                <tr>
                  <th className="px-6 py-4 font-medium text-left">Society</th>
                  <th className="px-6 py-4 font-medium text-left">Address</th>
                  <th className="px-6 py-4 font-medium text-left">Delivery Time</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {societies.map((soc) => (
                    <motion.tr
                      key={soc._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ backgroundColor: "#f8fafc" }}
                      className="border-b last:border-none group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                          <span className="font-medium text-gray-800">{soc.societyName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">{soc.societyAddress}</td>
                      <td className="px-6 py-5">
                        {soc.societyEstimatedDeliveryTimeFrom} - {soc.societyEstimatedDeliveryTimeTo}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-6">
                          <button
                            onClick={() => handleEdit(soc)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(soc._id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {societies.length === 0 && (
            <div className="py-14 text-center text-gray-400">No societies available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Societies;
