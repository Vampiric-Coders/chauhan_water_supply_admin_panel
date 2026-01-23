// import { useState, useMemo } from "react";
// import { FiSearch, FiCalendar } from "react-icons/fi";

// /* DATA */
// const ORDERS = [
//   {
//     id: "ORD-101",
//     name: "Ramesh Kumar",
//     phone: "9876543210",
//     society: "Sunrise Heights",
//     flat: "A-101",
//     status: "Pending",
//     date: "2026-01-04",
//     type: "order",
//   },
//   {
//     id: "ORD-102",
//     name: "Suresh Patel",
//     phone: "9876543211",
//     society: "Green Valley",
//     flat: "B-202",
//     status: "Out for Delivery",
//     date: "2026-01-04",
//     type: "order",
//   },
//   {
//     id: "ORD-103",
//     name: "Anita Sharma",
//     phone: "9876543212",
//     society: "Sky Residency",
//     flat: "C-303",
//     status: "Delivered",
//     date: "2026-01-04",
//     type: "order",
//   },
//   {
//     id: "SUB-201",
//     name: "Vikram Malhotra",
//     phone: "9876543219",
//     society: "Palm Residency",
//     flat: "D-402",
//     status: "Active",
//     date: "2026-01-04",
//     type: "subscription",
//   },
// ];

// export default function AdminDashboard() {
//   const [tab, setTab] = useState("Today Orders");
//   const [search, setSearch] = useState("");
//   const [date, setDate] = useState("");
//   const [status, setStatus] = useState("All");

//   const today = "2026-01-04";

//   const filteredData = useMemo(() => {
//     return ORDERS.filter((o) => {
//       if (tab === "Today Orders" && o.type !== "order") return false;
//       if (tab === "Subscriptions" && o.type !== "subscription") return false;
//       if (tab === "Today Orders" && o.date !== today) return false;

//       const q = search.toLowerCase();
//       if (
//         q &&
//         !(
//           o.name.toLowerCase().includes(q) ||
//           o.phone.includes(q) ||
//           o.id.toLowerCase().includes(q)
//         )
//       )
//         return false;

//       if (date && o.date !== date) return false;
//       if (status !== "All" && o.status !== status) return false;

//       return true;
//     });
//   }, [tab, search, date, status]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 space-y-5">
//       {/* HEADER */}
//       <div>
//         <h1 className="text-xl sm:text-2xl font-bold text-blue-700">
//           💧 Water Supply Dashboard
//         </h1>
//         <p className="text-sm text-slate-500">
//           Orders & Subscriptions Management
//         </p>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-6 border-b">
//         {["Today Orders", "Subscriptions"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`pb-2 font-semibold transition ${
//               tab === t
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-slate-500"
//             }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* FILTERS */}
//       <div className="bg-white rounded-2xl shadow-sm p-3 grid grid-cols-1 sm:grid-cols-4 gap-3 sticky top-2 z-10">
//         <Input
//           icon={<FiSearch />}
//           placeholder="Name / Phone / ID"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <Input
//           icon={<FiCalendar />}
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />

//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="rounded-xl px-4 py-3 bg-blue-50 text-blue-700 font-semibold
//                      outline-none transition focus:ring-2 focus:ring-blue-400"
//         >
//           <option>All</option>
//           <option>Pending</option>
//           <option>Out for Delivery</option>
//           <option>Delivered</option>
//           <option>Active</option>
//           <option>Paused</option>
//         </select>

//         <button
//           onClick={() => {
//             setSearch("");
//             setDate("");
//             setStatus("All");
//           }}
//           className="rounded-xl px-4 py-3 bg-blue-600 text-white font-semibold
//                      hover:bg-blue-700 transition active:scale-[0.97]"
//         >
//           🔄 Clear Filters
//         </button>
//       </div>

//       {/* MOBILE VIEW */}
//       <div className="sm:hidden space-y-3">
//         {filteredData.length === 0 && (
//           <p className="text-center text-slate-500">No data found</p>
//         )}

