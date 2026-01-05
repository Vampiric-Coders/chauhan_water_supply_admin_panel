// import { useState } from "react";
// import { TrendingUp, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

// const months = [
//   "January","February","March","April","May","June",
//   "July","August","September","October","November","December"
// ];

// export default function MonthlySubscription() {
//   const [month, setMonth] = useState(new Date().getMonth());
//   const [quantity, setQuantity] = useState(1);
//   const [success, setSuccess] = useState(false);

//   const confirm = () => setSuccess(true);

//   if (success)
//     return (
//       <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl p-6 shadow text-center w-full max-w-md">
//           <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-3" />
//           <h2 className="text-xl font-bold">Subscription Activated</h2>

//           <button
//             onClick={() => setSuccess(false)}
//             className="w-full mt-5 h-11 rounded-xl border"
//           >
//             Create Another
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="bg-blue-50 min-h-screen p-4">
//       <div className="max-w-lg mx-auto space-y-5">

//         <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2">
//           <TrendingUp /> Monthly Subscription
//         </h1>

//         {/* month selection */}
//         <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-between">
//           <button onClick={() => setMonth(m => (m + 11) % 12)}>
//             <ChevronLeft />
//           </button>

//           <div className="text-center">
//             <p className="font-bold">{months[month]}</p>
//           </div>

//           <button onClick={() => setMonth(m => (m + 1) % 12)}>
//             <ChevronRight />
//           </button>
//         </div>

//         {/* <QuantityBox quantity={quantity} setQuantity={setQuantity} /> */}

//         <button
//           onClick={confirm}
//           className="w-full h-12 bg-blue-600 rounded-2xl text-white font-semibold"
//         >
//           Activate Subscription
//         </button>
//       </div>
//     </div>
//   );
// }













// import { useState } from "react";
// import {
//   TrendingUp,
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle2,
// } from "lucide-react";

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const PRICE_PER_CAN = 35;

// export default function MonthlySubscription() {
//   const [month, setMonth] = useState(new Date().getMonth());
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const totalPrice = quantity * PRICE_PER_CAN * 30;

//   const confirmSubscription = async () => {
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 800));
//     setSuccess(true);
//     setLoading(false);
//   };

//   if (success) {
//     return (
//       <div className="min-h-[90vh] bg-blue-50 flex items-center justify-center px-4">
//         <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
//           <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
//           <h2 className="text-xl md:text-2xl font-bold">
//             Subscription Activated
//           </h2>

//           <p className="text-gray-500 mt-1 text-sm">
//             Monthly delivery scheduled successfully
//           </p>

//           <button
//             onClick={() => setSuccess(false)}
//             className="w-full mt-6 h-11 rounded-xl border font-medium hover:bg-gray-50"
//           >
//             Create Another
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
//           <TrendingUp className="text-blue-600 w-8 h-8" />
//           <div>
//             <p className="font-bold text-lg leading-tight">
//               Monthly Water Subscription
//             </p>
//             <p className="text-gray-500 text-sm">Choose month & quantity</p>
//           </div>
//         </div>

//         {/* MONTH SELECT */}
//         <div className="bg-white rounded-2xl shadow-sm p-5">
//           <p className="font-semibold text-blue-500 mb-3">Select Month</p>

//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => setMonth((m) => (m + 11) % 12)}
//               className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200"
//             >
//               <ChevronLeft />
//             </button>

//             <p className="text-xl font-bold text-blue-700">{months[month]}</p>

//             <button
//               onClick={() => setMonth((m) => (m + 1) % 12)}
//               className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200"
//             >
//               <ChevronRight />
//             </button>
//           </div>
//         </div>

//         {/* QUANTITY */}
//         <div className="bg-white rounded-2xl shadow-sm p-5">
//           <p className="font-semibold text-blue-500 mb-3">Cans per Day</p>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//               className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-xl font-bold"
//             >
//               −
//             </button>

//             <input
//               type="number"
//               value={quantity}
//               min={1}
//               max={20}
//               onChange={(e) =>
//                 setQuantity(
//                   Math.min(20, Math.max(1, Number(e.target.value) || 1))
//                 )
//               }
//               className="flex-1 h-11 text-center border rounded-xl text-lg font-semibold"
//             />

//             <button
//               onClick={() => setQuantity((q) => Math.min(20, q + 1))}
//               className="w-10 h-10 rounded-xl bg-green-50 hover:bg-green-100 text-xl font-bold"
//             >
//               +
//             </button>
//           </div>

