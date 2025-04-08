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
    // Short delay to ensure element is fully rendered
    const initTimeout = setTimeout(() => {
      if (!innerRef.current || !carouselRef.current) return;
      
      // We need to force a repaint to ensure mobile devices properly initialize
      if (innerRef.current.scrollLeft === 0) {
        innerRef.current.style.display = 'none';
        // Force repaint
        void innerRef.current.offsetHeight;
        innerRef.current.style.display = '';
        innerRef.current.scrollLeft = 1; // Slight offset to avoid flicker
      }
      
      // Get the width of the original logo set
      const getLogoSetWidth = () => {
        const originalSet = innerRef.current?.querySelector('.logo-set');
        return originalSet ? (originalSet as HTMLElement).offsetWidth : 0;
      };
      
      // Get initial set width
      const logoSetWidth = getLogoSetWidth();
      if (!logoSetWidth) return;
      
      // Calculate scrolling speed based on device type and screen size
      const getScrollSpeed = () => {
        // Force stronger speed for mobile to ensure visible scrolling
        if (isMobile) return 1.2;
        
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1920) return 2.0;
        if (screenWidth >= 1440) return 1.8;
        return 1.5;
      };
      
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
      
      // Force a check to ensure mobile animation is running
      if (isMobile) {
        // Double-check animation is running after a short delay
        const checkAnimation = setTimeout(() => {
          if (innerRef.current && innerRef.current.scrollLeft < 10) {
            // Animation might not be working, force restart
            cancelAnimationFrame(animationRef.current);
            innerRef.current.scrollLeft = 1; // Reset position
            animationRef.current = requestAnimationFrame(animate);
          }
        }, 500);
        
        return () => clearTimeout(checkAnimation);
      }
    }, 100); // Short delay for initialization
    
    // Handle window resize to ensure proper scrolling speed
    const handleResize = () => {
      // Reset animation on significant size changes (like rotation)
      cancelAnimationFrame(animationRef.current);
      
      // Small delay to let DOM update
      setTimeout(() => {
        if (!innerRef.current) return;
        
        // Restart animation
        const animate = () => {
          if (!innerRef.current) return;
          
          // Calculate speed for current device using the same logic as initial setup
          const speed = isMobile ? 1.2 : (window.innerWidth >= 1920 ? 2.0 : window.innerWidth >= 1440 ? 1.8 : 1.5);
          innerRef.current.scrollLeft += speed;
          
          // Get width for reset point
          const set = innerRef.current.querySelector('.logo-set') as HTMLElement;
          const width = set ? set.offsetWidth : 0;
          
          if (width && innerRef.current.scrollLeft >= width) {
            innerRef.current.scrollLeft -= width;
          }
          
          animationRef.current = requestAnimationFrame(animate);
        };
        
        animationRef.current = requestAnimationFrame(animate);
      }, 150);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Clean up on unmount
    return () => {
      clearTimeout(initTimeout);
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
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