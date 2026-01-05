import { DownloadIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function InstallPWAButton() {
  const [promptEvent, setPromptEvent] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      console.log("🔥 PWA install available");
      e.preventDefault();
      setPromptEvent(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;

    promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
  };

  if (!promptEvent) return null;

  return (
<button
  onClick={handleInstall}
  className="
    fixed top-4 
    right-4 md:right-20 lg:right-52 
    z-[999999]

    flex items-center gap-3

    px-5 py-2.5 rounded-full

    bg-gradient-to-r from-[#0E2A5A] via-[#123A7A] to-[#0B2550]

    text-white font-semibold tracking-wide

    shadow-xl shadow-blue-900/40

    border border-blue-700/40

    backdrop-blur-md

    animate-pulse

    hover:scale-105 hover:shadow-2xl

    transition-all duration-300
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
  Install App
</button>


 


 
  );
}
