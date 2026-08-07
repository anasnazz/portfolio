import React from "react";

export default function MenuIcon({ color = "black", size = 32, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Top Line */}
      <path
        d="M4 6H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="butt" 
        strokeLinejoin="miter" 
      />
      
      {/* Middle Line */}
      <path
        d="M4 12H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
      
      {/* Bottom Short Line */}
      <path
        d="M11 18H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}