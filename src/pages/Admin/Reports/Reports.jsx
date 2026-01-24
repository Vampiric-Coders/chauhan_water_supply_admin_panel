import React, { useState, useMemo } from "react";
import { FiDownload, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
          Apply filters → preview data → download Excel
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
                {/* 🔥 IMPORTANT CHANGE HERE */}
                <td
                  onClick={() =>
                    navigate(`/admin/user/${r.UserID}`, {
                      state: { from: "reports" },
                    })
                  }
                  className="px-3 py-2 font-semibold text-blue-600 cursor-pointer hover:underline"
                >
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
