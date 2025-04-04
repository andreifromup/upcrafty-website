import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "../hooks/use-mobile";

const Navbar: React.FC = () => {
  const isMobileDevice = useIsMobile();
  
  return (
    <div className="px-[20px] sm:px-[35px] md:px-[54px] pt-[15px] sm:pt-[18px] md:pt-[40px] pb-0 flex justify-between items-center w-full">
      {/* Logo with dropdown arrow - responsive sizing */}
      <div className="flex items-center">
        <Logo size="header" includeDropdown={true} />
      </div>
      
      {/* Contact Button - Pixel perfect specs with hover effect, responsive for mobile */}
      <Button 
        className="bg-[#FF6600] hover:bg-white text-white hover:text-[#FF6600] rounded-full uppercase font-normal
        tracking-[1.5px] md:tracking-[2px] text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] 
        h-[28px] md:h-[34px] w-[90px] md:w-[107px] p-0 transition-colors duration-300"
        style={{ 
          width: isMobileDevice ? "90px" : "107px", 
          height: isMobileDevice ? "28px" : "34px"
        }}
        onClick={() => console.log("Contact button clicked")}
      >
        Contact
      </Button>
    </div>
  );
};

export default Navbar;
