// // UNIFIED USER DASHBOARD (User + Admin View)
// // Shows: Date-wise orders, month filter, daily vs subscription, payments
// // Can be used by USER (self) or ADMIN (read-only / full)

// import React, { useState, useMemo } from "react";
// import { FiCalendar, FiArrowLeft } from "react-icons/fi";

// /* ================= DUMMY USER DATA ================= */
// const USER_PROFILE = {
//   id: "U-101",
//   name: "Aman Gupta",
//   phone: "9876500011",
//   society: "Sunrise Heights",
//   flat: "A-101",
// };

// const USER_HISTORY = [
//   { date: "2026-01-10", type: "Daily", cans: 2, amount: 240, paid: true },
//   { date: "2026-01-09", type: "Daily", cans: 1, amount: 120, paid: true },
//   { date: "2026-01-05", type: "Subscription", cans: 30, amount: 2700, paid: true },
//   { date: "2025-12-05", type: "Subscription", cans: 30, amount: 2700, paid: false },
//   { date: "2025-11-20", type: "Daily", cans: 3, amount: 360, paid: true },
// ];

// export default function UserDashboard({ onBack }) {
//   const [month, setMonth] = useState("");

//   /* ================= FILTER ================= */
//   const filteredHistory = useMemo(() => {
//     let list = [...USER_HISTORY];
//     if (month) list = list.filter((h) => h.date.startsWith(month));
//     return list;
//   }, [month]);

//   const summary = useMemo(() => {
//     return filteredHistory.reduce(
//       (acc, h) => {
//         acc.totalCans += h.cans;
//         acc.totalAmount += h.amount;
//         if (!h.paid) acc.pending += h.amount;
//         return acc;
//       },
//       { totalCans: 0, totalAmount: 0, pending: 0 }
//     );
//   }, [filteredHistory]);

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
//       {/* HEADER */}
//       <div className="flex items-center gap-3">
//         {onBack && (
//           <button
//             onClick={onBack}
//             className="p-2 rounded-xl bg-white shadow"
//           >
//             <FiArrowLeft />
//           </button>
//         )}
//         <div>
//           <h1 className="text-xl md:text-2xl font-bold">👤 User Dashboard</h1>
//           <p className="text-sm text-slate-500">Personal water delivery & billing</p>
//         </div>
//       </div>

//       {/* USER CARD */}
//       <div className="bg-white rounded-2xl shadow p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div>
//           <p className="text-xs text-slate-500">Name</p>
//           <p className="font-semibold">{USER_PROFILE.name}</p>
//         </div>
//         <div>
//           <p className="text-xs text-slate-500">Phone</p>
//           <p className="font-semibold">{USER_PROFILE.phone}</p>
//         </div>
//         <div>
//           <p className="text-xs text-slate-500">Society</p>
//           <p className="font-semibold">{USER_PROFILE.society}</p>
//         </div>
//         <div>
//           <p className="text-xs text-slate-500">Flat</p>
//           <p className="font-semibold">{USER_PROFILE.flat}</p>
//         </div>
//       </div>

//       {/* SUMMARY */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <SummaryCard title="Total Cans" value={summary.totalCans} />
//         <SummaryCard title="Total Amount" value={`₹${summary.totalAmount}`} />
//         <SummaryCard title="Pending" value={`₹${summary.pending}`} highlight />
//       </div>

