// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Edit, Trash } from "lucide-react";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [societies, setSocieties] = useState([]);
//   const [filterSociety, setFilterSociety] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   const [form, setForm] = useState({
//     id: null,
//     name: "",
//     phone: "",
//     societyId: "",
//     societyName: "",
//     price: "",
//     flat: "",
//     subscription: false,
//     expiry: "",
//   });

//   /* ---------- LOAD ---------- */
//   useEffect(() => {
//     setUsers(JSON.parse(localStorage.getItem("users")) || []);
//     setSocieties(JSON.parse(localStorage.getItem("societies")) || []);
//   }, []);

//   const saveUsers = (data) =>
//     localStorage.setItem("users", JSON.stringify(data));

//   /* ---------- SOCIETY ---------- */
//   const handleSocietyChange = (e) => {
//     const id = e.target.value;
//     const soc = societies.find((s) => s.id === Number(id));

//     setForm({
//       ...form,
//       societyId: id,
//       societyName: soc?.name || "",
//       price: soc?.price || "",
//     });
//   };

//   /* ---------- SUBMIT ---------- */
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!form.name || !form.phone || !form.societyId || !form.flat) return;

//     const updated = form.id
//       ? users.map((u) => (u.id === form.id ? form : u))
//       : [...users, { ...form, id: Date.now() }];

//     setUsers(updated);
//     saveUsers(updated);
//     resetForm();
//     setShowForm(false);
//   };

//   const resetForm = () =>
//     setForm({
//       id: null,
//       name: "",
//       phone: "",
//       societyId: "",
//       societyName: "",
//       price: "",
//       flat: "",
//       subscription: false,
//       expiry: "",
//     });

//   const editHandler = (u) => {
//     setForm(u);
//     setShowForm(true);
//   };

//   const deleteHandler = (id) => {
//     const filtered = users.filter((u) => u.id !== id);
//     setUsers(filtered);
//     saveUsers(filtered);
//   };

//   const filteredUsers = filterSociety
//     ? users.filter((u) => u.societyId === filterSociety)
//     : users;

//   /* ---------- SUBSCRIPTION STATUS ---------- */
//   const getStatus = (u) => {
//     if (!u.subscription) return { text: "No", color: "gray" };
//     if (new Date(u.expiry) < new Date())
//       return { text: "Expired", color: "red" };
//     return { text: "Active", color: "green" };
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-semibold">User Management</h1>
//             <p className="text-gray-500 text-sm">Society wise users</p>
//           </div>
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
//           >
//             + Add User
//           </button>
//         </div>

//         {/* FILTER */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-4">
//           <h2 className="font-semibold text-lg flex-1">Users List</h2>
//           <select
//             value={filterSociety}
//             onChange={(e) => setFilterSociety(e.target.value)}
//             className="input sm:w-64"
//           >
//             <option value="">All Societies</option>
//             {societies.map((s) => (
//               <option key={s.id} value={s.id}>{s.name}</option>
//             ))}
//           </select>
//         </div>

//         {/* TABLE */}
//         <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-3 text-left">Name</th>
//                 <th className="px-4 py-3 text-center">Mobile</th>
//                 <th className="px-4 py-3 text-center">Society</th>
//                 <th className="px-4 py-3 text-center">Flat</th>
//                 <th className="px-4 py-3 text-center">Price</th>
//                 <th className="px-4 py-3 text-center">Subscription</th>
//                 <th className="px-4 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((u) => {
//                 const status = getStatus(u);
//                 return (
//                   <tr key={u.id} className="border-b hover:bg-gray-50">
//                     <td className="px-4 py-3 font-medium">{u.name}</td>
//                     <td className="px-4 py-3 text-center">{u.phone}</td>
//                     <td className="px-4 py-3 text-center">{u.societyName}</td>
//                     <td className="px-4 py-3 text-center">{u.flat}</td>
//                     <td className="px-4 py-3 text-center">₹{u.price}</td>
//                     <td className="px-4 py-3 text-center">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold
//                           ${
//                             status.color === "green"
//                               ? "bg-green-100 text-green-700"
//                               : status.color === "red"
//                               ? "bg-red-100 text-red-700"
//                               : "bg-gray-100 text-gray-600"
//                           }`}
//                       >
//                         {status.text}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-center space-x-3">
//                       <button onClick={() => editHandler(u)} className="text-indigo-600">
//                         <Edit size={18} />
//                       </button>
//                       <button onClick={() => deleteHandler(u.id)} className="text-red-500">
//                         <Trash size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* DRAWER FORM */}
//       <AnimatePresence>
//         {showForm && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl p-5"
//           >
//             <div className="flex justify-between mb-5">
//               <h2 className="font-semibold text-lg">
//                 {form.id ? "Edit User" : "Add User"}
//               </h2>
//               <button onClick={() => { setShowForm(false); resetForm(); }}>✕</button>
//             </div>

