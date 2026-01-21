import { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";

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

  /* FILTER */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(
      (o) =>
        !q ||
        o.name.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.id.toLowerCase().includes(q),
    );
  }, [search, data]);

  const update = (id, key, value) => {
    setData((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [key]: value } : o)),
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-5 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
        📦 Manage <span className="text-blue-600">Subscriptions</span>
      </h1>

      {/* SEARCH */}
      <Input
        icon={<FiSearch />}
        placeholder="Search name / phone / id"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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

            <p className="text-sm sm:text-base text-slate-600 mt-2">
              📞 {sub.phone}
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              🏠 {sub.society}, {sub.flat}
            </p>

            {/* DROPDOWNS - ALWAYS HORIZONTAL */}
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
    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow mb-3">
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
