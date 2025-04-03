import React from "react";
import logoImage from "@assets/sigla.png";
import bottomLogoImage from "@assets/sigla bottom.png";

interface LogoProps {
  size?: "small" | "medium" | "large" | "header" | "footer";
  includeDropdown?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", includeDropdown = false }) => {
  // Use the specific dimensions from the design specs
  if (size === "header") {
    // Header logo with exact dimension of 81x81px
    return (
      <div className="flex items-center">
        <img 
          src={logoImage} 
          alt="Upcrafty Logo" 
          className="h-[81px] w-auto"
        />
        {includeDropdown && (
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