//             <form onSubmit={submitHandler} className="space-y-4">
//               <input className="input" placeholder="User Name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })} />

//               <input className="input" placeholder="Mobile Number"
//                 value={form.phone}
//                 onChange={(e) => setForm({ ...form, phone: e.target.value })} />

//               <select className="input" value={form.societyId} onChange={handleSocietyChange}>
//                 <option value="">Select Society</option>
//                 {societies.map((s) => (
//                   <option key={s.id} value={s.id}>{s.name}</option>
//                 ))}
//               </select>

//               <input className="input" placeholder="Price"
//                 value={form.price}
//                 onChange={(e) => setForm({ ...form, price: e.target.value })} />

//               <input className="input" placeholder="Flat / House No"
//                 value={form.flat}
//                 onChange={(e) => setForm({ ...form, flat: e.target.value })} />

//               {/* SUBSCRIPTION TOGGLE */}
//               <div className="flex items-center justify-between">
//                 <label className="font-medium">Subscription</label>
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setForm({
//                       ...form,
//                       subscription: !form.subscription,
//                       expiry: "",
//                     })
//                   }
//                   className={`w-14 h-7 flex items-center rounded-full px-1
//                     ${form.subscription ? "bg-green-500" : "bg-gray-300"}`}
//                 >
//                   <span
//                     className={`bg-white w-5 h-5 rounded-full transform transition
//                       ${form.subscription ? "translate-x-7" : ""}`}
//                   />
//                 </button>
//               </div>

//               {/* EXPIRY */}
//               {form.subscription && (
//                 <input
//                   type="date"
//                   className="input"
//                   value={form.expiry}
//                   onChange={(e) => setForm({ ...form, expiry: e.target.value })}
//                 />
//               )}

//               <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
//                 {form.id ? "Update User" : "Create User"}
//               </button>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* INPUT STYLE */}
//       <style>{`
//         .input {
//           width: 100%;
//           border: 1px solid #e5e7eb;
//           padding: 0.75rem 1rem;
//           border-radius: 0.75rem;
//           outline: none;
//         }
//         .input:focus {
//           border-color: #6366f1;
//           box-shadow: 0 0 0 2px rgba(99,102,241,.2);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Users;

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Edit, Trash } from "lucide-react";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [societies, setSocieties] = useState([]);
//   const [filterSociety, setFilterSociety] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   const [form, setForm] = useState({
//     id: null,
//     name: "",
//     phone: "",
//     societyId: "",
//     societyName: "",
//     price: "",
//     flat: "",
//     subscription: false,
//     expiry: "",
//   });

//   useEffect(() => {
//     setUsers(JSON.parse(localStorage.getItem("users")) || []);
//     setSocieties(JSON.parse(localStorage.getItem("societies")) || []);
//   }, []);

//   const saveUsers = (data) =>
//     localStorage.setItem("users", JSON.stringify(data));

//   const handleSocietyChange = (e) => {
//     const id = e.target.value;
//     const soc = societies.find((s) => s.id === Number(id));
//     setForm({
//       ...form,
//       societyId: id,
//       societyName: soc?.name || "",
//       price: soc?.price || "",
//     });
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!form.name || !form.phone || !form.societyId || !form.flat) return;

//     const updated = form.id
//       ? users.map((u) => (u.id === form.id ? form : u))
//       : [...users, { ...form, id: Date.now() }];

//     setUsers(updated);
//     saveUsers(updated);
//     resetForm();
//     setShowForm(false);
//   };

//   const resetForm = () =>
//     setForm({
//       id: null,
//       name: "",
//       phone: "",
//       societyId: "",
//       societyName: "",
//       price: "",
//       flat: "",
//       subscription: false,
//       expiry: "",
//     });

//   const editHandler = (u) => {
//     setForm(u);
//     setShowForm(true);
//   };

//   const deleteHandler = (id) => {
//     const filtered = users.filter((u) => u.id !== id);
//     setUsers(filtered);
//     saveUsers(filtered);
//   };

//   const filteredUsers = filterSociety
//     ? users.filter((u) => u.societyId === filterSociety)
//     : users;

//   const getStatus = (u) => {
//     if (!u.subscription) return { text: "No", color: "gray" };
//     if (u.expiry && new Date(u.expiry) < new Date())
//       return { text: "Expired", color: "red" };
//     return { text: "Active", color: "green" };
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 items-start sm:items-center">
//           <div>
//             <h1 className="text-2xl font-semibold">User Management</h1>
//             <p className="text-gray-500 text-sm">Society wise users</p>
//           </div>
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
//           >
//             + Add User
//           </button>
//         </div>

