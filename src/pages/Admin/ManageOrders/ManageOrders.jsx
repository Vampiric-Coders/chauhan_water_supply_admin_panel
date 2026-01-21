// import { useState, useMemo } from "react";
// import { FiSearch, FiCalendar } from "react-icons/fi";

// const ORDERS = [
//   {
//     id: "ORD-501",
//     name: "Aman Gupta",
//     phone: "9876500011",
//     society: "Sunrise Heights",
//     flat: "A-101",
//     date: "2026-01-04",
//     type: "order",
//     orderStatus: "Pending",
//     amountStatus: "Pending"
//   },
//   {
//     id: "ORD-502",
//     name: "Karan Mehta",
//     phone: "9876500012",
//     society: "Green Valley",
//     flat: "B-205",
//     date: "2026-01-04",
//     type: "order",
//     orderStatus: "Out for Delivery",
//     amountStatus: "Pending"
//   },
//   {
//     id: "ORD-503",
//     name: "Priya Sharma",
//     phone: "9876500013",
//     society: "Palm Residency",
//     flat: "C-310",
//     date: "2026-01-04",
//     type: "order",
//     orderStatus: "Delivered",
//     amountStatus: "Paid"
//   },
// ];

// export default function ManageOrders() {
//   const today = "2026-01-04";

//   const [data, setData] = useState(ORDERS);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");

//   const updateOrderStatus = (id, v) =>
//     setData(p => p.map(o => (o.id === id ? { ...o, orderStatus: v } : o)));

//   const updateAmountStatus = (id, v) =>
//     setData(p => p.map(o => (o.id === id ? { ...o, amountStatus: v } : o)));

//   const filtered = useMemo(
//     () =>
//       data.filter(o => {
//         const q = search.toLowerCase();
//         if (
//           q &&
//           !(
//             o.name.toLowerCase().includes(q) ||
//             o.phone.includes(q) ||
//             o.id.toLowerCase().includes(q)
//           )
//         )
//           return false;

//         if (status !== "All" && o.orderStatus !== status) return false;

//         return true;
//       }),
//     [search, status, data]
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

//       {/* PAGE TITLE */}
//       <h1 className="text-2xl font-bold text-slate-800 p-5">
//         Orders
//         <span className="text-blue-500"> Management</span>
//       </h1>

//       {/* MAIN CARD */}
//       <div className=" backdrop-blur-xl border border-white p-6">

//         {/* FILTER BAR */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

//           <Input
//             icon={<FiSearch />}
//             placeholder="Search customer / phone / order id"
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//           />

//           <select
//             value={status}
//             onChange={e => setStatus(e.target.value)}
//             className="rounded-2xl px-4 py-3 bg-blue-50 text-blue-700 font-medium outline-none"
//           >
//             <option>All</option>
//             <option>Pending</option>
//             <option>Out for Delivery</option>
//             <option>Delivered</option>
//           </select>

//           <button
//             onClick={() => {
//               setSearch("");
//               setStatus("All");
//             }}
//             className="rounded-2xl px-4 py-3 bg-blue-600 text-white shadow hover:scale-[.99] transition"
//           >
//             Clear Filters
//           </button>
//         </div>

//         {/* LIST */}
//         <div className="mt-5 space-y-3">

//           {filtered.map(o => (
//             <div
//               key={o.id}
//               className={`rounded-2xl p-4 shadow-sm border transition
//               ${
//                 o.amountStatus === "Paid"
//                   ? "bg-green-50 border-green-200"
//                   : "bg-blue-50 border-blue-100"
//               }
//             `}
//             >
//               <div className="flex justify-between items-center">
//                 <p className="font-semibold text-slate-800">{o.name}</p>
//                 <Status status={o.orderStatus} />
//               </div>

//               <p className="text-sm text-slate-600 mt-1">{o.phone}</p>
//               <p className="text-sm text-slate-600">
//                 {o.society} • {o.flat}
//               </p>

//               {/* DROPDOWNS */}
//               <div className="grid grid-cols-2 gap-3 mt-3">

//                 <PremiumSelect
//                   value={o.orderStatus}
//                   onChange={e => updateOrderStatus(o.id, e.target.value)}
//                   options={["Pending", , "Delivered"]}
//                 />

//                 <PremiumSelect
//                   value={o.amountStatus}
//                   onChange={e => updateAmountStatus(o.id, e.target.value)}
//                   options={["Pending", "Paid"]}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* INPUT */
// function Input({ icon, ...props }) {
//   return (
//     <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-inner">
//       <span className="text-blue-500">{icon}</span>
//       <input {...props} className="bg-transparent outline-none w-full" />
//     </div>
//   );
// }

// /* STATUS BADGE */
// function Status({ status }) {
//   const styles = {
//     Pending: "bg-red-100 text-red-700",
//     "Out for Delivery": "bg-yellow-100 text-yellow-700",
//     Delivered: "bg-green-100 text-green-700",
//   };

//   return (
//     <span className={`px-3 py-1 text-xs rounded-full ${styles[status]}`}>
//       {status}
//     </span>
//   );
// }

// /* BLUE PREMIUM SELECT */
// function PremiumSelect({ value, onChange, options }) {
//   return (
//     <select
//       value={value}
//       onChange={onChange}
//       className="rounded-xl px-3 py-2 bg-white text-slate-700 shadow border outline-none"
//     >
//       {options.map(o => (
//         <option key={o}>{o}</option>
//       ))}
//     </select>
//   );
// }

// import { useState, useMemo } from "react";
// import { FiSearch } from "react-icons/fi";

