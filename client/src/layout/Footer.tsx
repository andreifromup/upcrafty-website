import React from "react";
import Logo from "@/components/Logo";
import SocialIcons from "@/components/SocialIcons";
import { useIsMobile } from "@/hooks/use-mobile";
import { ICONS } from "@/assets/constants";
import { useLocation } from "wouter";

interface FooterProps {
  isDropdownOpen?: boolean;
  textColor?: string;
  useDarkLogo?: boolean;
}

const Footer: React.FC<FooterProps> = ({ 
  isDropdownOpen = false, 
  textColor = "text-white",
  useDarkLogo = false
}) => {
  const isMobile = useIsMobile();
  const [location] = useLocation();
  
  // Determine if we're on the homepage
  const isHomePage = location === "/";
  
  // Hide footer completely when dropdown is open
  if (isDropdownOpen) return null;
  
  return (
    <div className="w-full px-0 md:px-[54px] pb-5 md:pb-[40px] pt-0 mt-auto">
      {/* Mobile Layout for small screens - matching exact reference */}
      <div className="flex flex-col items-center md:hidden">
        {/* Logo on top - perfectly centered with same size as homepage mobile logo */}
        <div className="flex justify-center mb-4">
          {useDarkLogo ? (
            <img 
              src={ICONS.blackCenterLogo} 
              alt="Logo" 
              className="w-[14px] h-[14.3px]"
            />
          ) : (
            <Logo size="footer" />
          )}
        </div>
        
        {/* Social icons below logo for mobile - on all pages */}
        <div className="mb-4">
          <SocialIcons inverted={!useDarkLogo} />
        </div>
        
        {/* Copyright text at bottom - exact style from reference */}
        <div className={`text-center font-normal ${textColor}`}>
          <p className="text-[12px] leading-[16px]">© 2025 Upcrafty Co. All Rights Reserved.</p>
        </div>
      </div>
      
      {/* Desktop Layout - Only visible on medium screens and up */}
      <div className="hidden md:flex justify-between items-center w-full relative">
        {/* Copyright Text - Left with exact specifications from design */}
        <div 
          className={`${textColor} text-[15px] leading-[20px] font-normal whitespace-nowrap`}
          style={{
            width: "294px",
            height: "20px",
            paddingLeft: "0", // Align with the left edge of the top logo
          }}
        >
          <p>© 2025 Upcrafty Co. All Rights Reserved.</p>
        </div>
        
        {/* Center Logo - Exactly 38x38px and perfectly centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          {useDarkLogo ? (
            <img 
              src={ICONS.blackCenterLogo} 
              alt="Logo" 
              className="w-[38px] h-[38px]"
            />
          ) : (
            <Logo size="footer" />
          )}
        </div>

        {/* Social Icons - Right Side */}
        <div className="flex items-center">
          <SocialIcons inverted={!useDarkLogo} />
        </div>
      </div>
    </div>
  );
};

export default Footer;