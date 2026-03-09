import React, { useState, useMemo, useEffect } from "react";
import { FiDownload, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ReportsDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userType, setUserType] = useState("All");
  const [society, setSociety] = useState("All");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");

  const navigate = useNavigate();

  /* ================= FETCH ORDERS FROM BACKEND ================= */
useEffect(() => {
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:8080/api/orders/all-orders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ send token
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

  /* ================= GET UNIQUE SOCIETIES ================= */
  const SOCIETIES = useMemo(() => {
    const unique = [
      ...new Set(orders.map((o) => o.user?.societyName).filter(Boolean)),
    ];
    return ["All", ...unique];
  }, [orders]);

  /* ================= FORMAT & FILTER REPORT DATA ================= */
  const reportRows = useMemo(() => {
    let rows = [];

    orders.forEach((order) => {
      const formattedDate = new Date(order.date)
        .toISOString()
        .split("T")[0];

      const formattedMonth = formattedDate.slice(0, 7);

      if (
        userType !== "All" &&
        order.orderType.toLowerCase() !== userType.toLowerCase()
      )
        return;

      if (
        society !== "All" &&
        order.user?.societyName !== society
      )
        return;

      if (date && formattedDate !== date) return;

      if (month && formattedMonth !== month) return;

      rows.push({
        UserID: order.user?._id,
        Name: order.user?.name,
        Phone: order.user?.phoneNumber,
        Society: order.user?.societyName,
        Flat: order.user?.addressFlatNo,
        Type:
          order.orderType.charAt(0).toUpperCase() +
          order.orderType.slice(1),
        Status: order.orderStatus,
        Payment: order.orderPayment,
        Date: formattedDate,
        Cans: order.cansPerDay,
        Amount: Number(order.totalAmount),
      });
    });

    return rows.sort((a, b) => (a.Date < b.Date ? 1 : -1));
  }, [orders, userType, society, date, month]);

  /* ================= CSV EXPORT ================= */
  const downloadCSV = () => {
    if (!reportRows.length) return;

    const headers = Object.keys(reportRows[0]).join(",");
    const rows = reportRows
      .map((r) => Object.values(r).join(","))
      .join("\n");

    const blob = new Blob([headers + "\n" + rows], {
      type: "text/csv",
    });

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
          <option value="All">All Orders</option>
          <option value="daily">Daily</option>
          <option value="subscription">Subscription</option>
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

      {/* TABLE */}
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
            {loading && (
              <tr>
                <td colSpan={12} className="text-center py-6">
                  Loading orders...
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan={12} className="text-center py-6 text-red-500">
                  {error}
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              reportRows.map((r, i) => (
                <tr key={i} className="border-t hover:bg-slate-50">
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
                  <td className="px-3 py-2">{r.Flat}</td>
                  <td className="px-3 py-2">{r.Type}</td>
                  <td className="px-3 py-2">{r.Status}</td>
                  <td className="px-3 py-2">{r.Payment}</td>
                  <td className="px-3 py-2">{r.Date}</td>
                  <td className="px-3 py-2">{r.Cans}</td>
                  <td className="px-3 py-2 font-semibold">
                    ₹{r.Amount}
                  </td>
                </tr>
              ))}

            {!loading && !error && !reportRows.length && (
              <tr>
                <td colSpan={12} className="text-center py-6 text-slate-400">
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