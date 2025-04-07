import React, { useState } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import NavDropdown from "@/components/NavDropdown";

const Navbar: React.FC = () => {
  const isMobileDevice = useIsMobile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <>
      <div className="px-[20px] sm:px-[35px] md:px-[54px] pt-[15px] sm:pt-[18px] md:pt-[40px] pb-0 flex justify-between items-center w-full">
        {/* Logo with dropdown arrow - responsive sizing */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={toggleDropdown}
        >
          <Logo size="header" includeDropdown={true} />
        </div>
        
        {/* Contact Button - Exact match to reference mobile.png */}
        <Button 
          className="bg-[#FF6600] hover:bg-white text-white hover:text-[#FF6600] rounded-full uppercase font-normal
          tracking-[1.5px] md:tracking-[2px] text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] 
          h-[28px] md:h-[34px] w-[90px] md:w-[107px] p-0 transition-colors duration-300 border-none"
          style={{ 
            width: isMobileDevice ? "90px" : "107px", 
            height: isMobileDevice ? "28px" : "34px"
          }}
          onClick={() => window.open("https://tally.so/r/m6Pl1P", "_blank", "noopener,noreferrer")}
        >
          Contact
        </Button>
      </div>
      
      {/* Navigation Dropdown */}
      <NavDropdown 
        isOpen={isDropdownOpen} 
        onClose={() => setIsDropdownOpen(false)} 
      />
    </>
  );
};

export default Navbar;