//         {filteredData.map((o) => (
//           <div key={o.id} className="bg-white rounded-2xl p-4 shadow">
//             <div className="flex justify-between">
//               <p className="font-semibold">{o.name}</p>
//               <StatusTag status={o.status} />
//             </div>
//             <p className="text-sm text-slate-600">📞 {o.phone}</p>
//             <p className="text-sm text-slate-600">
//               🏠 {o.society}, {o.flat}
//             </p>
//             <p className="text-xs text-slate-400 mt-1">ID: {o.id}</p>
//           </div>
//         ))}
//       </div>

//       {/* DESKTOP TABLE */}
//       <div className="hidden sm:block bg-white rounded-2xl shadow overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead className="bg-blue-50 text-blue-700">
//             <tr>
//               <th className="p-3 text-left">ID</th>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Phone</th>
//               <th className="p-3 text-left">Society</th>
//               <th className="p-3 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((o) => (
//               <tr key={o.id} className="border-t hover:bg-blue-50 transition">
//                 <td className="p-3">{o.id}</td>
//                 <td className="p-3 font-medium">{o.name}</td>
//                 <td className="p-3">{o.phone}</td>
//                 <td className="p-3">{o.society}</td>
//                 <td className="p-3">
//                   <StatusTag status={o.status} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /* COMPONENTS */

// function Input({ icon, ...props }) {
//   return (
//     <div
//       className="flex items-center gap-2 bg-blue-50 px-4 py-3 rounded-xl
//                     focus-within:ring-2 focus-within:ring-blue-400 transition"
//     >
//       <span className="text-blue-500">{icon}</span>
//       <input
//         {...props}
//         className="bg-transparent outline-none text-sm w-full"
//       />
//     </div>
//   );
// }

// function StatusTag({ status }) {
//   const map = {
//     Pending: "bg-red-100 text-red-700",
//     "Out for Delivery": "bg-yellow-100 text-yellow-700",
//     Delivered: "bg-green-100 text-green-700",
//     Active: "bg-green-100 text-green-700",
//     Paused: "bg-gray-200 text-gray-700",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}
//     >
//       {status}
//     </span>
//   );
// }

// FULL MOBILE-FIRST ADVANCED WATER SUPPLY DASHBOARD
// Focus: Society-wise, Today Orders, Pending, Delivered, Collection
// Currency: INR only, No delivery boy, Admin-only

// FULL MOBILE-FIRST ADVANCED WATER SUPPLY DASHBOARD (CLIENT DEMO READY)
// Features:
// ✅ Daily Orders + Subscription Orders toggle
// ✅ Date Picker + History
// ✅ Society-wise drill down
// ✅ INR only
// ✅ Call action
// ✅ Dummy data rich

// import { useState, useMemo } from "react";
// import { FiPhoneCall, FiCalendar } from "react-icons/fi";
// import { MdWaterDrop } from "react-icons/md";

// /* ---------------- DUMMY DATA ---------------- */
// const DATA = {
//   "2026-01-04": {
//     daily: [
//       {
//         society: "Sunrise Heights",
//         orders: [
//           { id: "D-101", name: "Ramesh Kumar", phone: "9876543210", flat: "A-101", status: "Delivered", amount: 120 },
//           { id: "D-102", name: "Neha Jain", phone: "9876543214", flat: "A-203", status: "Pending", amount: 120 },
//         ],
//       },
//       {
//         society: "Green Valley",
//         orders: [
//           { id: "D-103", name: "Anita Sharma", phone: "9876543212", flat: "B-303", status: "Delivered", amount: 240 },
//           { id: "D-104", name: "Vikram Singh", phone: "9876543213", flat: "B-101", status: "Pending", amount: 120 },
//         ],
//       },
//     ],
//     subscription: [
//       {
//         society: "Sunrise Heights",
//         orders: [
//           { id: "S-201", name: "Mohit Verma", phone: "9876543220", flat: "A-305", status: "Delivered", amount: 90 },
//           { id: "S-202", name: "Pooja Mehta", phone: "9876543221", flat: "A-401", status: "Delivered", amount: 90 },
//         ],
//       },
//       {
//         society: "Palm Residency",
//         orders: [
//           { id: "S-203", name: "Rahul Khanna", phone: "9876543222", flat: "C-201", status: "Pending", amount: 90 },
//         ],
//       },
//     ],
//   },
// };

// export default function AdminDashboard() {
//   const [orderType, setOrderType] = useState("daily"); // daily | subscription
//   const [selectedDate, setSelectedDate] = useState("2026-01-04");
//   const [activeCard, setActiveCard] = useState("all");
//   const [openSociety, setOpenSociety] = useState(null);