//         {/* FILTER */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-4 items-start sm:items-center">
//           <h2 className="font-semibold text-lg flex-1">Users List</h2>
//           <select
//             value={filterSociety}
//             onChange={(e) => setFilterSociety(e.target.value)}
//             className="w-full sm:w-64 p-2 border rounded-xl outline-none shadow-sm bg-white"
//           >
//             <option value="">All Societies</option>
//             {societies.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto bg-white rounded-xl shadow">
//           <table className="w-full text-sm md:text-base border-collapse">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-3 text-left">Name</th>
//                 <th className="px-4 py-3 text-center">Mobile</th>
//                 <th className="px-4 py-3 text-center">Society</th>
//                 <th className="px-4 py-3 text-center">Flat</th>
//                 <th className="px-4 py-3 text-center">Price</th>
//                 <th className="px-4 py-3 text-center">Subscription</th>
//                 <th className="px-4 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((u) => {
//                 const status = getStatus(u);
//                 return (
//                   <tr key={u.id} className="border-b hover:bg-gray-50">
//                     <td className="px-4 py-3 font-medium">{u.name}</td>
//                     <td className="px-4 py-3 text-center">{u.phone}</td>
//                     <td className="px-4 py-3 text-center">{u.societyName}</td>
//                     <td className="px-4 py-3 text-center">{u.flat}</td>
//                     <td className="px-4 py-3 text-center">₹{u.price}</td>
//                     <td className="px-4 py-3 text-center">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold
//                           ${
//                             status.color === "green"
//                               ? "bg-green-100 text-green-700"
//                               : status.color === "red"
//                               ? "bg-red-100 text-red-700"
//                               : "bg-gray-100 text-gray-600"
//                           }`}
//                       >
//                         {status.text}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-center space-x-3 flex justify-center">
//                       <button
//                         onClick={() => editHandler(u)}
//                         className="text-indigo-600 hover:text-indigo-800"
//                       >
//                         <Edit size={18} />
//                       </button>
//                       <button
//                         onClick={() => deleteHandler(u.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <Trash size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* DRAWER FORM */}
//       <AnimatePresence>
//         {showForm && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "tween" }}
//             className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl p-5 overflow-y-auto"
//           >
//             <div className="flex justify-between items-center mb-5">
//               <h2 className="font-semibold text-lg">
//                 {form.id ? "Edit User" : "Add User"}
//               </h2>
//               <button
//                 onClick={() => {
//                   setShowForm(false);
//                   resetForm();
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={submitHandler} className="space-y-4">
//               <input
//                 className="input"
//                 placeholder="User Name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//               />
//               <input
//                 className="input"
//                 placeholder="Mobile Number"
//                 value={form.phone}
//                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
//               />
//               <select
//                 className="input"
//                 value={form.societyId}
//                 onChange={handleSocietyChange}
//               >
//                 <option value="">Select Society</option>
//                 {societies.map((s) => (
//                   <option key={s.id} value={s.id}>
//                     {s.name}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 className="input"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={(e) => setForm({ ...form, price: e.target.value })}
//               />
//               <input
//                 className="input"
//                 placeholder="Flat / House No"
//                 value={form.flat}
//                 onChange={(e) => setForm({ ...form, flat: e.target.value })}
//               />

