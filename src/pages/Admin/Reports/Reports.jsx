// import React, { useState, useMemo } from "react";
// import { FiDownload, FiCalendar } from "react-icons/fi";

// /* ================= DUMMY DATA ================= */
// const REPORTS_DATA = [
//   {
//     id: 1,
//     date: "2026-01-05",
//     type: "Daily",
//     orders: 45,
//     revenue: 9000,
//   },
//   {
//     id: 2,
//     date: "2026-01-04",
//     type: "Subscriptions",
//     orders: 30,
//     revenue: 15000,
//   },
//   {
//     id: 3,
//     date: "2026-01-01",
//     type: "Daily",
//     orders: 55,
//     revenue: 11000,
//   },
//   {
//     id: 4,
//     date: "2025-12-15",
//     type: "Subscriptions",
//     orders: 22,
//     revenue: 10000,
//   },
// ];

// /* ================= COMPONENT ================= */
// const Reports = () => {
//   const [historyType, setHistoryType] = useState("All");
//   const [range, setRange] = useState("7");
//   const [customDate, setCustomDate] = useState("");
//   const [customMonth, setCustomMonth] = useState("");

//   /* ================= FILTER LOGIC ================= */
//   const filteredData = useMemo(() => {
//     let data = [...REPORTS_DATA];

//     if (historyType !== "All") {
//       data = data.filter((d) => d.type === historyType);
//     }

//     if (customDate) {
//       data = data.filter((d) => d.date === customDate);
//     }

//     if (customMonth) {
//       data = data.filter((d) => d.date.startsWith(customMonth));
//     }

//     return data;
//   }, [historyType, customDate, customMonth]);

//   /* ================= CSV DOWNLOAD ================= */
//   const downloadCSV = () => {
//     const header = "Date,Type,Orders,Revenue\n";
//     const rows = filteredData
//       .map(
//         (d) => `${d.date},${d.type},${d.orders},${d.revenue}`
//       )
//       .join("\n");

//     const blob = new Blob([header + rows], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "reports.csv";
//     a.click();
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
//           Reports & Analytics
//         </h2>
//         <p className="text-sm text-slate-500">
//           View & download water can delivery reports
//         </p>

//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {/* History Type */}
//           <select
//             value={historyType}
//             onChange={(e) => setHistoryType(e.target.value)}
//             className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
//           >
//             <option>All</option>
//             <option>Daily</option>
//             <option>Subscriptions</option>
//           </select>

//           {/* Date Range */}
//           {/* <select
//             value={range}
//             onChange={(e) => setRange(e.target.value)}
//             className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="7">Last 7 Days</option>
//             <option value="30">Last 30 Days</option>
//             <option value="90">Last 90 Days</option>
//           </select> */}

//           {/* Particular Date */}
//           <div className="relative">
//             <FiCalendar className="absolute left-3 top-3 text-slate-400" />
//             <input
//               type="date"
//               value={customDate}
//               onChange={(e) => {
//                 setCustomDate(e.target.value);
//                 setCustomMonth("");
//               }}
//               className="border rounded-xl pl-9 pr-3 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Particular Month */}
//           <input
//             type="month"
//             value={customMonth}
//             onChange={(e) => {
//               setCustomMonth(e.target.value);
//               setCustomDate("");
//             }}
//             className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
//           />
//           {/* Download Button */}
//       <div className="">
//         <button
//           onClick={downloadCSV}
//           className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow hover:bg-blue-700 active:scale-95 transition"
//         >
//           <FiDownload />
//           Download Report
//         </button>
//       </div>
//         </div>

//       </div>

//       {/* Table / Cards */}
//       <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
//         {/* Desktop Table */}
//         <div className="hidden md:block">
//           <table className="w-full text-sm">
//             <thead className="bg-slate-100 text-slate-600">
//               <tr>
//                 <th className="text-left px-4 py-3">Date</th>
//                 <th className="text-left px-4 py-3">Type</th>
//                 <th className="text-center px-4 py-3">Orders</th>
//                 <th className="text-right px-4 py-3">Revenue (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((d) => (
//                 <tr key={d.id} className="border-t">
//                   <td className="px-4 py-3">{d.date}</td>
//                   <td className="px-4 py-3">{d.type}</td>
//                   <td className="px-4 py-3 text-center">{d.orders}</td>
//                   <td className="px-4 py-3 text-right font-medium">
//                     ₹{d.revenue}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Cards */}
//         <div className="md:hidden divide-y">
//           {filteredData.map((d) => (
//             <div key={d.id} className="p-4 space-y-1">
//               <div className="flex justify-between">
//                 <span className="text-sm font-medium text-slate-700">
//                   {d.type}
//                 </span>
//                 <span className="text-xs text-slate-500">{d.date}</span>
//               </div>
//               <div className="text-sm text-slate-600">
//                 Orders: <span className="font-medium">{d.orders}</span>
//               </div>
//               <div className="text-sm font-semibold text-blue-600">
//                 ₹{d.revenue}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Reports;

