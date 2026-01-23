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

// export default function ManageDeliveries() {
//   const [tab, setTab] = useState("Orders");
//   const [data, setData] = useState(DATA);
//   const [search, setSearch] = useState("");
//   const [society, setSociety] = useState("All");

//   /* SOCIETY LIST */
//   const societies = useMemo(
//     () => ["All", ...new Set(data.map((d) => d.society))],
//     [data],
//   );

//   /* BASE FILTER (TAB + SOCIETY) 👉 SUMMARY KE LIYE */
//   const baseFiltered = useMemo(() => {
//     return data.filter((o) => {
//       if (tab === "Orders" && o.type !== "order") return false;
//       if (tab === "Subscriptions" && o.type !== "subscription") return false;
//       if (society !== "All" && o.society !== society) return false;
//       return true;
//     });
//   }, [tab, society, data]);

//   /* SUMMARY (SOCIETY + TAB BASED) */
//   const summary = useMemo(() => {
//     if (tab === "Orders") {
//       return {
//         total: baseFiltered.length,
//         pending: baseFiltered.filter((o) => o.orderStatus !== "Delivered")
//           .length,
//         unpaid: baseFiltered.filter((o) => o.amountStatus === "Pending").length,
//       };
//     }

//     return {
//       total: baseFiltered.length,
//       pending: baseFiltered.filter((o) => !o.todayDelivered).length,
//       unpaid: baseFiltered.filter((o) => o.amountStatus === "Pending").length,
//     };
//   }, [baseFiltered, tab]);

//   /* LIST FILTER (SEARCH + BASE FILTER) */
//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     return baseFiltered.filter(
//       (o) =>
//         !q ||
//         o.name.toLowerCase().includes(q) ||
//         o.phone.includes(q) ||
//         o.id.toLowerCase().includes(q),
//     );
//   }, [search, baseFiltered]);

//   const update = (id, key, value) => {
//     setData((prev) =>
//       prev.map((o) => (o.id === id ? { ...o, [key]: value } : o)),
//     );
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-3 sm:p-5 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
//         💧 Manage <span className="text-blue-600">Deliveries</span>
//       </h1>

//       {/* SUMMARY BAR */}
//       <div className="bg-white rounded-xl shadow p-3 mb-3 flex gap-4">
//         <span>🚚 Total: {summary.total}</span>
//         <span className="text-yellow-700">⏳ Pending: {summary.pending}</span>
//         <span className="text-red-700">💰 Unpaid: {summary.unpaid}</span>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-6 border-b mb-3">
//         {["Orders", "Subscriptions"].map((t) => (
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

//       {/* SEARCH + SOCIETY FILTER */}
//       <div className="flex gap-3 mb-3">
//         <div className="flex-1">
//           <Input
//             icon={<FiSearch />}
//             placeholder="Search name / phone / id"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <select
//           className="p-3 rounded-xl border bg-white shadow"
//           value={society}
//           onChange={(e) => setSociety(e.target.value)}
//         >
//           {societies.map((s) => (
//             <option key={s}>{s}</option>
//           ))}
//         </select>
//       </div>

//       {/* LIST */}
//       <div className="space-y-4">
//         {filtered.map((o) => (
//           <div
//             key={o.id}
//             className={`rounded-2xl p-4 shadow border ${cardColor(o)}`}
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="font-bold">{o.name}</p>
//                 <p className="text-xs text-slate-500">{o.id}</p>
//               </div>
//               <Status o={o} />
//             </div>

//             <p className="text-sm text-slate-600 mt-2">📞 {o.phone}</p>
//             <p className="text-sm text-slate-600">
//               🏠 {o.society}, {o.flat}
//             </p>

