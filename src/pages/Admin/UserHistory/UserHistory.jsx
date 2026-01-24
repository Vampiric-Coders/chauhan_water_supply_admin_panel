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
        type: "Daily",
        history: [
          { date: "2026-01-05", time: "07:30 AM", cans: 2, amount: 240 },
          { date: "2026-01-04", time: "08:10 AM", cans: 1, amount: 120 },
        ],
      },
      {
        id: "U-102",
        name: "Ritu Sharma",
        phone: "9876500022",
        type: "Subscription",
        history: [
          { date: "2026-01-05", time: "06:30 AM", cans: 1, amount: 90 },
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
          { date: "2026-01-03", time: "09:15 AM", cans: 2, amount: 240 },
        ],
      },
    ],
  },
];

/* ================= COMPONENT ================= */
export default function UserHistory() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fromReports = location.state?.from === "reports";

  const [selectedSociety, setSelectedSociety] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  /* ================= AUTO SELECT USER (REPORTS FLOW) ================= */
  useEffect(() => {
    if (!userId) return;

    for (const society of SOCIETIES) {
      const user = society.users.find((u) => u.id === userId);
      if (user) {
        setSelectedSociety(society);
        setSelectedUser(user);
        break;
      }
    }
  }, [userId]);

  /* ================= FILTER USERS ================= */
  const filteredUsers = useMemo(() => {
    if (!selectedSociety) return [];
    return selectedSociety.users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [selectedSociety, search]);

  /* ================= FILTER HISTORY ================= */
  const filteredHistory = useMemo(() => {
    if (!selectedUser) return [];
    return selectedUser.history.filter((h) => (date ? h.date === date : true));
  }, [selectedUser, date]);

  /* ================= CSV DOWNLOAD ================= */
  const downloadCSV = () => {
    if (!filteredHistory.length) return;

    const header = "Date,Time,Cans,Amount\n";
    const rows = filteredHistory
      .map((h) => `${h.date},${h.time},${h.cans},${h.amount}`)
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedUser.name}-history.csv`;
    a.click();
  };

  /* ================= BACK BUTTON HANDLER ================= */
  const handleBack = () => {
    // 🔥 Reports se aaye ho → wapas Reports
    if (fromReports) {
      navigate(-1);
      return;
    }

    // Normal UserHistory flow
    if (selectedUser) {
      setSelectedUser(null);
    } else if (selectedSociety) {
      setSelectedSociety(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        {(selectedSociety || fromReports) && (
          <button
            onClick={handleBack}
            className="p-2 rounded-xl bg-white shadow"
          >
            <FiArrowLeft />
          </button>
        )}
        <h1 className="text-2xl font-bold">👤 User History Dashboard</h1>
      </div>

      {/* SOCIETIES */}
      {!selectedSociety && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SOCIETIES.map((s) => (
            <button
              key={s.name}
              onClick={() => setSelectedSociety(s)}
              className="bg-white p-5 rounded-2xl shadow text-left"
            >
              <h2 className="font-bold text-blue-600">🏢 {s.name}</h2>
              <p className="text-sm text-slate-500">Users: {s.users.length}</p>
            </button>
          ))}
        </div>
      )}

      {/* USER LIST */}
      {selectedSociety && !selectedUser && (
        <>
          <div className="bg-white flex items-center px-4 py-2 rounded-xl shadow">
            <FiSearch />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 w-full outline-none"
              placeholder="Search user"
            />
          </div>

          {filteredUsers.map((u) => (
            <div
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className="bg-white p-4 rounded-xl shadow cursor-pointer"
            >
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-slate-500">
                {u.phone} • {u.type}
              </p>
            </div>
          ))}
        </>
      )}

      {/* USER HISTORY */}
      {selectedUser && (
        <div className="bg-white p-4 rounded-2xl shadow space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold">{selectedUser.name}</h2>
              <p className="text-sm text-slate-500">
                {selectedUser.phone} • {selectedUser.type}
              </p>
            </div>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              <FiDownload /> Export
            </button>
          </div>

          <div className="relative w-52">
            <FiCalendar className="absolute left-3 top-3 text-slate-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-9 py-2 border rounded-xl w-full"
            />
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Cans</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((h, i) => (
                <tr key={i} className="border-t">
                  <td>{h.date}</td>
                  <td>{h.time}</td>
                  <td className="text-center">{h.cans}</td>
                  <td className="text-right">₹{h.amount}</td>
                </tr>
              ))}
              {!filteredHistory.length && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-slate-400">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