// /* DUMMY DATA */
// const ORDERS = [
//   {
//     id: "ORD-501",
//     name: "Aman Gupta",
//     phone: "9876500011",
//     society: "Sunrise Heights",
//     flat: "A-101",
//     date: "2026-01-04",
//     orderStatus: "Pending",
//     amountStatus: "Pending",
//   },
//   {
//     id: "ORD-502",
//     name: "Karan Mehta",
//     phone: "9876500012",
//     society: "Green Valley",
//     flat: "B-205",
//     date: "2026-01-04",
//     orderStatus: "Out for Delivery",
//     amountStatus: "Pending",
//   },
//   {
//     id: "ORD-503",
//     name: "Priya Sharma",
//     phone: "9876500013",
//     society: "Palm Residency",
//     flat: "C-310",
//     date: "2026-01-04",
//     orderStatus: "Delivered",
//     amountStatus: "Paid",
//   },
// ];

// export default function ManageOrders() {
//   const [data, setData] = useState(ORDERS);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");

//   const updateOrderStatus = (id, value) => {
//     setData(prev =>
//       prev.map(o => (o.id === id ? { ...o, orderStatus: value } : o))
//     );
//   };

//   const updateAmountStatus = (id, value) => {
//     setData(prev =>
//       prev.map(o => (o.id === id ? { ...o, amountStatus: value } : o))
//     );
//   };

//   const filtered = useMemo(() => {
//     return data.filter(o => {
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

//       if (status !== "All" && o.orderStatus !== status) return false;

//       return true;
//     });
//   }, [search, status, data]);

//   return (
//     <div className="min-h-screen bg-blue-50 p-5">

//       {/* TITLE */}
//       <h1 className="text-2xl font-bold text-slate-800 mb-4">
//         📦 Orders <span className="text-blue-600">Management</span>
//       </h1>

//       {/* FILTERS */}
//       <div className="bg-white p-4 rounded-2xl shadow mb-5 grid grid-cols-1 md:grid-cols-3 gap-3">
//         <Input
//           icon={<FiSearch />}
//           placeholder="Customer name / phone / order id"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />

//         <select
//           value={status}
//           onChange={e => setStatus(e.target.value)}
//           className="rounded-xl px-4 py-3 bg-blue-50 text-blue-700 font-semibold outline-none"
//         >
//           <option value="All">All Orders</option>
//           <option value="Pending">Pending</option>
//           <option value="Out for Delivery">Out for Delivery</option>
//           <option value="Delivered">Delivered</option>
//         </select>

//         <button
//           onClick={() => {
//             setSearch("");
//             setStatus("All");
//           }}
//           className="rounded-2xl px-4 py-3 bg-blue-600 text-white shadow hover:scale-[.99] transition"
//         >
//            Clear Filters
//         </button>
//       </div>

//       {/* ORDER LIST */}
//       <div className="space-y-4">
//         {filtered.map(o => (
//           <div
//             key={o.id}
//             className={`rounded-2xl p-4 border shadow
//               ${
//                 o.amountStatus === "Paid"
//                   ? "bg-green-50 border-green-200"
//                   : "bg-white border-slate-200"
//               }
//             `}
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-center">
//               <p className="font-bold text-lg">{o.name}</p>
//               <Status status={o.orderStatus} />
//             </div>

//             {/* INFO */}
//             <p className="text-sm text-slate-600 mt-1">📞 {o.phone}</p>
//             <p className="text-sm text-slate-600">
//               🏠 {o.society}, Flat {o.flat}
//             </p>
//             <p className="text-xs text-slate-500 mt-1">Order ID: {o.id}</p>

//             {/* ACTIONS */}
//             <div className="grid grid-cols-2 gap-4 mt-4">

//               <div>
//                 <p className="text-xs text-slate-500 mb-1">🚚 Delivery Status</p>
//                 <PremiumSelect
//                   value={o.orderStatus}
//                   onChange={e => updateOrderStatus(o.id, e.target.value)}
//                   options={["Pending", "Out for Delivery", "Delivered"]}
//                 />
//               </div>

//               <div>
//                 <p className="text-xs text-slate-500 mb-1">💰 Payment Status</p>
//                 <PremiumSelect
//                   value={o.amountStatus}
//                   onChange={e => updateAmountStatus(o.id, e.target.value)}
//                   options={["Pending", "Paid"]}
//                   disabled={o.amountStatus === "Paid"}
//                 />
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* INPUT */
// function Input({ icon, ...props }) {
//   return (
//     <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3">
//       <span className="text-blue-500">{icon}</span>
//       <input {...props} className="bg-transparent outline-none w-full" />
//     </div>
//   );
// }

// /* STATUS BADGE */
// function Status({ status }) {
//   const styles = {
//     Pending: "bg-red-100 text-red-700",
//     "Out for Delivery": "bg-yellow-100 text-yellow-800",
//     Delivered: "bg-green-100 text-green-700",
//   };

//   const icons = {
//     Pending: "⏳",
//     "Out for Delivery": "🚚",
//     Delivered: "✅",
//   };

//   return (
//     <span
//       className={`px-3 py-1 text-xs rounded-full font-semibold ${styles[status]}`}
//     >
//       {icons[status]} {status}
//     </span>
//   );
// }

// /* SELECT */
// function PremiumSelect({ value, onChange, options, disabled }) {
//   return (
//     <select
//       value={value}
//       onChange={onChange}
//       disabled={disabled}
//       className={`w-full rounded-xl px-3 py-2 border outline-none
//         ${
//           disabled
//             ? "bg-green-100 text-green-700 cursor-not-allowed"
//             : "bg-white text-slate-700"
//         }
//       `}
//     >
//       {options.map(o => (
//         <option key={o} value={o}>
//           {o}
//         </option>
//       ))}
//     </select>
//   );
// }

// import { useState, useMemo } from "react";
// import { FiSearch } from "react-icons/fi";

// /* DATA */
// const DATA = [
//   {
//     id: "ORD-501",
//     name: "Aman Gupta",
//     phone: "9876500011",
//     society: "Sunrise Heights",
//     flat: "A-101",
//     type: "order",
//     orderStatus: "Pending",
//     amountStatus: "Pending",
//   },
//   {
//     id: "SUB-201",
//     name: "Vikram Malhotra",
//     phone: "9876500019",
//     society: "Palm Residency",
//     flat: "D-402",
//     type: "subscription",
//     orderStatus: "Out for Delivery",
//     amountStatus: "Pending",
//   },
//   {
//     id: "ORD-503",
//     name: "Priya Sharma",
//     phone: "9876500013",
//     society: "Palm Residency",
//     flat: "C-310",
//     type: "order",
//     orderStatus: "Delivered",
//     amountStatus: "Paid",
//   },
// ];

