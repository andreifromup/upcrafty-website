import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { NAV_CATEGORIES, PORTFOLIO_IMAGES } from "@/assets/constants";

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Dropdown container that prevents click propagation */}
      <div 
        className={`
          bg-white text-black overflow-hidden
          ${isMobile 
            ? 'fixed inset-0 flex flex-col' 
            : 'absolute top-[81px] left-0 w-full max-w-[1725px] h-[572px] flex mx-auto right-0'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Layout */}
        {isMobile && (
          <>
            {/* Navigation buttons - stacked vertically */}
            <div className="p-6 flex-1 overflow-y-auto">
              {NAV_CATEGORIES.map((category, idx) => (
                <div key={idx} className="mb-6">
                  <a 
                    href="#" 
                    className="text-[16px] font-medium uppercase tracking-wider block py-2 hover:text-[#FF6600]"
                  >
                    {category.name}
                  </a>
                  
                  {category.subcategories.length > 0 && (
                    <div className="ml-4 mt-2">
                      {category.subcategories.map((subcategory, subIdx) => (
                        <a 
                          key={subIdx} 
                          href="#" 
                          className="text-[14px] block py-1.5 hover:text-[#FF6600]"
                        >
                          {subcategory.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Portfolio carousel at the bottom */}
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-[14px] font-medium mb-3 uppercase">PORTFOLIO</h3>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {PORTFOLIO_IMAGES.default.map((image, idx) => (
                    <CarouselItem key={idx} className="basis-4/5">
                      <div className="p-1">
                        <img 
                          src={image} 
                          alt={`Portfolio item ${idx + 1}`} 
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="mx-2 p-2 rounded-full border border-black hover:bg-gray-100 static" />
                  <CarouselNext className="mx-2 p-2 rounded-full border border-black hover:bg-gray-100 static" />
                </div>
              </Carousel>
            </div>
          </>
        )}
        
        {/* Desktop Layout */}
        {!isMobile && (
          <div className="flex h-full">
            {/* Left side - navigation categories */}
            <div className="w-1/2 p-12 overflow-y-auto flex flex-wrap content-start">
              {NAV_CATEGORIES.map((category, idx) => (
                <div key={idx} className="w-1/3 mb-8">
                  <a 
                    href="#" 
                    className="text-[16px] font-medium uppercase tracking-wider block mb-4 hover:text-[#FF6600]"
                  >
                    {category.name}
                  </a>
                  
                  {category.subcategories.length > 0 && (
                    <div>
                      {category.subcategories.map((subcategory, subIdx) => (
                        <a 
                          key={subIdx} 
                          href="#" 
                          className="text-[14px] block py-1 hover:text-[#FF6600]"
                        >
                          {subcategory.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Right side - portfolio images */}
            <div className="w-1/2 p-12 bg-gray-50 flex flex-col">
              <h3 className="text-[16px] font-medium mb-6 uppercase">FEATURED PROJECTS</h3>
              
              <div className="grid grid-cols-3 gap-6 flex-1">
                {PORTFOLIO_IMAGES.default.map((image, idx) => (
                  <div key={idx} className="overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Portfolio item ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Close button */}
        <button 
          className="absolute top-6 right-6 text-black hover:text-[#FF6600]"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default NavDropdown;