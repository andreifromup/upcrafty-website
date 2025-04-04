import React from "react";

// Use string URLs instead of direct imports
const logoImage = "/sigla.png";
const bottomLogoImage = "/sigla bottom.png";
const polygonImage = "/Polygon 2.png";

interface LogoProps {
  size?: "small" | "medium" | "large" | "header" | "footer";
  includeDropdown?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", includeDropdown = false }) => {
  // Use the specific dimensions from the design specs
  if (size === "header") {
    // Header logo with exact dimension of 81x81px for desktop, smaller for mobile
    return (
      <div className="flex items-center group cursor-pointer">
        {/* Logo image that changes to orange on hover */}
        <div className="relative h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] md:h-[81px] md:w-[81px] flex items-center justify-center">
          {/* White logo (visible by default) */}
          <img 
            src={logoImage} 
            alt="Upcrafty Logo" 
            className="h-full w-auto absolute transition-opacity duration-300 group-hover:opacity-0"
          />
          {/* Orange logo (hidden by default, visible on hover) */}
          <img 
            src={logoImage} 
            alt="Upcrafty Logo" 
            className="h-full w-auto absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100 [filter:brightness(0)_saturate(100%)_invert(49%)_sepia(75%)_saturate(5338%)_hue-rotate(1deg)_brightness(103%)_contrast(105%)]"
          />
        </div>
        {includeDropdown && (
          <div className="relative -ml-1 w-[8px] h-[6px] md:w-[12px] md:h-[9px] flex items-center">
            {/* White polygon (default) */}
            <img 
              src={polygonImage} 
              alt="Dropdown" 
              className="absolute w-full h-full transition-opacity duration-300 group-hover:opacity-0"
            />
            {/* Orange polygon (on hover) */}
            <img 
              src={polygonImage} 
              alt="Dropdown" 
              className="absolute w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 [filter:brightness(0)_saturate(100%)_invert(49%)_sepia(75%)_saturate(5338%)_hue-rotate(1deg)_brightness(103%)_contrast(105%)]"
            />
          </div>
        )}
      </div>
    );
  }
  
  if (size === "footer") {
    // Bottom center logo with exact dimensions to match reference
    return (
      <div className="rounded-full bg-white flex items-center justify-center h-[40px] w-[40px] md:h-[38px] md:w-[38px]">
        <img 
          src={bottomLogoImage}
          alt="Upcrafty Logo" 
          className="h-[24px] w-[24px] md:h-[22px] md:w-[22px]"
        />
      </div>
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
      src={logoImage} 
      alt="Upcrafty Logo" 
      className={sizes[size]}
    />
  );
};

export default Logo;
