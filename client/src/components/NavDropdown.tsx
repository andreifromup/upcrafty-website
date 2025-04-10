import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { XIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import SocialIcons from "@/components/SocialIcons";
import { NAV_CATEGORIES } from "@/assets/constants";

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
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState<'image' | 'video'>('image');
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Define portfolio images for desktop view
  const portfolioImages = [
    "/transp 1.png",
    "/transp 2.png", 
    "/transp 4.png"
  ];
  
  // Handle subcategory click
  const handleSubcategoryClick = (subcategory: string) => {
    // If the same subcategory is clicked again, close the overlay
    if (selectedSubcategory === subcategory && showOverlay) {
      setShowOverlay(false);
      setSelectedSubcategory(null);
      return;
    }
    
    // Set the subcategory and show the overlay
    setSelectedSubcategory(subcategory);
    setShowOverlay(true);
    
    // Determine content type based on subcategory
    if (subcategory === "2D ANIMATIONS" || subcategory === "MOTION GRAPHICS") {
      setOverlayType('video');
    } else {
      setOverlayType('image');
    }
  };
  
  // Handle overlay close
  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedSubcategory(null);
  };
  
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
    // Desktop menu items - match styling with mobile menu
    if (!isMobile) {
      if (isTitle) {
        return (
          <div 
            className="py-1.5 my-1 rounded-lg flex items-center bg-[#EDEAE7]/50"
            onClick={onClick}
          >
            <span className="font-medium text-[15px] leading-[20px] tracking-[1px] uppercase px-4 text-black">
              {name}
            </span>
          </div>
        );
      } else {
        return (
          <div 
            className="relative overflow-hidden group rounded-lg hover:bg-[#BCBCBC]/50 transition-colors duration-300"
            onClick={onClick}
            style={{ 
              padding: '0.375rem 1rem',
              margin: '0.25rem 0'
            }}
          >
            <span className="font-normal text-[15px] leading-[20px] text-black">
              {name}
            </span>
          </div>
        );
      }
    }
    
    // Mobile items don't have hover effect
    return (
      <span className={`${isTitle ? 'font-medium' : 'font-normal'}`}>{name}</span>
    );
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={`fixed z-50 bg-white overflow-hidden ${isMobile ? 'inset-0' : 'top-0 left-0 right-0'}`}
      onClick={handleOutsideClick}
    >
      <div 
        ref={contentRef} 
        className={`w-full overflow-auto ${isMobile ? 'h-full' : ''}`}
        style={{
          height: isMobile ? '100%' : '572px',
          maxHeight: isMobile ? '100vh' : '572px'
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
                      className={`uppercase block text-black ${!category.isTitle ? 'active:scale-95 transition-all duration-150' : ''}`}
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
                      {/* Styled to match the reference exactly with consistent spacing */}
                      {category.isTitle ? (
                        <div 
                          className="py-1.5 my-1 rounded-lg flex items-center bg-[#EDEAE7]/50"
                        >
                          <span className="font-medium text-[14px] leading-[18px] tracking-[1px] uppercase px-4 text-black">
                            {category.name}
                          </span>
                        </div>
                      ) : (
                        <span 
                          className="font-normal text-[14px] leading-[18px] uppercase block px-4 py-1.5 my-1 text-black"
                          // Ensure consistent spacing for special menu items
                          style={{ 
                            padding: '0.375rem 1rem',
                            margin: '0.25rem 0'
                          }}
                        >
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
                            className="block active:scale-95 transition-all duration-150 text-black"
                          >
                            <span 
                              className="font-normal text-[13px] leading-[18px] uppercase block px-4 py-1.5 text-black"
                              style={{ 
                                padding: '0.375rem 1rem',
                                margin: '0.25rem 0'
                              }}
                            >
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
            
            {/* Custom simple carousel - mobile only */}
            <div className="mt-auto pt-4 mb-2 relative">
              {/* Gradient overlays for fade effect on the sides */}
              <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
              
              {/* Simple fixed-height carousel with CSS transitions */}
              <div className="overflow-hidden relative h-[300px]">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ 
                    transform: `translateX(calc(50% - 110px - ${activeIndex * 220}px))`,
                    height: "300px"
                  }}
                >
                  {portfolioImages.map((image, idx) => (
                    <div 
                      key={idx} 
                      className="flex-shrink-0 mx-1 cursor-pointer"
                      onClick={() => {
                        // Navigate to previous or next slide on click
                        const newIndex = idx > activeIndex 
                          ? Math.min(activeIndex + 1, portfolioImages.length - 1)
                          : Math.max(activeIndex - 1, 0);
                        setActiveIndex(newIndex);
                      }}
                    >
                      <div className="w-[220px] h-[300px] overflow-hidden rounded-lg">
                        <img 
                          src={image} 
                          alt={`Featured project ${idx + 1}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Touch swipe handling */}
              <div 
                className="absolute inset-0 z-20"
                onTouchStart={(e) => {
                  const touchStartX = e.touches[0].clientX;
                  
                  const handleTouchEnd = (e: TouchEvent) => {
                    const touchEndX = e.changedTouches[0].clientX;
                    const diffX = touchEndX - touchStartX;
                    
                    // Detect swipe direction and navigate
                    if (Math.abs(diffX) > 50) { // Minimum swipe distance
                      if (diffX > 0) {
                        // Swiped right - go to previous
                        setActiveIndex(prev => Math.max(0, prev - 1));
                      } else {
                        // Swiped left - go to next
                        setActiveIndex(prev => Math.min(portfolioImages.length - 1, prev + 1));
                      }
                    }
                    
                    // Remove event listener
                    document.removeEventListener('touchend', handleTouchEnd);
                  };
                  
                  // Add touch end event listener
                  document.addEventListener('touchend', handleTouchEnd);
                }}
              ></div>
              
              {/* Indicator dots */}
              <div className="flex justify-center items-center mt-4 mb-4">
                {portfolioImages.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2.5 h-2.5 mx-1.5 rounded-full border border-black ${index === activeIndex ? 'bg-black' : 'bg-white'} cursor-pointer`}
                    onClick={() => setActiveIndex(index)}
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
                  <div key={idx} className={`${category.isTitle ? 'w-1/2' : 'w-full'} ${category.name === "CONTACT" ? 'mt-[-32px]' : ''} mb-5 pr-4`}>
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
                  {/* Left image - all images aligned in straight line */}
                  <div 
                    className="absolute w-[350px] h-[400px] overflow-hidden" 
                    style={{ 
                      left: '44px', 
                      bottom: '80px',
                    }}
                  >
                    <img 
                      src={portfolioImages[0]} 
                      alt="Featured project 1" 
                      className="w-full h-full object-contain"
                      style={{
                        objectPosition: "center"
                      }}
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Middle image - same height and position as others */}
                  <div 
                    className="absolute w-[350px] h-[400px] overflow-hidden" 
                    style={{ 
                      left: 'calc(50% - 175px)', 
                      bottom: '80px',
                    }}
                  >
                    <img 
                      src={portfolioImages[1]} 
                      alt="Featured project 2" 
                      className="w-full h-full object-contain"
                      style={{
                        objectPosition: "center"
                      }}
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Right image - same height and position as others */}
                  <div 
                    className="absolute w-[350px] h-[400px] overflow-hidden" 
                    style={{ 
                      right: '44px', 
                      bottom: '80px',
                    }}
                  >
                    <img 
                      src={portfolioImages[2]}
                      alt="Featured project 3" 
                      className="w-full h-full object-contain"
                      style={{
                        objectPosition: "center"
                      }}
                      loading="lazy"
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