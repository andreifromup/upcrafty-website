import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";
import { NAV_CATEGORIES, PORTFOLIO_IMAGES, ICONS } from "@/assets/constants";

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      {/* Dropdown container that prevents click propagation */}
      <div 
        className={`
          bg-white text-black overflow-hidden
          ${isMobile 
            ? 'fixed inset-0 flex flex-col w-full' 
            : 'fixed top-0 left-0 w-full h-[572px] flex'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Layout */}
        {isMobile && (
          <>
            <div className="flex flex-col h-full">
              <div className="p-6 pt-20">
                {/* Logo */}
                <div className="flex items-center mb-8">
                  <img 
                    src={ICONS.logoBlack} 
                    alt="Upcrafty Logo" 
                    className="w-[36.6px] h-[39.1px]"
                  />
                </div>

                {/* Navigation buttons - stacked vertically */}
                <div className="overflow-y-auto">
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
              </div>
              
              {/* Portfolio carousel at the bottom */}
              <div className="p-4 mt-auto border-t border-gray-200">
                <h3 className="text-[14px] font-medium mb-3 uppercase">FEATURED PROJECTS</h3>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {PORTFOLIO_IMAGES.default.map((image, idx) => (
                      <CarouselItem key={idx} className="basis-4/5">
                        <div className="p-1">
                          <img 
                            src={image} 
                            alt={`Portfolio item ${idx + 1}`} 
                            className="w-full h-40 object-cover rounded-lg"
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
            </div>
          </>
        )}
        
        {/* Desktop Layout */}
        {!isMobile && (
          <div className="flex h-full w-full">
            {/* Logo and Navigation columns */}
            <div className="w-[45%] p-12 pt-20 overflow-y-auto">
              {/* Logo */}
              <div className="flex items-center mb-8">
                <img 
                  src={ICONS.logoBlack} 
                  alt="Upcrafty Logo" 
                  className="w-[36.6px] h-[39.1px] mr-2"
                />
              </div>

              {/* Menu Categories - arranged in columns */}
              <div className="flex flex-wrap">
                {NAV_CATEGORIES.map((category, idx) => (
                  <div key={idx} className="w-1/2 mb-8 pr-4">
                    <a 
                      href="#" 
                      className="text-[15px] font-normal uppercase tracking-wider block mb-4 hover:text-[#FF6600]"
                    >
                      {category.name}
                    </a>
                    
                    {category.subcategories.length > 0 && (
                      <div>
                        {category.subcategories.map((subcategory, subIdx) => (
                          <a 
                            key={subIdx} 
                            href="#" 
                            className="text-[14px] font-normal block py-1 hover:text-[#FF6600]"
                          >
                            {subcategory.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Social Icons */}
              <div className="flex mt-4 space-x-4">
                <a href="#" className="text-black hover:text-[#FF6600]">
                  <img src={ICONS.x} alt="X" className="w-5 h-5 opacity-70 hover:opacity-100" />
                </a>
                <a href="#" className="text-black hover:text-[#FF6600]">
                  <img src={ICONS.instagram} alt="Instagram" className="w-5 h-5 opacity-70 hover:opacity-100" />
                </a>
                <a href="#" className="text-black hover:text-[#FF6600]">
                  <img src={ICONS.tiktok} alt="TikTok" className="w-5 h-5 opacity-70 hover:opacity-100" />
                </a>
                <a href="#" className="text-black hover:text-[#FF6600]">
                  <img src={ICONS.youtube} alt="YouTube" className="w-5 h-5 opacity-70 hover:opacity-100" />
                </a>
              </div>
            </div>
            
            {/* Right side - portfolio images */}
            <div className="w-[55%] bg-white flex flex-col">
              {/* Portfolio images - arranged as in reference */}
              <div className="flex h-full overflow-hidden">
                {PORTFOLIO_IMAGES.default.map((image, idx) => (
                  <div key={idx} className="flex-1 p-4">
                    <img 
                      src={image} 
                      alt={`Portfolio item ${idx + 1}`} 
                      className="w-full h-full object-cover rounded-lg"
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