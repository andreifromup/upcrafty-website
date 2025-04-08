import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NAV_CATEGORIES, PORTFOLIO_IMAGES } from "@/assets/constants";
import SocialIcons from "@/components/SocialIcons";

// Common constant for consistent left padding
const LEFT_PADDING = '54px';

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Safety check for portfolio images
  const portfolioImages = PORTFOLIO_IMAGES?.default || [];
  
  // Safely handle the close action
  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      try {
        onClose();
      } catch (error) {
        console.error("Error closing dropdown:", error);
      }
    }
  };
  
  // Close dropdown when ESC key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm cursor-pointer"
      onClick={handleClose}
      style={{ zIndex: 90 }}
    >
      {/* Dropdown container that prevents click propagation */}
      <div 
        className={`
          bg-white text-black overflow-hidden
          ${isMobile 
            ? 'fixed inset-0 flex flex-col w-full' 
            : 'fixed top-0 left-0 right-0 flex justify-center w-full'
          }
          z-[100]
        `}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          width: '100%',
          height: isMobile ? '100%' : '572px',
          maxHeight: isMobile ? '100vh' : '80vh'
        }}
      >
        {/* Mobile Layout */}
        {isMobile && (
          <div className="flex flex-col h-full">
            <div className="pt-[80px]"> 
              {/* Space for the logo which is now in the Navbar component */}
              <div className="invisible h-[60px]"></div>

              {/* Navigation buttons - stacked vertically */}
              <div className="overflow-y-auto mt-4" style={{ paddingLeft: LEFT_PADDING }}>
                {NAV_CATEGORIES.map((category, idx) => (
                  <div key={idx} className={`mb-6 ${category.name === "CONTACT" ? 'mt-[-55px]' : ''}`}>
                    <a 
                      href={category.name === "ABOUT US" ? "/about" : "#"} 
                      className={`uppercase block py-2 ${!category.isTitle ? 'md:hover:text-[#FF6600] active:text-[#FF6600] active:scale-95' : ''} transition-all duration-150`}
                      onClick={(e) => {
                        try {
                          if (category.name === "CONTACT") {
                            e.preventDefault();
                            window.open("https://tally.so/r/m6Pl1P", "_blank");
                            handleClose();
                          } else if (category.name === "ABOUT US") {
                            // Let the link navigate naturally to /about
                            handleClose();
                          } else if (!category.isTitle) {
                            e.preventDefault();
                            setSelectedCategory(selectedCategory === category.name ? null : category.name);
                          } else {
                            e.preventDefault();
                          }
                        } catch (error) {
                          console.error("Error handling category click:", error);
                        }
                      }}
                    >
                      {category.isTitle ? (
                        // Title styling with container - with proper padding inside
                        <div 
                          className={`py-[6.5px] rounded-[8px] flex items-center justify-start h-[33px] bg-[#EDEAE7]/50`}
                          style={{ 
                            width: 'min(322px, 100%)', 
                            maxWidth: 'calc(100% - 20px)',
                            paddingLeft: '12px' // Internal padding for the bg container
                          }}
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="font-inter font-medium text-[16px] leading-[20px] tracking-[2px] uppercase">
                            {category.name}
                          </span>
                        </div>
                      ) : (
                        // Subtitle styling without container - padded slightly to match 
                        // the visual alignment of text inside the containers
                        <span className="font-inter font-normal text-[16px] leading-[35px] uppercase block pl-[12px]">
                          {category.name}
                        </span>
                      )}
                    </a>
                    
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="mt-2">
                        {category.subcategories.map((subcategory, subIdx) => (
                          <a 
                            key={subIdx} 
                            href="#" 
                            className="block md:hover:text-[#FF6600] active:text-[#FF6600] active:scale-95 transition-all duration-150"
                          >
                            <span className="font-inter font-normal text-[16px] leading-[35px] uppercase pl-[12px]">
                              {subcategory.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Portfolio carousel at the bottom - only when no category selected */}
            {!selectedCategory && portfolioImages.length > 0 && (
              <div className="p-4 mt-auto border-t border-gray-200">
                <Carousel className="w-full">
                  <CarouselContent>
                    {portfolioImages.map((image, idx) => (
                      <CarouselItem key={idx} className="basis-4/5 flex justify-center">
                        <img 
                          src={image} 
                          alt={`Featured project ${idx + 1}`} 
                          className="max-h-[340px] max-w-[280px] w-auto h-auto object-contain"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4">
                    <CarouselPrevious className="mx-2 p-2 rounded-full border border-black md:hover:bg-gray-100 active:bg-gray-100 active:scale-95 transition-all duration-150 static" />
                    <CarouselNext className="mx-2 p-2 rounded-full border border-black md:hover:bg-gray-100 active:bg-gray-100 active:scale-95 transition-all duration-150 static" />
                  </div>
                </Carousel>
              </div>
            )}
            
            {/* Mobile-only social icons at bottom */}
            <div className="flex mt-auto p-4 border-t border-gray-100" style={{ paddingLeft: LEFT_PADDING }}>
              <SocialIcons inDropdown={true} />
            </div>
          </div>
        )}
        
        {/* Desktop Layout */}
        {!isMobile && (
          <div className="flex h-full w-full max-w-[1725px] mx-auto">

            {/* Left section - Navigation - fixed and aligned to the left with same padding as logo */}
            <div className="w-[40%] min-w-[500px] flex flex-col h-full" style={{ flexShrink: 0, paddingLeft: LEFT_PADDING }}>
              <div className="pt-[100px]"></div>
              {/* Menu Categories - arranged in columns */}
              <div className="flex flex-wrap mt-6 overflow-y-auto flex-grow" style={{ maxHeight: 'calc(572px - 170px)' }}>
                {NAV_CATEGORIES.map((category, idx) => (
                  <div key={idx} className={`${category.isTitle ? 'w-1/2' : 'w-full'} ${category.name === "CONTACT" ? 'mt-[-55px]' : ''} mb-5 pr-4`}>
                    <a 
                      href={category.name === "ABOUT US" ? "/about" : "#"} 
                      className={`uppercase block mb-3 ${!category.isTitle ? 'md:hover:text-[#FF6600] active:text-[#FF6600] active:scale-95 transition-all duration-150' : ''}`}
                      onClick={(e) => {
                        try {
                          if (category.name === "CONTACT") {
                            e.preventDefault();
                            window.open("https://tally.so/r/m6Pl1P", "_blank");
                            handleClose();
                          } else if (category.name === "ABOUT US") {
                            // Let the link navigate naturally to /about
                            handleClose();
                          } else if (!category.isTitle) {
                            e.preventDefault();
                            setSelectedCategory(selectedCategory === category.name ? null : category.name);
                          } else {
                            e.preventDefault();
                          }
                        } catch (error) {
                          console.error("Error handling category click:", error);
                        }
                      }}
                    >
                      {category.isTitle ? (
                        // Title styling with container - with proper padding inside
                        <div 
                          className={`py-[6.5px] rounded-[8px] flex items-center justify-start h-[33px] bg-[#EDEAE7]/50`}
                          style={{ 
                            width: 'min(322px, 100%)', 
                            maxWidth: 'calc(100% - 20px)',
                            paddingLeft: '12px' // Internal padding for the bg container
                          }}
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="font-inter font-medium text-[16px] leading-[20px] tracking-[2px] uppercase">
                            {category.name}
                          </span>
                        </div>
                      ) : (
                        // Subtitle styling without container - padded slightly to match 
                        // the visual alignment of text inside the containers
                        <span className="font-inter font-normal text-[16px] leading-[35px] uppercase block pl-[12px]">
                          {category.name}
                        </span>
                      )}
                    </a>
                    
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="mt-2">
                        {category.subcategories.map((subcategory, subIdx) => (
                          <a 
                            key={subIdx} 
                            href="#" 
                            className="block md:hover:text-[#FF6600] active:text-[#FF6600] active:scale-95 transition-all duration-150"
                          >
                            <span className="font-inter font-normal text-[16px] leading-[35px] uppercase pl-[12px]">
                              {subcategory.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Desktop social icons on the bottom left - same padding as logo */}
              <div className="absolute bottom-8" style={{ left: LEFT_PADDING }}>
                <SocialIcons inDropdown={true} />
              </div>
            </div>
            
            {/* Right section - Portfolio images matching Figma reference */}
            {!selectedCategory && portfolioImages.length >= 3 && (
              <div className="flex-1 relative bg-white h-full overflow-hidden">
                {/* Portfolio images with absolute positioning to match Figma */}
                <div className="relative w-full h-[572px] overflow-hidden">
                  {/* Left image - aligned to bottom edge with overflow hidden */}
                  <div 
                    className="absolute w-[300px] h-[400px] overflow-hidden" 
                    style={{ 
                      left: '44px', 
                      bottom: '0',
                    }}
                  >
                    <img 
                      src={portfolioImages[0]} 
                      alt="Featured project 1" 
                      className="w-full h-auto object-cover"
                      style={{
                        objectPosition: "center top",
                        transform: "scale(1.2)"
                      }}
                    />
                  </div>
                  
                  {/* Middle image - positioned slightly higher than others */}
                  <div 
                    className="absolute w-[300px] h-[480px] overflow-hidden" 
                    style={{ 
                      left: 'calc(50% - 150px)', 
                      bottom: '60px',
                    }}
                  >
                    <img 
                      src={portfolioImages[1]} 
                      alt="Featured project 2" 
                      className="w-full h-auto object-cover"
                      style={{
                        objectPosition: "center top",
                        transform: "scale(1.2)"
                      }}
                    />
                  </div>
                  
                  {/* Right image - aligned to bottom edge with overflow hidden */}
                  <div 
                    className="absolute w-[300px] h-[400px] overflow-hidden" 
                    style={{ 
                      right: '44px', 
                      bottom: '0',
                    }}
                  >
                    <img 
                      src={portfolioImages[2]}
                      alt="Featured project 3" 
                      className="w-full h-auto object-cover"
                      style={{
                        objectPosition: "center top",
                        transform: "scale(1.2)"
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavDropdown;