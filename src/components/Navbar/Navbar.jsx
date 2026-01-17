import { useState, useEffect, useRef } from "react";
import { FiMenu, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [promptEvent, setPromptEvent] = useState(null);

  // Listen for PWA install prompt

  useEffect(() => {
    const handler = (e) => {
      console.log("🔥 PWA install available");

      e.preventDefault();

      setPromptEvent(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;

    promptEvent.prompt();

    await promptEvent.userChoice;

    setPromptEvent(null);
  };

  // close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="w-full sticky top-0 z-50 bg-red/80 backdrop-blur-md border-b">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* LEFT - menu + logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl border active:scale-95 transition hover:bg-gray-100"
          >
            <FiMenu size={22} />
          </button>

          {/* Brand / logo */}
          <p className="text-lg font-bold tracking-wide">AquaPure</p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Notification (hidden mobile) */}
          <button className="hidden md:flex p-2 rounded-xl border hover:bg-gray-100 active:scale-95 transition">
            <FiBell size={18} />
          </button>

          {promptEvent && (
            <button
              onClick={handleInstall}
              className="

                    flex items-center gap-2

                    px-4 py-2 rounded-full

                    bg-gradient-to-r from-[#0E2A5A] via-[#123A7A] to-[#0B2550] md:hidden block

                    text-white font-semibold tracking-wide

                    shadow-xl shadow-blue-900/40

                    border border-blue-700/40

                    backdrop-blur-md

                    animate-pulse

                    hover:scale-105 hover:shadow-2xl

                    transition-all duration-300

                    text-sm md:text-base

                  "
            >
              <DownloadIcon
                className="

                      text-blue-300

                      scale-110

                      drop-shadow-[0_0_6px_rgba(96,165,250,0.8)]

                      animate-bounce

                    "
              />
              Install
            </button>
          )}

          {/* PROFILE */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl border hover:bg-gray-100 active:scale-95 transition"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                A
              </div>

              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-[11px] text-gray-500">admin@aquapure.com</p>
              </div>
            </button>

            {/* DROPDOWN */}
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border shadow-xl p-2"
              >
                <button className="w-full p-2 flex gap-2 items-center rounded-xl hover:bg-gray-100">
                  <FiUser /> Profile
                </button>

                <button className="w-full p-2 flex gap-2 items-center rounded-xl hover:bg-red-50 text-red-500">
                  <FiLogOut /> Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
