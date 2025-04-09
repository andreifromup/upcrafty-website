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
          
          {/* Text Content with modern, clean design */}
          <div className="text-black mb-8 text-left">
            {/* Section: Who We Are */}
            <section className="mb-16">
              <h3 className="text-2xl md:text-3xl font-medium mb-8 flex items-center">
                <span className="text-gray-300 font-medium text-xl mr-3">01</span>
                Who We Are
              </h3>
              
              <div className="space-y-8">
                <p className="text-lg leading-relaxed max-w-3xl">
                  We're <span className="font-medium">Upcrafty</span>, a creative studio formed by a team of five professionals — each specialized in their own area:
                  illustration & animation, 3D design, game development, web development, and sound design.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group bg-white p-6 rounded-xl border-t border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <h4 className="text-lg font-medium mb-3 flex items-center">
                      <div className="bg-black/10 rounded-full p-1.5 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF6600" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </div>
                      <span className="group-hover:text-[#FF6600] transition-colors duration-300">Team Collaboration</span>
                    </h4>
                    <p className="text-gray-700">
                      We work closely together on every project. While each of us has a clear role, we often collaborate across <span className="text-[#FF6600] font-medium">disciplines</span> 
                      to bring the best ideas to life.
                    </p>
                  </div>
                  
                  <div className="group bg-white p-6 rounded-xl border-t border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <h4 className="text-lg font-medium mb-3 flex items-center">
                      <div className="bg-black/10 rounded-full p-1.5 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF6600" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                      <span className="group-hover:text-[#FF6600] transition-colors duration-300">Extensive Experience</span>
                    </h4>
                    <p className="text-gray-700">
                      Our brand has been active for the past 3 years, but our combined experience spans over <span className="text-[#FF6600] font-medium">6 to 15+ years</span> in our respective fields.
                    </p>
                  </div>
                </div>
                
                <div className="text-gray-700 italic border-l-2 border-gray-200 pl-4 py-2">
                  Upcrafty was born out of shared passion and strong creative alignment — a team built around trust, skill, and a common vision.
                </div>
              </div>
            </section>
            
            {/* Section: What We Do */}
            <section className="mb-16">
              <h3 className="text-2xl md:text-3xl font-medium mb-8 flex items-center">
                <span className="text-gray-300 font-medium text-xl mr-3">02</span>
                What We Do
              </h3>
              
              <div className="space-y-8">
                <p className="text-lg leading-relaxed max-w-3xl">
                  We offer both individual services and complete creative solutions.
                  Whether it's a game, mobile app, website, or brand — we can handle the entire journey, from <span className="text-[#FF6600] font-medium">concept to launch</span>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="group bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border-b border-transparent hover:border-b hover:border-[#FF6600]">
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <h4 className="font-medium text-lg mb-2 group-hover:text-[#FF6600] transition-colors duration-300">Project Packages</h4>
                    <p className="text-gray-700 relative z-10">Games, apps, brands, NFT/crypto projects</p>
                  </div>
                  
                  <div className="group bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border-b border-transparent hover:border-b hover:border-[#FF6600]">
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <h4 className="font-medium text-lg mb-2 group-hover:text-[#FF6600] transition-colors duration-300">Illustration & Design</h4>
                    <p className="text-gray-700 relative z-10">Animation, <span className="text-[#FF6600] font-medium">UI/UX design</span></p>
                  </div>
                  
                  <div className="group bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border-b border-transparent hover:border-b hover:border-[#FF6600]">
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <h4 className="font-medium text-lg mb-2 group-hover:text-[#FF6600] transition-colors duration-300">3D Modeling</h4>
                    <p className="text-gray-700 relative z-10">Character and environment modeling</p>
                  </div>
                  
                  <div className="group bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border-b border-transparent hover:border-b hover:border-[#FF6600]">
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <h4 className="font-medium text-lg mb-2 group-hover:text-[#FF6600] transition-colors duration-300">Game Development</h4>
                    <p className="text-gray-700 relative z-10">Complete game design and development</p>
                  </div>
                  
                  <div className="group bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border-b border-transparent hover:border-b hover:border-[#FF6600]">
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <h4 className="font-medium text-lg mb-2 group-hover:text-[#FF6600] transition-colors duration-300">Web Development</h4>
                    <p className="text-gray-700 relative z-10">Responsive websites and web applications</p>
                  </div>
                  
                  <div className="group bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border-b border-transparent hover:border-b hover:border-[#FF6600]">
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <h4 className="font-medium text-lg mb-2 group-hover:text-[#FF6600] transition-colors duration-300">Sound Design</h4>
                    <p className="text-gray-700 relative z-10"><span className="text-[#FF6600] font-medium">Audio production</span> and sound engineering</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Section: What Sets Us Apart */}
            <section className="mb-16">
              <h3 className="text-2xl md:text-3xl font-medium mb-8 flex items-center">
                <span className="text-gray-300 font-medium text-xl mr-3">03</span>
                What Sets Us Apart
              </h3>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group flex gap-4 items-center bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="bg-black text-white w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium transition-transform group-hover:scale-110 duration-300">1</div>
                    <div>
                      <h4 className="font-medium group-hover:text-[#FF6600] transition-colors duration-300">Full Creative Team</h4>
                      <p className="text-gray-700 mt-1">Covers <span className="text-[#FF6600] font-medium">all creative areas</span> in-house</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-4 items-center bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="bg-black text-white w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium transition-transform group-hover:scale-110 duration-300">2</div>
                    <div>
                      <h4 className="font-medium group-hover:text-[#FF6600] transition-colors duration-300">Strong Collaboration</h4>
                      <p className="text-gray-700 mt-1">Ensures <span className="text-[#FF6600] font-medium">fast delivery</span> on projects</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-4 items-center bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="bg-black text-white w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium transition-transform group-hover:scale-110 duration-300">3</div>
                    <div>
                      <h4 className="font-medium group-hover:text-[#FF6600] transition-colors duration-300">Clear Communication</h4>
                      <p className="text-gray-700 mt-1"><span className="text-[#FF6600] font-medium">Step-by-step</span> approach throughout</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-4 items-center bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="bg-black text-white w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium transition-transform group-hover:scale-110 duration-300">4</div>
                    <div>
                      <h4 className="font-medium group-hover:text-[#FF6600] transition-colors duration-300">Personalized Approach</h4>
                      <p className="text-gray-700 mt-1">Understanding your <span className="text-[#FF6600] font-medium">unique vision</span></p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black text-white p-6 rounded-lg">
                  <p className="mb-0 leading-relaxed">
                    We've completed <span className="text-[#FF6600] font-medium">over 50 projects</span> so far, mostly with startups and early-stage teams. 
                    We're now looking to grow alongside more established clients who are ready to take things to the next 
                    level — but we'll always keep space for fresh, meaningful ideas.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Section: What Drives Us */}
            <section className="mb-10">
              <h3 className="text-2xl md:text-3xl font-medium mb-8 flex items-center">
                <span className="text-gray-300 font-medium text-xl mr-3">04</span>
                What Drives Us
              </h3>
              
              <div className="space-y-8">
                <div className="bg-white rounded-lg p-8 shadow-sm border-t border-gray-200">
                  <div className="max-w-3xl mx-auto">
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed">
                        We're motivated by the challenge of creating something truly great — 
                        not just visually, but in <span className="text-[#FF6600] font-medium">every detail</span>. 
                        We believe that good work comes from clarity, collaboration, and a 
                        genuine interest in the result.
                      </p>
                      
                      <p className="text-lg leading-relaxed">
                        For us, success isn't just about finishing a project. It's about building 
                        something that feels complete, creative, and worth sharing.
                      </p>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <div className="bg-black p-6 rounded-lg text-white text-center">
                        <p className="text-xl font-medium mb-0">
                          If you're building something exciting, we'd love to be part of it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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