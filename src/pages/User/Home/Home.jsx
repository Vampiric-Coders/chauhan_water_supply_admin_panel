// "use client"

// import { useEffect, useState } from "react"
// import { ChevronLeft, ChevronRight, Droplet, Award, Zap, Clock } from "lucide-react"

// export default function HomePage() {
//   const [currentSlide, setCurrentSlide] = useState(0)

//   const slides = [
//     { title: "Today's Special", subtitle: "20% OFF on first order" },
//     { title: "Pure Quality Water", subtitle: "Tested & certified for safety" },
//     { title: "Fast Delivery", subtitle: "Same-day delivery available" },
//     { title: "Reliable Service", subtitle: "99.9% on-time delivery record" },
//     { title: "Why Choose Us", subtitle: "Best prices & quality guaranteed" },
//   ]

//   const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length)
//   const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)

//   useEffect(() => {
//     const timer = setInterval(() => nextSlide(), 2500)
//     return () => clearInterval(timer)
//   }, [])

//   return (
//     <div className="bg-blue-50 min-h-screen mt-4">
//       <main className="max-w-md mx-auto w-full px-4 pb-28 py-20 space-y-6">

//         {/* Brand Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 px-5 py-6">
//           <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700">
//             AquaPure
//           </h1>
//           <p className="text-sm text-slate-500 font-medium">
//             Premium Water Delivery Service
//           </p>
//         </div>

//         {/* Carousel */}
//         <div className="bg-white rounded-2xl p-3 shadow border border-indigo-100">
//           <div className="relative h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-500">

//             <div className="absolute inset-0 flex items-center justify-center text-center px-6 py-6">
//               <div>
//                 <h2 className="text-3xl font-bold text-white drop-shadow">
//                   {slides[currentSlide].title}
//                 </h2>
//                 <p className="text-sm text-white/90 mt-2">
//                   {slides[currentSlide].subtitle}
//                 </p>
//               </div>
//             </div>

//             {/* controls */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-3 top-2/3 sm:top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 p-1.5 sm:p-2 rounded-full backdrop-blur"
//             >
//               <ChevronLeft className="text-white w-4 h-4 sm:w-5 sm:h-5" />
//             </button>

//             <button
//               onClick={nextSlide}
//               className="absolute right-3 top-2/3 sm:top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 p-1.5 sm:p-2 rounded-full backdrop-blur"
//             >
//               <ChevronRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
//             </button>

//             {/* dots */}
//             <div className="absolute bottom-3 w-full flex justify-center gap-1.5">
//               {slides.map((_, i) => (
//                 <span
//                   key={i}
//                   className={`h-2 rounded-full transition-all ${
//                     i === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 gap-4">

//           <div className="p-4 rounded-2xl bg-white shadow border flex flex-col items-center">
//             <Award className="text-indigo-600 mb-1" />
//             <p className="text-2xl font-bold">5000+</p>
//             <p className="text-xs text-slate-500">Happy Customers</p>
//           </div>

//           <div className="p-4 rounded-2xl bg-white shadow border flex flex-col items-center">
//             <Zap className="text-indigo-600 mb-1" />
//             <p className="text-2xl font-bold">2500+</p>
//             <p className="text-xs text-slate-500">Orders / Month</p>
//           </div>

//           <div className="p-4 rounded-2xl bg-white shadow border flex flex-col items-center">
//             <Clock className="text-indigo-600 mb-1" />
//             <p className="text-2xl font-bold">24/7</p>
//             <p className="text-xs text-slate-500">Support</p>
//           </div>

//           <div className="p-4 rounded-2xl bg-white shadow border flex flex-col items-center">
//             <Droplet className="text-indigo-600 mb-1" />
//             <p className="text-2xl font-bold">100%</p>
//             <p className="text-xs text-slate-500">Pure Quality</p>
//           </div>
//         </div>

//           {/* Carousel */}
//         <div className="bg-white rounded-2xl p-3 shadow border border-indigo-100">
//           <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-500">

//             <div className="absolute inset-0 flex items-center justify-center text-center px-6 py-6">
//               <div>
//                 <h2 className="text-3xl font-bold text-white drop-shadow">
//                   {slides[currentSlide].title}
//                 </h2>
//                 <p className="text-sm text-white/90 mt-2">
//                   {slides[currentSlide].subtitle}
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* Services */}
//         <div>
//           <h2 className="text-lg font-semibold mb-3 text-slate-700">
//             Our Services
//           </h2>

//           <div className="space-y-3">

//             <div className="p-4 rounded-2xl bg-white shadow border">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
//                   <Droplet className="text-sky-600" />
//                 </div>
//                 <p className="font-semibold">Daily Delivery</p>
//               </div>
//               <p className="text-xs text-slate-500 mt-1">Fresh water every day</p>
//             </div>

//             <div className="p-4 rounded-2xl bg-white shadow border">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
//                   <Clock className="text-indigo-600" />
//                 </div>
//                 <p className="font-semibold">Fast Delivery</p>
//               </div>
//               <p className="text-xs text-slate-500 mt-1">2–4 hour same-day service</p>
//             </div>
//           </div>
//         </div>

//             <div className="bg-white rounded-2xl p-3 shadow border border-indigo-100">
//           <div className="relative h-[15vh] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-500">

//             <div className="absolute inset-0 flex items-center justify-center text-center px-6 py-6">
//               <div>
//                 <h2 className="text-3xl font-bold text-white drop-shadow">
//                   {slides[currentSlide].title}
//                 </h2>
//                 <p className="text-sm text-white/90 mt-2">
//                   {slides[currentSlide].subtitle}
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* ⭐ NEW — WATER QUALITY FEATURES */}
//         <div className="px-1 py-4">
//           <h2 className="text-lg font-semibold text-slate-800 mb-3 tracking-wide">
//             Water Quality Features
//           </h2>

//           <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
//             <div className="space-y-3 text-sm font-medium text-slate-700">

//               <div className="flex gap-2 items-center">
//                 <div className="w-2 h-2 bg-indigo-500 rounded-full" />
//                 TDS Level: 50–150 ppm
//               </div>

//               <div className="flex gap-2 items-center">
//                 <div className="w-2 h-2 bg-indigo-500 rounded-full" />
//                 pH Balance: 6.5–7.5
//               </div>

//               <div className="flex gap-2 items-center">
//                 <div className="w-2 h-2 bg-indigo-500 rounded-full" />
//                 Microbial Test: Passed
//               </div>

//               <div className="flex gap-2 items-center">
//                 <div className="w-2 h-2 bg-indigo-500 rounded-full" />
//                 Heavy Metals: None Detected
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* ⭐ NEW — WHY CHOOSE US */}
//         <div>
//           <h2 className="text-lg font-semibold text-slate-800 mb-3 tracking-wide">
//             Why Choose Us
//           </h2>

//           <div className="grid grid-cols-2 gap-3">

//             <div className="p-4 rounded-2xl bg-white border shadow text-center">
//               <div className="text-2xl font-bold text-indigo-600">10+</div>
//               <p className="text-xs text-slate-500">Years Experience</p>
//             </div>

//             <div className="p-4 rounded-2xl bg-white border shadow text-center">
//               <div className="text-2xl font-bold text-blue-600">5★</div>
//               <p className="text-xs text-slate-500">Customer Rating</p>
//             </div>

//             <div className="p-4 rounded-2xl bg-white border shadow text-center">
//               <div className="text-2xl font-bold text-emerald-600">₹50</div>
//               <p className="text-xs text-slate-500">Lowest Price</p>
//             </div>

//             <div className="p-4 rounded-2xl bg-white border shadow text-center">
//               <div className="text-2xl font-bold text-indigo-600">99%</div>
//               <p className="text-xs text-slate-500">On-time Delivery</p>
//             </div>

//           </div>
//         </div>

