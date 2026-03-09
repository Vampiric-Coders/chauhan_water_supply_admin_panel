import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllUsers, approveUser,getAllSocieties, deleteUser } from "../../../apis/ApprovalRequests/ApprovalRequests";
// import { getAllSocieties } from "../services/societyApi";
import toast, { Toaster } from "react-hot-toast";

const ApprovalRequests = () => {
  const [requests, setRequests] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("All");
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH USERS
  ========================= */
  // const fetchUsers = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await getAllUsers();
  //     setRequests(res.data?.users);
      
  //   } catch (error) {
  //     console.error("Error fetching users", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchUsers = async () => {
  try {
    // setLoading(true);

    const res = await getAllUsers();

    // 👇 Check karo actual array kaha hai (adjust if needed)
    const usersArray = Array.isArray(res.data)
      ? res.data
      : res.data.data || res.data.users || [];

    // 👇 Sirf unsubscribed users
    const pendingUsers = usersArray.filter(
      (user) => user.isApproved === false
    );

    setRequests(pendingUsers);

  } catch (error) {
    console.error("Error fetching users", error);
  } finally {
    setLoading(false);
  }
};

  /* =========================
     FETCH SOCIETIES
  ========================= */
  const fetchSocieties = async () => {
    try {
      const res = await getAllSocieties();
      setSocieties(res?.data?.societies);
    } catch (error) {
      console.error("Error fetching societies", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSocieties();
  }, []);

  /* =========================
     APPROVE USER
  ========================= */
  const handleApprove = async (id) => {
    try {
      await approveUser(id);
      setRequests((prev) => prev.filter((user) => user._id !== id));
      // alert("User Approved ✅");
       toast.success("✅ User Approved")
    } catch (error) {
      console.error("Approval failed", error);
    }
  };


   const handleReject = async (id) => {
    try {
      await deleteUser(id);
      setRequests((prev) => prev.filter((user) => user._id !== id));
      toast.success("✅ User Rejected")
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  /* =========================
     FILTER LOGIC
  ========================= */
  const filteredRequests = requests?.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.societyName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSociety =
      selectedSociety === "All" ||
      user.societyName === selectedSociety;

    return matchesSearch && matchesSociety;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Approval Requests
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search by Name or Society..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-3 rounded-xl shadow-md border focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={selectedSociety}
          onChange={(e) => setSelectedSociety(e.target.value)}
          className="w-full md:w-64 px-4 py-3 rounded-xl shadow-md border focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          {societies?.map((society) => (
            <option key={society?._id} value={society?.societyName}>
              {society?.societyName}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && <p className="text-blue-600">Loading users...</p>}

{/* Grid */}
{/* Grid */}
{filteredRequests.length === 0 ? (
  <p className="text-gray-500 text-lg mt-10">
    No user requests
  </p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {filteredRequests.map((user) => (
      <motion.div
        key={user._id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-3">
          {user.name}
        </h2>

        <div className="text-sm text-gray-600 space-y-2">
          <p>📞 {user.phoneNumber}</p>
          <p>🏢 {user.societyName}</p>
          <p>🏠 Flat No: {user.addressFlatNo}</p>
        </div>

<div className="flex gap-2">

        <button
          onClick={() => handleApprove(user._id)}
          className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl"
          >
          Approve
        </button>

            <button
          onClick={() => handleReject(user._id)}
          className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl"
          >
         Reject
        </button>
          </div>
      </motion.div>
    ))}
    <Toaster position="top-right" />
  </div>
)}
   
    </div>
  );
};

export default ApprovalRequests;