// export default function ManageOrders() {
//   const [tab, setTab] = useState("Orders");
//   const [data, setData] = useState(DATA);
//   const [search, setSearch] = useState("");

//   const filtered = useMemo(() => {
//     return data.filter(o => {
//       if (tab === "Orders" && o.type !== "order") return false;
//       if (tab === "Subscriptions" && o.type !== "subscription") return false;

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

//       return true;
//     });
//   }, [tab, search, data]);

//   const update = (id, key, value) => {
//     setData(prev =>
//       prev.map(o => (o.id === id ? { ...o, [key]: value } : o))
//     );
//   };

//   const cardColor = o => {
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Paid")
//       return "bg-green-50 border-green-200";
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Pending")
//       return "bg-yellow-50 border-yellow-200";
//     if (o.orderStatus === "Out for Delivery")
//       return "bg-blue-50 border-blue-200";
//     return "bg-white border-slate-200";
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-3">

//       <h1 className="text-xl font-bold mb-3 text-slate-800">
//         💧 Manage <span className="text-blue-600">Deliveries</span>
//       </h1>

//       {/* TABS */}
//       <div className="flex gap-6 border-b mb-3 sticky top-0 bg-blue-50 z-10">
//         {["Orders", "Subscriptions"].map(t => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`pb-2 font-semibold ${
//               tab === t
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-slate-500"
//             }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* SEARCH */}
//       <Input
//         icon={<FiSearch />}
//         placeholder="Search name / phone / id"
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />

//       {/* LIST */}
//       <div className="space-y-4 mt-4">
//         {filtered.map(o => (
//           <div
//             key={o.id}
//             className={`rounded-2xl p-4 shadow border ${cardColor(o)}`}
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="font-bold">{o.name}</p>
//                 <p className="text-xs text-slate-500">{o.id}</p>
//               </div>
//               <Status status={o.orderStatus} />
//             </div>

//             <p className="text-sm text-slate-600 mt-1">📞 {o.phone}</p>
//             <p className="text-sm text-slate-600">
//               🏠 {o.society}, {o.flat}
//             </p>

//             {/* ACTIONS */}
//             <div className="grid grid-cols-2 gap-3 mt-4">
//               <div>
//                 <p className="text-xs text-slate-500 mb-1">🚚 Delivery</p>
//                 <PremiumSelect
//                   value={o.orderStatus}
//                   onChange={e =>
//                     update(o.id, "orderStatus", e.target.value)
//                   }
//                   options={["Pending", "Out for Delivery", "Delivered"]}
//                 />
//               </div>

//               <div>
//                 <p className="text-xs text-slate-500 mb-1">💰 Payment</p>
//                 <PremiumSelect
//                   value={o.amountStatus}
//                   onChange={e =>
//                     update(o.id, "amountStatus", e.target.value)
//                   }
//                   options={["Pending", "Paid"]}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* COMPONENTS */

// function Input({ icon, ...props }) {
//   return (
//     <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow">
//       <span className="text-blue-500">{icon}</span>
//       <input {...props} className="outline-none w-full text-sm" />
//     </div>
//   );
// }

// function Status({ status }) {
//   const map = {
//     Pending: "bg-slate-200 text-slate-700",
//     "Out for Delivery": "bg-blue-100 text-blue-700",
//     Delivered: "bg-green-100 text-green-700",
//   };
//   return (
//     <span className={`px-3 py-1 rounded-full text-xs ${map[status]}`}>
//       {status}
//     </span>
//   );
// }

// function PremiumSelect({ value, onChange, options }) {
//   return (
//     <select
//       value={value}
//       onChange={onChange}
//       className="w-full rounded-xl px-3 py-2 border bg-white text-slate-700 outline-none"
//     >
//       {options.map(o => (
//         <option key={o} value={o}>
//           {o}
//         </option>
//       ))}
//     </select>
//   );
// }

// import { useState, useMemo } from "react";
// import { FiSearch } from "react-icons/fi";

// /* DATA - larger dataset for testing */
// const DATA = [
//   { id: "ORD-501", name: "Aman Gupta", phone: "9876500011", society: "Sunrise Heights", flat: "A-101", type: "order", orderStatus: "Pending", amountStatus: "Pending" },
//   { id: "ORD-502", name: "Karan Mehta", phone: "9876500012", society: "Green Valley", flat: "B-205", type: "order", orderStatus: "Pending", amountStatus: "Paid" },
//   { id: "ORD-503", name: "Ravi Sharma", phone: "9876500013", society: "Blue Ridge", flat: "C-301", type: "order", orderStatus: "Out for Delivery", amountStatus: "Pending" },
//   { id: "ORD-504", name: "Neha Kapoor", phone: "9876500014", society: "Sunrise Heights", flat: "A-102", type: "order", orderStatus: "Out for Delivery", amountStatus: "Paid" },
//   { id: "ORD-505", name: "Sahil Verma", phone: "9876500015", society: "Green Valley", flat: "B-206", type: "order", orderStatus: "Delivered", amountStatus: "Pending" },
//   { id: "ORD-506", name: "Anjali Singh", phone: "9876500016", society: "Blue Ridge", flat: "C-302", type: "order", orderStatus: "Delivered", amountStatus: "Paid" },
//   { id: "SUB-201", name: "Vikram Malhotra", phone: "9876500019", society: "Palm Residency", flat: "D-402", type: "subscription", todayDelivered: false, amountStatus: "Pending" },
//   { id: "SUB-202", name: "Pooja Jain", phone: "9876500020", society: "Palm Residency", flat: "D-403", type: "subscription", todayDelivered: true, amountStatus: "Paid" },
//   { id: "SUB-203", name: "Amitabh Roy", phone: "9876500021", society: "Sunrise Heights", flat: "A-103", type: "subscription", todayDelivered: false, amountStatus: "Pending" },
//   { id: "SUB-204", name: "Ritu Sharma", phone: "9876500022", society: "Green Valley", flat: "B-207", type: "subscription", todayDelivered: true, amountStatus: "Paid" },
// ];