//   const societies = DATA[selectedDate]?.[orderType] || [];

//   const summary = useMemo(() => {
//     let total = 0, delivered = 0, pending = 0, collection = 0;
//     societies.forEach(s => {
//       s.orders.forEach(o => {
//         total++;
//         if (o.status === "Delivered") {
//           delivered++;
//           collection += o.amount;
//         }
//         if (o.status === "Pending") pending++;
//       });
//     });
//     return { total, delivered, pending, collection };
//   }, [societies]);

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 space-y-4">

//       {/* HEADER */}
//       <div className="flex items-center gap-2">
//         <MdWaterDrop className="text-blue-600 text-2xl" />
//         <h1 className="text-xl font-bold">Water Supply Admin</h1>
//       </div>

//       {/* ORDER TYPE SWITCH */}
//       <div className="flex bg-white rounded-xl p-1 shadow">
//         {['daily', 'subscription'].map(t => (
//           <button
//             key={t}
//             onClick={() => { setOrderType(t); setOpenSociety(null); }}
//             className={`flex-1 py-2 rounded-lg font-semibold transition ${orderType === t ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
//           >
//             {t === 'daily' ? 'Daily Orders' : 'Subscription Orders'}
//           </button>
//         ))}
//       </div>

//       {/* DATE PICKER */}
//       <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow">
//         <FiCalendar className="text-blue-600" />
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => { setSelectedDate(e.target.value); setOpenSociety(null); }}
//           className="outline-none text-sm"
//         />
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//         <SummaryCard label="Orders" value={summary.total} color="bg-blue-600" onClick={() => setActiveCard('all')} />
//         <SummaryCard label="Delivered" value={summary.delivered} color="bg-green-600" onClick={() => setActiveCard('Delivered')} />
//         <SummaryCard label="Pending" value={summary.pending} color="bg-red-600" onClick={() => setActiveCard('Pending')} />
//         <SummaryCard label="Collection" value={`₹${summary.collection}`} color="bg-purple-600" onClick={() => setActiveCard('collection')} />
//       </div>

//       {/* DETAILS */}
//       <div className="space-y-3">
//         {societies.map(s => {
//           const orders = s.orders.filter(o =>
//             activeCard === 'all'
//               ? true
//               : activeCard === 'collection'
//               ? o.status === 'Delivered'
//               : o.status === activeCard
//           );

//           if (!orders.length) return null;

//           return (
//             <div key={s.society} className="bg-white rounded-2xl shadow">
//               <button
//                 onClick={() => setOpenSociety(openSociety === s.society ? null : s.society)}
//                 className="w-full flex justify-between items-center px-4 py-3 font-semibold"
//               >
//                 {s.society}
//                 <span className="text-xs text-slate-500">{orders.length} customers</span>
//               </button>

