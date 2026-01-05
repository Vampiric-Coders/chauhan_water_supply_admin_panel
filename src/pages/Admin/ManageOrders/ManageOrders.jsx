import { useState, useMemo } from "react";
import { FiSearch, FiCalendar } from "react-icons/fi";

const ORDERS = [
  {
    id: "ORD-501",
    name: "Aman Gupta",
    phone: "9876500011",
    society: "Sunrise Heights",
    flat: "A-101",
    date: "2026-01-04",
    type: "order",
    orderStatus: "Pending",
    amountStatus: "Pending"
  },
  {
    id: "ORD-502",
    name: "Karan Mehta",
    phone: "9876500012",
    society: "Green Valley",
    flat: "B-205",
    date: "2026-01-04",
    type: "order",
    orderStatus: "Out for Delivery",
    amountStatus: "Pending"
  },
  {
    id: "ORD-503",
    name: "Priya Sharma",
    phone: "9876500013",
    society: "Palm Residency",
    flat: "C-310",
    date: "2026-01-04",
    type: "order",
    orderStatus: "Delivered",
    amountStatus: "Paid"
  },
];

export default function ManageOrders() {
  const today = "2026-01-04";

  const [data, setData] = useState(ORDERS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const updateOrderStatus = (id, v) =>
    setData(p => p.map(o => (o.id === id ? { ...o, orderStatus: v } : o)));

  const updateAmountStatus = (id, v) =>
    setData(p => p.map(o => (o.id === id ? { ...o, amountStatus: v } : o)));

  const filtered = useMemo(
    () =>
      data.filter(o => {
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

        if (status !== "All" && o.orderStatus !== status) return false;

        return true;
      }),
    [search, status, data]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-slate-800 p-5">
        Orders
        <span className="text-blue-500"> Management</span>
      </h1>

      {/* MAIN CARD */}
      <div className=" backdrop-blur-xl border border-white p-6">

        {/* FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          <Input
            icon={<FiSearch />}
            placeholder="Search customer / phone / order id"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="rounded-2xl px-4 py-3 bg-blue-50 text-blue-700 font-medium outline-none"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setStatus("All");
            }}
            className="rounded-2xl px-4 py-3 bg-blue-600 text-white shadow hover:scale-[.99] transition"
          >
            Clear Filters
          </button>
        </div>

        {/* LIST */}
        <div className="mt-5 space-y-3">

          {filtered.map(o => (
            <div
              key={o.id}
              className={`rounded-2xl p-4 shadow-sm border transition
              ${
                o.amountStatus === "Paid"
                  ? "bg-green-50 border-green-200"
                  : "bg-blue-50 border-blue-100"
              }
            `}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-slate-800">{o.name}</p>
                <Status status={o.orderStatus} />
              </div>

              <p className="text-sm text-slate-600 mt-1">{o.phone}</p>
              <p className="text-sm text-slate-600">
                {o.society} • {o.flat}
              </p>

              {/* DROPDOWNS */}
              <div className="grid grid-cols-2 gap-3 mt-3">

                <PremiumSelect
                  value={o.orderStatus}
                  onChange={e => updateOrderStatus(o.id, e.target.value)}
                  options={["Pending", , "Delivered"]}
                />

                <PremiumSelect
                  value={o.amountStatus}
                  onChange={e => updateAmountStatus(o.id, e.target.value)}
                  options={["Pending", "Paid"]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* INPUT */
function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-inner">
      <span className="text-blue-500">{icon}</span>
      <input {...props} className="bg-transparent outline-none w-full" />
    </div>
  );
}

/* STATUS BADGE */
function Status({ status }) {
  const styles = {
    Pending: "bg-red-100 text-red-700",
    "Out for Delivery": "bg-yellow-100 text-yellow-700",
    Delivered: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

/* BLUE PREMIUM SELECT */
function PremiumSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-xl px-3 py-2 bg-white text-slate-700 shadow border outline-none"
    >
      {options.map(o => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
