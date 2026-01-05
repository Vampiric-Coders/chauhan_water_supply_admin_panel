import { useState, useMemo } from "react";
import { FiSearch, FiCalendar } from "react-icons/fi";

const ORDERS = [
  // ===== TODAY ORDERS =====
  {
    id: "ORD-101",
    name: "Ramesh Kumar",
    phone: "9876543210",
    society: "Sunrise Heights",
    flat: "A-101",
    status: "Pending",
    date: "2026-01-04",
    type: "order"
  },
  {
    id: "ORD-102",
    name: "Suresh Patel",
    phone: "9876543211",
    society: "Green Valley",
    flat: "B-202",
    status: "Out for Delivery",
    date: "2026-01-04",
    type: "order"
  },
  {
    id: "ORD-103",
    name: "Anita Sharma",
    phone: "9876543212",
    society: "Sky Residency",
    flat: "C-303",
    status: "Delivered",
    date: "2026-01-04",
    type: "order"
  },
  {
    id: "ORD-104",
    name: "Mohit Verma",
    phone: "9876543213",
    society: "Palm Residency",
    flat: "A-204",
    status: "Pending",
    date: "2026-01-04",
    type: "order"
  },
  {
    id: "ORD-105",
    name: "Pooja Singh",
    phone: "9876543214",
    society: "Green Valley",
    flat: "D-110",
    status: "Out for Delivery",
    date: "2026-01-04",
    type: "order"
  },

  // ===== YESTERDAY / OLD ORDERS =====
  {
    id: "ORD-096",
    name: "Rajesh Yadav",
    phone: "9876543215",
    society: "Sky Residency",
    flat: "B-402",
    status: "Delivered",
    date: "2026-01-03",
    type: "order"
  },
  {
    id: "ORD-097",
    name: "Neha Joshi",
    phone: "9876543216",
    society: "Palm Residency",
    flat: "A-303",
    status: "Delivered",
    date: "2026-01-03",
    type: "order"
  },
  {
    id: "ORD-098",
    name: "Amit Shah",
    phone: "9876543217",
    society: "Sunrise Heights",
    flat: "C-210",
    status: "Delivered",
    date: "2026-01-02",
    type: "order"
  },
  {
    id: "ORD-099",
    name: "Kavita Mehta",
    phone: "9876543218",
    society: "Green Valley",
    flat: "E-105",
    status: "Delivered",
    date: "2026-01-01",
    type: "order"
  },

  // ===== SUBSCRIPTIONS =====
  {
    id: "SUB-201",
    name: "Vikram Malhotra",
    phone: "9876543219",
    society: "Palm Residency",
    flat: "D-402",
    status: "Active",
    date: "2026-01-04",
    type: "subscription"
  },
  {
    id: "SUB-202",
    name: "Sneha Kapoor",
    phone: "9876543220",
    society: "Sunrise Heights",
    flat: "B-305",
    status: "Paused",
    date: "2026-01-03",
    type: "subscription"
  },
  {
    id: "SUB-203",
    name: "Arjun Singh",
    phone: "9876543221",
    society: "Sky Residency",
    flat: "A-110",
    status: "Active",
    date: "2026-01-02",
    type: "subscription"
  },
  {
    id: "SUB-204",
    name: "Meena Rao",
    phone: "9876543222",
    society: "Green Valley",
    flat: "C-221",
    status: "Paused",
    date: "2026-01-01",
    type: "subscription"
  },
  {
    id: "SUB-205",
    name: "Rahul Khanna",
    phone: "9876543223",
    society: "Palm Residency",
    flat: "E-509",
    status: "Active",
    date: "2026-01-04",
    type: "subscription"
  }
];


export default function AdminDashboard() {
  const [tab, setTab] = useState("Today Orders");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("All");

  const today = "2026-01-04";

  /* 🔥 MAIN FILTER LOGIC */
  const filteredData = useMemo(() => {
    return ORDERS.filter(o => {
      // Tab filter
      if (tab === "Today Orders" && o.type !== "order") return false;
      if (tab === "Subscriptions" && o.type !== "subscription") return false;

      // Today filter
      if (tab === "Today Orders" && o.date !== today) return false;

      // Search filter
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

      // Date filter
      if (date && o.date !== date) return false;

      // Status filter
      if (status !== "All" && o.status !== status) return false;

      return true;
    });
  }, [tab, search, date, status]);

  return (
    <div className="min-h-screen bg-white p-4 space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-500 font-sans"> Dashboard</h1>
        <p className="text-sm text-gray-500">Orders & Subscriptions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b">
        {["Today Orders", "Subscriptions"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 font-semibold ${
              tab === t
                ? "text-sky-600 border-b-2 border-sky-600"
                : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Input icon={<FiSearch />} placeholder="Search name / phone / order" value={search} onChange={e => setSearch(e.target.value)} />
        <Input icon={<FiCalendar />} type="date" value={date} onChange={e => setDate(e.target.value)} />

        <select
          className="bg-white px-3 py-2 rounded-lg shadow text-sm"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Out for Delivery</option>
          <option>Delivered</option>
          <option>Active</option>
          <option>Paused</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setDate("");
            setStatus("All");
          }}
          className="bg-gray-200 rounded-lg text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Data View */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No data found</p>
      ) : (
        <div className="space-y-4 sm:hidden">
          {/* MOBILE CARDS */}
          {filteredData.map(o => (
            <div key={o.id} className="bg-white p-4 rounded-xl shadow">
              <div className="flex justify-between">
                <p className="font-semibold">{o.name}</p>
                <StatusTag status={o.status} />
              </div>
              <p className="text-sm">ID: {o.id}</p>
              <p className="text-sm">Phone: {o.phone}</p>
              <p className="text-sm">{o.society}, {o.flat}</p>
            </div>
          ))}
        </div>
      )}

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Society</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(o => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.name}</td>
                <td className="p-3">{o.phone}</td>
                <td className="p-3">{o.society}</td>
                <td className="p-3"><StatusTag status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

/* COMPONENTS */

function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow">
      {icon}
      <input className="outline-none text-sm w-full" {...props} />
    </div>
  );
}

function StatusTag({ status }) {
  const map = {
    Pending: "bg-red-100 text-red-700",
    "Out for Delivery": "bg-yellow-100 text-yellow-700",
    Delivered: "bg-green-100 text-green-700",
    Active: "bg-green-100 text-green-700",
    Paused: "bg-gray-200 text-gray-700"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs ${map[status]}`}>
      {status}
    </span>
  );
}