//             <div className="flex gap-3 mt-4">
//               {o.type === "order" ? (
//                 <>
//                   <Dropdown
//                     label="Order Status"
//                     options={["Pending", "Out for Delivery", "Delivered"]}
//                     value={o.orderStatus}
//                     onChange={(v) => update(o.id, "orderStatus", v)}
//                   />
//                   <Dropdown
//                     label="Payment Status"
//                     options={["Pending", "Paid"]}
//                     value={o.amountStatus}
//                     onChange={(v) => update(o.id, "amountStatus", v)}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Dropdown
//                     label="Today Delivered"
//                     options={["No", "Yes"]}
//                     value={o.todayDelivered ? "Yes" : "No"}
//                     onChange={(v) =>
//                       update(o.id, "todayDelivered", v === "Yes")
//                     }
//                   />
//                   <Dropdown
//                     label="Payment Status"
//                     options={["Pending", "Paid"]}
//                     value={o.amountStatus}
//                     onChange={(v) => update(o.id, "amountStatus", v)}
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

// /* HELPERS (UNCHANGED) */
// const cardColor = (o) => {
//   if (o.type === "order") {
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Paid")
//       return "bg-green-50 border-green-200";
//   }
//   return "bg-white border-slate-200";
// };

// function Input({ icon, ...props }) {
//   return (
//     <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow">
//       <span className="text-blue-500">{icon}</span>
//       <input {...props} className="outline-none w-full" />
//     </div>
//   );
// }

// function Status({ o }) {
//   if (o.type === "subscription")
//     return (
//       <span className="px-3 py-1 rounded-full bg-slate-200 text-sm">
//         {o.todayDelivered ? "🚰 Delivered" : "⏳ Pending"}
//       </span>
//     );

//   const map = { Pending: "⏳", "Out for Delivery": "🚚", Delivered: "✅" };
//   return (
//     <span className="px-3 py-1 rounded-full bg-slate-200 text-sm">
//       {map[o.orderStatus]} {o.orderStatus}
//     </span>
//   );
// }

// function Dropdown({ label, options, value, onChange }) {
//   return (
//     <div className="flex flex-col w-1/2">
//       <label className="text-xs text-slate-500 mb-1">{label}</label>
//       <select
//         className="p-2 rounded-xl border bg-white"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       >
//         {options.map((opt) => (
//           <option key={opt}>{opt}</option>
//         ))}
//       </select>
//     </div>
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

// export default function ManageDeliveries() {
//   const [tab, setTab] = useState("Orders");
//   const [data, setData] = useState(DATA);
//   const [search, setSearch] = useState("");
//   const [society, setSociety] = useState("All");

//   /* SOCIETY LIST */
//   const societies = useMemo(
//     () => ["All", ...new Set(data.map((d) => d.society))],
//     [data],
//   );

//   /* BASE FILTER (TAB + SOCIETY) */
//   const baseFiltered = useMemo(() => {
//     return data.filter((o) => {
//       if (tab === "Orders" && o.type !== "order") return false;
//       if (tab === "Subscriptions" && o.type !== "subscription") return false;
//       if (society !== "All" && o.society !== society) return false;
//       return true;
//     });
//   }, [tab, society, data]);

//   /* SUMMARY (SOCIETY + TAB BASED) */
//   const summary = useMemo(() => {
//     if (tab === "Orders") {
//       return {
//         total: baseFiltered.length,
//         pending: baseFiltered.filter((o) => o.orderStatus !== "Delivered")
//           .length,
//         unpaid: baseFiltered.filter((o) => o.amountStatus === "Pending").length,
//       };
//     }

//     return {
//       total: baseFiltered.length,
//       pending: baseFiltered.filter((o) => !o.todayDelivered).length,
//       unpaid: baseFiltered.filter((o) => o.amountStatus === "Pending").length,
//     };
//   }, [baseFiltered, tab]);

//   /* LIST FILTER (SEARCH + BASE FILTER) */
//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     return baseFiltered.filter(
//       (o) =>
//         !q ||
//         o.name.toLowerCase().includes(q) ||
//         o.phone.includes(q) ||
//         o.id.toLowerCase().includes(q),
//     );
//   }, [search, baseFiltered]);

