import React, { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import NavDropdown from "@/components/NavDropdown";
import SocialIcons from "@/components/SocialIcons";

interface NavbarProps {
  onDropdownOpen?: () => void;
  onDropdownClose?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onDropdownOpen, onDropdownClose }) => {
  const isMobileDevice = useIsMobile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Notify parent component when dropdown state changes
  useEffect(() => {
    if (isDropdownOpen) {
      onDropdownOpen && onDropdownOpen();
    } else {
      onDropdownClose && onDropdownClose();
    }
  }, [isDropdownOpen, onDropdownOpen, onDropdownClose]);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <>
      <div
        className={`
          px-[20px] sm:px-[35px] md:px-[54px] 
          pt-[15px] sm:pt-[18px] md:pt-[40px] 
          pb-0 flex justify-between items-center w-full
          relative z-[60]
        `}
      >
        {/* Logo with dropdown arrow - responsive sizing */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={toggleDropdown}
        >
          <Logo 
            size="header" 
            includeDropdown={true} 
            useBlackLogo={isDropdownOpen}
          />
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
      
      {/* Social Icons */}
      <div className="fixed right-[20px] sm:right-[35px] md:right-[54px] bottom-[20px] sm:bottom-[35px] md:bottom-[40px] z-[60]">
        <SocialIcons inverted={isDropdownOpen} />
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