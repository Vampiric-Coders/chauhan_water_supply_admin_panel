// import { useState, useMemo } from "react";
// import { FiSearch } from "react-icons/fi";

// /* SAMPLE DATA */
// const DATA = [
//   {
//     id: "SUB-201",
//     name: "Vikram Malhotra",
//     phone: "9876500019",
//     society: "Palm Residency",
//     flat: "D-402",
//     status: "Active",
//     amountStatus: "Pending",
//   },
//   {
//     id: "SUB-202",
//     name: "Pooja Jain",
//     phone: "9876500020",
//     society: "Palm Residency",
//     flat: "D-403",
//     status: "Paused",
//     amountStatus: "Paid",
//   },
//   {
//     id: "SUB-203",
//     name: "Amitabh Roy",
//     phone: "9876500021",
//     society: "Sunrise Heights",
//     flat: "A-103",
//     status: "Canceled",
//     amountStatus: "Pending",
//   },
//   {
//     id: "SUB-204",
//     name: "Ritu Sharma",
//     phone: "9876500022",
//     society: "Green Valley",
//     flat: "B-207",
//     status: "Active",
//     amountStatus: "Paid",
//   },
// ];

// /* MAIN COMPONENT */
// export default function ManageSubscriptions() {
//   const [data, setData] = useState(DATA);
//   const [search, setSearch] = useState("");
//   const [society, setSociety] = useState("All");

//   /* SOCIETY LIST */
//   const societies = useMemo(() => {
//     return ["All", ...new Set(data.map((d) => d.society))];
//   }, [data]);

//   /* FILTER */
//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     return data.filter((o) => {
//       if (society !== "All" && o.society !== society) return false;

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
//   }, [search, society, data]);

//   const update = (id, key, value) => {
//     setData((prev) =>
//       prev.map((o) => (o.id === id ? { ...o, [key]: value } : o)),
//     );
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-3 sm:p-5 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
//         📦 Manage <span className="text-blue-600">Subscriptions</span>
//       </h1>

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
//           className="p-3 rounded-xl border outline-none bg-white shadow text-sm sm:text-base"
//           value={society}
//           onChange={(e) => setSociety(e.target.value)}
//         >
//           {societies.map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* LIST */}
//       <div className="space-y-4 mt-4">
//         {filtered.map((sub) => (
//           <div
//             key={sub.id}
//             className={`rounded-2xl p-4 shadow border ${cardColor(sub)}`}
//           >
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//               <div>
//                 <p className="font-bold text-base sm:text-lg">{sub.name}</p>
//                 <p className="text-xs sm:text-sm text-slate-500">{sub.id}</p>
//               </div>
//               <div className="mt-2 sm:mt-0">
//                 <Status sub={sub} />
//               </div>
//             </div>

//             <p className="text-sm sm:text-base text-slate-600 mt-2">
//               📞 {sub.phone}
//             </p>
//             <p className="text-sm sm:text-base text-slate-600">
//               🏠 {sub.society}, {sub.flat}
//             </p>

//             {/* DROPDOWNS */}
//             <div className="flex gap-3 mt-4">
//               <Dropdown
//                 label="Subscription Status"
//                 options={["Active", "Paused", "Canceled"]}
//                 value={sub.status}
//                 onChange={(val) => update(sub.id, "status", val)}
//               />
//               <Dropdown
//                 label="Payment Status"
//                 options={["Pending", "Paid"]}
//                 value={sub.amountStatus}
//                 onChange={(val) => update(sub.id, "amountStatus", val)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* CARD COLOR LOGIC */
// const cardColor = (sub) => {
//   switch (sub.status) {
//     case "Active":
//       return "bg-green-50 border-green-200";
//     case "Paused":
//       return "bg-yellow-50 border-yellow-200";
//     case "Canceled":
//       return "bg-red-50 border-red-200";
//     default:
//       return "bg-white border-slate-200";
//   }
// };

// /* STATUS BADGE */
// function Status({ sub }) {
//   const colors = {
//     Active: "bg-green-100 text-green-700",
//     Paused: "bg-yellow-100 text-yellow-700",
//     Canceled: "bg-red-100 text-red-700",
//   };
//   return (
//     <span
//       className={`text-xs sm:text-sm px-3 py-1 rounded-full ${colors[sub.status]}`}
//     >
//       {sub.status}
//     </span>
//   );
// }

// /* INPUT COMPONENT */
// function Input({ icon, ...props }) {
//   return (
//     <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow">
//       <span className="text-blue-500">{icon}</span>
//       <input {...props} className="outline-none w-full text-sm sm:text-base" />
//     </div>
//   );
// }

// /* DROPDOWN COMPONENT */
// function Dropdown({ label, options, value, onChange }) {
//   return (
//     <div className="flex flex-col w-1/2">
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

