// import { useState } from "react";
// import { Calendar, Droplets, CheckCircle2 } from "lucide-react";

// const PRICE_PER_CAN = 35;

// export default function DailyBook() {
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [orderId, setOrderId] = useState("");

//   const totalPrice = PRICE_PER_CAN * quantity;

//   const confirmBooking = async () => {
//     setLoading(true);
//     await new Promise(r => setTimeout(r, 800));

//     const id = `ORD${Date.now().toString().slice(-6)}`;
//     setOrderId(id);
//     setSuccess(true);
//     setLoading(false);
//   };

//   if (success) {
//     return (
//       <div className="min-h-[90vh] bg-blue-50 flex items-center justify-center px-4">
//         <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
//           <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
//           <h2 className="text-xl md:text-2xl font-bold">
//             Order Confirmed
//           </h2>

//           <p className="text-gray-500 mt-1 text-sm">
//             Order ID: {orderId}
//           </p>

//           <button
//             onClick={() => setSuccess(false)}
//             className="w-full mt-6 h-11 rounded-xl border font-medium hover:bg-gray-50"
//           >
//             Book Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[90vh] bg-blue-50 flex justify-center px-3 py-[7rem]">
//       <div className="w-full max-w-lg space-y-3">

//         {/* HEADER CARD */}
//         <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-3">
//           <Droplets className="text-blue-600 w-8 h-8" />
//           <div>
//             <p className="font-bold text-lg leading-tight">
//               Daily Water Delivery
//             </p>
//             <p className="text-gray-500 text-sm">
//               Schedule for today
//             </p>
//           </div>
//         </div>

//         {/* DATE SELECT */}
//         <div className="bg-white rounded-2xl shadow-sm p-5">
//           <p className="font-semibold text-blue-500 mb-2 flex items-center gap-2">
//             <Calendar className="w-4 h-4" />
//             Select Delivery Date
//           </p>

//           <input
//             type="date"
//             value={date}
//             min={new Date().toISOString().split("T")[0]}
//             onChange={e => setDate(e.target.value)}
//             className="w-full h-11 rounded-xl border px-3 text-sm md:text-base"
//           />

//           <p className="text-[12px] text-gray-500 mt-1">
//             Same-day delivery available
//           </p>
//         </div>

//         {/* QUANTITY */}
//         <div className="bg-white rounded-2xl shadow-sm p-5">
//           <p className="font-semibold text-blue-500 mb-3">
//             Number of Water Cans
//           </p>

//           <div className="flex items-center gap-4">

//             {/* Minus */}
//             <button
//               onClick={() => setQuantity(q => Math.max(1, q - 1))}
//               className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-xl font-bold"
//             >
//               −
//             </button>

//             {/* Input */}
//             <input
//               type="number"
//               value={quantity}
//               min={1}
//               max={100}
//               onChange={e =>
//                 setQuantity(
//                   Math.min(100, Math.max(1, Number(e.target.value) || 1))
//                 )
//               }
//               className="flex-1 h-11 text-center border rounded-xl text-lg font-semibold"
//             />

//             {/* Plus */}
//             <button
//               onClick={() => setQuantity(q => Math.min(100, q + 1))}
//               className="w-10 h-10 rounded-xl bg-green-50 hover:bg-green-100 text-xl font-bold"
//             >
//               +
//             </button>
//           </div>

//           <p className="text-xs text-gray-500 mt-2">
//             Max 100 cans per order
//           </p>
//         </div>

//         {/* SUMMARY CARD */}
//         <div className="bg-white rounded-2xl shadow-md p-5">
//           <div className="flex justify-between text-sm md:text-base">
//             <span>Cans</span>
//             <span className="font-semibold">{quantity}</span>
//           </div>

//           <div className="flex justify-between mt-2 text-sm md:text-base">
//             <span>Price per Can</span>
//             <span className="font-semibold">₹{PRICE_PER_CAN}</span>
//           </div>

