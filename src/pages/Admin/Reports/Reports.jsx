import React, { useState, useMemo } from "react";
import { FiDownload, FiCalendar } from "react-icons/fi";

/* ================= DUMMY DATA ================= */
const REPORTS_DATA = [
  {
    id: 1,
    date: "2026-01-05",
    type: "Daily",
    orders: 45,
    revenue: 9000,
  },
  {
    id: 2,
    date: "2026-01-04",
    type: "Subscriptions",
    orders: 30,
    revenue: 15000,
  },
  {
    id: 3,
    date: "2026-01-01",
    type: "Daily",
    orders: 55,
    revenue: 11000,
  },
  {
    id: 4,
    date: "2025-12-15",
    type: "Subscriptions",
    orders: 22,
    revenue: 10000,
  },
];

/* ================= COMPONENT ================= */
const Reports = () => {
  const [historyType, setHistoryType] = useState("All");
  const [range, setRange] = useState("7");
  const [customDate, setCustomDate] = useState("");
  const [customMonth, setCustomMonth] = useState("");

  /* ================= FILTER LOGIC ================= */
  const filteredData = useMemo(() => {
    let data = [...REPORTS_DATA];

    if (historyType !== "All") {
      data = data.filter((d) => d.type === historyType);
    }

    if (customDate) {
      data = data.filter((d) => d.date === customDate);
    }

    if (customMonth) {
      data = data.filter((d) => d.date.startsWith(customMonth));
    }

    return data;
  }, [historyType, customDate, customMonth]);

  /* ================= CSV DOWNLOAD ================= */
  const downloadCSV = () => {
    const header = "Date,Type,Orders,Revenue\n";
    const rows = filteredData
      .map(
        (d) => `${d.date},${d.type},${d.orders},${d.revenue}`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "reports.csv";
    a.click();
  };

  /* ================= UI ================= */
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
          Reports & Analytics
        </h2>
        <p className="text-sm text-slate-500">
          View & download water can delivery reports
        </p>
    
      </div>


      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* History Type */}
          <select
            value={historyType}
            onChange={(e) => setHistoryType(e.target.value)}
            className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            <option>Daily</option>
            <option>Subscriptions</option>
          </select>

          {/* Date Range */}
          {/* <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select> */}

          {/* Particular Date */}
          <div className="relative">
            <FiCalendar className="absolute left-3 top-3 text-slate-400" />
            <input
              type="date"
              value={customDate}
              onChange={(e) => {
                setCustomDate(e.target.value);
                setCustomMonth("");
              }}
              className="border rounded-xl pl-9 pr-3 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Particular Month */}
          <input
            type="month"
            value={customMonth}
            onChange={(e) => {
              setCustomMonth(e.target.value);
              setCustomDate("");
            }}
            className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          {/* Download Button */}
      <div className="">
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow hover:bg-blue-700 active:scale-95 transition"
        >
          <FiDownload />
          Download Report
        </button>
      </div>
        </div>


      </div>

      {/* Table / Cards */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-center px-4 py-3">Orders</th>
                <th className="text-right px-4 py-3">Revenue (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="px-4 py-3">{d.date}</td>
                  <td className="px-4 py-3">{d.type}</td>
                  <td className="px-4 py-3 text-center">{d.orders}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    ₹{d.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y">
          {filteredData.map((d) => (
            <div key={d.id} className="p-4 space-y-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-700">
                  {d.type}
                </span>
                <span className="text-xs text-slate-500">{d.date}</span>
              </div>
              <div className="text-sm text-slate-600">
                Orders: <span className="font-medium">{d.orders}</span>
              </div>
              <div className="text-sm font-semibold text-blue-600">
                ₹{d.revenue}
              </div>
            </div>
          ))}
        </div>
      </div>

    
    </div>
  );
};

export default Reports;
