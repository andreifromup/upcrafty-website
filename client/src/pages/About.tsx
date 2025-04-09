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
          
          {/* Text Content with enhanced typography and visual elements */}
          <div className="text-black mb-8 text-left">
            {/* Section: Who We Are */}
            <div className="mb-10">
              <h3 className="text-2xl font-medium mb-5 text-left border-b border-gray-200 pb-2 flex items-center">
                <span className="inline-block w-4 h-4 bg-[#FF6600] rounded-sm mr-3"></span>
                <span>Who We Are</span>
              </h3>
              
              <div className="pl-7">
                <p className="mb-4 leading-relaxed">
                  <span className="font-medium text-black">We're Upcrafty</span>, a creative studio formed by a team of five professionals — each specialized in their own area:
                  <span className="text-[#FF6600] font-medium"> illustration & animation, 3D design, game development, web development, </span>
                  and <span className="text-[#FF6600] font-medium">sound design</span>.
                </p>
                
                <div className="flex gap-6 flex-col md:flex-row mb-6">
                  <div className="flex-1 bg-gray-50 p-4 rounded-md border-l-2 border-gray-200">
                    <p className="mb-0">
                      We work closely together on every project. While each of us has a clear role, we often collaborate across disciplines 
                      to bring the best ideas to life.
                    </p>
                  </div>
                  
                  <div className="flex-1 bg-gray-50 p-4 rounded-md border-l-2 border-gray-200">
                    <p className="mb-0">
                      Our brand has been active for the past 3 years, but our combined experience spans over 6 to 15+ years.
                    </p>
                  </div>
                </div>
                
                <p className="mb-0 italic">
                  Upcrafty was born out of shared passion and strong creative alignment — a team built around trust, skill, and a common vision.
                </p>
              </div>
            </div>
            
            {/* Section: What We Do */}
            <div className="mb-10">
              <h3 className="text-2xl font-medium mb-5 text-left border-b border-gray-200 pb-2 flex items-center">
                <span className="inline-block w-4 h-4 bg-[#FF6600] rounded-sm mr-3"></span>
                <span>What We Do</span>
              </h3>
              
              <div className="pl-7">
                <p className="mb-5 leading-relaxed">
                  We offer both <span className="font-medium">individual services</span> and <span className="font-medium">complete creative solutions</span>.
                  Whether it's a game, mobile app, website, or brand — we can handle the entire journey, from concept to launch.
                </p>
                
                <p className="font-medium text-black mb-4">Our services include:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-md border-b-2 border-[#FF6600] hover:shadow-md transition-shadow duration-300">
                    <div className="font-medium mb-1 text-[#FF6600]">Full Project Packages</div>
                    <div className="text-sm">Games, apps, brands, NFT/crypto projects</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border-b-2 border-[#FF6600] hover:shadow-md transition-shadow duration-300">
                    <div className="font-medium mb-1 text-[#FF6600]">Illustration & Design</div>
                    <div className="text-sm">Animation, UI/UX design</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border-b-2 border-[#FF6600] hover:shadow-md transition-shadow duration-300">
                    <div className="font-medium mb-1 text-[#FF6600]">3D Modeling</div>
                    <div className="text-sm">Character and environment modeling</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border-b-2 border-[#FF6600] hover:shadow-md transition-shadow duration-300">
                    <div className="font-medium mb-1 text-[#FF6600]">Development</div>
                    <div className="text-sm">Game development, web development</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border-b-2 border-[#FF6600] hover:shadow-md transition-shadow duration-300 md:col-span-2">
                    <div className="font-medium mb-1 text-[#FF6600]">Sound Design</div>
                    <div className="text-sm">Audio production and sound engineering</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section: What Sets Us Apart */}
            <div className="mb-10">
              <h3 className="text-2xl font-medium mb-5 text-left border-b border-gray-200 pb-2 flex items-center">
                <span className="inline-block w-4 h-4 bg-[#FF6600] rounded-sm mr-3"></span>
                <span>What Sets Us Apart</span>
              </h3>
              
              <div className="pl-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3 bg-white py-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-gray-50 rounded-full flex items-center justify-center text-[#FF6600] font-medium border border-gray-200">1</div>
                    <div>
                      <p className="m-0 font-medium">A full creative team</p>
                      <p className="m-0 text-sm">Covers all areas in-house</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 bg-white py-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-gray-50 rounded-full flex items-center justify-center text-[#FF6600] font-medium border border-gray-200">2</div>
                    <div>
                      <p className="m-0 font-medium">Strong collaboration</p>
                      <p className="m-0 text-sm">Fast delivery on all projects</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 bg-white py-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-gray-50 rounded-full flex items-center justify-center text-[#FF6600] font-medium border border-gray-200">3</div>
                    <div>
                      <p className="m-0 font-medium">Clear communication</p>
                      <p className="m-0 text-sm">Step-by-step throughout every project</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 bg-white py-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-gray-50 rounded-full flex items-center justify-center text-[#FF6600] font-medium border border-gray-200">4</div>
                    <div>
                      <p className="m-0 font-medium">Personalized approach</p>
                      <p className="m-0 text-sm">Focused on understanding your vision</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border-l-2 border-[#FF6600]">
                  <p className="mb-0">
                    We've completed <span className="font-medium text-[#FF6600]">over 50 projects</span> so far, mostly with startups and early-stage teams. 
                    We're now looking to grow alongside more established clients who are ready to take things to the next 
                    level — but we'll always keep space for fresh, meaningful ideas.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Section: What Drives Us */}
            <div className="mb-6">
              <h3 className="text-2xl font-medium mb-5 text-left border-b border-gray-200 pb-2 flex items-center">
                <span className="inline-block w-4 h-4 bg-[#FF6600] rounded-sm mr-3"></span>
                <span>What Drives Us</span>
              </h3>
              
              <div className="pl-7">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-1">
                    <p className="leading-relaxed">
                      We're motivated by the challenge of creating something truly great — 
                      <span className="font-medium">not just visually, but in every detail</span>. 
                      We believe that good work comes from clarity, collaboration, and a 
                      genuine interest in the result.
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <p className="leading-relaxed">
                      For us, success isn't just about finishing a project. It's about building 
                      something that feels <span className="text-[#FF6600] font-medium">complete, creative, and worth sharing</span>.
                    </p>
                  </div>
                </div>
                
                <div className="bg-black p-6 rounded-md text-white text-center">
                  <p className="text-lg md:text-xl font-medium mb-0">
                    If you're building something exciting, we'd love to be part of it.
                  </p>
                </div>
              </div>
            </div>
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