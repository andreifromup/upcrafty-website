import React, { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import NavDropdown from "@/components/NavDropdown";
import SocialIconsManager from "@/components/SocialIconsManager";
import { useLocation } from "wouter";

interface NavbarProps {
  onDropdownOpen?: () => void;
  onDropdownClose?: () => void;
  useBlackButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onDropdownOpen, 
  onDropdownClose, 
  useBlackButton = false 
}) => {
  const isMobileDevice = useIsMobile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location] = useLocation();
  
  // Determine if we're on About page
  const isAboutPage = location === "/about";
  
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
      {/* Navbar - Always visible, regardless of dropdown state */}
      <div
        className={`
          px-[20px] sm:px-[35px] md:px-[54px] 
          pt-[15px] sm:pt-[18px] md:pt-[32px] 
          pb-0 flex justify-between items-center w-full
          ${isAboutPage ? 'relative' : 'absolute'} top-0 left-0 right-0 
          z-[100]
        `}
      >
        {/* Logo with dropdown arrow - responsive sizing */}
        <div 
          className="flex items-center cursor-pointer active:scale-95 transition-all duration-150" 
          onClick={toggleDropdown}
        >
          <Logo 
            size="header" 
            includeDropdown={true} 
            useBlackLogo={isDropdownOpen || isAboutPage}
          />
        </div>
        
        {/* Contact Button - Only visible when dropdown is closed */}
        {!isDropdownOpen && (
          <Button 
            className={`
              ${isAboutPage || useBlackButton
                ? isMobileDevice 
                  ? "bg-black text-white border border-black active:scale-95 active:bg-white active:text-black" 
                  : "bg-black hover:bg-white text-white hover:text-black border border-black active:scale-95 active:bg-white active:text-black"
                : isMobileDevice
                  ? "bg-[#FF6600] text-white border-none active:scale-95 active:bg-white active:text-[#FF6600]" 
                  : "bg-[#FF6600] hover:bg-white text-white hover:text-[#FF6600] border-none active:scale-95 active:bg-white active:text-[#FF6600]"
              } 
              rounded-full uppercase font-normal
              tracking-[1.5px] md:tracking-[2px] text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] 
              h-[28px] md:h-[34px] w-[90px] md:w-[107px] p-0 transition-all duration-300
            `}
            style={{ 
              width: isMobileDevice ? "90px" : "107px", 
              height: isMobileDevice ? "28px" : "34px"
            }}
            onClick={() => window.open("https://tally.so/r/m6Pl1P", "_blank", "noopener,noreferrer")}
          >
            Contact
          </Button>
        )}
      </div>
      
      {/* Social Icons - Managed centrally to only appear in one location */}
      <SocialIconsManager isDropdownOpen={isDropdownOpen} />
      
      {/* Navigation Dropdown */}
      <NavDropdown 
        isOpen={isDropdownOpen} 
        onClose={() => setIsDropdownOpen(false)} 
      />
    </>
  );
};

export default Navbar;