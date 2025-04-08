import React, { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import NavDropdown from "@/components/NavDropdown";
import SocialIconsManager from "@/components/SocialIconsManager";
import { useLocation } from "wouter";
import { COLORS } from "@/assets/constants";

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
    // Toggle dropdown state
    const newState = !isDropdownOpen;
    setIsDropdownOpen(newState);
    // No need to manually rotate arrow anymore, handled by Logo component
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
            isDropdownOpen={isDropdownOpen}
          />
        </div>
        
        {/* Contact Button - Only visible when dropdown is closed - Different versions for mobile and desktop */}
        {!isDropdownOpen && (
          <>
            {isMobileDevice ? (
              // Mobile version with no hover effect
              <div 
                className={`
                  ${isAboutPage || useBlackButton
                    ? "bg-black text-white border border-black"
                    : `bg-[${COLORS.orange}] text-white border-none`
                  }
                  rounded-full uppercase font-normal tracking-[1.5px] text-[12px] leading-[16px]
                  flex items-center justify-center cursor-pointer 
                  active:scale-95 active:bg-white 
                  ${isAboutPage || useBlackButton ? "active:text-black" : `active:text-[${COLORS.orange}]`}
                  transition-all duration-300
                `}
                style={{ 
                  width: "90px", 
                  height: "28px",
                  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' 
                }}
                onClick={() => window.open("https://tally.so/r/m6Pl1P", "_blank", "noopener,noreferrer")}
              >
                Contact
              </div>
            ) : (
              // Desktop version with hover effect
              <Button 
                className={`
                  ${isAboutPage || useBlackButton
                    ? "bg-black hover:bg-white text-white hover:text-black border border-black"
                    : `bg-[${COLORS.orange}] hover:bg-white text-white hover:text-[${COLORS.orange}] border-none`
                  } 
                  rounded-full uppercase font-normal tracking-[2px] text-[14px] leading-[20px] 
                  h-[34px] w-[107px] p-0 transition-all duration-300 active:scale-95
                  ${isAboutPage || useBlackButton ? "active:bg-white active:text-black" : `active:bg-white active:text-[${COLORS.orange}]`}
                `}
                onClick={() => window.open("https://tally.so/r/m6Pl1P", "_blank", "noopener,noreferrer")}
              >
                Contact
              </Button>
            )}
          </>
        )}
      </div>
      
      {/* Social Icons - Managed centrally to only appear in one location */}
      <SocialIconsManager isDropdownOpen={isDropdownOpen} />
      
      {/* Navigation Dropdown */}
      <NavDropdown 
        isOpen={isDropdownOpen} 
        onClose={() => {
          console.log("Closing dropdown from NavDropdown");
          setIsDropdownOpen(false);
          // Arrow rotation is now handled by the Logo component via isDropdownOpen prop
        }} 
      />
    </>
  );
};

export default Navbar;