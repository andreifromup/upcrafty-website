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
      {/* Blur overlay when dropdown is open */}
      {isDropdownOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"></div>
      )}
      
      {/* Fixed Top Navigation */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-white">
        <Navbar 
          onDropdownOpen={() => setIsDropdownOpen(true)}
          onDropdownClose={() => setIsDropdownOpen(false)}
        />
      </div>
      
      {/* Scrollable Content Container - Using native scroll */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        {/* Video Section - first element at the top */}
        <div className="w-full max-w-3xl mx-auto mb-4 rounded-lg overflow-hidden shadow-lg">
          <AboutVideo className="aspect-video" />
        </div>
        
        {/* Client Logo Carousel Section */}
        <div className="w-full max-w-3xl mx-auto mb-0">
          <ClientLogoCarousel />
        </div>
        
        {/* Content section with centered title and text */}
        <div className="max-w-3xl mx-auto mb-8 px-1 md:snap-none sm:snap-y sm:snap-mandatory sm:overflow-y-auto">
          {/* Title - center aligned */}
          <h1 className="text-3xl md:text-4xl font-medium mb-6 md:mb-8 text-center">About Us</h1>
          
          {/* Text Content with modern, clean design */}
          <div className="text-black mb-8 text-left">
            {/* Section: Who We Are */}
            <section className="mb-16 snap-start">
              <h3 className="text-xl md:text-3xl font-medium mb-6 md:mb-8 flex items-center">
                <span className="text-gray-500 font-medium text-base md:text-xl mr-3">01</span>
                Who We Are
              </h3>
              
              <div className="space-y-8">
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  We're <span className="font-bold">Upcrafty</span>, a creative studio formed by a team of five professionals — <span className="text-[#FF6600]">each specialized in their own area</span>:
                  illustration & animation, 3D design, game development, web development, and sound design.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group bg-white p-6 rounded-xl border-t border-gray-100 shadow-sm md:hover:shadow-md transition-all duration-300">
                    <h4 className="text-base md:text-lg font-bold mb-3 flex items-center">
                      <div className="bg-[#EDEAE7] rounded-full p-1.5 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF6600" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                      </div>
                      <span className="md:group-hover:text-[#FF6600] transition-colors duration-300">Team Collaboration</span>
                    </h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      <span className="text-[#FF6600]">We work closely together</span> on every project. While each of us has a clear role, we often collaborate across <span className="italic font-normal">disciplines </span>
                      to bring the best ideas to life.
                    </p>
                  </div>
                  
                  <div className="group bg-white p-6 rounded-xl border-t border-gray-100 shadow-sm md:hover:shadow-md transition-all duration-300">
                    <h4 className="text-base md:text-lg font-bold mb-3 flex items-center">
                      <div className="bg-[#EDEAE7] rounded-full p-1.5 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF6600" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                        </svg>
                      </div>
                      <span className="md:group-hover:text-[#FF6600] transition-colors duration-300">Extensive Experience</span>
                    </h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      Our brand has been active for the past 3 years, but our combined experience spans over <span className="text-[#FF6600] font-medium">6 to 15+ years</span> in our respective fields.
                    </p>
                  </div>
                </div>
                
                <div className="text-gray-700 italic border-l-2 border-gray-200 pl-4 py-2">
                  <span className="font-bold text-sm md:text-base">Upcrafty was born out of shared passion and strong creative alignment — a team built around trust, skill, and a common vision.</span>
                </div>
              </div>
            </section>
            
            {/* Section: What We Do */}
            <section className="mb-16 snap-start p-6 rounded-lg bg-[#FAFAFA]">
              <h3 className="text-xl md:text-3xl font-medium mb-6 md:mb-8 flex items-center">
                <span className="text-gray-500 font-medium text-base md:text-xl mr-3">02</span>
                What We Do
              </h3>
              
              <div className="space-y-8">
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  We offer both individual services and complete creative solutions.
                  Whether it's a game, mobile app, website, or brand — we can handle the entire journey, from <span className="text-[#FF6600] font-medium">concept to launch</span>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="group bg-white p-5 rounded-lg shadow-sm md:hover:shadow-md transition-all duration-300">
                    <h4 className="font-bold text-base md:text-lg mb-2 md:group-hover:text-[#FF6600] transition-colors duration-300">Project Packages</h4>
                    <p className="text-gray-700 text-sm md:text-base">Full delivery for games, apps, brands, and NFT/crypto projects – from concept to launch</p>
                  </div>
                  
                  <div className="group bg-white p-5 rounded-lg shadow-sm md:hover:shadow-md transition-all duration-300">
                    <h4 className="font-bold text-base md:text-lg mb-2 md:group-hover:text-[#FF6600] transition-colors duration-300">Illustration, Animation & Design</h4>
                    <p className="text-gray-700 text-sm md:text-base">Branding, illustration, UI/UX, web & visual design, and 2D animation</p>
                  </div>
                  
                  <div className="group bg-white p-5 rounded-lg shadow-sm md:hover:shadow-md transition-all duration-300">
                    <h4 className="font-bold text-base md:text-lg mb-2 md:group-hover:text-[#FF6600] transition-colors duration-300">3D Design</h4>
                    <p className="text-gray-700 text-sm md:text-base">Modeling, rigging, environment & character art, and 3D animation</p>
                  </div>
                  
                  <div className="group bg-white p-5 rounded-lg shadow-sm md:hover:shadow-md transition-all duration-300">
                    <h4 className="font-bold text-base md:text-lg mb-2 md:group-hover:text-[#FF6600] transition-colors duration-300">Game Development</h4>
                    <p className="text-gray-700 text-sm md:text-base">Custom gameplay systems, game logic, and UI integration – specialized in mobile platforms</p>
                  </div>
                  
                  <div className="group bg-white p-5 rounded-lg shadow-sm md:hover:shadow-md transition-all duration-300">
                    <h4 className="font-bold text-base md:text-lg mb-2 md:group-hover:text-[#FF6600] transition-colors duration-300">Web Development</h4>
                    <p className="text-gray-700 text-sm md:text-base">Responsive websites and web apps – design, development, and deployment</p>
                  </div>
                  
                  <div className="group bg-white p-5 rounded-lg shadow-sm md:hover:shadow-md transition-all duration-300">
                    <h4 className="font-bold text-base md:text-lg mb-2 md:group-hover:text-[#FF6600] transition-colors duration-300">Sound Design</h4>
                    <p className="text-gray-700 text-sm md:text-base">Audio production and sound engineering</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Section: What Sets Us Apart */}
            <section className="mb-16 snap-start">
              <h3 className="text-xl md:text-3xl font-medium mb-6 md:mb-8 flex items-center">
                <span className="text-gray-500 font-medium text-base md:text-xl mr-3">03</span>
                What Sets Us Apart
              </h3>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group flex gap-4 items-center bg-white p-5 rounded-lg shadow-sm md:hover:shadow-md transition-all duration-300">
                    <div className="bg-black text-white w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium md:transition-transform md:group-hover:scale-110 duration-300">1</div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg md:group-hover:text-[#FF6600] transition-colors duration-300">Full Creative Team</h4>
                      <p className="text-gray-700 text-sm md:text-base mt-1">Covers <span className="text-[#FF6600] font-medium">all creative areas</span> in-house</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-4 items-center bg-white p-5 rounded-lg shadow-sm md:hover:shadow-md transition-all duration-300">
                    <div className="bg-black text-white w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium md:transition-transform md:group-hover:scale-110 duration-300">2</div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg md:group-hover:text-[#FF6600] transition-colors duration-300">Strong Collaboration</h4>
                      <p className="text-gray-700 text-sm md:text-base mt-1">Ensures <span className="text-[#FF6600] font-medium">fast delivery</span> on projects</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-4 items-center bg-white p-5 rounded-lg shadow-sm md:hover:shadow-md transition-all duration-300">
                    <div className="bg-black text-white w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium md:transition-transform md:group-hover:scale-110 duration-300">3</div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg md:group-hover:text-[#FF6600] transition-colors duration-300">Clear Communication</h4>
                      <p className="text-gray-700 text-sm md:text-base mt-1"><span className="text-[#FF6600] font-medium">Step-by-step</span> approach throughout</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-4 items-center bg-white p-5 rounded-lg shadow-sm md:hover:shadow-md transition-all duration-300">
                    <div className="bg-black text-white w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium md:transition-transform md:group-hover:scale-110 duration-300">4</div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg md:group-hover:text-[#FF6600] transition-colors duration-300">Personalized Approach</h4>
                      <p className="text-gray-700 text-sm md:text-base mt-1">Understanding your <span className="text-[#FF6600] font-medium">unique vision</span></p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black text-white p-6 rounded-lg">
                  <p className="mb-0 text-base md:text-lg leading-relaxed">
                    We've completed <span className="text-[#FF6600] font-medium">over 50 projects</span> so far, mostly with startups and early-stage teams. 
                    We're now looking to grow alongside more established clients who are ready to take things to the next 
                    level — but we'll always keep space for fresh, meaningful ideas.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Section: What Drives Us */}
            <section className="mb-10 snap-start">
              <h3 className="text-xl md:text-3xl font-medium mb-6 md:mb-8 flex items-center">
                <span className="text-gray-500 font-medium text-base md:text-xl mr-3">04</span>
                What Drives Us
              </h3>
              
              <div className="space-y-8">
                <div className="bg-white rounded-lg p-8 shadow-sm border-t border-gray-200">
                  <div className="max-w-3xl mx-auto">
                    <div className="space-y-6">
                      <p className="text-base md:text-lg leading-relaxed">
                        We're motivated by the challenge of creating something truly great — 
                        not just visually, but in <span className="text-[#FF6600] font-medium">every detail</span>. 
                        We believe that good work comes from clarity, collaboration, and a 
                        genuine interest in the result.
                      </p>
                      
                      <p className="text-base md:text-lg leading-relaxed">
                        For us, success isn't just about finishing a project. It's about building 
                        something that feels complete, creative, and worth sharing.
                      </p>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      {isMobile ? (
                        // Mobile version - smaller, cleaner CTA button with press animation
                        <div className="group bg-black p-4 rounded-full text-white text-center cursor-pointer active:bg-white active:text-black active:scale-95 transition-all duration-300" 
                          onClick={() => window.open("https://tally.so/r/m6Pl1P", "_blank", "noopener,noreferrer")}
                          style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}>
                          <p className="text-base font-medium mb-0">
                            Let's talk about your idea
                          </p>
                        </div>
                      ) : (
                        // Desktop version with hover effects
                        <div className="group bg-black p-6 rounded-full text-white text-center cursor-pointer hover:bg-black/90 transition-all duration-300" 
                          onClick={() => window.open("https://tally.so/r/m6Pl1P", "_blank", "noopener,noreferrer")}>
                          <div className="flex items-center justify-center">
                            <p className="text-xl font-medium mb-0 group-hover:scale-[1.02] transition-transform duration-300">
                              If you're building something exciting, we'd love to be part of it
                              <span className="inline-block ml-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                            </p>
                          </div>
                          <p className="text-sm text-gray-300 mt-2 font-semibold">Let's talk about your idea</p>
                        </div>
                      )}
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