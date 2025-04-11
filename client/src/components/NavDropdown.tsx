import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { XIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import SocialIcons from "@/components/SocialIcons";
import { NAV_CATEGORIES, PORTFOLIO_IMAGES } from "@/assets/constants";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState<'image' | 'video'>('image');
  const [activeIndex, setActiveIndex] = useState(0);
  // State to track active item in each carousel
  const [carouselActiveItems, setCarouselActiveItems] = useState<{[key: string]: number}>({}); // Track by subcategory name
  // State for tracking which item is active in each subcategory carousel
  const [imageCarouselActiveIndex, setImageCarouselActiveIndex] = useState(0);
  const [videoCarouselActiveIndex, setVideoCarouselActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Define portfolio images for desktop view
  const portfolioImages = [
    "/transp 1.png",
    "/transp 2.png", 
    "/transp 4.png"
  ];
  
  // Global function to close overlay - accessible from anywhere
  const closeOverlay = () => {
    console.log('CLOSING OVERLAY');
    setShowOverlay(false);
    setSelectedSubcategory(null);
  };
  
  // Handle toggle category expansion
  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategories(prev => {
      // If category is already expanded, remove it from the list
      if (prev.includes(categoryName)) {
        return prev.filter(name => name !== categoryName);
      }
      // If not expanded, close any other expanded categories and add this one
      return [categoryName];
    });
  };

  // Handle subcategory click - now used for image display under categories
  const handleSubcategoryClick = (subcategory: string) => {
    // If the same subcategory is clicked again, close the overlay
    if (selectedSubcategory === subcategory && showOverlay) {
      closeOverlay();
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
  const handleCloseOverlay = (e?: React.SyntheticEvent) => {
    // Prevent any default behavior
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    console.log('Closing overlay');
    setShowOverlay(false);
    setSelectedSubcategory(null);
  };
  
  // Special handler for mobile touch devices
  const handleTouchCloseButton = () => {
    console.log('Touch close button');
    setShowOverlay(false);
    setSelectedSubcategory(null);
  };
  
  // This ensures the overlay can be closed by clicking anywhere on it
  const handleOverlayClick = (e: React.MouseEvent) => {
    console.log('Overlay clicked');
    // Close the overlay when clicking on the background or close button
    const target = e.target as HTMLElement;
    if (target.classList.contains('overlay-background') || 
        target.dataset.closeOverlay === 'true' || 
        target.closest('[data-close-overlay="true"]')) {
      handleCloseOverlay();
    }
  };
  
  // Close dropdown when user presses escape key
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      // If overlay is open, close it first instead of closing the whole dropdown
      if (showOverlay) {
        e.stopPropagation();
        handleCloseOverlay();
      } else {
        onClose();
      }
    }
  }, [onClose, showOverlay]);
  
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
  
  // Special direct effect for closing with the button
  useEffect(() => {
    if (closeButtonRef.current && showOverlay) {
      // Define click handler that directly uses state setter
      const directCloseHandler = () => {
        console.log('Direct close button handler called');
        setShowOverlay(false);
        setSelectedSubcategory(null);
      };
      
      // Add native event listener directly to the DOM node
      closeButtonRef.current.addEventListener('click', directCloseHandler);
      closeButtonRef.current.addEventListener('touchend', directCloseHandler);
      
      // Clean up
      return () => {
        if (closeButtonRef.current) {
          closeButtonRef.current.removeEventListener('click', directCloseHandler);
          closeButtonRef.current.removeEventListener('touchend', directCloseHandler);
        }
      };
    }
  }, [showOverlay, closeButtonRef]);
  
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
            
            {/* Menu Categories - With vertical scrolling when content overflows */}
            <div className="flex-grow overflow-y-auto px-4 mt-4">
              <div className="flex flex-col space-y-0.5">
                {NAV_CATEGORIES.map((category, idx) => (
                  <div key={idx} className="mb-1">
                    {category.isTitle ? (
                      <div className="mb-1">
                        {/* Title category with arrow for expansion */}
                        <div 
                          className="py-2 my-1 rounded-lg flex items-center justify-between bg-[#EDEAE7]/50 cursor-pointer"
                          onClick={() => category.subcategories?.length && toggleCategoryExpansion(category.name)}
                        >
                          <span className="font-medium text-[14px] leading-[18px] tracking-[1px] uppercase px-4 text-black">
                            {category.name}
                          </span>
                          {category.subcategories?.length > 0 && (
                            <div className="pr-3">
                              {expandedCategories.includes(category.name) ? (
                                <ChevronUpIcon className="w-4 h-4 text-black" />
                              ) : (
                                <ChevronDownIcon className="w-4 h-4 text-black" />
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Subcategories and images when expanded */}
                        {expandedCategories.includes(category.name) && category.subcategories && (
                          <div className="mt-2 pl-0 pr-0">
                            {category.subcategories.map((subcategory, subIdx) => (
                              <div key={subIdx} className="mb-12">
                                <div className="mb-2">
                                  <span 
                                    className="font-normal text-[13px] leading-[18px] uppercase block px-4 py-1.5 text-black"
                                  >
                                    {subcategory.name}
                                  </span>
                                </div>
                                
                                {/* Media display for each subcategory */}
                                <div className="pl-0 pr-4 mt-4 pt-2">
                                  {(subcategory.mediaType === 'image' || subcategory.mediaType === 'mixed') && subcategory.items && subcategory.items.length > 0 && (
                                    <>
                                      <Carousel 
                                        className="w-full overflow-visible" 
                                        opts={{ align: "start" }}
                                        onSelect={(index) => setImageCarouselActiveIndex(index)}
                                      >
                                        <CarouselContent className="ml-0 overflow-visible pb-6" style={{ paddingRight: 'min(4rem, 15vw)' }}>
                                          {subcategory.items.map((item, imgIdx) => {
                                            const isActive = imgIdx === imageCarouselActiveIndex;
                                            
                                            // Determine if this is a container that should be blurred (adjacent to active)
                                            const isPartiallyVisible = 
                                              (imgIdx === imageCarouselActiveIndex + 1) || // next container
                                              (imgIdx === imageCarouselActiveIndex - 1);   // previous container
                                            
                                            const isVideo = subcategory.mediaType === 'mixed' && item.endsWith('.mp4');
                                            
                                            return (
                                              <CarouselItem 
                                                key={imgIdx} 
                                                className="pl-0 basis-full"
                                                onClick={() => setImageCarouselActiveIndex(imgIdx)} // Update active index on click
                                              >
                                                <div 
                                                  className="relative overflow-hidden mx-auto"
                                                  style={{
                                                    width: 'min(320px, calc(100% - 16px))',
                                                    height: 'min(300px, 90vw)',
                                                    margin: '6px auto',
                                                    borderRadius: '24px',
                                                    border: '5px solid #FBFBFB',
                                                    boxShadow: '0px 0px 5.5px rgba(0, 0, 0, 0.25)',
                                                    filter: isPartiallyVisible ? 'blur(2px)' : 'none',
                                                    opacity: !isActive && !isPartiallyVisible ? 0.7 : 1
                                                  }}
                                                >
                                                  {isVideo ? (
                                                    <video
                                                      src={item}
                                                      className="w-full h-full object-cover"
                                                      autoPlay
                                                      loop
                                                      muted
                                                      playsInline
                                                    />
                                                  ) : (
                                                    <img 
                                                      src={item} 
                                                      alt={`${subcategory.name} ${imgIdx + 1}`}
                                                      className="w-full h-full object-cover"
                                                    />
                                                  )}
                                                  
                                                  {subcategory.mediaCount > 1 && isActive && (
                                                    <>
                                                      {imgIdx < subcategory.items.length - 1 && (
                                                        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white/30 to-transparent pointer-events-none"></div>
                                                      )}
                                                      {imgIdx > 0 && (
                                                        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white/30 to-transparent pointer-events-none"></div>
                                                      )}
                                                    </>
                                                  )}
                                                </div>
                                              </CarouselItem>
                                            );
                                          })}
                                        </CarouselContent>
                                        {/* Navigation buttons removed as requested */}
                                      </Carousel>
                                    </>
                                  )}
                                  
                                  {subcategory.mediaType === 'video' && subcategory.items && subcategory.items.length > 0 && (
                                    <>
                                      {/* Special handling for 2D ANIMATIONS and MOTION GRAPHICS sections */}
                                      {(subcategory.name === "2D ANIMATIONS" || subcategory.name === "MOTION GRAPHICS") ? (
                                        <div className="w-full">
                                          <div 
                                            className="relative overflow-hidden mx-auto"
                                            style={{
                                              width: "352px",
                                              height: "224px",
                                              margin: '6px auto',
                                              borderRadius: '24px',
                                              border: '5px solid #FBFBFB',
                                              boxShadow: '0px 0px 5.5px rgba(0, 0, 0, 0.25)'
                                            }}
                                          >
                                            <video
                                              src={subcategory.items[0]}
                                              className="w-full h-full object-cover"
                                              autoPlay
                                              loop
                                              muted
                                              playsInline
                                            />
                                          </div>
                                        </div>
                                      ) : (
                                        // Implementation for ENVIRONMENT videos
                                        <Carousel 
                                          className="w-full overflow-visible" 
                                          opts={{ align: "start" }}
                                          onSelect={(index) => setVideoCarouselActiveIndex(index)}
                                        >
                                          <CarouselContent className="ml-0 overflow-visible pb-6" style={{ paddingRight: 'min(4rem, 15vw)' }}>
                                            {subcategory.items.map((item, vidIdx) => {
                                              const isActive = vidIdx === videoCarouselActiveIndex;
                                              
                                              // Determine if this is a container that should be blurred (adjacent to active)
                                              const isPartiallyVisible = 
                                                (vidIdx === videoCarouselActiveIndex + 1) || // next container
                                                (vidIdx === videoCarouselActiveIndex - 1);   // previous container
                                              
                                              return (
                                                <CarouselItem 
                                                  key={vidIdx} 
                                                  className="pl-0 basis-full"
                                                  onClick={() => setVideoCarouselActiveIndex(vidIdx)} // Update active index on click
                                                >
                                                  <div 
                                                    className="relative overflow-hidden mx-auto"
                                                    style={{
                                                      width: 'min(320px, calc(100% - 16px))',
                                                      height: 'min(300px, 90vw)',
                                                      margin: '6px auto',
                                                      borderRadius: '24px',
                                                      border: '5px solid #FBFBFB',
                                                      boxShadow: '0px 0px 5.5px rgba(0, 0, 0, 0.25)',
                                                      filter: isPartiallyVisible ? 'blur(2px)' : 'none',
                                                      opacity: !isActive && !isPartiallyVisible ? 0.7 : 1
                                                    }}
                                                  >
                                                    <video
                                                      src={item}
                                                      className="w-full h-full object-cover"
                                                      autoPlay
                                                      loop
                                                      muted
                                                      playsInline
                                                    />
                                                    
                                                    {subcategory.mediaCount > 1 && isActive && (
                                                      <>
                                                        {vidIdx < subcategory.items.length - 1 && (
                                                          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white/30 to-transparent pointer-events-none"></div>
                                                        )}
                                                        {vidIdx > 0 && (
                                                          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white/30 to-transparent pointer-events-none"></div>
                                                        )}
                                                      </>
                                                    )}
                                                  </div>
                                                </CarouselItem>
                                              );
                                            })}
                                          </CarouselContent>
                                          {/* Navigation buttons removed as requested */}
                                        </Carousel>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a 
                        href={category.name === "ABOUT US" ? "/about" : "#"} 
                        className="uppercase block text-black active:scale-95 transition-all duration-150"
                        onClick={(e) => {
                          try {
                            if (category.name === "CONTACT") {
                              e.preventDefault();
                              window.open("https://tally.so/r/m6Pl1P", "_blank");
                              handleClose();
                            } else if (category.name === "ABOUT US") {
                              // Let the link navigate naturally to /about
                              handleClose();
                            } else {
                              e.preventDefault();
                            }
                          } catch (error) {
                            console.error("Error handling category click:", error);
                          }
                        }}
                      >
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
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Social icons at bottom - center aligned with more space to show shadows */}
            <div className="mt-auto flex justify-center pb-8 pt-2">
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
                            onClick={(e) => {
                              e.preventDefault();
                              handleSubcategoryClick(subcategory.name);
                            }}
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