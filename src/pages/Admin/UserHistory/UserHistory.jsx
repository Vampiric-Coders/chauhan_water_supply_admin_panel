import React, { useState, useMemo, useEffect } from "react";
import { FiSearch, FiDownload, FiArrowLeft, FiCalendar } from "react-icons/fi";
import { useParams, useNavigate, useLocation } from "react-router-dom";

/* ================= DUMMY DATA ================= */
const SOCIETIES = [
  {
    name: "Sunrise Heights",
    users: [
      {
        id: "U-101",
        name: "Aman Gupta",
        phone: "9876500011",
        flat: "A-203",
        type: "Daily",
        history: [
          {
            orderId: "ORD-1001",
            date: "2026-01-05",
            time: "07:30 AM",
            cans: 2,
            amount: 240,
          },
          {
            orderId: "ORD-1002",
            date: "2026-01-04",
            time: "08:10 AM",
            cans: 1,
            amount: 120,
          },
        ],
      },
      {
        id: "U-102",
        name: "Ritu Sharma",
        phone: "9876500022",
        flat: "B-110",
        type: "Subscription",
        history: [
          {
            orderId: "ORD-1003",
            date: "2026-01-05",
            time: "06:30 AM",
            cans: 1,
            amount: 90,
          },
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
        flat: "C-404",
        type: "Daily",
        history: [
          {
            orderId: "ORD-1004",
            date: "2026-01-03",
            time: "09:15 AM",
            cans: 2,
            amount: 240,
          },
        ],
      },
    ],
  },
];

export default function UserHistory() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromReports = location.state?.from === "reports";

  const [selectedSociety, setSelectedSociety] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");

  /* ===== AUTO SELECT USER (REPORT FLOW) ===== */
  useEffect(() => {
    if (!userId) return;
    for (const s of SOCIETIES) {
      const u = s.users.find((x) => x.id === userId);
      if (u) {
        setSelectedSociety(s);
        setSelectedUser(u);
        break;
      }
    }
  }, [userId]);

  /* ===== RESET WHEN SIDEBAR CLICK ===== */
  useEffect(() => {
    if (!userId && !fromReports) {
      setSelectedSociety(null);
      setSelectedUser(null);
      setSearch("");
      setDate("");
      setMonth("");
    }
  }, [location.pathname, userId, fromReports]);

  /* ===== FILTER USERS ===== */
  const filteredUsers = useMemo(() => {
    if (!selectedSociety) return [];
    return selectedSociety.users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [selectedSociety, search]);

  /* ===== FILTER HISTORY ===== */
  const filteredHistory = useMemo(() => {
    if (!selectedUser) return [];
    return selectedUser.history.filter((h) => {
      if (date && h.date !== date) return false;
      if (month && !h.date.startsWith(month)) return false;
      return true;
    });
  }, [selectedUser, date, month]);

  /* ===== SUMMARY ===== */
  const summary = useMemo(() => {
    const totalOrders = filteredHistory.length;
    const totalCans = filteredHistory.reduce((s, h) => s + h.cans, 0);
    const totalAmount = filteredHistory.reduce((s, h) => s + h.amount, 0);
    return { totalOrders, totalCans, totalAmount };
  }, [filteredHistory]);

  /* ===== CSV ===== */
  const downloadCSV = () => {
    if (!filteredHistory.length) return;
    const header = "OrderID,Date,Time,Cans,Amount\n";
    const rows = filteredHistory
      .map((h) => `${h.orderId},${h.date},${h.time},${h.cans},${h.amount}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${selectedUser.name}-orders.csv`;
    a.click();
  };

  const handleBack = () => {
    if (fromReports) return navigate(-1);
    if (selectedUser) setSelectedUser(null);
    else setSelectedSociety(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        {(selectedSociety || fromReports) && (
          <button
            onClick={handleBack}
            className="p-2 bg-white rounded-xl shadow hover:bg-blue-50"
          >
            <FiArrowLeft />
          </button>
        )}
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          User History Dashboard
        </h1>
      </div>

      {/* SOCIETIES */}
      {!selectedSociety && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SOCIETIES.map((s) => (
            <div
              key={s.name}
              onClick={() => setSelectedSociety(s)}
              className="cursor-pointer rounded-2xl p-5 text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:scale-[1.02] transition"
            >
              <h2 className="text-lg font-bold">🏢 {s.name}</h2>
              <p className="text-sm mt-1">👥 Users: {s.users.length}</p>
            </div>
          ))}
        </div>
      )}

      {/* USERS */}
      {selectedSociety && !selectedUser && (
        <>
          <div className="bg-white flex items-center px-4 py-2 rounded-xl shadow">
            <FiSearch className="text-slate-400" />
            <input
              className="ml-2 w-full outline-none"
              placeholder="Search user"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredUsers.map((u) => (
            <div
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className="bg-white rounded-2xl p-4 shadow hover:shadow-lg cursor-pointer border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">{u.name}</p>
                  <p className="text-sm text-slate-500">
                    📞{" "}
                    <a
                      href={`tel:${u.phone}`}
                      className="underline hover:text-blue-600"
                    >
                      {u.phone}
                    </a>{" "}
                    • 🏠 {u.flat}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    u.type === "Subscription"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {u.type}
                </span>
              </div>
            </div>
          ))}
        </>
      )}

      {/* USER HISTORY */}
      {selectedUser && (
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <h2 className="font-bold text-lg">{selectedUser.name}</h2>
              <p className="text-sm text-slate-500">
                Flat {selectedUser.flat} • 📞{" "}
                <a
                  href={`tel:${selectedUser.phone}`}
                  className="underline hover:text-blue-600"
                >
                  {selectedUser.phone}
                </a>
              </p>
            </div>
            <button
              onClick={downloadCSV}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 w-fit"
            >
              <FiDownload /> Download
            </button>
          </div>

          {/* FILTERS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-slate-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setMonth("");
                }}
                className="pl-9 py-2 border rounded-xl w-full text-center"
              />
            </div>

            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-slate-400" />
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setDate("");
                }}
                className="pl-9 pr-3 py-2 border rounded-xl w-full text-center bg-white"
              >
                <option value="">Select Month</option>
                <option value="2026-01">January 2026</option>
                <option value="2026-02">February 2026</option>
                <option value="2026-03">March 2026</option>
              </select>
            </div>
          </div>

          {/* SUMMARY BAR */}
          <div className="grid grid-cols-3 gap-4">
            <SummaryCard
              title="Orders"
              value={summary.totalOrders}
              color="blue"
            />
            <SummaryCard title="Cans" value={summary.totalCans} color="green" />
            <SummaryCard
              title="Total ₹"
              value={summary.totalAmount}
              color="indigo"
            />
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Order ID</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Cans</th>
                  <th className="text-right pr-6">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((h, i) => (
                  <tr key={i} className="border-b hover:bg-blue-50 transition">
                    <td className="px-4 py-3 font-semibold">{h.orderId}</td>
                    <td className="text-center">{h.date}</td>
                    <td className="text-center">{h.time}</td>
                    <td className="text-center">{h.cans}</td>
                    <td className="text-right pr-6 font-bold text-green-600">
                      ₹{h.amount}
                    </td>
                  </tr>
                ))}
                {!filteredHistory.length && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-slate-400">
                      No orders found
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

/* ===== SUMMARY CARD ===== */
function SummaryCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };
  return (
    <div className={`rounded-xl p-4 ${colors[color]}`}>
      <p className="text-xs font-semibold">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
