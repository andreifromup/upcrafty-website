import React from "react";
import { ICONS, LOGOS } from "@/assets/constants";
import { useIsMobile } from "@/hooks/use-mobile";

interface LogoProps {
  size?: "small" | "medium" | "large" | "header" | "footer";
  includeDropdown?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", includeDropdown = false }) => {
  const isMobile = useIsMobile();
  
  // Use the specific dimensions from the design specs
  if (size === "header") {
    // Header logo with exact dimension of 81x81px for desktop, smaller for mobile
    return (
      <div className="flex items-center group cursor-pointer">
        {/* Logo image that changes to orange on hover - only on desktop */}
        <div className="relative h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] md:h-[81px] md:w-[81px] flex items-center justify-center">
          {/* White logo (visible by default) */}
          <img 
            src={ICONS.logo} 
            alt="Upcrafty Logo" 
            className={`h-full w-auto absolute transition-opacity duration-300 ${!isMobile ? 'group-hover:opacity-0' : ''}`}
          />
          {/* Orange logo (hidden by default, visible on hover on desktop only) */}
          <img 
            src={ICONS.logo} 
            alt="Upcrafty Logo" 
            className={`h-full w-auto absolute transition-opacity duration-300 opacity-0 ${!isMobile ? 'group-hover:opacity-100' : ''} [filter:brightness(0)_saturate(100%)_invert(49%)_sepia(75%)_saturate(5338%)_hue-rotate(1deg)_brightness(103%)_contrast(105%)]`}
          />
        </div>
        {includeDropdown && (
          <div className="relative -ml-1 w-[8px] h-[6px] md:w-[12px] md:h-[9px] flex items-center">
            {/* White polygon (default) */}
            <img 
              src={ICONS.polygon} 
              alt="Dropdown" 
              className={`absolute w-full h-full transition-opacity duration-300 ${!isMobile ? 'group-hover:opacity-0' : ''}`}
            />
            {/* Orange polygon (on hover on desktop only) */}
            <img 
              src={ICONS.polygon} 
              alt="Dropdown" 
              className={`absolute w-full h-full transition-opacity duration-300 opacity-0 ${!isMobile ? 'group-hover:opacity-100' : ''} [filter:brightness(0)_saturate(100%)_invert(49%)_sepia(75%)_saturate(5338%)_hue-rotate(1deg)_brightness(103%)_contrast(105%)]`}
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
