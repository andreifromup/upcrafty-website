import React from "react";
import { ICONS, LOGOS } from "@/assets/constants";
import { useIsMobile } from "@/hooks/use-mobile";

interface LogoProps {
  size?: "small" | "medium" | "large" | "header" | "footer";
  includeDropdown?: boolean;
  useBlackLogo?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", includeDropdown = false, useBlackLogo = false }) => {
  const isMobile = useIsMobile();
  
  // Use the specific dimensions from the design specs
  if (size === "header") {
    // Header logo with exact dimension of 81x81px for desktop, smaller for mobile
    return (
      <div className="flex items-center group cursor-pointer">
        {/* Logo image that changes to orange on hover - both for white and black versions */}
        <div className="relative h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] md:h-[81px] md:w-[81px] flex items-center justify-center">
          {/* Vector logo with color switching but same position */}
          <img 
            src={ICONS.logo} 
            alt="Upcrafty Logo" 
            className={`h-full w-auto absolute transition-all duration-300 ${useBlackLogo ? 'invert-[1]' : ''}`}
            style={{
              filter: useBlackLogo ? 'invert(1)' : 'none'
            }}
            onMouseOver={(e) => {
              if (!isMobile) {
                e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(49%) sepia(75%) saturate(5338%) hue-rotate(1deg) brightness(103%) contrast(105%)';
              }
            }}
            onMouseOut={(e) => {
              if (!isMobile) {
                e.currentTarget.style.filter = useBlackLogo ? 'invert(1)' : 'none';
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
          />
        </div>
        {includeDropdown && (
          <div className="relative -ml-1 w-[8px] h-[6px] md:w-[12px] md:h-[9px] flex items-center">
            {/* Dropdown polygon that changes color with the logo */}
            <img 
              src={ICONS.polygon} 
              alt="Dropdown" 
              className={`absolute w-full h-full transition-all duration-300 ${useBlackLogo ? 'invert-[1]' : ''}`}
              style={{
                filter: useBlackLogo ? 'invert(1)' : 'none'
              }}
              onMouseOver={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(49%) sepia(75%) saturate(5338%) hue-rotate(1deg) brightness(103%) contrast(105%)';
                }
              }}
              onMouseOut={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.filter = useBlackLogo ? 'invert(1)' : 'none';
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
        src={ICONS.logoBottom}
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
