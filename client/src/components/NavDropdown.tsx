import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample data structure for navigation categories
interface NavCategory {
  name: string;
  subcategories: { name: string; items: string[] }[];
}

// Sample data for portfolio images
const portfolioImages = [
  "/IMG_1818.png",
  "/IMG_1819.png",
  // Add more portfolio images here
];

// Sample navigation categories and items
const navCategories: NavCategory[] = [
  {
    name: "ANIMATION",
    subcategories: [
      { 
        name: "3D MOTION GRAPHICS", 
        items: ["Creative", "Corporate"] 
      },
      { 
        name: "2D MOTION GRAPHICS", 
        items: ["Explainer Videos", "Corporate", "Social Media"] 
      },
    ],
  },
  {
    name: "FILM",
    subcategories: [
      { 
        name: "COMMERCIALS", 
        items: ["15s", "30s", "60s"] 
      },
      { 
        name: "DOCUMENTARIES", 
        items: ["Short", "Feature"] 
      },
    ],
  },
  {
    name: "STUDIO",
    subcategories: [
      { 
        name: "PHOTOGRAPHY", 
        items: ["Product", "Portrait"] 
      },
      { 
        name: "SOUND DESIGN", 
        items: ["Music", "SFX"] 
      },
    ],
  },
];

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* Dropdown container that prevents click propagation */}
      <div 
        className={`
          bg-black text-white
          ${isMobile 
            ? 'fixed inset-0 flex flex-col justify-between' 
            : 'absolute top-[81px] left-0 w-[1725px] max-w-full h-[572px] flex'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Layout */}
        {isMobile && (
          <>
            {/* Navigation buttons - stacked vertically */}
            <div className="p-6 flex-1 overflow-y-auto">
              {navCategories.map((category) => (
                <div key={category.name} className="mb-6">
                  <h2 className="text-lg font-medium mb-2">{category.name}</h2>
                  
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.name} className="ml-4 mb-2">
                      <h3 className="text-sm font-medium mb-1">{subcategory.name}</h3>
                      
                      <ul className="ml-4">
                        {subcategory.items.map((item) => (
                          <li key={item} className="text-sm py-1">
                            <a href="#" className="hover:text-[#FF6600]">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Portfolio carousel at the bottom */}
            <div className="p-4 border-t border-gray-800">
              <h3 className="text-sm font-medium mb-2">PORTFOLIO</h3>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {portfolioImages.map((image, index) => (
                    <CarouselItem key={index} className="basis-2/3">
                      <div className="p-1">
                        <img 
                          src={image} 
                          alt={`Portfolio item ${index + 1}`} 
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-2">
                  <CarouselPrevious className="relative static mx-1" />
                  <CarouselNext className="relative static mx-1" />
                </div>
              </Carousel>
            </div>
          </>
        )}
        
        {/* Desktop Layout */}
        {!isMobile && (
          <>
            {/* Left side - navigation categories */}
            <div className="w-2/3 p-10 flex flex-wrap">
              {navCategories.map((category) => (
                <div key={category.name} className="w-1/3 mb-8">
                  <h2 className="text-xl font-medium mb-4 text-[#FF6600]">{category.name}</h2>
                  
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.name} className="mb-4">
                      <h3 className="text-base font-medium mb-2">{subcategory.name}</h3>
                      
                      <ul>
                        {subcategory.items.map((item) => (
                          <li key={item} className="text-sm py-1">
                            <a href="#" className="hover:text-[#FF6600] transition-colors">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Right side - portfolio images */}
            <div className="w-1/3 p-10">
              <h3 className="text-xl font-medium mb-6 text-[#FF6600]">PORTFOLIO</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {portfolioImages.slice(0, 3).map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Portfolio item ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-white hover:text-[#FF6600]"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NavDropdown;