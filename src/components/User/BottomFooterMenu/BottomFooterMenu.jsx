import { BarChart3, ShoppingCart } from 'lucide-react'
import React from 'react'
import { AiFillDashboard } from 'react-icons/ai'
import { FiCalendar, FiHome, FiPhoneCall, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const BottomFooterMenu = () => {
  return (
    <div>

        <footer className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl py-3 flex justify-around border-t">
              <Link to='/home' className="flex flex-col items-center text-blue-600">
                  <FiHome size={20} />
                  <span className="text-[11px] mt-1">Home</span>
                </Link>
              
                <Link to='/dashboard' className="flex flex-col items-center text-blue-600">
                  <BarChart3 size={20} />
                  <span className="text-[11px] mt-1">Dashboard</span>
                </Link>

                
        
                       <Link to='/book' className="flex flex-col items-center text-blue-600">
                  <ShoppingCart size={20} />
                  <span className="text-[11px] mt-1">Book</span>
                </Link>
                
                {/* <div className="flex flex-col items-center text-blue-600">
                  <FiPhoneCall size={20} />
                  <span className="text-[11px] mt-1">Call</span>
                </div> */}
        
        <a href="tel:+919876543210">
  <div className="flex flex-col items-center text-blue-600 cursor-pointer">
    <FiPhoneCall size={20} />
    <span className="text-[11px] mt-1">Call</span>
  </div>
</a>

                     <Link to='/profile' className="flex flex-col items-center text-blue-600">
                  <FiUser size={20} />
                  <span className="text-[11px] mt-1">Profile</span>
                </Link>
              </footer>
    </div>
  )
}

export default BottomFooterMenu