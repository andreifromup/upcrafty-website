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
  
  // Allow scrolling on the body
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    
    // Clean up
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);
  
  return (
    <div className="bg-white text-black font-['Inter'] font-normal antialiased min-h-screen overflow-auto">
      {/* Top Navigation */}
      <Navbar 
        onDropdownOpen={() => setIsDropdownOpen(true)}
        onDropdownClose={() => setIsDropdownOpen(false)}
      />
      
      {/* Content area - centered with padding */}
      <div className="container mx-auto px-4 py-12 pt-24 md:pt-32">
        {/* Page Title */}
        <h1 className="text-4xl font-medium mb-8 text-center">About Us</h1>
        
        {/* Video Section - not full screen */}
        <div className="w-full max-w-3xl mx-auto mb-12 rounded-lg overflow-hidden shadow-lg">
          <AboutVideo className="aspect-video" />
        </div>
        
        {/* Home Button */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <Button 
              className="bg-black hover:bg-white text-white hover:text-black border border-black rounded-full uppercase font-normal
              tracking-[2px] text-[14px] leading-[20px] h-[40px] w-[120px] transition-colors duration-300"
            >
              Home
            </Button>
          </Link>
        </div>
        
        {/* Text Content - Lorem Ipsum placeholder with proper styling */}
        <div className="prose prose-lg text-black max-w-3xl mx-auto mb-12">
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
          <p className="mb-4">
            Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis 
            at tellus. Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. 
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, 
            auctor sit amet aliquam vel, ullamcorper sit amet ligula.
          </p>
          <p className="mb-4">
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec rutrum congue leo eget malesuada. 
            Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada. Cras ultricies ligula 
            sed magna dictum porta.
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
  );
};

export default About;