import React, { useEffect, useState } from "react";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import AboutVideo from "@/components/AboutVideo";
import ClientLogoCarousel from "@/components/ClientLogoCarousel";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const About: React.FC = () => {
  // State to track if dropdown is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Enable scrolling and set appropriate body classes
  useEffect(() => {
    // Add about-page class with smooth scrolling and remove homepage class
    document.body.classList.add('about-page');
    document.body.classList.remove('homepage');
    
    // Let the body be natural height
    document.documentElement.style.height = "auto";
    document.body.style.height = "auto";
    
    // Clean up when component unmounts
    return () => {
      document.body.classList.remove('about-page');
      document.documentElement.style.height = "";
      document.body.style.height = "";
    };
  }, []);
  
  return (
    <div className="bg-white text-black font-['Inter'] font-normal antialiased">
      {/* Fixed Top Navigation */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-white">
        <Navbar 
          onDropdownOpen={() => setIsDropdownOpen(true)}
          onDropdownClose={() => setIsDropdownOpen(false)}
        />
      </div>
      
      {/* Scrollable Content Container - Using native scroll */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Video Section - first element at the top */}
        <div className="w-full max-w-3xl mx-auto mb-8 rounded-lg overflow-hidden shadow-lg">
          <AboutVideo className="aspect-video" />
        </div>
        
        {/* Client Logo Carousel Section */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <ClientLogoCarousel />
        </div>
        
        {/* Content section with left-aligned title and text */}
        <div className="max-w-3xl mx-auto mb-8 px-1">
          {/* Title - left aligned */}
          <h1 className="text-4xl font-medium mb-6 text-left">About Us</h1>
          
          {/* Text Content - left aligned with sections */}
          <div className="prose prose-lg text-black mb-8 text-left">
            <h3 className="text-2xl font-medium mb-3 text-left">Who We Are</h3>
            <p className="mb-4">
              We're Upcrafty, a creative studio formed by a team of five professionals — each specialized in their own area:
              illustration & animation, 3D design, game development, web development, and sound design.
            </p>
            <p className="mb-4">
              We work closely together on every project. While each of us has a clear role, we often collaborate across disciplines 
              to bring the best ideas to life.
            </p>
            <p className="mb-6">
              Our brand has been active for the past 3 years, but our combined experience spans over 6 to 15+ years.
              Upcrafty was born out of shared passion and strong creative alignment — a team built around trust, skill, and a common vision.
            </p>
            
            <h3 className="text-2xl font-medium mb-3 text-left">What We Do</h3>
            <p className="mb-4">
              We offer both individual services and complete creative solutions.
              Whether it's a game, mobile app, website, or brand — we can handle the entire journey, from concept to launch.
            </p>
            <p className="mb-4">Our services include:</p>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>Full project packages (games, apps, brands, NFT/crypto projects)</li>
              <li>Illustration, animation, and UI/UX design</li>
              <li>3D character and environment modeling</li>
              <li>Game development and web development</li>
              <li>Sound design and audio production</li>
            </ul>
            
            <h3 className="text-2xl font-medium mb-3 text-left">What Sets Us Apart</h3>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>A full creative team that covers all areas in-house</li>
              <li>Strong collaboration and fast delivery</li>
              <li>Clear, step-by-step communication throughout every project</li>
              <li>A personalized approach focused on understanding your vision from the start</li>
            </ul>
            <p className="mb-6">
              We've completed over 50 projects so far, mostly with startups and early-stage teams. We're now looking to grow 
              alongside more established clients who are ready to take things to the next level — but we'll always keep space 
              for fresh, meaningful ideas.
            </p>
            
            <h3 className="text-2xl font-medium mb-3 text-left">What Drives Us</h3>
            <p className="mb-4">
              We're motivated by the challenge of creating something truly great — not just visually, but in every detail.
              We believe that good work comes from clarity, collaboration, and a genuine interest in the result.
            </p>
            <p className="mb-4">
              For us, success isn't just about finishing a project. It's about building something that feels complete, 
              creative, and worth sharing.
            </p>
            <p className="mb-4 text-lg md:text-xl font-medium text-black">
              If you're building something exciting, we'd love to be part of it.
            </p>
          </div>
          
          {/* Home Button - moved under the text */}
          <div className="flex justify-start mb-8">
            {isMobile ? (
              // Mobile version matching the Contact button size
              <div 
                className="bg-black text-white border border-black rounded-full uppercase font-normal tracking-[1.5px] text-[12px] leading-[16px] flex items-center justify-center cursor-pointer active:bg-white active:text-black active:scale-95 transition-all duration-300"
                style={{ 
                  width: "90px", 
                  height: "28px",
                  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' 
                }}
                onClick={() => window.open('/', '_self')}
              >
                Home
              </div>
            ) : (
              // Desktop version with normal hover behavior
              <Link to="/">
                <Button 
                  className="bg-black hover:bg-white text-white hover:text-black border border-black active:bg-white active:text-black active:scale-95 rounded-full uppercase font-normal tracking-[2px] text-[14px] leading-[20px] h-[40px] w-[120px] transition-all duration-300"
                >
                  Home
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Footer - Hidden when dropdown is open with black text */}
      <Footer isDropdownOpen={isDropdownOpen} textColor="text-black" useDarkLogo={true} />
    </div>
  );
};

export default About;