import React, { useEffect, useState } from "react";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

const About: React.FC = () => {
  // State to track if dropdown is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Set overflow hidden on body to prevent scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  
  return (
    <div className="bg-white text-black font-['Inter'] font-normal antialiased">
      {/* Main container - Fixed dimensions with symmetric spacing */}
      <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col h-full z-10 overflow-hidden">
        {/* Top Navigation */}
        <Navbar 
          onDropdownOpen={() => setIsDropdownOpen(true)}
          onDropdownClose={() => setIsDropdownOpen(false)}
        />
        
        {/* Content area */}
        <div className="flex-grow flex items-center justify-center">
          <div className="text-3xl text-black font-medium">About Us</div>
        </div>
        
        {/* Bottom Footer - Hidden when dropdown is open */}
        <Footer isDropdownOpen={isDropdownOpen} />
      </div>
    </div>
  );
};

export default About;