//           <p className="text-xs text-gray-500 mt-2">Max 20 cans per day</p>
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-white rounded-2xl shadow-md p-5">
//           <div className="flex justify-between text-sm">
//             <span>Price per Can</span>
//             <span className="font-semibold">₹{PRICE_PER_CAN}</span>
//           </div>

//           <div className="flex justify-between mt-2 text-sm">
//             <span>Cans per Day</span>
//             <span className="font-semibold">{quantity}</span>
//           </div>

//           <hr className="my-3" />

//           <div className="flex justify-between text-lg font-bold">
//             <span>Monthly Total</span>
//             <span>₹{totalPrice}</span>
//           </div>
//         </div>

//         {/* CONFIRM */}
//         <button
//           onClick={confirmSubscription}
//           disabled={loading}
//           className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-60"
//         >
//           {loading ? "Processing..." : "Activate Monthly Subscription"}
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import {
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  CalendarDays,
  IndianRupee
} from "lucide-react";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const PRICE_PER_CAN = 35;

// helper: days in selected month
const getDaysInMonth = (monthIndex, year = new Date().getFullYear()) =>
  new Date(year, monthIndex + 1, 0).getDate();

export default function MonthlySubscription() {
  const currentMonth = new Date().getMonth();

  const [month, setMonth] = useState(currentMonth);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const daysInMonth = getDaysInMonth(month);
  const totalPrice = quantity * PRICE_PER_CAN * daysInMonth;

  const confirmSubscription = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setSuccess(true);
    setLoading(false);
  };

  /* ================= SUCCESS ================= */
  if (success) {
    return (
      <div className="min-h-[90vh] bg-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-7 w-full max-w-md text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">
            Subscription Activated 🎉
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Daily delivery scheduled for {months[month]}
          </p>

          <button
            onClick={() => setSuccess(false)}
            className="w-full mt-6 h-12 rounded-2xl border font-semibold hover:bg-gray-50"
          >
            Create Another Subscription
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
            <TrendingUp className="w-8 h-8" />
            <div>
              <p className="text-xl font-bold leading-tight">
                Monthly Water Subscription
              </p>
              <p className="text-sm opacity-90">
                Hassle-free daily water delivery
              </p>
            </div>
          </div>
        </div>

        {/* MONTH SELECT */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <p className="font-semibold text-blue-600 mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Select Month
          </p>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setMonth(m => (m + 11) % 12)}
              className="w-11 h-11 rounded-2xl bg-gray-100 hover:bg-gray-200"
            >
              <ChevronLeft />
            </button>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {months[month]}
              </p>
              <p className="text-sm text-gray-500">
                {daysInMonth} delivery days
              </p>
            </div>

            <button
              onClick={() => setMonth(m => (m + 1) % 12)}
              className="w-11 h-11 rounded-2xl bg-gray-100 hover:bg-gray-200"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* QUANTITY */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <p className="font-semibold text-blue-600 mb-3">
            Cans Per Day
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-11 h-11 rounded-2xl bg-red-50 hover:bg-red-100 text-xl font-bold"
            >
              −
            </button>

            <div className="flex-1 text-center">
              <p className="text-2xl font-bold">{quantity}</p>
              <p className="text-xs text-gray-500">per day</p>
            </div>

            <button
              onClick={() => setQuantity(q => Math.min(20, q + 1))}
              className="w-11 h-11 rounded-2xl bg-green-50 hover:bg-green-100 text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-3xl shadow-md p-6 space-y-3">
          <p className="font-semibold text-blue-600 flex items-center gap-2">
            <IndianRupee className="w-5 h-5" />
            Price Breakdown
          </p>

          <div className="flex justify-between text-sm">
            <span>Price per Can</span>
            <span className="font-semibold">₹{PRICE_PER_CAN}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Cans per Day</span>
            <span className="font-semibold">{quantity}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Days in {months[month]}</span>
            <span className="font-semibold">{daysInMonth}</span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-bold">
            <span>Total Amount</span>
            <span className="text-blue-700">₹{totalPrice}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={confirmSubscription}
          disabled={loading}
          className="w-full h-14 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold disabled:opacity-60"
        >
          {loading ? "Activating..." : "Activate Monthly Subscription"}
        </button>
      </div>
    </div>
  );
}