// ADVANCED REPORTS & EXPORT DASHBOARD (UPDATED)
// Scope: Admin Reports Screen
// Features:
// - Society wise + User type filters
// - Daily / Subscription segregation
// - Date / Month / Range filters
// - Screen preview = Excel export (same data)
// - Clickable user → open User Dashboard screen

import React, { useState, useMemo } from "react";
import { FiDownload, FiCalendar, FiUsers } from "react-icons/fi";

/* ================= DUMMY MASTER DATA ================= */
const USERS = [
  {
    id: "U-101",
    name: "Aman Gupta",
    phone: "9876500011",
    society: "Sunrise Heights",
    type: "Daily",
    history: [
      { date: "2026-01-10", cans: 2, amount: 240 },
      { date: "2026-01-08", cans: 3, amount: 360 },
      { date: "2025-12-20", cans: 1, amount: 120 },
    ],
  },
  {
    id: "U-102",
    name: "Pooja Jain",
    phone: "9876500020",
    society: "Palm Residency",
    type: "Subscription",
    history: [
      { date: "2026-01-05", cans: 30, amount: 2700 },
      { date: "2025-12-05", cans: 30, amount: 2700 },
      { date: "2025-11-05", cans: 30, amount: 2700 },
    ],
  },
];

const SOCIETIES = ["All", ...new Set(USERS.map((u) => u.society))];

/* ================= COMPONENT ================= */
export default function ReportsDashboard() {
  const [userType, setUserType] = useState("All");
  const [society, setSociety] = useState("All");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");

  /* ================= FLATTEN REPORT DATA ================= */
  const reportRows = useMemo(() => {
    let rows = [];

    USERS.forEach((u) => {
      if (userType !== "All" && u.type !== userType) return;
      if (society !== "All" && u.society !== society) return;

      u.history.forEach((h) => {
        if (date && h.date !== date) return;
        if (month && !h.date.startsWith(month)) return;

        rows.push({
          UserID: u.id,
          Name: u.name,
          Phone: u.phone,
          Society: u.society,
          Type: u.type,
          Date: h.date,
          Cans: h.cans,
          Amount: h.amount,
        });
      });
    });

    return rows.sort((a, b) => (a.Date < b.Date ? 1 : -1));
  }, [userType, society, date, month]);

  /* ================= CSV EXPORT ================= */
  const downloadCSV = () => {
    if (!reportRows.length) return;

    const headers = Object.keys(reportRows[0]).join(",");
    const rows = reportRows.map((r) => Object.values(r).join(",")).join("\n");

    const blob = new Blob([headers + "\n" + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "water-supply-report.csv";
    a.click();
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-slate-50 p-5 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          📑 Reports Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Apply filters → preview data → download same Excel
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-2xl shadow p-4 grid grid-cols-1 md:grid-cols-6 gap-4">
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option value="All">All Users</option>
          <option value="Daily">Daily Orders</option>
          <option value="Subscription">Subscription</option>
        </select>

        <select
          value={society}
          onChange={(e) => setSociety(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          {SOCIETIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="relative">
          <FiCalendar className="absolute left-3 top-3 text-slate-400" />
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setMonth("");
            }}
            className="border rounded-xl pl-9 pr-3 py-2 w-full"
          />
        </div>

        <input
          type="month"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            setDate("");
          }}
          className="border rounded-xl px-3 py-2"
        />

        <button
          onClick={downloadCSV}
          className="md:col-span-2 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-4 py-2 font-semibold shadow hover:bg-blue-700"
        >
          <FiDownload /> Download Excel
        </button>
      </div>

      {/* REPORT TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              {reportRows[0] &&
                Object.keys(reportRows[0]).map((h) => (
                  <th key={h} className="px-3 py-2 text-left">
                    {h}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {reportRows.map((r, i) => (
              <tr key={i} className="border-t hover:bg-slate-50">
                <td className="px-3 py-2 font-semibold text-blue-600 cursor-pointer">
                  {r.UserID}
                </td>
                <td className="px-3 py-2">{r.Name}</td>
                <td className="px-3 py-2">{r.Phone}</td>
                <td className="px-3 py-2">{r.Society}</td>
                <td className="px-3 py-2">{r.Type}</td>
                <td className="px-3 py-2">{r.Date}</td>
                <td className="px-3 py-2">{r.Cans}</td>
                <td className="px-3 py-2 font-semibold">₹{r.Amount}</td>
              </tr>
            ))}
            {!reportRows.length && (
              <tr>
                <td colSpan={10} className="text-center py-6 text-slate-400">
                  No data for selected filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