// /* MAIN COMPONENT */
// export default function ManageDeliveries() {
//   const [tab, setTab] = useState("Orders");
//   const [data, setData] = useState(DATA);
//   const [search, setSearch] = useState("");

//   /* SUMMARY */
//   const summaryOrders = useMemo(() => {
//     const orders = data.filter((d) => d.type === "order");
//     return {
//       total: orders.length,
//       pending: orders.filter((d) => d.orderStatus !== "Delivered").length,
//       unpaid: orders.filter((d) => d.amountStatus === "Pending").length,
//     };
//   }, [data]);

//   const summarySubs = useMemo(() => {
//     const subs = data.filter((d) => d.type === "subscription");
//     return {
//       total: subs.length,
//       pending: subs.filter((d) => !d.todayDelivered).length,
//       unpaid: subs.filter((d) => d.amountStatus === "Pending").length,
//     };
//   }, [data]);

//   /* FILTER */
//   const filtered = useMemo(() => {
//     return data.filter((o) => {
//       if (tab === "Orders" && o.type !== "order") return false;
//       if (tab === "Subscriptions" && o.type !== "subscription") return false;

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

//       return true;
//     });
//   }, [tab, search, data]);

//   const update = (id, key, value) => {
//     setData((prev) =>
//       prev.map((o) => (o.id === id ? { ...o, [key]: value } : o))
//     );
//   };

//   const refreshSort = () => {
//     setData([...data].sort((a, b) => priority(b) - priority(a)));
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-3 sm:p-5 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
//         💧 Manage <span className="text-blue-600">Deliveries</span>
//       </h1>

//       {/* SUMMARY BAR */}
//       <SummaryBar
//         tab={tab}
//         summaryOrders={summaryOrders}
//         summarySubs={summarySubs}
//         onRefresh={refreshSort}
//       />

//       {/* TABS */}
//       <div className="flex gap-6 border-b mb-3 overflow-x-auto">
//         {["Orders", "Subscriptions"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`flex-shrink-0 pb-2 font-semibold text-sm sm:text-base md:text-lg ${
//               tab === t
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-slate-500"
//             }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* SEARCH */}
//       <Input
//         icon={<FiSearch />}
//         placeholder="Search name / phone / id"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* LIST */}
//       <div className="space-y-4 mt-4">
//         {filtered.map((o) => (
//           <div
//             key={o.id}
//             className={`rounded-2xl p-4 shadow border ${cardColor(o)}`}
//           >
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//               <div>
//                 <p className="font-bold text-base sm:text-lg">{o.name}</p>
//                 <p className="text-xs sm:text-sm text-slate-500">{o.id}</p>
//               </div>
//               <div className="mt-2 sm:mt-0">
//                 <Status o={o} />
//               </div>
//             </div>

//             <p className="text-sm sm:text-base text-slate-600 mt-2">📞 {o.phone}</p>
//             <p className="text-sm sm:text-base text-slate-600">
//               🏠 {o.society}, {o.flat}
//             </p>

//             {/* DROPDOWNS */}
//             <div className="flex flex-col sm:flex-row gap-3 mt-4">
//               {o.type === "order" ? (
//                 <>
//                   <Dropdown
//                     label="Order Status"
//                     options={["Pending", "Out for Delivery", "Delivered"]}
//                     value={o.orderStatus}
//                     onChange={(val) => update(o.id, "orderStatus", val)}
//                   />
//                   <Dropdown
//                     label="Payment Status"
//                     options={["Pending", "Paid"]}
//                     value={o.amountStatus}
//                     onChange={(val) => update(o.id, "amountStatus", val)}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Dropdown
//                     label="Today Delivered"
//                     options={["No", "Yes"]}
//                     value={o.todayDelivered ? "Yes" : "No"}
//                     onChange={(val) =>
//                       update(o.id, "todayDelivered", val === "Yes")
//                     }
//                   />
//                   <Dropdown
//                     label="Payment Status"
//                     options={["Pending", "Paid"]}
//                     value={o.amountStatus}
//                     onChange={(val) => update(o.id, "amountStatus", val)}
//                   />
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* SUMMARY BAR COMPONENT */
// function SummaryBar({ tab, summaryOrders, summarySubs, onRefresh }) {
//   const summary = tab === "Orders" ? summaryOrders : summarySubs;
//   return (
//     <div className="sticky top-0 z-20 bg-white rounded-xl shadow p-3 mb-3 flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base gap-2 sm:gap-0">
//       <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
//         <span>🚚 Total: {summary.total}</span>
//         <span className="text-yellow-700">⏳ Pending: {summary.pending}</span>
//         <span className="text-red-700">💰 Unpaid: {summary.unpaid}</span>
//       </div>
//       <button
//         onClick={onRefresh}
//         className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-xl text-sm sm:text-base font-semibold shadow-sm hover:bg-blue-100"
//       >
//         🔄 Refresh / Sort
//       </button>
//     </div>
//   );
// }

// /* PRIORITY SORT */
// const priority = (o) => {
//   if (o.type === "order") {
//     if (o.orderStatus === "Pending" && o.amountStatus === "Pending") return 4;
//     if (o.orderStatus === "Pending" && o.amountStatus === "Paid") return 3;
//     if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Pending") return 2;
//     if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Paid") return 1;
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Pending") return 0;
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Paid") return -1;
//   } else {
//     // Subscription cards
//     if (!o.todayDelivered && o.amountStatus === "Pending") return 4;
//     if (!o.todayDelivered && o.amountStatus === "Paid") return 3;
//     if (o.todayDelivered && o.amountStatus === "Pending") return 2;
//     if (o.todayDelivered && o.amountStatus === "Paid") return 1;
//   }
//   return 0;
// };

// /* CARD COLOR LOGIC */
// const cardColor = (o) => {
//   if (o.type === "order") {
//     if (o.orderStatus === "Pending" && o.amountStatus === "Pending") return "bg-white border-slate-200";
//     if (o.orderStatus === "Pending" && o.amountStatus === "Paid") return "bg-blue-50 border-blue-200";
//     if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Pending") return "bg-purple-50 border-purple-200";
//     if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Paid") return "bg-indigo-50 border-indigo-200";
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Pending") return "bg-yellow-50 border-yellow-200";
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Paid") return "bg-green-50 border-green-200";
//   } else {
//     // Subscription cards
//     if (!o.todayDelivered && o.amountStatus === "Pending") return "bg-white border-slate-200";
//     if (!o.todayDelivered && o.amountStatus === "Paid") return "bg-blue-50 border-blue-200";
//     if (o.todayDelivered && o.amountStatus === "Pending") return "bg-yellow-50 border-yellow-200";
//     if (o.todayDelivered && o.amountStatus === "Paid") return "bg-green-50 border-green-200";
//   }
//   return "bg-white border-slate-200";
// };

// /* COMPONENTS */
// function Input({ icon, ...props }) {
//   return (
//     <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow mb-3">
//       <span className="text-blue-500">{icon}</span>
//       <input {...props} className="outline-none w-full text-sm sm:text-base" />
//     </div>
//   );
// }

// function Status({ o }) {
//   if (o.type === "subscription")
//     return (
//       <span
//         className={`text-xs sm:text-sm px-3 py-1 rounded-full ${
//           o.todayDelivered ? "bg-green-100 text-green-700" : "bg-slate-200"
//         }`}
//       >
//         {o.todayDelivered ? "🚰 Delivered" : "⏳ Pending"}
//       </span>
//     );

//   const map = {
//     Pending: "⏳",
//     "Out for Delivery": "🚚",
//     Delivered: "✅",
//   };

//   return (
//     <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-slate-200">
//       {map[o.orderStatus]} {o.orderStatus}
//     </span>
//   );
// }

// function Dropdown({ label, options, value, onChange }) {
//   return (
//     <div className="flex flex-col w-full sm:w-1/2">
//       <label className="text-xs sm:text-sm text-slate-500 mb-1">{label}</label>
//       <select
//         className="p-2 rounded-xl border outline-none text-sm sm:text-base bg-white"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       >
//         {options.map((opt) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// import { useState, useMemo } from "react";
// import { FiSearch } from "react-icons/fi";

// /* DATA - larger dataset for testing */
// const DATA = [
//   {
//     id: "ORD-501",
//     name: "Aman Gupta",
//     phone: "9876500011",
//     society: "Sunrise Heights",
//     flat: "A-101",
//     type: "order",
//     orderStatus: "Pending",
//     amountStatus: "Pending",
//   },
//   {
//     id: "ORD-502",
//     name: "Karan Mehta",
//     phone: "9876500012",
//     society: "Green Valley",
//     flat: "B-205",
//     type: "order",
//     orderStatus: "Pending",
//     amountStatus: "Paid",
//   },
//   {
//     id: "ORD-503",
//     name: "Ravi Sharma",
//     phone: "9876500013",
//     society: "Blue Ridge",
//     flat: "C-301",
//     type: "order",
//     orderStatus: "Out for Delivery",
//     amountStatus: "Pending",
//   },
//   {
//     id: "ORD-504",
//     name: "Neha Kapoor",
//     phone: "9876500014",
//     society: "Sunrise Heights",
//     flat: "A-102",
//     type: "order",
//     orderStatus: "Out for Delivery",
//     amountStatus: "Paid",
//   },
//   {
//     id: "ORD-505",
//     name: "Sahil Verma",
//     phone: "9876500015",
//     society: "Green Valley",
//     flat: "B-206",
//     type: "order",
//     orderStatus: "Delivered",
//     amountStatus: "Pending",
//   },
//   {
//     id: "ORD-506",
//     name: "Anjali Singh",
//     phone: "9876500016",
//     society: "Blue Ridge",
//     flat: "C-302",
//     type: "order",
//     orderStatus: "Delivered",
//     amountStatus: "Paid",
//   },
//   {
//     id: "SUB-201",
//     name: "Vikram Malhotra",
//     phone: "9876500019",
//     society: "Palm Residency",
//     flat: "D-402",
//     type: "subscription",
//     todayDelivered: false,
//     amountStatus: "Pending",
//   },
//   {
//     id: "SUB-202",
//     name: "Pooja Jain",
//     phone: "9876500020",
//     society: "Palm Residency",
//     flat: "D-403",
//     type: "subscription",
//     todayDelivered: true,
//     amountStatus: "Paid",
//   },
//   {
//     id: "SUB-203",
//     name: "Amitabh Roy",
//     phone: "9876500021",
//     society: "Sunrise Heights",
//     flat: "A-103",
//     type: "subscription",
//     todayDelivered: false,
//     amountStatus: "Pending",
//   },
//   {
//     id: "SUB-204",
//     name: "Ritu Sharma",
//     phone: "9876500022",
//     society: "Green Valley",
//     flat: "B-207",
//     type: "subscription",
//     todayDelivered: true,
//     amountStatus: "Paid",
//   },
// ];

// /* MAIN COMPONENT */
// export default function ManageDeliveries() {
//   const [tab, setTab] = useState("Orders");
//   const [data, setData] = useState(DATA);
//   const [search, setSearch] = useState("");

//   /* SUMMARY */
//   const summaryOrders = useMemo(() => {
//     const orders = data.filter((d) => d.type === "order");
//     return {
//       total: orders.length,
//       pending: orders.filter((d) => d.orderStatus !== "Delivered").length,
//       unpaid: orders.filter((d) => d.amountStatus === "Pending").length,
//     };
//   }, [data]);

