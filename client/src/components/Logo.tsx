import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const sizes = {
    small: "h-6 w-6",
    medium: "h-8 w-8 md:h-10 md:w-10",
    large: "h-12 w-12",
  };

  return (
    <svg 
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={sizes[size]}
    >
      {/* Based on the provided assets, creating a simplified animal face logo */}
      <g>
        {/* Face shape */}
        <circle cx="24" cy="24" r="13" fill="white" />
        
        {/* Ears */}
        <circle cx="13" cy="13" r="5" fill="white" />
        <circle cx="35" cy="13" r="5" fill="white" />
        
        {/* Eyes */}
        <circle cx="18" cy="20" r="2.5" fill="black" />
        <circle cx="30" cy="20" r="2.5" fill="black" />
        
        {/* Nose */}
        <circle cx="24" cy="26" r="3" fill="black" />
        
        {/* Mouth */}
        <path d="M19 30C20.5 32 26.5 32 29 30" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Dot details */}
        <circle cx="41" cy="10" r="1" fill="white" />
      </g>
    </svg>
  );
};

export default Logo;