// /* SAMPLE DATA */
// const DATA = [
//   {
//     id: "SUB-201",
//     name: "Vikram Malhotra",
//     phone: "9876500019",
//     society: "Palm Residency",
//     flat: "D-402",
//     status: "Active",
//     amountStatus: "Pending",
//   },
//   {
//     id: "SUB-202",
//     name: "Pooja Jain",
//     phone: "9876500020",
//     society: "Palm Residency",
//     flat: "D-403",
//     status: "Paused",
//     amountStatus: "Paid",
//   },
//   {
//     id: "SUB-203",
//     name: "Amitabh Roy",
//     phone: "9876500021",
//     society: "Sunrise Heights",
//     flat: "A-103",
//     status: "Canceled",
//     amountStatus: "Pending",
//   },
//   {
//     id: "SUB-204",
//     name: "Ritu Sharma",
//     phone: "9876500022",
//     society: "Green Valley",
//     flat: "B-207",
//     status: "Active",
//     amountStatus: "Paid",
//   },
// ];

// /* MAIN COMPONENT */
// export default function ManageSubscriptions() {
//   const [data, setData] = useState(DATA);
//   const [search, setSearch] = useState("");
//   const [society, setSociety] = useState("All");

//   /* SOCIETY LIST */
//   const societies = useMemo(() => {
//     return ["All", ...new Set(data.map((d) => d.society))];
//   }, [data]);

//   /* FILTER */
//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     return data.filter((o) => {
//       if (society !== "All" && o.society !== society) return false;

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
//   }, [search, society, data]);

//   /* UPDATE FUNCTION */
//   const update = (id, key, value) => {
//     setData((prev) =>
//       prev.map((o) => (o.id === id ? { ...o, [key]: value } : o))
//     );
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-3 sm:p-5 md:p-8">
//       {/* HEADER + REFRESH BUTTON */}
//       <div className="flex items-center justify-between mb-3">
//         <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
//           📦 Manage <span className="text-blue-600">Subscriptions</span>
//         </h1>

//         {/* REFRESH / SORT BUTTON */}
//         <button
//           onClick={() => {
//             // Sort by priority: Active → Paused → Canceled, unpaid first
//             setData((prev) =>
//               [...prev].sort((a, b) => {
//                 const statusOrder = { Active: 0, Paused: 1, Canceled: 2 };

//                 // Unpaid first
//                 const aUnpaid = a.amountStatus === "Pending" ? 0 : 1;
//                 const bUnpaid = b.amountStatus === "Pending" ? 0 : 1;
//                 if (aUnpaid !== bUnpaid) return aUnpaid - bUnpaid;

//                 return (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3);
//               })
//             );
//           }}
//           className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
//         >
//           🔄 Refresh / Sort
//         </button>
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
//           className="p-3 rounded-xl border outline-none bg-white shadow text-sm sm:text-base"
//           value={society}
//           onChange={(e) => setSociety(e.target.value)}
//         >
//           {societies.map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* LIST */}
//       <div className="space-y-4 mt-4">
//         {filtered.map((sub) => (
//           <div
//             key={sub.id}
//             className={`rounded-2xl p-4 shadow border ${cardColor(sub)}`}
//           >
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//               <div>
//                 <p className="font-bold text-base sm:text-lg">{sub.name}</p>
//                 <p className="text-xs sm:text-sm text-slate-500">{sub.id}</p>
//               </div>
//               <div className="mt-2 sm:mt-0">
//                 <Status sub={sub} />
//               </div>
//             </div>

//             <p className="text-sm sm:text-base text-slate-600 mt-2">
//               📞 {sub.phone}
//             </p>
//             <p className="text-sm sm:text-base text-slate-600">
//               🏠 {sub.society}, {sub.flat}
//             </p>

//             {/* DROPDOWNS */}
//             <div className="flex gap-3 mt-4">
//               <Dropdown
//                 label="Subscription Status"
//                 options={["Active", "Paused", "Canceled"]}
//                 value={sub.status}
//                 onChange={(val) => update(sub.id, "status", val)}
//               />
//               <Dropdown
//                 label="Payment Status"
//                 options={["Pending", "Paid"]}
//                 value={sub.amountStatus}
//                 onChange={(val) => update(sub.id, "amountStatus", val)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* CARD COLOR LOGIC */
// const cardColor = (sub) => {
//   switch (sub.status) {
//     case "Active":
//       return "bg-green-50 border-green-200";
//     case "Paused":
//       return "bg-yellow-50 border-yellow-200";
//     case "Canceled":
//       return "bg-red-50 border-red-200";
//     default:
//       return "bg-white border-slate-200";
//   }
// };

// /* STATUS BADGE */
// function Status({ sub }) {
//   const colors = {
//     Active: "bg-green-100 text-green-700",
//     Paused: "bg-yellow-100 text-yellow-700",
//     Canceled: "bg-red-100 text-red-700",
//   };
//   return (
//     <span
//       className={`text-xs sm:text-sm px-3 py-1 rounded-full ${colors[sub.status]}`}
//     >
//       {sub.status}
//     </span>
//   );
// }

// /* INPUT COMPONENT */
// function Input({ icon, ...props }) {
//   return (
//     <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow">
//       <span className="text-blue-500">{icon}</span>
//       <input {...props} className="outline-none w-full text-sm sm:text-base" />
//     </div>
//   );
// }

// /* DROPDOWN COMPONENT */
// function Dropdown({ label, options, value, onChange }) {
//   return (
//     <div className="flex flex-col w-1/2">
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
import { FiSearch, FiPhone } from "react-icons/fi";

/* SAMPLE DATA */
const DATA = [
  {
    id: "SUB-201",
    name: "Vikram Malhotra",
    phone: "9876500019",
    society: "Palm Residency",
    flat: "D-402",
    status: "Active",
    amountStatus: "Pending",
  },
  {
    id: "SUB-202",
    name: "Pooja Jain",
    phone: "9876500020",
    society: "Palm Residency",
    flat: "D-403",
    status: "Paused",
    amountStatus: "Paid",
  },
  {
    id: "SUB-203",
    name: "Amitabh Roy",
    phone: "9876500021",
    society: "Sunrise Heights",
    flat: "A-103",
    status: "Canceled",
    amountStatus: "Pending",
  },
  {
    id: "SUB-204",
    name: "Ritu Sharma",
    phone: "9876500022",
    society: "Green Valley",
    flat: "B-207",
    status: "Active",
    amountStatus: "Paid",
  },
];

/* MAIN COMPONENT */
export default function ManageSubscriptions() {
  const [data, setData] = useState(DATA);
  const [search, setSearch] = useState("");
  const [society, setSociety] = useState("All");

  /* SOCIETY LIST */
  const societies = useMemo(() => {
    return ["All", ...new Set(data.map((d) => d.society))];
  }, [data]);

  /* FILTER */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((o) => {
      if (society !== "All" && o.society !== society) return false;

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
  }, [search, society, data]);

  /* UPDATE FUNCTION */
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
          📦 Manage <span className="text-blue-600">Subscriptions</span>
        </h1>

        {/* REFRESH / SORT BUTTON */}
        <button
          onClick={() => {
            // Sort by priority: Active → Paused → Canceled, unpaid first
            setData((prev) =>
              [...prev].sort((a, b) => {
                const statusOrder = { Active: 0, Paused: 1, Canceled: 2 };

                // Unpaid first
                const aUnpaid = a.amountStatus === "Pending" ? 0 : 1;
                const bUnpaid = b.amountStatus === "Pending" ? 0 : 1;
                if (aUnpaid !== bUnpaid) return aUnpaid - bUnpaid;

                return (
                  (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3)
                );
              }),
            );
          }}
          className="px-4 py-2 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 transition"
        >
          🔄 Refresh
        </button>
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
          className="p-3 rounded-xl border outline-none bg-white shadow text-sm sm:text-base"
          value={society}
          onChange={(e) => setSociety(e.target.value)}
        >
          {societies.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* LIST */}
      <div className="space-y-4 mt-4">
        {filtered.map((sub) => (
          <div
            key={sub.id}
            className={`rounded-2xl p-4 shadow border ${cardColor(sub)}`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <p className="font-bold text-base sm:text-lg">{sub.name}</p>
                <p className="text-xs sm:text-sm text-slate-500">{sub.id}</p>
              </div>
              <div className="mt-2 sm:mt-0">
                <Status sub={sub} />
              </div>
            </div>

            {/* CLICKABLE PHONE NUMBER WITH ICON */}
            <p className="text-sm sm:text-base text-slate-600 mt-2 flex items-center gap-1">
              <FiPhone className="text-blue-600" />
              <a
                href={`tel:${sub.phone}`}
                className="text-blue-600 hover:underline"
              >
                {sub.phone}
              </a>
            </p>

            <p className="text-sm sm:text-base text-slate-600">
              🏠 {sub.society}, {sub.flat}
            </p>

            {/* DROPDOWNS */}
            <div className="flex gap-3 mt-4">
              <Dropdown
                label="Subscription Status"
                options={["Active", "Paused", "Canceled"]}
                value={sub.status}
                onChange={(val) => update(sub.id, "status", val)}
              />
              <Dropdown
                label="Payment Status"
                options={["Pending", "Paid"]}
                value={sub.amountStatus}
                onChange={(val) => update(sub.id, "amountStatus", val)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* CARD COLOR LOGIC */
const cardColor = (sub) => {
  switch (sub.status) {
    case "Active":
      return "bg-green-50 border-green-200";
    case "Paused":
      return "bg-yellow-50 border-yellow-200";
    case "Canceled":
      return "bg-red-50 border-red-200";
    default:
      return "bg-white border-slate-200";
  }
};

/* STATUS BADGE */
function Status({ sub }) {
  const colors = {
    Active: "bg-green-100 text-green-700",
    Paused: "bg-yellow-100 text-yellow-700",
    Canceled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs sm:text-sm px-3 py-1 rounded-full ${colors[sub.status]}`}
    >
      {sub.status}
    </span>
  );
}

/* INPUT COMPONENT */
function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow">
      <span className="text-blue-500">{icon}</span>
      <input {...props} className="outline-none w-full text-sm sm:text-base" />
    </div>
  );
}

/* DROPDOWN COMPONENT */
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
