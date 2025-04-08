import React from "react";
import { CLIENT_LOGOS } from "@/assets/constants";
import { useIsMobile } from "@/hooks/use-mobile";

interface ClientLogoCarouselProps {
  className?: string;
}

const ClientLogoCarousel: React.FC<ClientLogoCarouselProps> = ({ className = "" }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-start">
        <h2 className="text-left font-bold text-lg md:text-xl mb-1 text-gray-700 tracking-wide">
          Trusted by
        </h2>
      </div>
      
      {/* Carousel container with fade mask */}
      <div 
        className="relative w-full overflow-hidden logo-carousel-container"
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
        
        {/* Animation container with CSS animation */}
        <div className="pt-2 pb-6 overflow-hidden">
          {/* Animated content - uses CSS animation for smooth scrolling */}
          <div className="logo-carousel-animation">
            {/* For true infinite scroll, we need to duplicate the logo set */}
            {/* This technique creates a seamless loop by duplicating the items and only animating half the width */}
            {[...Array(4)].map((_, setIndex) => (
              <div className="flex logo-set" key={`set-${setIndex}`}>
                {CLIENT_LOGOS.map((logo, logoIndex) => (
                  <div 
                    key={`logo-${setIndex}-${logoIndex}`}
                    className="logo-item flex-shrink-0 mx-4 md:mx-8 transition-transform duration-300 hover:scale-110"
                    style={{ 
                      width: isMobile ? '100px' : '160px',
                      height: isMobile ? '80px' : '120px'
                    }}
                  >
                    <img 
                      src={logo} 
                      alt={`Client logo ${logoIndex + 1}`}
                      className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogoCarousel;