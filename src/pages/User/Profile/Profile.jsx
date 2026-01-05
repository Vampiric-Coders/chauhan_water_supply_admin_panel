// "use client"

// import { useState } from "react"
// import { User, Mail, Phone, Building2, Home, Edit2, Save, X } from "lucide-react"

// export default function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false)

//   const [profile, setProfile] = useState({
//     name: "Rajesh Kumar",
//     email: "rajesh.kumar@email.com",
//     phone: "+91 98765 43210",
//     society: "Sunshine Heights",
//     flatNumber: "302",
//   })

//   const [editData, setEditData] = useState(profile)

//   const handleEdit = () => {
//     setIsEditing(true)
//     setEditData(profile)
//   }

//   const handleSave = () => {
//     setProfile(editData)
//     setIsEditing(false)
//   }

//   const handleCancel = () => {
//     setIsEditing(false)
//     setEditData(profile)
//   }

//   const handleInputChange = (field, value) => {
//     setEditData({ ...editData, [field]: value })
//   }

//   return (
//     <div className="min-h-screen w-fullb bg-blue-50">
//       <main className="max-w-lg mx-auto px-5 py-24">

//         <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-6">

//           <h1 className="text-3xl font-bold mb-6 text-blue-800 tracking-tight">
//             My Profile
//           </h1>

//           {/* Profile Header */}
//           <div className="rounded-2xl p-6 text-center mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
//             <div className="w-24 h-24 mx-auto rounded-full bg-white/10 border border-white/40 flex items-center justify-center mb-3 shadow-inner">
//               <User className="w-12 h-12 text-white" />
//             </div>

//             <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
//             <p className="text-sm text-indigo-100">Member since Dec 2024</p>
//           </div>

//           {/* View Mode */}
//           {!isEditing ? (
//             <>
//               <div className="space-y-4 mb-8">
//                 <InfoCard icon={<Mail />} label="Email" value={profile.email} />
//                 <InfoCard icon={<Phone />} label="Phone" value={profile.phone} />
//                 <InfoCard icon={<Building2 />} label="Society" value={profile.society} />
//                 <InfoCard icon={<Home />} label="Flat Number" value={profile.flatNumber} />
//               </div>

//               <button
//                 onClick={handleEdit}
//                 className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[.98] transition-all shadow-md"
//               >
//                 <Edit2 className="w-5 h-5" />
//                 Edit Profile
//               </button>
//             </>
//           ) : (
//             <>
//               {/* Edit Form */}
//               <div className="space-y-4 mb-8">
//                 <InputField label="Name" value={editData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
//                 <InputField label="Email" type="email" value={editData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
//                 <InputField label="Phone" value={editData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
//                 <InputField label="Society" value={editData.society} onChange={(e) => handleInputChange("society", e.target.value)} />
//                 <InputField label="Flat Number" value={editData.flatNumber} onChange={(e) => handleInputChange("flatNumber", e.target.value)} />
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={handleSave}
//                   className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[.98] transition-all shadow"
//                 >
//                   <Save className="w-5 h-5" />
//                   Save
//                 </button>

//                 <button
//                   onClick={handleCancel}
//                   className="flex-1 py-3 rounded-xl border font-semibold flex items-center justify-center gap-2 hover:bg-blue-100 active:scale-[.98] transition-all"
//                 >
//                   <X className="w-5 h-5" />
//                   Cancel
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }

// function InfoCard({ icon, label, value }) {
//   return (
//     <div className="rounded-xl border bg-white hover:bg-indigo-50/40 transition shadow-sm p-4 flex gap-4 items-start">
//       <div className="text-indigo-600 mt-1">{icon}</div>
//       <div>
//         <p className="text-sm font-semibold text-blue-700">{label}</p>
//         <p className="font-medium text-blue-500">{value}</p>
//       </div>
//     </div>
//   )
// }

// function InputField({ label, type = "text", value, onChange }) {
//   return (
//     <div className="space-y-1.5">
//       <label className="block text-sm font-medium text-blue-700">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white shadow-sm"
//       />
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  Home,
  Edit2,
  Save,
  X,
  Key,
  Calendar,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    society: "Sunshine Heights",
    flatNumber: "302",
  });

  const [editData, setEditData] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profile);
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(profile);
  };

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-blue-50 py-20">
      <main className="max-w-lg mx-auto px-5">
        {/* Card Container */}
        <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-2xl rounded-3xl p-6">
          <h1 className="text-3xl font-extrabold mb-6 text-indigo-800 tracking-tight">
            My Profile
          </h1>

          {/* Profile Header */}
          <div className="rounded-2xl p-6 text-center mb-6 bg-gradient-to-br from-indigo-600 to-purple-600 shadow-xl">
            <div className="w-28 h-28 mx-auto rounded-full bg-white/10 border border-white/40 flex items-center justify-center mb-3 shadow-inner">
              <User className="w-14 h-14 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-sm text-indigo-100 flex items-center justify-center gap-1">
              <Calendar className="w-4 h-4" /> Member since Dec 2024
            </p>
          </div>

          {/* View Mode */}
          {!isEditing ? (
            <>
              <div className="space-y-4 mb-8">
                <InfoCard icon={<Mail />} label="Email" value={profile.email} />
                <InfoCard
                  icon={<Phone />}
                  label="Phone"
                  value={profile.phone}
                />
                <InfoCard
                  icon={<Building2 />}
                  label="Society"
                  value={profile.society}
                />
                <InfoCard
                  icon={<Home />}
                  label="Flat Number"
                  value={profile.flatNumber}
                />
              </div>

              <button
                onClick={handleEdit}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[.97] transition-all shadow-lg"
              >
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {/* Edit Form */}
              <div className="space-y-4 mb-8">
                <InputField
                  label="Name"
                  value={editData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <InputField
                  label="Email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <InputField
                  label="Phone"
                  value={editData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                <InputField
                  label="Society"
                  value={editData.society}
                  onChange={(e) => handleInputChange("society", e.target.value)}
                />
                <InputField
                  label="Flat Number"
                  value={editData.flatNumber}
                  onChange={(e) =>
                    handleInputChange("flatNumber", e.target.value)
                  }
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[.97] transition-all shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  Save
                </button>

                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 rounded-xl border border-indigo-300 font-semibold flex items-center justify-center gap-2 hover:bg-blue-100 active:scale-[.97] transition-all"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border bg-white hover:bg-indigo-50 transition shadow-md p-4 flex gap-4 items-start">
      <div className="text-indigo-600 mt-1">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-indigo-700">{label}</p>
        <p className="font-medium text-blue-600">{value}</p>
      </div>
    </div>
  );
}

function InputField({ label, type = "text", value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-indigo-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white shadow-sm hover:shadow-md"
      />
    </div>
  );
}
