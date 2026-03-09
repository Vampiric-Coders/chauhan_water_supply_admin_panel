
import { useState, useMemo, useEffect } from "react";
import { FiSearch, FiPhone } from "react-icons/fi";
import { getAllOrders, updateOrderDetails } from "../../../apis/ManageOrders/ManageOrders";
import toast, { Toaster } from "react-hot-toast";

export default function ManageDeliveries() {
  const [tab, setTab] = useState("Orders");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [society, setSociety] = useState("All");

const today = new Date().toISOString().split("T")[0];
/* ================= FETCH DATA ================= */
 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getAllOrders();
      const orders = res?.data?.orders || [];

// const formatted = orders.map((o) => {
//   // console.log("order object:", o);
//   // console.log("order type:", o.orderType); // ya o.orderType (agar wahi field hai)

//   return {
//     id: o._id,
//     type: o?.orderType,
//     orderStatus: o.orderStatus,
//     orderPayment: o.orderPayment,
//     name: o.user?.name || "N/A",
//     phone: o.user?.phoneNumber || "N/A",
//     society: o.user?.societyName || "N/A",
//     flat: o.user?.addressFlatNo || "N/A",
//     cans: o?.cansPerDay
//   };
// });

const formatted = orders.map((o) => {
  const formattedDate = new Date(o.date)
    .toISOString()
    .split("T")[0]; // YYYY-MM-DD format

  return {
    id: o._id,
    type: o?.orderType,
    orderStatus: o.orderStatus,
    orderPayment: o.orderPayment,
    name: o.user?.name || "N/A",
    phone: o.user?.phoneNumber || "N/A",
    society: o.user?.societyName || "N/A",
    flat: o.user?.addressFlatNo || "N/A",
    cans: o?.cansPerDay,
    date: formattedDate,   // ✅ add this
  };
});


      setData(formatted);
    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  fetchData();
}, []);



  /* SOCIETY LIST */
  const societies = useMemo(
    () => ["All", ...new Set(data.map((d) => d.society))],
    [data],
  );

  /* BASE FILTER (TAB + SOCIETY) */
  // const baseFiltered = useMemo(() => {
  //   return data.filter((o) => {
  //     // console.log('o m kya aara h-->',o)
  //     if (tab === "Orders" && o.type !== "daily") return false;
  //     if (tab === "Subscriptions" && o.type !== "subscription") return false;
  //     if (society !== "All" && o.society !== society) return false;
  //     return true;
  //   });
  // }, [tab, society, data]);

  const baseFiltered = useMemo(() => {
  return data.filter((o) => {
    // Orders tab logic
    if (tab === "Orders" && o.type !== "daily") return false;

    // Subscriptions tab logic
    if (tab === "Subscriptions") {
      if (o.type !== "subscription") return false;

      // ✅ Only show today's subscriptions
      if (o.date !== today) return false;
    }

    if (society !== "All" && o.society !== society) return false;

    return true;
  });
}, [tab, society, data, today]);

  /* SUMMARY (SOCIETY + TAB BASED) */
//   const summary = useMemo(() => {
 


//     if (tab === "Orders") {
//   return {
//     total: baseFiltered.length,
//     pending: baseFiltered.filter((o) => {
//       console.log("o order -->", o); // ✅ yahan milega

//       return o.orderStatus === "Pending";
//     }).length,
//   };
// }

//     return {
//       total: baseFiltered.length,
//       pending: baseFiltered.filter((o) => !o.orderStatus).length,
//       unpaid: baseFiltered.filter((o) => !o.orderPayment).length,
//     };
//   }, [baseFiltered, tab]);


const normalizeStatus = (status) =>
  status?.toString().toLowerCase();


const summary = useMemo(() => {
  if (tab === "Orders") {
    return {
      total: baseFiltered.length,

      pending: baseFiltered.filter(
        (o) => normalizeStatus(o.orderStatus) === "pending"
      ).length,

      unpaid: baseFiltered.filter(
        (o) => normalizeStatus(o.orderPayment) === "pending"
      ).length,
    };
  }

    if (tab === "Subscriptions") {
    return {
      total: baseFiltered.length,

      pending: baseFiltered.filter(
        (o) => normalizeStatus(o.orderStatus) === "pending"
      ).length,

      unpaid: baseFiltered.filter(
        (o) => normalizeStatus(o.orderPayment) === "pending"
      ).length,
    };
  }


  // Subscriptions
  return {
    total: baseFiltered.length,

    pending: baseFiltered.filter(
      (o) => !o.todayDelivered
    ).length,

    unpaid: baseFiltered.filter(
      (o) => normalizeStatus(o.orderPayment) === "pending"
    ).length,
  };
}, [baseFiltered, tab]);

  /* LIST FILTER (SEARCH + BASE FILTER) */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return baseFiltered.filter(
      (o) =>
        !q ||
        o.name.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.id.toLowerCase().includes(q),
    );
  }, [search, baseFiltered]);