//   const update = (id, key, value) => {
//     setData((prev) =>
//       prev.map((o) => (o.id === id ? { ...o, [key]: value } : o)),
//     );
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-3 sm:p-5 md:p-8">
//       {/* HEADER + REFRESH BUTTON */}
//       <div className="flex items-center justify-between mb-3">
//         <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
//           💧 Manage <span className="text-blue-600">Deliveries</span>
//         </h1>

//         {/* REFRESH / SORT BUTTON */}
//         <button
//           onClick={() => {
//             // Sort by priority: Pending → Out for Delivery → Delivered, unpaid first
//             setData((prev) =>
//               [...prev].sort((a, b) => {
//                 const statusOrder = {
//                   Pending: 0,
//                   "Out for Delivery": 1,
//                   Delivered: 2,
//                 };
//                 const aStatus =
//                   a.type === "order"
//                     ? a.orderStatus
//                     : a.todayDelivered
//                       ? "Delivered"
//                       : "Pending";
//                 const bStatus =
//                   b.type === "order"
//                     ? b.orderStatus
//                     : b.todayDelivered
//                       ? "Delivered"
//                       : "Pending";

//                 // Unpaid first
//                 const aUnpaid = a.amountStatus === "Pending" ? 0 : 1;
//                 const bUnpaid = b.amountStatus === "Pending" ? 0 : 1;
//                 if (aUnpaid !== bUnpaid) return aUnpaid - bUnpaid;

//                 return (
//                   (statusOrder[aStatus] ?? 3) - (statusOrder[bStatus] ?? 3)
//                 );
//               }),
//             );
//           }}
//           className="px-4 py-2 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 transition"
//         >
//           🔄 Refresh
//         </button>
//       </div>

//       {/* SUMMARY BAR */}
//       <div className="bg-white rounded-xl shadow p-3 mb-3 flex gap-4">
//         <span>🚚 Total: {summary.total}</span>
//         <span className="text-yellow-700">⏳ Pending: {summary.pending}</span>
//         <span className="text-red-700">💰 Unpaid: {summary.unpaid}</span>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-6 border-b mb-3">
//         {["Orders", "Subscriptions"].map((t) => (
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

//       {/* SEARCH + SOCIETY FILTER */}
//       <div className="flex gap-3 mb-3">
//         <div className="flex-1">
//           <Input
//             icon={<FiSearch />}
//             placeholder="Search name / phone / id"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <select
//           className="p-3 rounded-xl border bg-white shadow"
//           value={society}
//           onChange={(e) => setSociety(e.target.value)}
//         >
//           {societies.map((s) => (
//             <option key={s}>{s}</option>
//           ))}
//         </select>
//       </div>

//       {/* LIST */}
//       <div className="space-y-4">
//         {filtered.map((o) => (
//           <div
//             key={o.id}
//             className={`rounded-2xl p-4 shadow border ${cardColor(o)}`}
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="font-bold">{o.name}</p>
//                 <p className="text-xs text-slate-500">{o.id}</p>
//               </div>
//               <Status o={o} />
//             </div>

//             <p className="text-sm text-slate-600 mt-2">📞 {o.phone}</p>
//             <p className="text-sm text-slate-600">
//               🏠 {o.society}, {o.flat}
//             </p>

//             <div className="flex gap-3 mt-4">
//               {o.type === "order" ? (
//                 <>
//                   <Dropdown
//                     label="Order Status"
//                     options={["Pending", "Out for Delivery", "Delivered"]}
//                     value={o.orderStatus}
//                     onChange={(v) => update(o.id, "orderStatus", v)}
//                   />
//                   <Dropdown
//                     label="Payment Status"
//                     options={["Pending", "Paid"]}
//                     value={o.amountStatus}
//                     onChange={(v) => update(o.id, "amountStatus", v)}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Dropdown
//                     label="Today Delivered"
//                     options={["No", "Yes"]}
//                     value={o.todayDelivered ? "Yes" : "No"}
//                     onChange={(v) =>
//                       update(o.id, "todayDelivered", v === "Yes")
//                     }
//                   />
//                   <Dropdown
//                     label="Payment Status"
//                     options={["Pending", "Paid"]}
//                     value={o.amountStatus}
//                     onChange={(v) => update(o.id, "amountStatus", v)}
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