//               {/* SUBSCRIPTION TOGGLE */}
//               <div className="flex items-center justify-between">
//                 <label className="font-medium">Subscription</label>
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setForm({
//                       ...form,
//                       subscription: !form.subscription,
//                       expiry: "",
//                     })
//                   }
//                   className={`w-14 h-7 flex items-center rounded-full px-1 transition
//                     ${form.subscription ? "bg-green-500" : "bg-gray-300"}`}
//                 >
//                   <span
//                     className={`bg-white w-5 h-5 rounded-full transform transition
//                       ${form.subscription ? "translate-x-7" : ""}`}
//                   />
//                 </button>
//               </div>

//               {/* EXPIRY */}
//               {form.subscription && (
//                 <input
//                   type="date"
//                   className="input"
//                   value={form.expiry}
//                   onChange={(e) => setForm({ ...form, expiry: e.target.value })}
//                 />
//               )}

//               <button className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow hover:bg-indigo-700 transition">
//                 {form.id ? "Update User" : "Create User"}
//               </button>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* INPUT STYLE */}
//       <style>{`
//         .input {
//           width: 100%;
//           border: 1px solid #e5e7eb;
//           padding: 0.75rem 1rem;
//           border-radius: 0.75rem;
//           outline: none;
//           box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
//         }
//         .input:focus {
//           border-color: #6366f1;
//           box-shadow: 0 0 0 2px rgba(99,102,241,.2);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Users;
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [filterSociety, setFilterSociety] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: "",
    phone: "",
    societyId: "",
    societyName: "",
    price: "",
    flat: "",
    subscription: false,
    expiry: "",
  });

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setSocieties(JSON.parse(localStorage.getItem("societies")) || []);
  }, []);

  const saveUsers = (data) =>
    localStorage.setItem("users", JSON.stringify(data));

  const handleSocietyChange = (e) => {
    const id = e.target.value;
    const soc = societies.find((s) => s.id === Number(id));
    setForm({
      ...form,
      societyId: id,
      societyName: soc?.name || "",
      price: soc?.price || "",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.societyId || !form.flat) return;

    const updated = form.id
      ? users.map((u) => (u.id === form.id ? form : u))
      : [...users, { ...form, id: Date.now() }];

    setUsers(updated);
    saveUsers(updated);
    resetForm();
    setShowForm(false);
  };

  const resetForm = () =>
    setForm({
      id: null,
      name: "",
      phone: "",
      societyId: "",
      societyName: "",
      price: "",
      flat: "",
      subscription: false,
      expiry: "",
    });

  const editHandler = (u) => {
    setForm(u);
    setShowForm(true);
  };

  const deleteHandler = (id) => {
    const filtered = users.filter((u) => u.id !== id);
    setUsers(filtered);
    saveUsers(filtered);
  };

  const filteredUsers = filterSociety
    ? users.filter((u) => u.societyId === filterSociety)
    : users;

  const getStatus = (u) => {
    if (!u.subscription) return { text: "No Subscription", color: "gray" };
    if (u.expiry && new Date(u.expiry) < new Date())
      return { text: "Expired", color: "red" };
    return { text: "Active", color: "green" };
  };

  const cardStyle = (status) => {
    switch (status.color) {
      case "green":
        return "bg-green-50 border-green-200";
      case "red":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const badgeStyle = (status) => {
    switch (status.color) {
      case "green":
        return "bg-green-100 text-green-800";
      case "red":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Users Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">All society users</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
          >
            + Add User
          </button>
        </div>

        {/* FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center">
          <h2 className="font-semibold text-lg flex-1">Users List</h2>
          <select
            value={filterSociety}
            onChange={(e) => setFilterSociety(e.target.value)}
            className="w-full sm:w-64 p-2 border rounded-xl outline-none shadow-sm bg-white"
          >
            <option value="">All Societies</option>
            {societies.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredUsers.map((u) => {
            const status = getStatus(u);
            return (
              <div
                key={u.id}
                className={`p-5 rounded-2xl shadow-md border ${cardStyle(
                  status,
                )} flex flex-col justify-between transition hover:shadow-xl`}
              >
                {/* Top: Name & actions */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {u.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {u.societyName}
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-1">
                    <button
                      onClick={() => editHandler(u)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteHandler(u.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>

                {/* User info */}
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    📞 {u.phone}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    🏠 {u.societyName}, {u.flat}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    💰 ₹{u.price}
                  </p>
                </div>

                {/* Status badge */}
                <span
                  className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle(
                    status,
                  )}`}
                >
                  {status.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* DRAWER FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl p-5 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-semibold text-lg">
                {form.id ? "Edit User" : "Add User"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitHandler} className="space-y-4">
              <input
                className="input"
                placeholder="User Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="input"
                placeholder="Mobile Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <select
                className="input"
                value={form.societyId}
                onChange={handleSocietyChange}
              >
                <option value="">Select Society</option>
                {societies.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                className="input"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <input
                className="input"
                placeholder="Flat / House No"
                value={form.flat}
                onChange={(e) => setForm({ ...form, flat: e.target.value })}
              />

              {/* SUBSCRIPTION TOGGLE */}
              <div className="flex items-center justify-between">
                <label className="font-medium">Subscription</label>
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      subscription: !form.subscription,
                      expiry: "",
                    })
                  }
                  className={`w-14 h-7 flex items-center rounded-full px-1 transition
                    ${form.subscription ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <span
                    className={`bg-white w-5 h-5 rounded-full transform transition
                      ${form.subscription ? "translate-x-7" : ""}`}
                  />
                </button>
              </div>

              {form.subscription && (
                <input
                  type="date"
                  className="input"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                />
              )}

              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow hover:bg-indigo-700 transition">
                {form.id ? "Update User" : "Create User"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          outline: none;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99,102,241,.2);
        }
      `}</style>
    </div>
  );
};

export default Users;