//               {openSociety === s.society && (
//                 <div className="divide-y">
//                   {orders.map(o => (
//                     <div key={o.id} className="flex justify-between items-center px-4 py-3">
//                       <div>
//                         <p className="font-medium">{o.name}</p>
//                         <p className="text-xs text-slate-500">{o.flat} · ₹{o.amount} · {o.status}</p>
//                       </div>
//                       <a href={`tel:${o.phone}`} className="bg-blue-100 text-blue-700 p-2 rounded-full">
//                         <FiPhoneCall />
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function SummaryCard({ label, value, color, onClick }) {
//   return (
//     <button onClick={onClick} className={`${color} text-white rounded-2xl p-4 shadow active:scale-95 transition`}>
//       <p className="text-sm opacity-90">{label}</p>
//       <p className="text-2xl font-bold">{value}</p>
//     </button>
//   );
// }

// PREMIUM MOBILE-FIRST WATER SUPPLY ADMIN DASHBOARD (CLIENT DEMO READY)
// Focus: Premium cards first, luxury UI, society-wise drilldown



// import { useState, useMemo } from "react";
// import { FiPhoneCall, FiCalendar } from "react-icons/fi";
// import {
//   MdWaterDrop,
//   MdAssignment,
//   MdCheckCircle,
//   MdPendingActions,
//   MdPayments,
//   MdApartment,
// } from "react-icons/md";

// /* ---------------- DUMMY DATA ---------------- */
// const DATA = {
//   "2026-01-04": {
//     daily: [
//       {
//         society: "Sunrise Heights",
//         orders: [
//           {
//             id: "D-101",
//             name: "Ramesh Kumar",
//             phone: "9876543210",
//             flat: "A-101",
//             status: "Delivered",
//             amount: 120,
//           },
//           {
//             id: "D-102",
//             name: "Neha Jain",
//             phone: "9876543214",
//             flat: "A-203",
//             status: "Pending",
//             amount: 120,
//           },
//         ],
//       },
//       {
//         society: "Green Valley",
//         orders: [
//           {
//             id: "D-103",
//             name: "Anita Sharma",
//             phone: "9876543212",
//             flat: "B-303",
//             status: "Delivered",
//             amount: 240,
//           },
//           {
//             id: "D-104",
//             name: "Vikram Singh",
//             phone: "9876543213",
//             flat: "B-101",
//             status: "Pending",
//             amount: 120,
//           },
//         ],
//       },
//     ],
//     subscription: [
//       {
//         society: "Palm Residency",
//         orders: [
//           {
//             id: "S-201",
//             name: "Mohit Verma",
//             phone: "9876543220",
//             flat: "C-305",
//             status: "Delivered",
//             amount: 90,
//           },
//           {
//             id: "S-202",
//             name: "Pooja Mehta",
//             phone: "9876543221",
//             flat: "C-401",
//             status: "Delivered",
//             amount: 90,
//           },
//         ],
//       },
//     ],
//   },
// };

// export default function AdminDashboard() {
//   const [orderType, setOrderType] = useState("daily");
//   const [selectedDate, setSelectedDate] = useState("2026-01-04");
//   const [activeCard, setActiveCard] = useState("all");
//   const [openSociety, setOpenSociety] = useState(null);

//   const societies = DATA[selectedDate]?.[orderType] || [];

//   const summary = useMemo(() => {
//     let total = 0,
//       delivered = 0,
//       pending = 0,
//       collection = 0;
//     societies.forEach((s) => {
//       s.orders.forEach((o) => {
//         total++;
//         if (o.status === "Delivered") {
//           delivered++;
//           collection += o.amount;
//         }
//         if (o.status === "Pending") pending++;
//       });
//     });
//     return { total, delivered, pending, collection };
//   }, [societies]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4 space-y-5">
//       {/* HEADER */}
//       <div className="flex items-center gap-2">
//         <MdWaterDrop className="text-blue-600 text-2xl" />
//         <h1 className="text-xl font-bold">Water Supply Admin</h1>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         <PremiumCard
//           icon={<MdAssignment />}
//           label="Orders"
//           value={summary.total}
//           color="from-blue-500 to-blue-700"
//           onClick={() => setActiveCard("all")}
//         />
//         <PremiumCard
//           icon={<MdCheckCircle />}
//           label="Delivered"
//           value={summary.delivered}
//           color="from-emerald-500 to-emerald-700"
//           onClick={() => setActiveCard("Delivered")}
//         />
//         <PremiumCard
//           icon={<MdPendingActions />}
//           label="Pending"
//           value={summary.pending}
//           color="from-rose-500 to-rose-700"
//           onClick={() => setActiveCard("Pending")}
//         />
//         <PremiumCard
//           icon={<MdPayments />}
//           label="Collection"
//           value={`₹${summary.collection}`}
//           color="from-purple-500 to-purple-700"
//           onClick={() => setActiveCard("collection")}
//         />
//       </div>

//       {/* CONTROLS */}
//       <div className="bg-white rounded-2xl shadow p-4 space-y-4">
//         <div className="flex gap-3">
//           {["daily", "subscription"].map((t) => (
//             <button
//               key={t}
//               onClick={() => {
//                 setOrderType(t);
//                 setOpenSociety(null);
//               }}
//               className={`flex-1 py-3 rounded-2xl font-semibold transition ${orderType === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
//             >
//               {t === "daily" ? "Daily Orders" : "Subscription Orders"}
//             </button>
//           ))}
//         </div>

//         <div className="flex items-center justify-between bg-slate-100 rounded-xl px-4 py-3">
//           <div className="flex items-center gap-2">
//             <FiCalendar className="text-blue-600" />
//             <span className="text-sm font-semibold">{selectedDate}</span>
//           </div>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => {
//               setSelectedDate(e.target.value);
//               setOpenSociety(null);
//             }}
//             className="bg-white rounded-lg px-3 py-1 text-sm"
//           />
//         </div>
//       </div>

//       {/* SOCIETY DETAILS */}
//       <div className="space-y-4">
//         {societies.map((s) => {
//           const orders = s.orders.filter((o) =>
//             activeCard === "all"
//               ? true
//               : activeCard === "collection"
//                 ? o.status === "Delivered"
//                 : o.status === activeCard,
//           );

//           if (!orders.length) return null;

//           return (
//             <div key={s.society} className="bg-white rounded-2xl shadow">
//               <button
//                 onClick={() =>
//                   setOpenSociety(openSociety === s.society ? null : s.society)
//                 }
//                 className="w-full flex justify-between items-center px-4 py-3 font-semibold"
//               >
//                 <span className="flex items-center gap-2">
//                   <MdApartment className="text-blue-500" /> {s.society}
//                 </span>
//                 <span className="text-xs text-slate-500">
//                   {orders.length} customers
//                 </span>
//               </button>

//               {openSociety === s.society && (
//                 <div className="divide-y">
//                   {orders.map((o) => (
//                     <div
//                       key={o.id}
//                       className="flex justify-between items-center px-4 py-3"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold">
//                           {o.name[0]}
//                         </div>
//                         <div>
//                           <p className="font-medium">{o.name}</p>
//                           <p className="text-xs text-slate-500">
//                             {o.flat} · ₹{o.amount} · {o.status}
//                           </p>
//                         </div>
//                       </div>
//                       <a
//                         href={`tel:${o.phone}`}
//                         className="bg-blue-100 text-blue-700 p-2 rounded-full"
//                       >
//                         <FiPhoneCall />
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function PremiumCard({ icon, label, value, color, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`bg-gradient-to-br ${color} text-white rounded-3xl p-5 shadow-xl flex flex-col gap-2 active:scale-95 transition relative overflow-hidden`}
//     >
//       <div className="absolute inset-0 bg-white/5" />
//       <div className="absolute -top-4 -right-4 text-white/20 text-6xl rotate-12">
//         {icon}
//       </div>
//       <p className="text-sm opacity-90 z-10">{label}</p>
//       <p className="text-3xl font-extrabold z-10">{value}</p>
//       <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30" />
//     </button>
//   );
// }


// import { useState, useMemo } from "react";
// import { FiPhoneCall, FiCalendar } from "react-icons/fi";
// import {
//   MdWaterDrop,
//   MdAssignment,
//   MdCheckCircle,
//   MdPendingActions,
//   MdPayments,
//   MdApartment,
// } from "react-icons/md";

// /* ---------------- DATA ---------------- */
// const DATA = {
//   "2026-01-04": {
//     daily: [
//       {
//         society: "Sunrise Heights",
//         orders: [
//           {
//             id: "D-101",
//             name: "Ramesh Kumar",
//             phone: "9876543210",
//             flat: "A-101",
//             status: "Delivered",
//             amount: 120,
//           },
//           {
//             id: "D-102",
//             name: "Neha Jain",
//             phone: "9876543214",
//             flat: "A-203",
//             status: "Pending",
//             amount: 120,
//           },
//         ],
//       },
//       {
//         society: "Green Valley",
//         orders: [
//           {
//             id: "D-103",
//             name: "Anita Sharma",
//             phone: "9876543212",
//             flat: "B-303",
//             status: "Delivered",
//             amount: 240,
//           },
//           {
//             id: "D-104",
//             name: "Vikram Singh",
//             phone: "9876543213",
//             flat: "B-101",
//             status: "Pending",
//             amount: 120,
//           },
//         ],
//       },
//     ],
//     subscription: [
//       {
//         society: "Palm Residency",
//         orders: [
//           {
//             id: "S-201",
//             name: "Mohit Verma",
//             phone: "9876543220",
//             flat: "C-305",
//             status: "Delivered",
//             amount: 90,
//           },
//           {
//             id: "S-202",
//             name: "Pooja Mehta",
//             phone: "9876543221",
//             flat: "C-401",
//             status: "Delivered",
//             amount: 90,
//           },
//         ],
//       },
//     ],
//   },
// };

// /* ---------------- MAIN ---------------- */
// export default function AdminDashboard() {
//   const [orderType, setOrderType] = useState("daily");
//   const [selectedDate, setSelectedDate] = useState("2026-01-04");
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [openSociety, setOpenSociety] = useState(null);

//   const societies = DATA[selectedDate]?.[orderType] || [];

//   const summary = useMemo(() => {
//     let total = 0,
//       delivered = 0,
//       pending = 0,
//       collection = 0;

//     societies.forEach((s) =>
//       s.orders.forEach((o) => {
//         total++;
//         if (o.status === "Delivered") {
//           delivered++;
//           collection += o.amount;
//         }
//         if (o.status === "Pending") pending++;
//       }),
//     );

//     return { total, delivered, pending, collection };
//   }, [societies]);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-md mx-auto lg:max-w-6xl p-4 space-y-6">
//         {/* HEADER */}
//         <div className="flex items-center gap-2">
//           <MdWaterDrop className="text-blue-600 text-2xl" />
//           <h1 className="text-lg font-semibold text-slate-900">
//             Water Supply Admin
//           </h1>
//         </div>

//         {/* COLOURFUL STAT CARDS */}
//         <StatCards summary={summary} setActiveFilter={setActiveFilter} />

//         {/* CONTROLS */}
//         <div className="bg-white border rounded-2xl p-4 space-y-4">
//           <div className="flex gap-2">
//             {["daily", "subscription"].map((t) => (
//               <button
//                 key={t}
//                 onClick={() => {
//                   setOrderType(t);
//                   setOpenSociety(null);
//                 }}
//                 className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
//                   orderType === t
//                     ? "bg-blue-600 text-white"
//                     : "bg-slate-100 text-slate-500"
//                 }`}
//               >
//                 {t === "daily" ? "Daily Orders" : "Subscriptions"}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center justify-between bg-slate-100 rounded-xl px-3 py-2">
//             <div className="flex items-center gap-2 text-sm font-medium">
//               <FiCalendar className="text-blue-600" />
//               {selectedDate}
//             </div>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => {
//                 setSelectedDate(e.target.value);
//                 setOpenSociety(null);
//               }}
//               className="bg-white rounded-lg px-2 py-1 text-sm"
//             />
//           </div>
//         </div>

//         {/* SOCIETY LIST */}
//         <div className="space-y-3">
//           {societies.map((s) => {
//             const orders = s.orders.filter((o) =>
//               activeFilter === "all"
//                 ? true
//                 : activeFilter === "collection"
//                 ? o.status === "Delivered"
//                 : o.status === activeFilter,
//             );

//             if (!orders.length) return null;

//             return (
//               <div
//                 key={s.society}
//                 className="bg-white border rounded-2xl overflow-hidden"
//               >
//                 <button
//                   onClick={() =>
//                     setOpenSociety(
//                       openSociety === s.society ? null : s.society,
//                     )
//                   }
//                   className="w-full flex justify-between items-center px-4 py-3"
//                 >
//                   <div>
//                     <p className="font-medium text-slate-900">
//                       {s.society}
//                     </p>
//                     <p className="text-xs text-slate-500">
//                       {orders.length} customers
//                     </p>
//                   </div>

//                   <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
//                     {Math.round(
//                       (orders.filter((o) => o.status === "Delivered").length /
//                         orders.length) *
//                         100,
//                     )}
//                     % done
//                   </span>
//                 </button>

//                 {openSociety === s.society && (
//                   <div className="divide-y">
//                     {orders.map((o) => (
//                       <div
//                         key={o.id}
//                         className="flex justify-between items-center px-4 py-3"
//                       >
//                         <div>
//                           <p className="font-medium">{o.name}</p>
//                           <p className="text-xs text-slate-500">
//                             {o.flat} · ₹{o.amount} · {o.status}
//                           </p>
//                         </div>

//                         <a
//                           href={`tel:${o.phone}`}
//                           className="bg-blue-50 text-blue-600 p-2 rounded-full"
//                         >
//                           <FiPhoneCall />
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- COLOURFUL STAT CARDS ---------------- */

// function StatCards({ summary, setActiveFilter }) {
//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//       <StatCard
//         label="Total Orders"
//         value={summary.total}
//         icon={<MdAssignment />}
//         bgIcon={<MdAssignment />}
//         gradient="from-blue-500 to-indigo-600"
//         onClick={() => setActiveFilter("all")}
//       />
//       <StatCard
//         label="Delivered"
//         value={summary.delivered}
//         icon={<MdCheckCircle />}
//         bgIcon={<MdCheckCircle />}
//         gradient="from-emerald-500 to-green-600"
//         onClick={() => setActiveFilter("Delivered")}
//       />
//       <StatCard
//         label="Pending"
//         value={summary.pending}
//         icon={<MdPendingActions />}
//         bgIcon={<MdPendingActions />}
//         gradient="from-amber-400 to-orange-500"
//         onClick={() => setActiveFilter("Pending")}
//       />
//       <StatCard
//         label="Collection"
//         value={`₹${summary.collection}`}
//         icon={<MdPayments />}
//         bgIcon={<MdPayments />}
//         gradient="from-fuchsia-500 to-purple-600"
//         onClick={() => setActiveFilter("collection")}
//       />
//     </div>
//   );
// }

// function StatCard({ label, value, icon, bgIcon, gradient, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`relative overflow-hidden rounded-3xl p-4 text-white
//       bg-gradient-to-br ${gradient}
//       shadow-lg active:scale-[0.96] transition-all`}
//     >
//       {/* BACKGROUND ICON */}
//       <div className="absolute -top-6 -right-6 text-white/20 text-[90px]">
//         {bgIcon}
//       </div>

//       {/* CONTENT */}
//       <div className="relative z-10 flex flex-col gap-4">
//         <span className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
//           {icon}
//         </span>

//         <div>
//           <p className="text-sm font-medium opacity-90">{label}</p>
//           <p className="text-3xl font-extrabold tracking-tight">{value}</p>
//         </div>
//       </div>
//     </button>
//   );
// }




import { useState, useMemo, useEffect } from "react";
import { FiPhoneCall, FiCalendar } from "react-icons/fi";
import {
  MdWaterDrop,
  MdAssignment,
  MdCheckCircle,
  MdPendingActions,
  MdPayments,
  MdApartment,
} from "react-icons/md";
import CountUp from "react-countup";

/* ---------------- DATA ---------------- */
const DATA = {
  "2026-01-04": {
    daily: [
      {
        society: "Sunrise Heights",
        orders: [
          {
            id: "D-101",
            name: "Ramesh Kumar",
            phone: "9876543210",
            flat: "A-101",
            status: "Delivered",
            amount: 120,
          },
          {
            id: "D-102",
            name: "Neha Jain",
            phone: "9876543214",
            flat: "A-203",
            status: "Pending",
            amount: 120,
          },
        ],
      },
      {
        society: "Green Valley",
        orders: [
          {
            id: "D-103",
            name: "Anita Sharma",
            phone: "9876543212",
            flat: "B-303",
            status: "Delivered",
            amount: 240,
          },
          {
            id: "D-104",
            name: "Vikram Singh",
            phone: "9876543213",
            flat: "B-101",
            status: "Pending",
            amount: 120,
          },
        ],
      },
    ],
    subscription: [
      {
        society: "Palm Residency",
        orders: [
          {
            id: "S-201",
            name: "Mohit Verma",
            phone: "9876543220",
            flat: "C-305",
            status: "Delivered",
            amount: 90,
          },
          {
            id: "S-202",
            name: "Pooja Mehta",
            phone: "9876543221",
            flat: "C-401",
            status: "Delivered",
            amount: 90,
          },
        ],
      },
    ],
  },
};

/* ---------------- MAIN ---------------- */
export default function AdminDashboard() {
  const [orderType, setOrderType] = useState("daily");
  const [selectedDate, setSelectedDate] = useState("2026-01-04");
  const [activeFilter, setActiveFilter] = useState("all");
  const [openSociety, setOpenSociety] = useState(null);

  const societies = DATA[selectedDate]?.[orderType] || [];

  const summary = useMemo(() => {
    let total = 0,
      delivered = 0,
      pending = 0,
      collection = 0;

    societies.forEach((s) =>
      s.orders.forEach((o) => {
        total++;
        if (o.status === "Delivered") {
          delivered++;
          collection += o.amount;
        }
        if (o.status === "Pending") pending++;
      }),
    );

    return { total, delivered, pending, collection };
  }, [societies]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto lg:max-w-6xl p-4 space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-2">
          <MdWaterDrop className="text-blue-600 text-2xl" />
          <h1 className="text-lg font-semibold text-slate-900">
            Water Supply Admin
          </h1>
        </div>

        {/* COLOURFUL STAT CARDS */}
        <StatCards summary={summary} setActiveFilter={setActiveFilter} />

        {/* CONTROLS */}
        <div className="bg-white border rounded-2xl p-4 space-y-4">
          <div className="flex gap-2">
            {["daily", "subscription"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setOrderType(t);
                  setOpenSociety(null);
                }}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                  orderType === t
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {t === "daily" ? "Daily Orders" : "Subscriptions"}
              </button>
            ))}
          </div>

          {/* DATE PICKER */}
          <div className="flex items-center justify-between bg-slate-100 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <FiCalendar className="text-blue-600 text-lg" />
              {selectedDate}
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setOpenSociety(null);
              }}
              className="bg-white rounded-lg px-3 py-1 text-sm border border-slate-300 shadow-sm"
            />
          </div>
        </div>

        {/* SOCIETY LIST */}
        <div className="space-y-3">
          {societies.map((s) => {
            const orders = s.orders.filter((o) =>
              activeFilter === "all"
                ? true
                : activeFilter === "collection"
                ? o.status === "Delivered"
                : o.status === activeFilter,
            );

            if (!orders.length) return null;

            return (
              <div
                key={s.society}
                className="bg-white border rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() =>
                    setOpenSociety(
                      openSociety === s.society ? null : s.society,
                    )
                  }
                  className="w-full flex justify-between items-center px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-slate-900">{s.society}</p>
                    <p className="text-xs text-slate-500">
                      {orders.length} customers
                    </p>
                  </div>

                  <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                    {Math.round(
                      (orders.filter((o) => o.status === "Delivered").length /
                        orders.length) *
                        100,
                    )}
                    % done
                  </span>
                </button>

                {openSociety === s.society && (
                  <div className="divide-y">
                    {orders.map((o) => (
                      <div
                        key={o.id}
                        className="flex justify-between items-center px-4 py-3"
                      >
                        <div>
                          <p className="font-medium">{o.name}</p>
                          <p className="text-xs text-slate-500">
                            {o.flat} · ₹{o.amount} · {o.status}
                          </p>
                        </div>

                        <a
                          href={`tel:${o.phone}`}
                          className="bg-blue-50 text-blue-600 p-2 rounded-full"
                        >
                          <FiPhoneCall />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- PREMIUM STAT CARDS ---------------- */
function StatCards({ summary, setActiveFilter }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Orders"
        value={summary.total}
        icon={<MdAssignment />}
        gradient="from-blue-400 to-blue-600"
        onClick={() => setActiveFilter("all")}
      />
      <StatCard
        label="Delivered"
        value={summary.delivered}
        icon={<MdCheckCircle />}
        gradient="from-emerald-400 to-green-600"
        onClick={() => setActiveFilter("Delivered")}
      />
      <StatCard
        label="Pending"
        value={summary.pending}
        icon={<MdPendingActions />}
        gradient="from-amber-400 to-orange-500"
        onClick={() => setActiveFilter("Pending")}
      />
      <StatCard
        label="Collection"
        value={summary.collection}
        icon={<MdPayments />}
        gradient="from-fuchsia-400 to-purple-600"
        onClick={() => setActiveFilter("collection")}
      />
    </div>
  );
}

function StatCard({ label, value, icon, gradient, onClick }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(value);
  }, [value]);

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl p-4 text-white
      bg-gradient-to-br ${gradient}
      shadow-lg active:scale-[0.96] transition-all`}
    >
      {/* ICON */}
      <div className="absolute -top-6 -right-6 text-white/20 text-[90px]">
        {icon}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col gap-4">
        <span className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
          {icon}
        </span>

        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="text-3xl font-extrabold tracking-tight">
            <CountUp end={count} duration={1.2} separator="," />
          </p>
        </div>
      </div>
    </button>
  );
}
