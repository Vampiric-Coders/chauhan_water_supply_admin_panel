import React from "react";

const Loader = () => {
  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* <svg className="w-[30%] max-w-[500px] z-10" viewBox="0 0 600 150">
        <defs>
          <linearGradient id="bloodGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff0000" />
            <stop offset="100%" stopColor="#800000" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "50px",
            fill: "url(#bloodGradient)",
            stroke: "#ff4d4d",
            strokeWidth: "1.5px",
            letterSpacing: "2px",
            filter:
              "drop-shadow(0 0 12px #ff4d4d) drop-shadow(0 0 18px #ff0000)",
            animation:
              "bloodPulse 2s infinite ease-in-out, bloodGlow 2.5s infinite alternate, drip 4s infinite linear, flicker 1.5s infinite",
          }}
        >
          Glamo
        </text>
      </svg> */}

        <div className="three-body-wrapper">
      <div className="three-body__dot dot1"></div>
      <div className="three-body__dot dot2"></div>
      <div className="three-body__dot dot3"></div>
    </div>

      {/* Inline Keyframes */}
      {/* <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&display=swap');

          @keyframes logoPulse {
            0% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.07); opacity: 1; }
            100% { transform: scale(1); opacity: 0.9; }
          }

          @keyframes bloodPulse {
            0%,100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }

          @keyframes bloodGlow {
            0% { filter: drop-shadow(0 0 12px #ff4d4d) drop-shadow(0 0 18px #ff0000); }
            50% { filter: drop-shadow(0 0 20px #ff6666) drop-shadow(0 0 25px #ff1a1a); }
            100% { filter: drop-shadow(0 0 12px #ff4d4d) drop-shadow(0 0 18px #ff0000); }
          }

          @keyframes drip {
            0% { stroke-width: 1.5px; opacity: 1; }
            25% { stroke-width: 2px; opacity: 0.85; }
            50% { stroke-width: 2.5px; opacity: 1; }
            75% { stroke-width: 2px; opacity: 0.9; }
            100% { stroke-width: 1.5px; opacity: 1; }
          }

          @keyframes flicker {
            0%,19%,21%,23%,25%,54%,56%,100% { opacity:1; }
            20%,22%,24%,55% { opacity:0.8; }
          }
        `}
      </style> */}
    </div>
  );
};

export default Loader;
