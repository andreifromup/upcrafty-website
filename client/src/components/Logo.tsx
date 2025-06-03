import React, { useState } from "react";
import { ICONS, LOGOS, COLORS, ORANGE_FILTER } from "@/assets/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

interface LogoProps {
  size?: "small" | "medium" | "large" | "header" | "footer";
  includeDropdown?: boolean;
  useBlackLogo?: boolean;
  isDropdownOpen?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", includeDropdown = false, useBlackLogo = false, isDropdownOpen = false }) => {
  const isMobile = useIsMobile();
  const [location] = useLocation();
  const isAboutPage = location === "/about";
  const [isHovered, setIsHovered] = useState(false);
  
  // Use the specific dimensions from the design specs
  if (size === "header") {
    // Header logo with exact dimension of 81x81px for desktop, smaller for mobile
    return (
      <div 
        className="flex items-center cursor-pointer group"
        onMouseDown={(e) => {
          // Stop propagation to prevent interference with document-level handlers
          e.stopPropagation();
        }}
        onMouseEnter={() => {
          if (!isMobile) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setIsHovered(false);
          }
        }}
        onTouchStart={(e) => {
          if (isMobile) {
            e.currentTarget.style.transform = 'scale(0.95)';
          }
        }}
        onTouchEnd={(e) => {
          if (isMobile) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        {/* Logo image that changes to orange on hover */}
        <div className="relative h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] md:h-[81px] md:w-[81px] flex items-center justify-center">
          {/* Normal logo - hidden when hovered */}
          <img 
            src={ICONS.logo}
            alt="Upcrafty Logo" 
            className={`h-full w-auto absolute transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'} ${useBlackLogo ? 'invert-[1]' : ''}`}
            style={{
              filter: useBlackLogo ? 'invert(1)' : 'none'
            }}
          />
          {/* Orange logo - shown when hovered */}
          <img 
            src="/orange-logo.png"
            alt="Upcrafty Logo" 
            className={`h-full w-auto absolute transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        {includeDropdown && (
          <div className="relative -ml-1 w-[8px] h-[6px] md:w-[12px] md:h-[9px] flex items-center">
            {/* Normal arrow - hidden when hovered */}
            <img 
              src={ICONS.polygon} 
              alt="Dropdown" 
              className={`absolute w-full h-full transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
              style={{
                filter: useBlackLogo ? 'invert(1)' : 'none',
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'opacity 300ms ease, transform 300ms ease'
              }}
            />
            {/* Orange arrow - shown when hovered */}
            <img 
              src="/orange-arrow.png" 
              alt="Dropdown" 
              className={`absolute w-full h-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'opacity 300ms ease, transform 300ms ease'
              }}
              id="dropdown-arrow"
            />
          </div>
        )}
      </div>
    );
  }
  
  if (size === "footer") {
    // Bottom center logo - larger size for better visibility on mobile
    return (
      <img 
        src={ICONS.blackCenterLogo}
        alt="Upcrafty Logo" 
        className="w-[24px] h-[24px] md:h-[38px] md:w-[38px]"
      />
    );
  }
  
  // For backwards compatibility with other parts of the app
  const sizes = {
    small: "h-6 w-auto",
    medium: "h-8 w-auto md:h-10",
    large: "h-12 w-auto",
  };
  
  return (
    <img 
      src={ICONS.logo} 
      alt="Upcrafty Logo" 
      className={sizes[size]}
    />
  );
};

export default Logo;
