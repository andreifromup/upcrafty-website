import React, { useEffect, useRef } from "react";
import { CLIENT_LOGOS } from "@/assets/constants";
import { useIsMobile } from "@/hooks/use-mobile";

interface ClientLogoCarouselProps {
  className?: string;
}

const ClientLogoCarousel: React.FC<ClientLogoCarouselProps> = ({ className = "" }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Get count of logos to display at once based on screen width
  const getVisibleLogoCount = (): number => {
    if (typeof window === 'undefined') return 3; 
    if (window.innerWidth < 640) return 2; // Mobile
    if (window.innerWidth < 1024) return 3; // Tablet
    return 4; // Desktop
  };

  // Setup auto-scrolling carousel with infinite loop effect
  useEffect(() => {
    if (!innerRef.current || !carouselRef.current) return;
    
    // First, clone the logos for the infinite scroll effect
    const logoItems = innerRef.current.querySelectorAll('.logo-item');
    if (!logoItems.length) return;
    
    // Clone each logo to create the infinite loop illusion
    const clonedItems = Array.from(logoItems).map(item => item.cloneNode(true));
    clonedItems.forEach(item => {
      innerRef.current?.appendChild(item);
    });
    
    // Now set up the animation
    const scrollSpeed = 1; // pixels per frame
    const animate = () => {
      if (!innerRef.current || !carouselRef.current) return;
      
      // If we've scrolled the full width of the original set of logos, reset position
      if (innerRef.current.scrollLeft >= logoItems.length * logoItems[0].clientWidth) {
        innerRef.current.scrollLeft = 0;
      } else {
        innerRef.current.scrollLeft += scrollSpeed;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start and manage the animation
    const animationRef = { current: 0 };
    animationRef.current = requestAnimationFrame(animate);
    
    // Clean up animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-end">
        <h2 className="text-left font-bold text-lg md:text-xl mb-3 text-gray-700 tracking-wide">
          Trusted by
        </h2>
      </div>
      
      {/* Carousel container with fade mask */}
      <div 
        ref={carouselRef}
        className="relative w-full overflow-hidden"
        style={{ 
          maxWidth: '100%'
        }}
      >
        {/* Left fade mask */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-[60px] md:w-[100px] z-10"
          style={{ 
            background: 'linear-gradient(to right, white 20%, transparent 100%)'
          }}
        />
        
        {/* Right fade mask */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[60px] md:w-[100px] z-10"
          style={{ 
            background: 'linear-gradient(to left, white 20%, transparent 100%)'
          }}
        />
        
        {/* Scrolling content container */}
        <div 
          ref={innerRef}
          className="flex overflow-x-scroll scrollbar-hide py-6"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Logo items */}
          {CLIENT_LOGOS.map((logo, index) => (
            <div 
              key={index}
              className="logo-item flex-shrink-0 mx-4 md:mx-8 transition-transform duration-300 hover:scale-110"
              style={{ 
                width: isMobile ? '100px' : '160px',
                height: isMobile ? '80px' : '120px'
              }}
            >
              <img 
                src={logo} 
                alt={`Client logo ${index + 1}`}
                className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogoCarousel;