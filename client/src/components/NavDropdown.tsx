import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NAV_CATEGORIES, PORTFOLIO_IMAGES, COLORS } from "@/assets/constants";
import SocialIcons from "@/components/SocialIcons";

// Common constant for consistent left padding
const LEFT_PADDING = '54px';

// No need to import separate images as we'll use the same ones from PORTFOLIO_IMAGES

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Safety check for portfolio images
  const portfolioImages = PORTFOLIO_IMAGES?.default || [];
  
  // We'll use desktop portfolio images for mobile too
  
  // Safely handle the close action
  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      try {
        // Arrow rotation is now handled in the Logo component via props
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
  
  // Disable body scrolling when dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  // Reusable category menu item component
  const MenuItemWithHoverEffect = ({ name, isTitle = false, onClick }: { name: string, isTitle?: boolean, onClick?: (e: React.MouseEvent) => void }) => (
    <div 
      className={`relative py-[6.5px] ${isTitle ? '' : 'group'} flex items-center justify-start h-[33px]`}
      style={{ 
        width: 'min(322px, 100%)', 
        maxWidth: 'calc(100% - 20px)'
      }}
      onClick={onClick}
    >
      {/* Background for title or hover effect for non-title */}
      <div 
        className={`absolute inset-0 rounded-[8px] 
          ${isTitle 
            ? 'bg-[#EDEAE7]/50' 
            : 'bg-[#BCBCBC]/50 opacity-0 md:group-hover:opacity-100 transition-opacity duration-150'
          }`}
      ></div>
      
      {/* Text content - styled differently for titles and subtitles */}
      <span 
        className={`relative z-10 uppercase pl-[12px] font-inter
          ${isTitle 
            ? 'font-medium text-[16px] leading-[20px] tracking-[2px]' 
            : 'font-normal text-[16px] leading-[20px]'
          }`}
      >
        {name}
      </span>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm cursor-pointer"
      onClick={handleClose}
      style={{ zIndex: 90 }}
    >
      {/* Dropdown container that prevents click propagation */}
      <div 
        className={`
          bg-white text-black z-[100]
          ${isMobile 
            ? 'fixed inset-0 flex flex-col w-full overflow-hidden' 
            : 'fixed top-0 left-0 right-0 flex justify-center w-full overflow-hidden'
          }
        `}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          width: '100%',
          height: isMobile ? '100%' : '572px',
          maxHeight: isMobile ? '100vh' : '80vh'
        }}
      >
        {/* Mobile Layout - Exact match to the reference image */}
        {isMobile && (
          <div className="flex flex-col h-full justify-between">
            {/* Logo area - fixed at top */}
            <div className="pt-6 px-4 mb-2">
              <img 
                src="/black center logo.png" 
                alt="Upcrafty" 
                className="h-6 mx-1 mb-0"
              />
            </div>
            
            {/* Menu Categories - Exact match to the reference with smaller spacing */}
            <div className="flex-grow overflow-hidden px-4">
              <div className="flex flex-col space-y-0.5">
                {NAV_CATEGORIES.map((category, idx) => (
                  <div key={idx} className="mb-1">
                    <a 
                      href={category.name === "ABOUT US" ? "/about" : "#"} 
                      className={`uppercase block ${!category.isTitle ? 'active:scale-95 transition-all duration-150' : ''}`}
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
                      {/* Styled to match the reference exactly */}
                      {category.isTitle ? (
                        <div 
                          className="py-1.5 my-1 rounded-lg flex items-center bg-[#EDEAE7]/50"
                        >
                          <span className="font-medium text-[14px] leading-[18px] tracking-[1px] uppercase px-4">
                            {category.name}
                          </span>
                        </div>
                      ) : (
                        <span className="font-normal text-[14px] leading-[18px] uppercase block px-4 py-1.5 my-1">
                          {category.name}
                        </span>
                      )}
                    </a>
                    
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div>
                        {category.subcategories.map((subcategory, subIdx) => (
                          <a 
                            key={subIdx} 
                            href="#" 
                            className="block active:scale-95 transition-all duration-150"
                          >
                            <span className="font-normal text-[13px] leading-[18px] uppercase block px-4 py-1.5">
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
            
            {/* Portfolio carousel at the bottom - exact match to reference */}
            <div className="px-2 mt-auto mb-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {portfolioImages.map((image, idx) => (
                    <CarouselItem key={idx} className="basis-1/3 md:basis-1/3 flex justify-center">
                      <img 
                        src={image} 
                        alt={`Featured project ${idx + 1}`} 
                        className="h-[110px] w-[110px] object-cover rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            
            {/* Social icons at bottom - center aligned */}
            <div className="flex justify-center pb-4 pt-2">
              <SocialIcons inDropdown={true} />
            </div>
          </div>
        )}
        
        {/* Desktop Layout - unchanged */}
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
                      className="uppercase block mb-3 active:scale-95 transition-all duration-150"
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
                      {/* Use the reusable component with hover effect */}
                      <MenuItemWithHoverEffect 
                        name={category.name} 
                        isTitle={category.isTitle}
                        onClick={category.isTitle ? (e) => e.preventDefault() : undefined} 
                      />
                    </a>
                    
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="mt-2">
                        {category.subcategories.map((subcategory, subIdx) => (
                          <a 
                            key={subIdx} 
                            href="#" 
                            className="block active:scale-95 transition-all duration-150"
                          >
                            {/* Use the reusable component with hover effect for subcategories too */}
                            <MenuItemWithHoverEffect name={subcategory.name} />
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