// /* HELPERS */
// const cardColor = (o) => {
//   if (o.type === "order") {
//     if (o.orderStatus === "Delivered" && o.amountStatus === "Paid")
//       return "bg-green-50 border-green-200";
//   }
//   return "bg-white border-slate-200";
// };

// function Input({ icon, ...props }) {
//   return (
//     <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow">
//       <span className="text-blue-500">{icon}</span>
//       <input {...props} className="outline-none w-full" />
//     </div>
//   );
// }

// function Status({ o }) {
//   if (o.type === "subscription")
//     return (
//       <span className="px-3 py-1 rounded-full bg-slate-200 text-sm">
//         {o.todayDelivered ? "🚰 Delivered" : "⏳ Pending"}
//       </span>
//     );

//   const map = { Pending: "⏳", "Out for Delivery": "🚚", Delivered: "✅" };
//   return (
//     <span className="px-3 py-1 rounded-full bg-slate-200 text-sm">
//       {map[o.orderStatus]} {o.orderStatus}
//     </span>
//   );
// }

// function Dropdown({ label, options, value, onChange }) {
//   return (
//     <div className="flex flex-col w-1/2">
//       <label className="text-xs text-slate-500 mb-1">{label}</label>
//       <select
//         className="p-2 rounded-xl border bg-white"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       >
//         {options.map((opt) => (
//           <option key={opt}>{opt}</option>
//         ))}
//       </select>
//     </div>
//   );
// }

import { useState, useMemo } from "react";
import { FiSearch, FiPhone } from "react-icons/fi";

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

