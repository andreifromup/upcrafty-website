import React, { useEffect, useState } from "react";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import AboutVideo from "@/components/AboutVideo";
import { ICONS } from "@/assets/constants";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SocialIcons from "@/components/SocialIcons";
import { useIsMobile } from "@/hooks/use-mobile";

const About: React.FC = () => {
  // State to track if dropdown is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white text-black font-['Inter'] font-normal antialiased">
      {/* Main container with scrolling enabled */}
      <div className="flex flex-col min-h-screen">
        {/* Top Navigation */}
        <Navbar 
          onDropdownOpen={() => setIsDropdownOpen(true)}
          onDropdownClose={() => setIsDropdownOpen(false)}
        />
        
        {/* Content area - centered with padding */}
        <div className="flex-grow flex flex-col items-center px-4 py-12 max-w-6xl mx-auto overflow-y-auto">
          {/* Page Title */}
          <h1 className="text-4xl font-medium mb-8 text-center pt-14 md:pt-20">About Us</h1>
          
          {/* Video Section - not full screen */}
          <div className="w-full max-w-3xl mb-12 rounded-lg overflow-hidden shadow-lg">
            <AboutVideo className="aspect-video" />
          </div>
          
          {/* Home Button */}
          <Link to="/">
            <Button 
              className="mb-8 bg-black hover:bg-white text-white hover:text-black border border-black rounded-full uppercase font-normal
              tracking-[2px] text-[14px] leading-[20px] h-[40px] w-[120px] transition-colors duration-300"
            >
              Home
            </Button>
          </Link>
          
          {/* Text Content - Lorem Ipsum placeholder with proper styling */}
          <div className="prose prose-lg text-black max-w-3xl mb-12">
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget urna ultricies ultricies. 
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, 
              auctor sit amet aliquam vel, ullamcorper sit amet ligula.
            </p>
            <p className="mb-4">
              Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur non nulla sit amet nisl 
              tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui 
              posuere blandit. Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta.
            </p>
            <p className="mb-4">
              Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque 
              nec, egestas non nisi. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla porttitor 
              accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae. 
              Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
            </p>
          </div>
        </div>
        
        {/* Center Black Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src={ICONS.blackCenterLogo} 
            alt="Logo" 
            className="w-[38px] h-[38px]"
          />
        </div>
        
        {/* Social Icons - Bottom Right - Only on desktop and when dropdown is closed */}
        {!isDropdownOpen && !isMobile && (
          <div className="fixed right-[54px] bottom-[40px] z-[60]">
            <SocialIcons inverted={false} />
          </div>
        )}
        
        {/* Bottom Footer - Hidden when dropdown is open with black text */}
        <Footer isDropdownOpen={isDropdownOpen} textColor="text-black" useDarkLogo={true} />
      </div>
    </div>
  );
};

export default About;