//   const summarySubs = useMemo(() => {
//     const subs = data.filter((d) => d.type === "subscription");
//     return {
//       total: subs.length,
//       pending: subs.filter((d) => !d.todayDelivered).length,
//       unpaid: subs.filter((d) => d.amountStatus === "Pending").length,
//     };
//   }, [data]);

//   /* FILTER */
//   const filtered = useMemo(() => {
//     return data.filter((o) => {
//       if (tab === "Orders" && o.type !== "order") return false;
//       if (tab === "Subscriptions" && o.type !== "subscription") return false;

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

//       return true;
//     });
//   }, [tab, search, data]);

//   const update = (id, key, value) => {
//     setData((prev) =>
//       prev.map((o) => (o.id === id ? { ...o, [key]: value } : o)),
//     );
//   };

//   const refreshSort = () => {
//     setData([...data].sort((a, b) => priority(b) - priority(a)));
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-3 sm:p-5 md:p-8">
//       {/* HEADING + REFRESH BUTTON */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-3">
//         <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
//           💧 Manage <span className="text-blue-600">Deliveries</span>
//         </h1>
//         <button
//           onClick={refreshSort}
//           className="flex items-center gap-1 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl text-sm sm:text-base font-semibold shadow-sm hover:bg-blue-100"
//         >
//           🔄 Refresh / Sort
//         </button>
//       </div>

//       {/* SUMMARY BAR */}
//       <SummaryBar
//         tab={tab}
//         summaryOrders={summaryOrders}
//         summarySubs={summarySubs}
//       />

//       {/* TABS */}
//       <div className="flex gap-6 border-b mb-3 overflow-x-auto">
//         {["Orders", "Subscriptions"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`flex-shrink-0 pb-2 font-semibold text-sm sm:text-base md:text-lg ${
//               tab === t
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-slate-500"
//             }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* SEARCH */}
//       <Input
//         icon={<FiSearch />}
//         placeholder="Search name / phone / id"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* LIST */}
//       <div className="space-y-4 mt-4">
//         {filtered.map((o) => (
//           <div
//             key={o.id}
//             className={`rounded-2xl p-4 shadow border ${cardColor(o)}`}
//           >
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//               <div>
//                 <p className="font-bold text-base sm:text-lg">{o.name}</p>
//                 <p className="text-xs sm:text-sm text-slate-500">{o.id}</p>
//               </div>
//               <div className="mt-2 sm:mt-0">
//                 <Status o={o} />
//               </div>
//             </div>
//             <p className="text-sm sm:text-base text-slate-600 mt-2">
//               📞 {o.phone}
//             </p>
//             <p className="text-sm sm:text-base text-slate-600">
//               🏠 {o.society}, {o.flat}
//             </p>

//             {/* DROPDOWNS */}
//             <div className="flex flex-col sm:flex-row gap-3 mt-4">
//               {o.type === "order" ? (
//                 <>
//                   <Dropdown
//                     label="Order Status"
//                     options={["Pending", "Out for Delivery", "Delivered"]}
//                     value={o.orderStatus}
//                     onChange={(val) => update(o.id, "orderStatus", val)}
//                   />
//                   <Dropdown
//                     label="Payment Status"
//                     options={["Pending", "Paid"]}
//                     value={o.amountStatus}
//                     onChange={(val) => update(o.id, "amountStatus", val)}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Dropdown
//                     label="Today Delivered"
//                     options={["No", "Yes"]}
//                     value={o.todayDelivered ? "Yes" : "No"}
//                     onChange={(val) =>
//                       update(o.id, "todayDelivered", val === "Yes")
//                     }
//                   />
//                   <Dropdown
//                     label="Payment Status"
//                     options={["Pending", "Paid"]}
//                     value={o.amountStatus}
//                     onChange={(val) => update(o.id, "amountStatus", val)}
//                   />
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* SUMMARY BAR COMPONENT */
// function SummaryBar({ tab, summaryOrders, summarySubs }) {
//   const summary = tab === "Orders" ? summaryOrders : summarySubs;
//   return (
//     <div className="sticky top-0 z-10 bg-white rounded-xl shadow p-3 mb-3 flex flex-wrap justify-center sm:justify-start gap-4 text-sm sm:text-base">
//       <span>🚚 Total: {summary.total}</span>
//       <span className="text-yellow-700">⏳ Pending: {summary.pending}</span>
//       <span className="text-red-700">💰 Unpaid: {summary.unpaid}</span>
//     </div>
//   );
// }

// /* PRIORITY SORT */
// const priority = (o) => {
//   if (o.type === "order") {
//     if (o.orderStatus === "Pending" && o.amountStatus === "Pending") return 4;
//     if (o.orderStatus === "Pending" && o.amountStatus === "Paid") return 3;
//     if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Pending")
//       return 2;
//     if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Paid")
//       return 1;
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Pending") return 0;
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Paid") return -1;
//   } else {
//     if (!o.todayDelivered && o.amountStatus === "Pending") return 4;
//     if (!o.todayDelivered && o.amountStatus === "Paid") return 3;
//     if (o.todayDelivered && o.amountStatus === "Pending") return 2;
//     if (o.todayDelivered && o.amountStatus === "Paid") return 1;
//   }
//   return 0;
// };

// /* CARD COLOR LOGIC */
// const cardColor = (o) => {
//   if (o.type === "order") {
//     if (o.orderStatus === "Pending" && o.amountStatus === "Pending")
//       return "bg-white border-slate-200";
//     if (o.orderStatus === "Pending" && o.amountStatus === "Paid")
//       return "bg-blue-50 border-blue-200";
//     if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Pending")
//       return "bg-purple-50 border-purple-200";
//     if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Paid")
//       return "bg-indigo-50 border-indigo-200";
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Pending")
//       return "bg-yellow-50 border-yellow-200";
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Paid")
//       return "bg-green-50 border-green-200";
//   } else {
//     if (!o.todayDelivered && o.amountStatus === "Pending")
//       return "bg-white border-slate-200";
//     if (!o.todayDelivered && o.amountStatus === "Paid")
//       return "bg-blue-50 border-blue-200";
//     if (o.todayDelivered && o.amountStatus === "Pending")
//       return "bg-yellow-50 border-yellow-200";
//     if (o.todayDelivered && o.amountStatus === "Paid")
//       return "bg-green-50 border-green-200";
//   }
//   return "bg-white border-slate-200";
// };

