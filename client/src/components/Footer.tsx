import React from "react";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import { useIsMobile } from "@/hooks/use-mobile";

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full px-5 py-6">
      {isMobile ? (
        // Mobile Layout - Stacked
        <div className="flex flex-col items-center space-y-4">
          {/* Logo on top */}
          <div className="flex justify-center">
            <Logo size="small" />
          </div>
          
          {/* Social Icons below logo */}
          <div className="flex justify-center">
            <SocialIcons />
          </div>
          
          {/* Copyright text at bottom */}
          <div className="text-center text-xs">
            <p>© 2025 Upcrafty Co. All Rights Reserved.</p>
          </div>
        </div>
      ) : (
        // Desktop Layout - Three columns
        <div className="flex justify-between items-center">
          {/* Copyright Text - Left */}
          <div className="text-sm">
            <p>© 2025 Upcrafty Co. All Rights Reserved.</p>
          </div>
          
          {/* Center Logo */}
          <div className="flex justify-center">
            <Logo size="small" />
          </div>
          
          {/* Social Media Icons - Right */}
          <div className="flex justify-end">
            <SocialIcons />
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
