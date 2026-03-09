import { useState, useMemo, useEffect } from "react";
import { FiPhoneCall, FiCalendar } from "react-icons/fi";
import {
  MdWaterDrop,
  MdAssignment,
  MdCheckCircle,
  MdPendingActions,
  MdPayments,
} from "react-icons/md";
import CountUp from "react-countup";
import { fetchAllSocieties } from "../../../apis/Dashboard/Dashboard";

/* =======================
   MAIN COMPONENT
======================= */
export default function AdminDashboard() {
  const [orderType, setOrderType] = useState("daily");
  const [selectedDate, setSelectedDate] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [openSociety, setOpenSociety] = useState(null);

  const [ordersData, setOrdersData] = useState({});
  const [loading, setLoading] = useState(true);

  /* =======================
     FETCH + FORMAT DATA
  ======================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const res = await fetchAllSocieties();
        const societies = res.data.societies || [];

        /**
         * Final shape:
         * {
         *   "2026-02-25": {
         *     daily: [{ society, orders: [] }],
         *     subscription: [{ society, orders: [] }]
         *   }
         * }
         */
        const formatted = {};

        societies.forEach((society) => {
          society.users.forEach((user) => {
            user.orders.forEach((order) => {
              const dateKey = order.date.split("T")[0]; // yyyy-mm-dd
              const type = order.orderType; // daily | subscription

              if (!formatted[dateKey]) {
                formatted[dateKey] = { daily: [], subscription: [] };
              }

              let societyBlock = formatted[dateKey][type].find(
                (s) => s.society === society.societyName
              );

              if (!societyBlock) {
                societyBlock = {
                  society: society.societyName,
                  orders: [],
                };
                formatted[dateKey][type].push(societyBlock);
              }

              societyBlock.orders.push({
                id: order._id,
                name: user.name,
                phone: user.phoneNumber,
                flat: user.addressFlatNo,
                status: order.orderStatus,
                amount: Number(order.totalAmount),
              });
            });
          });
        });

        setOrdersData(formatted);

        const dates = Object.keys(formatted);
        if (dates.length && !selectedDate) {
          setSelectedDate(dates[dates.length - 1]);
        }
      } catch (err) {
        console.error("Failed to load societies data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const societies = ordersData[selectedDate]?.[orderType] || [];

  /* =======================
     SUMMARY
  ======================= */
  const summary = useMemo(() => {
    let total = 0;
    let delivered = 0;
    let pending = 0;
    let collection = 0;

    societies.forEach((s) =>
      s.orders.forEach((o) => {
        total++;
        if (o.status === "Delivered") {
          delivered++;
          collection += o.amount;
        }
        if (o.status === "Pending") pending++;
      })
    );

    return { total, delivered, pending, collection };
  }, [societies]);

  /* =======================
     LOADING
  ======================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading orders...
      </div>
    );
  }

  /* =======================
     UI
  ======================= */
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto lg:max-w-6xl p-4 space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-2">
          <MdWaterDrop className="text-blue-600 text-2xl" />
          <h1 className="text-lg font-semibold text-slate-900">
            Water Supply Admin
          </h1>
        </div>

        {/* STATS */}
        <StatCards summary={summary} setActiveFilter={setActiveFilter} />

        {/* CONTROLS */}
        <div className="bg-white border rounded-2xl p-4 space-y-4">
          <div className="flex gap-2">
            {["daily", "subscription"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setOrderType(t);
                  setOpenSociety(null);
                }}
                className={`flex-1 py-2 rounded-xl text-sm font-medium ${
                  orderType === t
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {t === "daily" ? "Daily Orders" : "Subscriptions"}
              </button>
            ))}
          </div>

          {/* DATE PICKER */}
          <div className="flex items-center justify-between bg-slate-100 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FiCalendar className="text-blue-600" />
              {selectedDate || "Select date"}
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setOpenSociety(null);
              }}
              className="bg-white rounded-lg px-3 py-1 text-sm border"
            />
          </div>
        </div>

        {/* SOCIETIES */}
        <div className="space-y-3">
          {societies.map((s) => {
            const orders = s.orders.filter((o) =>
              activeFilter === "all"
                ? true
                : activeFilter === "collection"
                ? o.status === "Delivered"
                : o.status === activeFilter
            );

            if (!orders.length) return null;

            return (
              <div
                key={s.society}
                className="bg-white border rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenSociety(
                      openSociety === s.society ? null : s.society
                    )
                  }
                  className="w-full flex justify-between px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{s.society}</p>
                    <p className="text-xs text-slate-500">
                      {orders.length} customers
                    </p>
                  </div>

                  <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                    {Math.round(
                      (orders.filter((o) => o.status === "Delivered").length /
                        orders.length) *
                        100
                    )}
                    % done
                  </span>
                </button>

                {openSociety === s.society && (
                  <div className="divide-y">
                    {orders.map((o) => (
                      <div
                        key={o.id}
                        className="flex justify-between px-4 py-3"
                      >
                        <div>
                          <p className="font-medium">{o.name}</p>
                          <p className="text-xs text-slate-500">
                            {o.flat} · ₹{o.amount} · {o.status}
                          </p>
                        </div>

                        <a
                          href={`tel:${o.phone}`}
                          className="bg-blue-50 text-blue-600 p-2 rounded-full"
                        >
                          <FiPhoneCall />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =======================
   STAT CARDS
======================= */
function StatCards({ summary, setActiveFilter }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total Orders" value={summary.total} icon={<MdAssignment />} gradient="from-blue-400 to-blue-600" onClick={() => setActiveFilter("all")} />
      <StatCard label="Delivered" value={summary.delivered} icon={<MdCheckCircle />} gradient="from-green-400 to-emerald-600" onClick={() => setActiveFilter("Delivered")} />
      <StatCard label="Pending" value={summary.pending} icon={<MdPendingActions />} gradient="from-amber-400 to-orange-500" onClick={() => setActiveFilter("Pending")} />
      <StatCard label="Collection" value={summary.collection} icon={<MdPayments />} gradient="from-fuchsia-400 to-purple-600" onClick={() => setActiveFilter("collection")} />
    </div>
  );
}

function StatCard({ label, value, icon, gradient, onClick }) {
  const [count, setCount] = useState(0);

  useEffect(() => setCount(value), [value]);

  return (
    <button
      onClick={onClick}
      className={`relative rounded-3xl p-4 text-white bg-gradient-to-br ${gradient} shadow-lg`}
    >
      <div className="absolute -top-6 -right-6 text-white/20 text-[90px]">
        {icon}
      </div>

      <div className="relative z-10">
        <p className="text-sm opacity-90">{label}</p>
        <p className="text-3xl font-extrabold">
          <CountUp end={count} duration={1.2} />
        </p>
      </div>
    </button>
  );
}