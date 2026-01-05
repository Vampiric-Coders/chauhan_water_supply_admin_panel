// import React from 'react'
// import Sidebar from '../components/Sidebar/Sidebar'

// const AdminLayout = () => {
//   return (
//     <div>
//       <Sidebar/>
      
//     </div>
//   )
// }

// export default AdminLayout

import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex">

      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="flex-1 min-h-screen bg-blue-50 md:ml-64">
        <Navbar onMenuClick={() => setOpenSidebar(true)} />
        <Outlet />
      </div>

    </div>
  );
}