//           <hr className="my-3" />

//           <div className="flex justify-between text-lg font-bold">
//             <span>Total</span>
//             <span>₹{totalPrice}</span>
//           </div>
//         </div>

//         {/* CONFIRM BUTTON */}
//         <button
//           onClick={confirmBooking}
//           disabled={loading}
//           className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold disabled:opacity-60"
//         >
//           {loading ? "Processing..." : "Confirm Daily Booking"}
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import {
  Calendar,
  Droplets,
  CheckCircle2,
  IndianRupee,
  Truck,
} from "lucide-react";

const PRICE_PER_CAN = 35;

/* ===== helper: get local (timezone-safe) date ===== */
const getTodayLocal = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().split("T")[0];
};

export default function DailyBook() {
  const today = getTodayLocal();

  const [date, setDate] = useState(today);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const totalPrice = PRICE_PER_CAN * quantity;

  /* ===== delivery label logic ===== */
  const deliveryLabel =
    date === today
      ? "Same-day delivery available"
      : "Scheduled delivery for selected date";

  const confirmBooking = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setOrderId(`ORD${Date.now().toString().slice(-6)}`);
    setSuccess(true);
    setLoading(false);
  };

  /* ================= SUCCESS ================= */
  if (success) {
    return (
      <div className="min-h-[90vh] bg-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-7 w-full max-w-md text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Order Confirmed 🎉</h2>

          <p className="text-gray-500 mt-2 text-sm">
            Order ID: <span className="font-semibold">{orderId}</span>
          </p>

          <button
            onClick={() => setSuccess(false)}
            className="w-full mt-6 h-12 rounded-2xl border font-semibold hover:bg-gray-50"
          >
            Book Again
          </button>
        </div>
      </div>
    );
  }

  /* ================= MAIN ================= */
  return (
    <div className="min-h-[90vh] bg-blue-50 flex justify-center px-3 py-[7rem]">
      <div className="w-full max-w-lg space-y-4">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8" />
            <div>
              <p className="text-xl font-bold leading-tight">
                Daily Water Delivery
              </p>
              <p className="text-sm opacity-90">
                Fresh water delivered to your door
              </p>
            </div>
          </div>
        </div>

        {/* DATE SELECT */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <p className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Delivery Date
          </p>

          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-12 rounded-2xl border px-4 text-base font-medium"
          />

          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <Truck className="w-4 h-4" />
            {deliveryLabel}
          </p>
        </div>

        {/* QUANTITY */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <p className="font-semibold text-blue-600 mb-3">Number of Cans</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-11 h-11 rounded-2xl bg-red-50 hover:bg-red-100 text-xl font-bold"
            >
              −
            </button>

            <div className="flex-1 text-center">
              <p className="text-2xl font-bold">{quantity}</p>
              <p className="text-xs text-gray-500">cans</p>
            </div>

            <button
              onClick={() => setQuantity((q) => Math.min(100, q + 1))}
              className="w-11 h-11 rounded-2xl bg-green-50 hover:bg-green-100 text-xl font-bold"
            >
              +
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Maximum 100 cans per order
          </p>
        </div>

        {/* PRICE SUMMARY */}
        <div className="bg-white rounded-3xl shadow-md p-6 space-y-3">
          <p className="font-semibold text-blue-600 flex items-center gap-2">
            <IndianRupee className="w-5 h-5" />
            Price Summary
          </p>

          <div className="flex justify-between text-sm">
            <span>Price per Can</span>
            <span className="font-semibold">₹{PRICE_PER_CAN}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Total Cans</span>
            <span className="font-semibold">{quantity}</span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-bold">
            <span>Total Amount</span>
            <span className="text-blue-700">₹{totalPrice}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={confirmBooking}
          disabled={loading}
          className="w-full h-14 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold disabled:opacity-60"
        >
          {loading ? "Confirming..." : "Confirm Daily Booking"}
        </button>
      </div>
    </div>
  );
}
