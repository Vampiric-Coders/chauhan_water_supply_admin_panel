import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash } from "lucide-react";
import {
  getAllUsers,
  updateUserCan,
  // updateUser,
  // deleteUser,
} from "../../../apis/Users/Users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filterSociety, setFilterSociety] = useState("");
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [price, setPrice] = useState("");

  // ================= FETCH USERS =================
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    console.log('res--->',res)
    setUsers(res.data || []);
  };

  // ================= ADMIN ACTIONS =================
  const openPriceModal = (user) => {
    setSelectedUser(user);
    setPrice(user?.pricePerCan);
    setShowPriceModal(true);
  };

  const updatePrice = async () => {
    console.log('selected user--->',selectedUser?._id)
    await updateUserCan(selectedUser._id, {
      // ...selectedUser,
      pricePerCan: price,
    });
    setShowPriceModal(false);
    fetchUsers();
  };

  const removeUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    fetchUsers();
  };

  // ================= FILTER =================

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* ================= ADMIN CTA ================= */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-8 shadow-lg">
          <h1 className="text-2xl font-bold">Admin User Control</h1>
          <p className="text-sm opacity-90 mt-1">
            Admin can only update user price or delete user
          </p>
        </div>

        {/* ================= USERS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {console.log('filtered-users-->',users?.users)}
          {users?.users?.map((u) => (
            <div
              key={u?._id}
              className="bg-white rounded-2xl p-5 shadow-md border hover:shadow-xl transition"
            >
              <div className="flex justify-between">
                
              <h3 className="text-lg font-bold text-gray-800">{u?.name}</h3>

<h3
  className={`text-sm font-bold px-3 py-1 rounded capitalize
    ${
      !u?.orders?.length
        ? "bg-gray-200 text-gray-600"          // No order
        : u.orders[0].orderType === "subscription"
        ? "bg-blue-100 text-blue-700"          // Subscription
        : "bg-green-100 text-green-700"        // Daily
    }`}
>
  {!u?.orders?.length ? "No order" : u.orders[0].orderType}
</h3>

              </div>

             
              <p className="text-sm text-gray-500">{u?.societyName}</p>

              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p>📞 {u?.phoneNumber}</p>
                <p>🏠 {u?.addressFlatNo}</p>
                <p className="font-semibold">💰 ₹{u?.pricePerCan}</p>
              </div>
 


              {/* ================= ADMIN ACTIONS ================= */}
              <div className="flex justify-between items-center mt-5">
                <button
                  onClick={() => openPriceModal(u)}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  <Pencil size={18} /> Update Price
                </button>

                <button
                  onClick={() => removeUser(u.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PRICE UPDATE MODAL ================= */}
      <AnimatePresence>
        {showPriceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
            >
              <h2 className="text-lg font-semibold mb-4">
                Update Price – {selectedUser?.name}
              </h2>

              <input
                className="w-full border p-3 rounded-xl mb-4"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter new price"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPriceModal(false)}
                  className="px-4 py-2 rounded-xl border"
                >
                  Cancel
                </button>
                <button
                  onClick={updatePrice}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
                >
                  Update
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;