//       {/* FILTER */}
//       <div className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center">
//         <FiCalendar className="text-slate-400" />
//         <input
//           type="month"
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//           className="border rounded-xl px-3 py-2"
//         />
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow border overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="px-3 py-2 text-left">Date</th>
//               <th className="px-3 py-2">Type</th>
//               <th className="px-3 py-2">Cans</th>
//               <th className="px-3 py-2">Amount</th>
//               <th className="px-3 py-2">Payment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredHistory.map((h, i) => (
//               <tr key={i} className="border-t text-center">
//                 <td className="px-3 py-2 text-left">{h.date}</td>
//                 <td>{h.type}</td>
//                 <td>{h.cans}</td>
//                 <td>₹{h.amount}</td>
//                 <td className={h.paid ? "text-green-600" : "text-red-600"}>
//                   {h.paid ? "Paid" : "Pending"}
//                 </td>
//               </tr>
//             ))}
//             {!filteredHistory.length && (
//               <tr>
//                 <td colSpan={5} className="py-6 text-center text-slate-400">
//                   No data for selected month
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function SummaryCard({ title, value, highlight }) {
//   return (
//     <div
//       className={`rounded-2xl p-4 shadow text-center bg-white ${
//         highlight ? "border-2 border-red-400" : ""
//       }`}
//     >
//       <p className="text-sm text-slate-500">{title}</p>
//       <p className="text-xl font-bold">{value}</p>
//     </div>
//   );
// }

// ================= USER HISTORY SCREEN =================
// Path: admin/UserHistory/UserHistory.jsx
// Purpose: Society-wise users → user-wise full order & subscription history

import React, { useState, useMemo } from "react";
import { FiSearch, FiDownload, FiArrowLeft, FiCalendar } from "react-icons/fi";

/* ================= DUMMY DATA ================= */
const SOCIETIES = [
  {
    name: "Sunrise Heights",
    users: [
      {
        id: "U-101",
        name: "Aman Gupta",
        phone: "9876500011",
        type: "Daily",
        history: [
          { date: "2026-01-05", time: "07:30 AM", cans: 2, amount: 240 },
          { date: "2026-01-04", time: "08:10 AM", cans: 1, amount: 120 },
          { date: "2026-01-01", time: "07:50 AM", cans: 3, amount: 360 },
        ],
      },
      {
        id: "U-102",
        name: "Ritu Sharma",
        phone: "9876500022",
        type: "Subscription",
        history: [
          { date: "2026-01-05", time: "06:30 AM", cans: 1, amount: 90 },
          { date: "2026-01-04", time: "06:30 AM", cans: 1, amount: 90 },
        ],
      },
    ],
  },
  {
    name: "Green Valley",
    users: [
      {
        id: "U-103",
        name: "Karan Mehta",
        phone: "9876500012",
        type: "Daily",
        history: [
          { date: "2026-01-05", time: "09:00 AM", cans: 1, amount: 120 },
          { date: "2026-01-03", time: "09:15 AM", cans: 2, amount: 240 },
        ],
      },
    ],
  },
];

/* ================= COMPONENT ================= */
export default function UserHistory() {
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  /* ================= FILTERED USERS ================= */
  const users = useMemo(() => {
    if (!selectedSociety) return [];
    return selectedSociety.users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [selectedSociety, search]);

  /* ================= FILTERED HISTORY ================= */
  const history = useMemo(() => {
    if (!selectedUser) return [];
    return selectedUser.history.filter((h) => (date ? h.date === date : true));
  }, [selectedUser, date]);

  /* ================= CSV DOWNLOAD ================= */
  const downloadCSV = () => {
    if (!history.length) return;

    const header = "Date,Time,Cans,Amount\n";
    const rows = history
      .map((h) => `${h.date},${h.time},${h.cans},${h.amount}`)
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedUser.name}-history.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        {selectedSociety && (
          <button
            onClick={() => {
              setSelectedSociety(null);
              setSelectedUser(null);
            }}
            className="p-2 rounded-xl bg-white shadow"
          >
            <FiArrowLeft />
          </button>
        )}
        <h1 className="text-2xl font-bold text-slate-800">
          👤 User History Dashboard
        </h1>
      </div>

      {/* SOCIETY CARDS */}
      {!selectedSociety && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOCIETIES.map((s) => (
            <button
              key={s.name}
              onClick={() => setSelectedSociety(s)}
              className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition text-left"
            >
              <h2 className="text-lg font-bold text-blue-600">🏢 {s.name}</h2>
              <p className="text-sm text-slate-500 mt-1">
                👥 Customers: {s.users.length}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* USER LIST */}
      {selectedSociety && !selectedUser && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex items-center bg-white rounded-xl px-4 py-2 shadow w-full">
              <FiSearch className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user by name"
                className="outline-none ml-2 w-full"
              />
            </div>
          </div>

          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className="bg-white p-4 rounded-2xl shadow hover:bg-blue-50 cursor-pointer"
              >
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-slate-500">
                  {u.phone} • {u.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USER HISTORY */}
      {selectedUser && (
        <div className="bg-white rounded-2xl shadow p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{selectedUser.name}</h2>
              <p className="text-sm text-slate-500">
                {selectedUser.phone} • {selectedUser.type}
              </p>
            </div>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              <FiDownload /> Excel
            </button>
          </div>

          <div className="relative max-w-xs">
            <FiCalendar className="absolute left-3 top-3 text-slate-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-xl pl-9 pr-3 py-2 w-full"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Time</th>
                  <th className="px-3 py-2 text-center">Cans</th>
                  <th className="px-3 py-2 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-3 py-2">{h.date}</td>
                    <td className="px-3 py-2">{h.time}</td>
                    <td className="px-3 py-2 text-center">{h.cans}</td>
                    <td className="px-3 py-2 text-right font-medium">
                      ₹{h.amount}
                    </td>
                  </tr>
                ))}
                {!history.length && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-slate-400">
                      No data for selected date
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
