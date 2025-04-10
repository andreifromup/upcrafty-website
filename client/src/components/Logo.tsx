import React from "react";
import { ICONS, LOGOS, COLORS, ORANGE_FILTER } from "@/assets/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

interface LogoProps {
  size?: "small" | "medium" | "large" | "header" | "footer";
  includeDropdown?: boolean;
  useBlackLogo?: boolean;
  isDropdownOpen?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = "medium", 
  includeDropdown = false, 
  useBlackLogo = false, 
  isDropdownOpen = false 
}) => {
  const isMobile = useIsMobile();
  const [location] = useLocation();
  const isAboutPage = location === "/about";
  
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Use the specific dimensions from the design specs
  if (size === "header") {
    // Header logo with exact dimension of 81x81px for desktop, smaller for mobile
    return (
      <div 
        className="flex items-center cursor-pointer"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {/* Logo image that changes to orange on hover - both for white and black versions */}
        <div className="relative h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] md:h-[81px] md:w-[81px] flex items-center justify-center">
          <img 
            src={ICONS.logo} 
            alt="Upcrafty Logo" 
            className="h-full w-auto absolute transition-all duration-300"
            style={{
              filter: isHovered 
                ? ORANGE_FILTER 
                : useBlackLogo ? 'invert(1)' : 'none'
            }}
          />
        </div>
        
        {includeDropdown && (
          <div className="relative -ml-1 w-[8px] h-[6px] md:w-[12px] md:h-[9px] flex items-center">
            <img 
              src={ICONS.polygon} 
              alt="Dropdown" 
              className="absolute w-full h-full transition-all duration-300"
              style={{
                filter: isHovered 
                  ? ORANGE_FILTER 
                  : useBlackLogo ? 'invert(1)' : 'none',
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
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
