import React from "react";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import { useIsMobile } from "@/hooks/use-mobile";

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full px-[54px] pb-[40px] pt-0">
      {isMobile ? (
        // Mobile Layout - Stacked
        <div className="flex flex-col items-center space-y-4">
          {/* Logo on top */}
          <div className="flex justify-center">
            <Logo size="footer" />
          </div>
          
          {/* Social Icons below logo */}
          <div className="flex justify-center mt-6">
            <SocialIcons />
          </div>
          
          {/* Copyright text at bottom */}
          <div className="text-center text-[12px] leading-[20px] mt-6 font-normal text-white">
            <p>© 2025 Upcrafty Co. All Rights Reserved.</p>
          </div>
        </div>
      ) : (
        // Desktop Layout - Three columns with precise positioning
        <div className="flex justify-between items-center w-full">
          {/* Copyright Text - Left with exact specifications from design */}
          <div 
            className="text-white text-[15px] leading-[20px] font-normal whitespace-nowrap"
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
            <Logo size="footer" />
          </div>
          
          {/* Social Media Icons - Right, group size 136x16.35px */}
          <div className="flex justify-end" style={{ width: "136px", height: "16.35px" }}>
            <SocialIcons />
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
