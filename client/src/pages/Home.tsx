import React, { useEffect, useState } from "react";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import VideoBackground from "@/components/VideoBackground";

const Home: React.FC = () => {
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
    <div className="bg-black text-white font-['Inter'] font-normal antialiased">
      {/* Video Background with blur effect when dropdown is open */}
      <VideoBackground blur={isDropdownOpen} />
      
      {/* Main container - Fixed dimensions with symmetric spacing */}
      <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col h-full z-10 overflow-hidden">
        {/* Top Navigation */}
        <Navbar 
          onDropdownOpen={() => setIsDropdownOpen(true)}
          onDropdownClose={() => setIsDropdownOpen(false)}
        />
        
        {/* Spacer to push footer to bottom */}
        <div className="flex-grow"></div>
        
        {/* Bottom Footer - Hidden when dropdown is open */}
        <Footer isDropdownOpen={isDropdownOpen} />
      </div>
    </div>
  );
};

export default Home;
