import React from "react";
import logoImage from "@assets/sigla.png";
import bottomLogoImage from "@assets/sigla bottom.png";
import polygonImage from "@assets/Polygon 2.png";

interface LogoProps {
  size?: "small" | "medium" | "large" | "header" | "footer";
  includeDropdown?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", includeDropdown = false }) => {
  // Use the specific dimensions from the design specs
  if (size === "header") {
    // Header logo with exact dimension of 81x81px
    return (
      <div className="flex items-center group cursor-pointer">
        {/* Logo image that changes to orange on hover */}
        <div className="relative h-[81px] w-[81px] flex items-center justify-center">
          {/* White logo (visible by default) */}
          <img 
            src={logoImage} 
            alt="Upcrafty Logo" 
            className="h-[81px] w-auto absolute transition-opacity duration-300 group-hover:opacity-0"
          />
          {/* Orange logo (hidden by default, visible on hover) */}
          <img 
            src={logoImage} 
            alt="Upcrafty Logo" 
            className="h-[81px] w-auto absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100 [filter:brightness(0)_saturate(100%)_invert(49%)_sepia(75%)_saturate(5338%)_hue-rotate(1deg)_brightness(103%)_contrast(105%)]"
          />
        </div>
        {includeDropdown && (
          <div className="relative ml-1 w-[12px] h-[9px]">
            {/* White polygon (default) */}
            <img 
              src={polygonImage} 
              alt="Dropdown" 
              width={12}
              height={9}
              className="absolute transition-opacity duration-300 group-hover:opacity-0"
            />
            {/* Orange polygon (on hover) */}
            <img 
              src={polygonImage} 
              alt="Dropdown" 
              width={12}
              height={9}
              className="absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100 [filter:brightness(0)_saturate(100%)_invert(49%)_sepia(75%)_saturate(5338%)_hue-rotate(1deg)_brightness(103%)_contrast(105%)]"
            />
          </div>
        )}
      </div>
    );
  }
  
  if (size === "footer") {
    // Bottom center logo with exact dimension of 38x38px
    return (
      <img 
        src={bottomLogoImage}
        alt="Upcrafty Logo" 
        className="h-[38px] w-[38px]"
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
      src={logoImage} 
      alt="Upcrafty Logo" 
      className={sizes[size]}
    />
  );
};

export default Logo;