export default function ManageDeliveries() {
  const [tab, setTab] = useState("Orders");
  const [data, setData] = useState(DATA);
  const [search, setSearch] = useState("");
  const [society, setSociety] = useState("All");

  /* SOCIETY LIST */
  const societies = useMemo(
    () => ["All", ...new Set(data.map((d) => d.society))],
    [data],
  );

  /* BASE FILTER (TAB + SOCIETY) */
  const baseFiltered = useMemo(() => {
    return data.filter((o) => {
      if (tab === "Orders" && o.type !== "order") return false;
      if (tab === "Subscriptions" && o.type !== "subscription") return false;
      if (society !== "All" && o.society !== society) return false;
      return true;
    });
  }, [tab, society, data]);

  /* SUMMARY (SOCIETY + TAB BASED) */
  const summary = useMemo(() => {
    if (tab === "Orders") {
      return {
        total: baseFiltered.length,
        pending: baseFiltered.filter((o) => o.orderStatus !== "Delivered")
          .length,
        unpaid: baseFiltered.filter((o) => o.amountStatus === "Pending").length,
      };
    }

    return {
      total: baseFiltered.length,
      pending: baseFiltered.filter((o) => !o.todayDelivered).length,
      unpaid: baseFiltered.filter((o) => o.amountStatus === "Pending").length,
    };
  }, [baseFiltered, tab]);

  /* LIST FILTER (SEARCH + BASE FILTER) */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return baseFiltered.filter(
      (o) =>
        !q ||
        o.name.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.id.toLowerCase().includes(q),
    );
  }, [search, baseFiltered]);

  const update = (id, key, value) => {
    setData((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [key]: value } : o)),
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-5 md:p-8">
      {/* HEADER + REFRESH BUTTON */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          💧 Manage <span className="text-blue-600">Deliveries</span>
        </h1>

        {/* REFRESH / SORT BUTTON */}
        <button
          onClick={() => {
            setData((prev) =>
              [...prev].sort((a, b) => {
                const statusOrder = {
                  Pending: 0,
                  "Out for Delivery": 1,
                  Delivered: 2,
                };
                const aStatus =
                  a.type === "order"
                    ? a.orderStatus
                    : a.todayDelivered
                      ? "Delivered"
                      : "Pending";
                const bStatus =
                  b.type === "order"
                    ? b.orderStatus
                    : b.todayDelivered
                      ? "Delivered"
                      : "Pending";

                const aUnpaid = a.amountStatus === "Pending" ? 0 : 1;
                const bUnpaid = b.amountStatus === "Pending" ? 0 : 1;
                if (aUnpaid !== bUnpaid) return aUnpaid - bUnpaid;

                return (
                  (statusOrder[aStatus] ?? 3) - (statusOrder[bStatus] ?? 3)
                );
              }),
            );
          }}
          className="px-4 py-2 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {/* SUMMARY BAR */}
      <div className="bg-white rounded-xl shadow p-3 mb-3 flex gap-4">
        <span>🚚 Total: {summary.total}</span>
        <span className="text-yellow-700">⏳ Pending: {summary.pending}</span>
        <span className="text-red-700">💰 Unpaid: {summary.unpaid}</span>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b mb-3">
        {["Orders", "Subscriptions"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 font-semibold ${
              tab === t
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* SEARCH + SOCIETY FILTER */}
      <div className="flex gap-3 mb-3">
        <div className="flex-1">
          <Input
            icon={<FiSearch />}
            placeholder="Search name / phone / id"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="p-3 rounded-xl border bg-white shadow"
          value={society}
          onChange={(e) => setSociety(e.target.value)}
        >
          {societies.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {filtered.map((o) => (
          <div
            key={o.id}
            className={`rounded-2xl p-4 shadow border ${cardColor(o)}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{o.name}</p>
                <p className="text-xs text-slate-500">{o.id}</p>
              </div>
              <Status o={o} />
            </div>

            {/* CLICKABLE PHONE WITH ICON */}
            <p className="text-sm text-slate-600 mt-2 flex items-center gap-1">
              <FiPhone className="text-blue-600" />
              <a
                href={`tel:${o.phone}`}
                className="text-blue-600 hover:underline"
              >
                {o.phone}
              </a>
            </p>

            <p className="text-sm text-slate-600">
              🏠 {o.society}, {o.flat}
            </p>

            <div className="flex gap-3 mt-4">
              {o.type === "order" ? (
                <>
                  <Dropdown
                    label="Order Status"
                    options={["Pending", "Out for Delivery", "Delivered"]}
                    value={o.orderStatus}
                    onChange={(v) => update(o.id, "orderStatus", v)}
                  />
                  <Dropdown
                    label="Payment Status"
                    options={["Pending", "Paid"]}
                    value={o.amountStatus}
                    onChange={(v) => update(o.id, "amountStatus", v)}
                  />
                </>
              ) : (
                <>
                  <Dropdown
                    label="Today Delivered"
                    options={["No", "Yes"]}
                    value={o.todayDelivered ? "Yes" : "No"}
                    onChange={(v) =>
                      update(o.id, "todayDelivered", v === "Yes")
                    }
                  />
                  <Dropdown
                    label="Payment Status"
                    options={["Pending", "Paid"]}
                    value={o.amountStatus}
                    onChange={(v) => update(o.id, "amountStatus", v)}
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

/* HELPERS */
const cardColor = (o) => {
  if (o.type === "order") {
    if (o.orderStatus === "Delivered" && o.amountStatus === "Paid")
      return "bg-green-50 border-green-200";
  }
  return "bg-white border-slate-200";
};

function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow">
      <span className="text-blue-500">{icon}</span>
      <input {...props} className="outline-none w-full" />
    </div>
  );
}

function Status({ o }) {
  if (o.type === "subscription")
    return (
      <span className="px-3 py-1 rounded-full bg-slate-200 text-sm">
        {o.todayDelivered ? "🚰 Delivered" : "⏳ Pending"}
      </span>
    );

  const map = { Pending: "⏳", "Out for Delivery": "🚚", Delivered: "✅" };
  return (
    <span className="px-3 py-1 rounded-full bg-slate-200 text-sm">
      {map[o.orderStatus]} {o.orderStatus}
    </span>
  );
}

function Dropdown({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col w-1/2">
      <label className="text-xs text-slate-500 mb-1">{label}</label>
      <select
        className="p-2 rounded-xl border bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
