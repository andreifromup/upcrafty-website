import React, { useState, useEffect, useCallback, useRef } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import SocialIcons from "@/components/SocialIcons";
import { NAV_CATEGORIES, PORTFOLIO_IMAGES } from "@/assets/constants";

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Consistent left padding across components 
 */
const LEFT_PADDING = "80px";

/**
 * Mobile & Desktop Menu Dropdown Component
 * 
 * This component is displayed when the user clicks the logo in the navbar.
 * It features different layouts for mobile and desktop.
 */
const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portfolioImages = PORTFOLIO_IMAGES.default;
  // For carousel indicators
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Close dropdown when user presses escape key
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);
  
  // Add/remove event listeners
  useEffect(() => {
    if (isOpen) {
      // Add escape key listener
      document.addEventListener("keydown", handleEsc);
      
      // Disable body scrolling when dropdown is open
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      // Clean up listeners and re-enable scrolling
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleEsc]);
  
  // Handle dropdown close
  const handleClose = () => {
    onClose();
  };
  
  // Handle clicks outside the dropdown content
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if click is outside the dropdown content
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };
  
  // Menu Item component with hover effect
  const MenuItemWithHoverEffect: React.FC<{ 
    name: string; 
    isTitle?: boolean; 
    onClick?: (e: React.MouseEvent) => void 
  }> = ({ name, isTitle = false, onClick }) => {
    // Desktop menu items with hover effect
    if (!isMobile) {
      return (
        <div 
          className={`
            relative overflow-hidden group 
            ${isTitle ? 'mb-3 font-medium' : 'font-normal'} 
            ${isTitle ? 'text-[15px] leading-[20px]' : 'text-[15px] leading-[20px]'}
          `}
          onClick={onClick}
        >
          <span className="relative z-10">{name}</span>
          <div 
            className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform origin-left scale-x-0 
                      group-hover:scale-x-100 transition-transform duration-300"
          ></div>
        </div>
      );
    }
    
    // Mobile items don't have hover effect
    return (
      <span className={`${isTitle ? 'font-medium' : 'font-normal'}`}>{name}</span>
    );
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-white overflow-hidden"
      onClick={handleOutsideClick}
    >
      <div 
        ref={contentRef} 
        className="w-full h-full overflow-auto" 
        style={{
          height: isMobile ? '100%' : '572px',
          maxHeight: isMobile ? '100vh' : '80vh'
        }}
      >
        {/* Mobile Layout - Exact match to the reference image */}
        {isMobile && (
          <div className="flex flex-col h-full justify-between">
            {/* Logo area - fixed at top with more spacing below */}
            <div className="pt-6 px-4 mb-14">
              {/* Intentionally empty to create space - actual logo is in the Navbar */}
            </div>
            
            {/* Menu Categories - Exact match to the reference with proper spacing to not overlap with logo */}
            <div className="flex-grow overflow-hidden px-4 mt-4">
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
            <div className="mt-auto mb-2 relative">
              {/* Gradient overlays for fade effect on the sides */}
              <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
              
              {/* Custom focused carousel with tighter images */}
              <Carousel 
                className="w-full" 
                opts={{ 
                  align: 'center',
                  loop: true,
                  containScroll: false,
                }}
                onSelect={(api) => {
                  setActiveIndex(api.selectedScrollSnap());
                }}
              >
                <CarouselContent className="-ml-4">
                  {portfolioImages.map((image, idx) => (
                    <CarouselItem key={idx} className="basis-1/2 pl-0 flex justify-center">
                      <div className="h-full flex justify-center items-center">
                        <img 
                          src={image} 
                          alt={`Featured project ${idx + 1}`} 
                          className="w-[189px] h-[257px] object-cover rounded-lg"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              {/* Indicator dots */}
              <div className="flex justify-center items-center mt-4 mb-4">
                {portfolioImages.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2.5 h-2.5 mx-1.5 rounded-full border border-black ${index === activeIndex ? 'bg-black' : 'bg-white'}`}
                  ></div>
                ))}
              </div>
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