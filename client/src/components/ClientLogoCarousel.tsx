import React, { useEffect, useRef, useState } from "react";
import { CLIENT_LOGOS } from "@/assets/constants";
import { useIsMobile } from "@/hooks/use-mobile";

interface ClientLogoCarouselProps {
  className?: string;
}

const ClientLogoCarousel: React.FC<ClientLogoCarouselProps> = ({ className = "" }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isMobile = useIsMobile();
  const [duplicatesCount, setDuplicatesCount] = useState(2); // Default to 2 duplicate sets

  // Setup seamless infinite scrolling carousel
  useEffect(() => {
    if (!innerRef.current || !carouselRef.current) return;
    
    // Calculate scrolling speed based on device type and screen size
    const getScrollSpeed = () => {
      if (isMobile) return 0.5;
      
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1920) return 1.2;
      if (screenWidth >= 1440) return 1;
      return 0.8;
    };
    
    // Set starting position slightly offset from 0 to avoid initial flicker
    if (innerRef.current.scrollLeft === 0) {
      innerRef.current.scrollLeft = 1;
    }
    
    // Get the width of the original logo set
    const getLogoSetWidth = () => {
      const originalSet = innerRef.current?.querySelector('.logo-set');
      return originalSet ? (originalSet as HTMLElement).offsetWidth : 0;
    };
    
    // Get initial set width
    const logoSetWidth = getLogoSetWidth();
    if (!logoSetWidth) return;
    
    const scrollSpeed = getScrollSpeed();
    
    // Animation function for smooth scrolling
    const animate = () => {
      if (!innerRef.current) return;
      
      // Increment the scroll position by the calculated speed
      innerRef.current.scrollLeft += scrollSpeed;
      
      // When we reach the end of the first set, reset position to create seamless loop
      if (innerRef.current.scrollLeft >= logoSetWidth) {
        // This is the critical part for seamless scrolling:
        // We subtract exactly one set width so visually nothing changes
        // but we're now looking at the duplicate set instead of the original
        innerRef.current.scrollLeft -= logoSetWidth;
      }
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);
    
    // Handle window resize to ensure proper scrolling speed
    const handleResize = () => {
      // No need to do anything complex here, just let it continue scrolling
      // The scroll speed will adapt based on the device type
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-start">
        <h2 className="text-left font-bold text-lg md:text-xl mb-1 text-gray-700 tracking-wide">
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
          className="flex overflow-x-scroll scrollbar-hide pt-2 pb-6"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'auto'
          }}
        >
          {/* Original logo set */}
          <div className="logo-set flex">
            {CLIENT_LOGOS.map((logo, index) => (
              <div 
                key={`original-${index}`}
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
          
          {/* First duplicate set */}
          <div className="logo-set flex">
            {CLIENT_LOGOS.map((logo, index) => (
              <div 
                key={`duplicate-1-${index}`}
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
          
          {/* Second duplicate set for extra safety */}
          <div className="logo-set flex">
            {CLIENT_LOGOS.map((logo, index) => (
              <div 
                key={`duplicate-2-${index}`}
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
    </div>
  );
};

export default ClientLogoCarousel;