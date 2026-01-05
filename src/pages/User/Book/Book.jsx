// import { useState } from "react";
// import { Minus, Plus, MapPin, Clock } from "lucide-react";
// import { FiDroplet, FiRefreshCw } from "react-icons/fi";
// import { Link } from "react-router-dom";

// export default function BookPage() {
//   const [quantity, setQuantity] = useState(1);
//   const [bookingType, setBookingType] = useState("daily");

//   const price = bookingType === "daily" ? 60 : 1200 / 4;
//   const total = quantity * price;

//   const handleQuantityChange = (delta) => {
//     const newQuantity = quantity + delta;
//     if (newQuantity >= 1) {
//       setQuantity(newQuantity);
//     }
//   };

//   return (
//     <main className="pb-24 bg-blue-50 min-h-screen py-20">
//       {/* HEADER */}

//       {/* BOOKING TYPE */}
//       <div className="grid grid-cols-2 gap-2">

//   {/* DAILY */}
//   <Link
//     to="/book/daily"
//     className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border border-slate-100 active:scale-[0.97] transition flex items-center gap-3"
//   >
//     <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
//       <FiDroplet className="text-blue-600" size={20} />
//     </div>

//     <div>
//       <p className="text-[0.7rem] font-semibold">Book Today</p>
//       <p className="text-[0.7rem] text-gray-500">Quick order</p>
//     </div>
//   </Link>

//   {/* SUBSCRIPTION */}
//   <Link
//     to="/book/subscription"
//     className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border border-slate-100 active:scale-[0.97] transition flex items-center gap-3"
//   >
//     <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
//       <FiRefreshCw className="text-green-600" size={20} />
//     </div>

//     <div>
//       <p className="text-[0.7rem] font-semibold">Subscription</p>
//       <p className="text-[0.7rem] text-gray-500">Monthly</p>
//     </div>
//   </Link>

// </div>

//       {/* QUANTITY */}

//       {/* DELIVERY DETAILS */}
//       <div className="px-4 py-4 max-w-md mx-auto">
//         <h2 className="text-xs sm:text-sm font-semibold mb-4 tracking-wide">
//           DELIVERY DETAILS
//         </h2>

//         <div className="p-4 bg-white rounded-2xl shadow border">
//           <div className="space-y-4">
//             <div className="flex gap-3">
//               <Clock className="w-5 h-5 text-blue-600" />
//               <div>
//                 <p className="text-[10px] text-gray-500 font-medium">
//                   DELIVERY TIME
//                 </p>
//                 <p className="font-semibold mt-1">Today, 6:00 PM – 8:00 PM</p>
//               </div>
//             </div>

//             <div className="flex gap-3 pt-2 border-t">
//               <MapPin className="w-5 h-5 text-purple-600" />
//               <div>
//                 <p className="text-[10px] text-gray-500 font-medium">
//                   DELIVERY ADDRESS
//                 </p>
//                 <p className="font-semibold mt-1">Flat 302, Sunshine Society</p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Delivery charge:{" "}
//                   <span className="text-green-600 font-semibold">Free</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// import { useState } from "react";
// import { Minus, Plus, MapPin, Clock } from "lucide-react";
// import { FiDroplet, FiRefreshCw } from "react-icons/fi";
// import { Link } from "react-router-dom";

// export default function BookPage() {
//   const [quantity, setQuantity] = useState(1);

//   const handleQuantityChange = (delta) => {
//     const newQuantity = quantity + delta;
//     if (newQuantity >= 1) setQuantity(newQuantity);
//   };

//   return (
//     <main className="pb-24 bg-blue-50 min-h-screen py-20">

//       {/* BOOKING TYPE */}
//       <div className="px-4 py-4 max-w-md mx-auto">
//         <h2 className="text-xs sm:text-sm font-semibold mb-4 tracking-wide">
//           BOOKING TYPE
//         </h2>

//         <div className="grid grid-cols-2 gap-2">

//           {/* DAILY BOOKING */}
//           <Link
//             to="/book/daily"
//             className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border border-slate-100 active:scale-[0.97] transition flex items-center gap-3"
//           >
//             <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
//               <FiDroplet className="text-blue-600" size={20} />
//             </div>

//             <div>
//               <p className="text-[0.7rem] font-semibold">Book Today</p>
//               <p className="text-[0.7rem] text-gray-500">Quick order</p>
//             </div>
//           </Link>

//           {/* MONTHLY SUBSCRIPTION */}
//           <Link
//             to="/book/subscription"
//             className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border border-slate-100 active:scale-[0.97] transition flex items-center gap-3"
//           >
//             <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
//               <FiRefreshCw className="text-green-600" size={20} />
//             </div>

//             <div>
//               <p className="text-[0.7rem] font-semibold">Subscription</p>
//               <p className="text-[0.7rem] text-gray-500">Monthly</p>
//             </div>
//           </Link>

//         </div>
//       </div>

//       {/* DELIVERY DETAILS */}
//       <div className="px-4 py-4 max-w-md mx-auto">
//         <h2 className="text-xs sm:text-sm font-semibold mb-4 tracking-wide">
//           DELIVERY DETAILS
//         </h2>

//         <div className="p-4 bg-white rounded-2xl shadow border">
//           <div className="space-y-4">

//             <div className="flex gap-3">
//               <Clock className="w-5 h-5 text-blue-600" />
//               <div>
//                 <p className="text-[10px] text-gray-500 font-medium">
//                   DELIVERY TIME
//                 </p>
//                 <p className="font-semibold mt-1">
//                   Today, 6:00 PM – 8:00 PM
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-3 pt-2 border-t">
//               <MapPin className="w-5 h-5 text-purple-600" />
//               <div>
//                 <p className="text-[10px] text-gray-500 font-medium">
//                   DELIVERY ADDRESS
//                 </p>
//                 <p className="font-semibold mt-1">
//                   Flat 302, Sunshine Society
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Delivery charge:{" "}
//                   <span className="text-green-600 font-semibold">
//                     Free
//                   </span>
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//     </main>
//   );
// }
import { Clock, MapPin } from "lucide-react";
import { FiDroplet, FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function BookPage() {
  return (
    <main className="bg-blue-50 min-h-screen pb-32 pt-[5rem]">
      {/* HEADER CARD */}
      <div className="px-6 max-w-lg mx-auto mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
          <div className="flex items-center gap-4">
            <FiDroplet className="w-10 h-10 sm:w-12 sm:h-12" />
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                Water Booking
              </p>
              <p className="text-sm sm:text-base opacity-90 mt-1">
                Choose your preferred delivery type
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING TYPE CARDS */}
      <div className="px-4 sm:px-6 max-w-lg mx-auto mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* DAILY BOOKING */}
        <Link
          to="/book/daily"
          className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200 hover:shadow-2xl transition transform active:scale-[0.97] flex flex-col items-center gap-3 group"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-100 flex items-center justify-center transition group-hover:scale-105">
            <FiDroplet className="text-blue-600" size={28} />
          </div>
          <p className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
            Book Today
          </p>
          <p className="text-sm text-gray-500 text-center">
            Quick order, same-day delivery
          </p>
          <span className="mt-1 inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            Popular
          </span>
        </Link>

        {/* MONTHLY SUBSCRIPTION */}
        <Link
          to="/book/subscription"
          className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200 hover:shadow-2xl transition transform active:scale-[0.97] flex flex-col items-center gap-3 group"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-green-100 flex items-center justify-center transition group-hover:scale-105">
            <FiRefreshCw className="text-green-600" size={28} />
          </div>
          <p className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-green-600 transition">
            Subscription
          </p>
          <p className="text-sm text-gray-500 text-center">
            Monthly water delivery plan
          </p>
          <span className="mt-1 inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            Best Value
          </span>
        </Link>
      </div>

      {/* DELIVERY DETAILS CARD */}
      <div className="px-4 sm:px-6 max-w-lg mx-auto mb-16">
        <h2 className="text-sm sm:text-base font-semibold mb-4 tracking-wide text-gray-700 uppercase">
          Delivery Details
        </h2>

        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div className="flex gap-4 items-start">
            <Clock className="w-6 sm:w-7 h-6 sm:h-7 text-blue-600 mt-1" />
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase">
                Delivery Time
              </p>
              <p className="font-semibold mt-1 text-gray-800 text-sm sm:text-base">
                Today, 6:00 PM – 8:00 PM
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <MapPin className="w-6 sm:w-7 h-6 sm:h-7 text-purple-600 mt-1" />
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase">
                Delivery Address
              </p>
              <p className="font-semibold mt-1 text-gray-800 text-sm sm:text-base">
                Flat 302, Sunshine Society
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Delivery charge:{" "}
                <span className="text-green-600 font-semibold">Free</span>
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 italic">
                You can edit your delivery address in profile settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