//         {/* ⭐ NEW — FINAL CTA */}
//         <div className="pt-2">
//           <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold shadow-lg active:scale-95 transition">
//             Order Now
//           </button>
//         </div>
//       </main>
//     </div>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Droplet,
  Award,
  Zap,
  Clock,
  Sun,
  Star,
  Gift,
  Leaf,
} from "lucide-react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "Today's Special", subtitle: "20% OFF on first order" },
    { title: "Pure Quality Water", subtitle: "Tested & certified for safety" },
    { title: "Fast Delivery", subtitle: "Same-day delivery available" },
    { title: "Reliable Service", subtitle: "99.9% on-time delivery record" },
    { title: "Why Choose Us", subtitle: "Best prices & quality guaranteed" },
  ];

  const secondarySlides = [
    {
      title: "Eco-Friendly Bottles",
      subtitle: "Sustainable & BPA-free",
      icon: <Leaf className="text-white w-6 h-6 mx-auto mb-2" />,
    },
    {
      title: "Daily Hydration Tips",
      subtitle: "Keep your body energized",
      icon: <Sun className="text-white w-6 h-6 mx-auto mb-2" />,
    },
    {
      title: "Exclusive Rewards",
      subtitle: "Earn points on every order",
      icon: <Gift className="text-white w-6 h-6 mx-auto mb-2" />,
    },
    {
      title: "Premium Service",
      subtitle: "Personalized delivery & care",
      icon: <Star className="text-white w-6 h-6 mx-auto mb-2" />,
    },
  ];

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen">
      <main className="max-w-md mx-auto w-full px-4 pb-28 py-20 space-y-6">
        {/* Brand Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 px-5 py-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700">
            AquaPure
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Premium Water Delivery Service
          </p>
        </div>

        {/* Main Carousel */}
        <div className="bg-white rounded-2xl p-3 shadow border border-indigo-100">
          <div className="relative h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-500">
            <div className="absolute inset-0 flex items-center justify-center text-center px-6 py-6">
              <div>
                <h2 className="text-3xl font-bold text-white drop-shadow">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-sm text-white/90 mt-2">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
            </div>

            {/* controls */}
            <button
              onClick={() =>
                setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)
              }
              className="absolute left-3 top-2/3 sm:top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 p-1.5 sm:p-2 rounded-full backdrop-blur"
            >
              <ChevronLeft className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => setCurrentSlide((p) => (p + 1) % slides.length)}
              className="absolute right-3 top-2/3 sm:top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 p-1.5 sm:p-2 rounded-full backdrop-blur"
            >
              <ChevronRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* dots */}
            <div className="absolute bottom-3 w-full flex justify-center gap-1.5">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white shadow border flex flex-col items-center">
            <Award className="text-indigo-600 mb-1" />
            <p className="text-2xl font-bold">5000+</p>
            <p className="text-xs text-slate-500">Happy Customers</p>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow border flex flex-col items-center">
            <Zap className="text-indigo-600 mb-1" />
            <p className="text-2xl font-bold">2500+</p>
            <p className="text-xs text-slate-500">Orders / Month</p>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow border flex flex-col items-center">
            <Clock className="text-indigo-600 mb-1" />
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-xs text-slate-500">Support</p>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow border flex flex-col items-center">
            <Droplet className="text-indigo-600 mb-1" />
            <p className="text-2xl font-bold">100%</p>
            <p className="text-xs text-slate-500">Pure Quality</p>
          </div>
        </div>

        {/* Secondary Carousel 1 */}
        <div className="bg-white rounded-2xl p-3 shadow border border-indigo-100">
          <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-500">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-6 space-y-2">
              {secondarySlides[currentSlide % secondarySlides.length].icon}
              <h2 className="text-2xl font-bold text-white drop-shadow">
                {secondarySlides[currentSlide % secondarySlides.length].title}
              </h2>
              <p className="text-sm text-white/90 mt-1">
                {
                  secondarySlides[currentSlide % secondarySlides.length]
                    .subtitle
                }
              </p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-slate-700">
            Our Services
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white shadow border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                  <Droplet className="text-sky-600" />
                </div>
                <p className="font-semibold">Daily Delivery</p>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Fresh water delivered daily
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white shadow border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Clock className="text-indigo-600" />
                </div>
                <p className="font-semibold">Fast Delivery</p>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                2–4 hour same-day service
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Carousel 2 */}
        <div className="bg-white rounded-2xl p-3 shadow border border-indigo-100">
          <div className="relative h-[15vh] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-500">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-6 space-y-2">
              {
                secondarySlides[(currentSlide + 1) % secondarySlides.length]
                  .icon
              }
              <h2 className="text-xl font-bold text-white drop-shadow">
                {
                  secondarySlides[(currentSlide + 1) % secondarySlides.length]
                    .title
                }
              </h2>
              <p className="text-xs text-white/90 mt-1">
                {
                  secondarySlides[(currentSlide + 1) % secondarySlides.length]
                    .subtitle
                }
              </p>
            </div>
          </div>
        </div>

        {/* Water Quality Features */}
        <div className="px-1 py-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 tracking-wide">
            Water Quality Features
          </h2>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
            <div className="space-y-3 text-sm font-medium text-slate-700">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                TDS Level: 50–150 ppm
              </div>

              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                pH Balance: 6.5–7.5
              </div>

              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                Microbial Test: Passed
              </div>

              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                Heavy Metals: None Detected
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-3 tracking-wide">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white border shadow text-center">
              <div className="text-2xl font-bold text-indigo-600">10+</div>
              <p className="text-xs text-slate-500">Years Experience</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border shadow text-center">
              <div className="text-2xl font-bold text-blue-600">5★</div>
              <p className="text-xs text-slate-500">Customer Rating</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border shadow text-center">
              <div className="text-2xl font-bold text-emerald-600">₹50</div>
              <p className="text-xs text-slate-500">Lowest Price</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border shadow text-center">
              <div className="text-2xl font-bold text-indigo-600">99%</div>
              <p className="text-xs text-slate-500">On-time Delivery</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="pt-2">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold shadow-lg active:scale-95 transition">
            Order Now
          </button>
        </div>
      </main>
    </div>
  );
}