const update = async (id, key, value) => {
  // optimistic UI update
  setData((prev) =>
    prev.map((o) =>
      o.id === id ? { ...o, [key]: value } : o
    )
  );

  const toastId = toast.loading("Updating...");

  try {
    await updateOrderDetails(id, { [key]: value });

    toast.success("✅ Updated successfully", {
      id: toastId,
    });
  } catch (error) {
    toast.error("❌ Update failed", {
      id: toastId,
    });

    console.error("Update error:", error);
  }
};



  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-5 md:p-8">
      {/* HEADER + REFRESH BUTTON */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          💧 Manage <span className="text-blue-600">Deliveries</span>
        </h1>

        {/* REFRESH / SORT BUTTON */}
        <button
          onClick={() => {
            setData((prev) =>
              [...prev].sort((a, b) => {
                const statusOrder = {
                  Pending: 0,
                  "Out for Delivery": 1,
                  Delivered: 2,
                };
                const aStatus =
                  a.orderType === "daily"
                    ? a.orderStatus
                    : a.todayDelivered
                      ? "Delivered"
                      : "Pending";
                const bStatus =
                  b.orderType === "daily"
                    ? b.orderStatus
                    : b.todayDelivered
                      ? "Delivered"
                      : "Pending";

                const aUnpaid = a.orderPayment === "Pending" ? 0 : 1;
                const bUnpaid = b.orderPayment === "Pending" ? 0 : 1;
                if (aUnpaid !== bUnpaid) return aUnpaid - bUnpaid;

                return (
                  (statusOrder[aStatus] ?? 3) - (statusOrder[bStatus] ?? 3)
                );
              }),
            );
          }}
          className="px-4 py-2 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {/* SUMMARY BAR */}
      <div className="bg-white rounded-xl shadow p-3 mb-3 flex gap-4">
        {/* {console.log('sumarytotal-->',summary)} */}
        <span>🚚 Total: {summary.total}</span>
        <span className="text-yellow-700">⏳ Pending: {summary.pending}</span>
        <span className="text-red-700">💰 Unpaid: {summary.unpaid}</span>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b mb-3">
        {["Orders", "Subscriptions"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 font-semibold ${
              tab === t
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* SEARCH + SOCIETY FILTER */}
      <div className="flex gap-3 mb-3">
        <div className="flex-1">
          <Input
            icon={<FiSearch />}
            placeholder="Search name / phone / id"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="p-3 rounded-xl border bg-white shadow"
          value={society}
          onChange={(e) => setSociety(e.target.value)}
        >
          {societies.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {filtered.map((o) => (
          <div
            key={o.id}
            className={`rounded-2xl p-4 shadow border ${cardColor(o)}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{o.name}</p>
                <p className="text-xs text-slate-500">{o.id}</p>
              </div>
              
              <div className="flex gap-3">

               {console.log('o m cans-->',o)}
      <span className="px-3 py-1 rounded-full bg-red-600 text-md text-white">
        {o.cans} Cans
      </span>
              <Status o={o} />
              </div>
            </div>

            {/* CLICKABLE PHONE WITH ICON */}
            <p className="text-sm text-slate-600 mt-2 flex items-center gap-1">
              <FiPhone className="text-blue-600" />
              <a
                href={`tel:${o.phone}`}
                className="text-blue-600 hover:underline"
              >
                {o.phone}
              </a>
            </p>

            <p className="text-sm text-slate-600">
              🏠 {o.society}, {o.flat}
            </p>

            <div className="flex gap-3 mt-4">
              {console.log('o m yha kya h-->',o)}
              {console.log('order ka status-->',o?.type)}
              {o.type === "daily" ? (
                <>
                  <Dropdown
                    label="Order Status"
                    options={["Pending", "Delivered"]}
                    value={o.orderStatus}
                    onChange={(v) => update(o.id, "orderStatus", v)}
                  />
                   {console.log('order ka status222-->',o)}
                  <Dropdown
                    label="Payment Status"
                    options={["Pending", "Paid"]}
                    value={o.orderPayment}
                    onChange={(v) => update(o.id, "orderPayment", v)}
                  />
                   <Toaster position="top-right" />
                  {/* {console.log('amount ')} */}
                </>
              ) : (
                <>
                {console.log('order k subscriptions m aaye?=')}
                  <Dropdown
                    label="Today Status"
                    options={["Pending", "Delivered"]}
                    // value={o.todayDelivered ? "Yes" : "No"}

                    // onChange={(v) =>
                    //   update(o.id, "todayDelivered", v === "Yes")
                    // }
                      value={o.orderStatus}
                    onChange={(v) => update(o.id, "orderStatus", v)}
                  />
                  <Dropdown
                    label="Payment Status"
                    options={["Pending", "Paid"]}
                    value={o.orderPayment}
                    onChange={(v) => update(o.id, "orderPayment", v)}
                  />
                   <Toaster position="top-right" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* HELPERS */
const cardColor = (o) => {
  if (o.orderType === "daily") {
    if (o.orderStatus === "Delivered" && o.orderPayment === "Paid")
      return "bg-green-50 border-green-200";
  }
  return "bg-white border-slate-200";
};

function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow">
      <span className="text-blue-500">{icon}</span>
      <input {...props} className="outline-none w-full" />
    </div>
  );
}

function Status({ o }) {
  if (o.orderType === "subscription")
    return (
  <>
  
      <span className="px-3 py-1 rounded-full bg-slate-200 text-sm">
        {o.todayDelivered ? "🚰 Delivered" : "⏳ Pending"}
      </span>
     
  </>
    );

  const map = { Pending: "⏳", "Out for Delivery": "🚚", Delivered: "✅" };
  return (
    <>
   
    
    <span className="px-3 py-1 rounded-full bg-slate-200 text-sm">
      {map[o.orderStatus]} {o.orderStatus}
    </span>
    </>
  );
}

function Dropdown({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col w-1/2">
      <label className="text-xs text-slate-500 mb-1">{label}</label>
      <select
        className="p-2 rounded-xl border bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