// /* COMPONENTS */
// function Input({ icon, ...props }) {
//   return (
//     <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow mb-3">
//       <span className="text-blue-500">{icon}</span>
//       <input {...props} className="outline-none w-full text-sm sm:text-base" />
//     </div>
//   );
// }

// function Status({ o }) {
//   if (o.type === "subscription")
//     return (
//       <span
//         className={`text-xs sm:text-sm px-3 py-1 rounded-full ${
//           o.todayDelivered ? "bg-green-100 text-green-700" : "bg-slate-200"
//         }`}
//       >
//         {o.todayDelivered ? "🚰 Delivered" : "⏳ Pending"}
//       </span>
//     );

//   const map = {
//     Pending: "⏳",
//     "Out for Delivery": "🚚",
//     Delivered: "✅",
//   };

//   return (
//     <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-slate-200">
//       {map[o.orderStatus]} {o.orderStatus}
//     </span>
//   );
// }

// function Dropdown({ label, options, value, onChange }) {
//   return (
//     <div className="flex flex-col w-full sm:w-1/2">
//       <label className="text-xs sm:text-sm text-slate-500 mb-1">{label}</label>
//       <select
//         className="p-2 rounded-xl border outline-none text-sm sm:text-base bg-white"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       >
//         {options.map((opt) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

import { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";

/* DATA */
const DATA = [
  {
    id: "ORD-501",
    name: "Aman Gupta",
    phone: "9876500011",
    society: "Sunrise Heights",
    flat: "A-101",
    type: "order",
    orderStatus: "Pending",
    amountStatus: "Pending",
  },
  {
    id: "ORD-502",
    name: "Karan Mehta",
    phone: "9876500012",
    society: "Green Valley",
    flat: "B-205",
    type: "order",
    orderStatus: "Pending",
    amountStatus: "Paid",
  },
  {
    id: "ORD-503",
    name: "Ravi Sharma",
    phone: "9876500013",
    society: "Blue Ridge",
    flat: "C-301",
    type: "order",
    orderStatus: "Out for Delivery",
    amountStatus: "Pending",
  },
  {
    id: "ORD-504",
    name: "Neha Kapoor",
    phone: "9876500014",
    society: "Sunrise Heights",
    flat: "A-102",
    type: "order",
    orderStatus: "Out for Delivery",
    amountStatus: "Paid",
  },
  {
    id: "ORD-505",
    name: "Sahil Verma",
    phone: "9876500015",
    society: "Green Valley",
    flat: "B-206",
    type: "order",
    orderStatus: "Delivered",
    amountStatus: "Pending",
  },
  {
    id: "ORD-506",
    name: "Anjali Singh",
    phone: "9876500016",
    society: "Blue Ridge",
    flat: "C-302",
    type: "order",
    orderStatus: "Delivered",
    amountStatus: "Paid",
  },
  {
    id: "SUB-201",
    name: "Vikram Malhotra",
    phone: "9876500019",
    society: "Palm Residency",
    flat: "D-402",
    type: "subscription",
    todayDelivered: false,
    amountStatus: "Pending",
  },
  {
    id: "SUB-202",
    name: "Pooja Jain",
    phone: "9876500020",
    society: "Palm Residency",
    flat: "D-403",
    type: "subscription",
    todayDelivered: true,
    amountStatus: "Paid",
  },
  {
    id: "SUB-203",
    name: "Amitabh Roy",
    phone: "9876500021",
    society: "Sunrise Heights",
    flat: "A-103",
    type: "subscription",
    todayDelivered: false,
    amountStatus: "Pending",
  },
  {
    id: "SUB-204",
    name: "Ritu Sharma",
    phone: "9876500022",
    society: "Green Valley",
    flat: "B-207",
    type: "subscription",
    todayDelivered: true,
    amountStatus: "Paid",
  },
];

/* MAIN COMPONENT */
export default function ManageDeliveries() {
  const [tab, setTab] = useState("Orders");
  const [data, setData] = useState(DATA);
  const [search, setSearch] = useState("");

  /* SUMMARY */
  const summaryOrders = useMemo(() => {
    const orders = data.filter((d) => d.type === "order");
    return {
      total: orders.length,
      pending: orders.filter((d) => d.orderStatus !== "Delivered").length,
      unpaid: orders.filter((d) => d.amountStatus === "Pending").length,
    };
  }, [data]);

  const summarySubs = useMemo(() => {
    const subs = data.filter((d) => d.type === "subscription");
    return {
      total: subs.length,
      pending: subs.filter((d) => !d.todayDelivered).length,
      unpaid: subs.filter((d) => d.amountStatus === "Pending").length,
    };
  }, [data]);

  /* FILTER */
  const filtered = useMemo(() => {
    return data.filter((o) => {
      if (tab === "Orders" && o.type !== "order") return false;
      if (tab === "Subscriptions" && o.type !== "subscription") return false;

      const q = search.toLowerCase();
      if (
        q &&
        !(
          o.name.toLowerCase().includes(q) ||
          o.phone.includes(q) ||
          o.id.toLowerCase().includes(q)
        )
      )
        return false;

      return true;
    });
  }, [tab, search, data]);

  const update = (id, key, value) => {
    setData((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [key]: value } : o)),
    );
  };

  const refreshSort = () => {
    setData([...data].sort((a, b) => priority(b) - priority(a)));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-5 md:p-8">
      {/* HEADING + REFRESH BUTTON */}
      <div className="flex justify-between items-center mb-3 gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          💧 Manage <span className="text-blue-600">Deliveries</span>
        </h1>
        <button
          onClick={refreshSort}
          className="flex items-center gap-1 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl text-sm sm:text-base font-semibold shadow-sm hover:bg-blue-100"
        >
          🔄 Refresh
        </button>
      </div>

      {/* SUMMARY BAR */}
      <SummaryBar
        tab={tab}
        summaryOrders={summaryOrders}
        summarySubs={summarySubs}
      />

      {/* TABS */}
      <div className="flex gap-6 border-b mb-3 overflow-x-auto">
        {["Orders", "Subscriptions"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-shrink-0 pb-2 font-semibold text-sm sm:text-base md:text-lg ${
              tab === t
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <Input
        icon={<FiSearch />}
        placeholder="Search name / phone / id"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LIST */}
      <div className="space-y-4 mt-4">
        {filtered.map((o) => (
          <div
            key={o.id}
            className={`rounded-2xl p-4 shadow border ${cardColor(o)}`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <p className="font-bold text-base sm:text-lg">{o.name}</p>
                <p className="text-xs sm:text-sm text-slate-500">{o.id}</p>
              </div>
              <div className="mt-2 sm:mt-0">
                <Status o={o} />
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              📞 {o.phone}
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              🏠 {o.society}, {o.flat}
            </p>

            {/* DROPDOWNS - ALWAYS HORIZONTAL */}
            <div className="flex gap-3 mt-4">
              {o.type === "order" ? (
                <>
                  <Dropdown
                    label="Order Status"
                    options={["Pending", "Out for Delivery", "Delivered"]}
                    value={o.orderStatus}
                    onChange={(val) => update(o.id, "orderStatus", val)}
                  />
                  <Dropdown
                    label="Payment Status"
                    options={["Pending", "Paid"]}
                    value={o.amountStatus}
                    onChange={(val) => update(o.id, "amountStatus", val)}
                  />
                </>
              ) : (
                <>
                  <Dropdown
                    label="Today Delivered"
                    options={["No", "Yes"]}
                    value={o.todayDelivered ? "Yes" : "No"}
                    onChange={(val) =>
                      update(o.id, "todayDelivered", val === "Yes")
                    }
                  />
                  <Dropdown
                    label="Payment Status"
                    options={["Pending", "Paid"]}
                    value={o.amountStatus}
                    onChange={(val) => update(o.id, "amountStatus", val)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* SUMMARY BAR */
function SummaryBar({ tab, summaryOrders, summarySubs }) {
  const summary = tab === "Orders" ? summaryOrders : summarySubs;
  return (
    <div className="sticky top-0 z-10 bg-white rounded-xl shadow p-3 mb-3 flex justify-center sm:justify-start gap-4 text-sm sm:text-base">
      <span>🚚 Total: {summary.total}</span>
      <span className="text-yellow-700">⏳ Pending: {summary.pending}</span>
      <span className="text-red-700">💰 Unpaid: {summary.unpaid}</span>
    </div>
  );
}

/* PRIORITY SORT */
const priority = (o) => {
  if (o.type === "order") {
    if (o.orderStatus === "Pending" && o.amountStatus === "Pending") return 4;
    if (o.orderStatus === "Pending" && o.amountStatus === "Paid") return 3;
    if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Pending")
      return 2;
    if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Paid")
      return 1;
    if (o.orderStatus === "Delivered" && o.amountStatus === "Pending") return 0;
    if (o.orderStatus === "Delivered" && o.amountStatus === "Paid") return -1;
  } else {
    if (!o.todayDelivered && o.amountStatus === "Pending") return 4;
    if (!o.todayDelivered && o.amountStatus === "Paid") return 3;
    if (o.todayDelivered && o.amountStatus === "Pending") return 2;
    if (o.todayDelivered && o.amountStatus === "Paid") return 1;
  }
  return 0;
};

/* CARD COLOR LOGIC */
const cardColor = (o) => {
  if (o.type === "order") {
    if (o.orderStatus === "Pending" && o.amountStatus === "Pending")
      return "bg-white border-slate-200";
    if (o.orderStatus === "Pending" && o.amountStatus === "Paid")
      return "bg-blue-50 border-blue-200";
    if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Pending")
      return "bg-purple-50 border-purple-200";
    if (o.orderStatus === "Out for Delivery" && o.amountStatus === "Paid")
      return "bg-indigo-50 border-indigo-200";
    if (o.orderStatus === "Delivered" && o.amountStatus === "Pending")
      return "bg-yellow-50 border-yellow-200";
    if (o.orderStatus === "Delivered" && o.amountStatus === "Paid")
      return "bg-green-50 border-green-200";
  } else {
    if (!o.todayDelivered && o.amountStatus === "Pending")
      return "bg-white border-slate-200";
    if (!o.todayDelivered && o.amountStatus === "Paid")
      return "bg-blue-50 border-blue-200";
    if (o.todayDelivered && o.amountStatus === "Pending")
      return "bg-yellow-50 border-yellow-200";
    if (o.todayDelivered && o.amountStatus === "Paid")
      return "bg-green-50 border-green-200";
  }
  return "bg-white border-slate-200";
};

/* COMPONENTS */
function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow mb-3">
      <span className="text-blue-500">{icon}</span>
      <input {...props} className="outline-none w-full text-sm sm:text-base" />
    </div>
  );
}

function Status({ o }) {
  if (o.type === "subscription")
    return (
      <span
        className={`text-xs sm:text-sm px-3 py-1 rounded-full ${o.todayDelivered ? "bg-green-100 text-green-700" : "bg-slate-200"}`}
      >
        {o.todayDelivered ? "🚰 Delivered" : "⏳ Pending"}
      </span>
    );

  const map = { Pending: "⏳", "Out for Delivery": "🚚", Delivered: "✅" };
  return (
    <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-slate-200">
      {map[o.orderStatus]} {o.orderStatus}
    </span>
  );
}

function Dropdown({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col w-1/2">
      <label className="text-xs sm:text-sm text-slate-500 mb-1">{label}</label>
      <select
        className="p-2 rounded-xl border outline-none text-sm sm:text-base bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
