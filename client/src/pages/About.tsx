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
          
          {/* Text Content with clean, minimalist design */}
          <div className="text-black mb-8 text-left">
            {/* Section: Who We Are */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <span className="text-gray-300 font-medium text-xl mr-3">01</span>
                <h3 className="text-2xl md:text-3xl font-medium">Who We Are</h3>
              </div>
              
              <div className="mt-6">
                <p className="text-lg mb-10 leading-relaxed max-w-3xl">
                  <span className="font-medium">We're Upcrafty</span>, a creative studio formed by a team of five professionals — each specialized in their own area:
                  illustration & animation, 3D design, game development, web development, and sound design.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="mb-4 w-full flex justify-between items-start">
                      <h4 className="text-lg font-medium">Collaborative Process</h4>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#FF6600]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      We work closely together on every project. While each of us has a clear role, we often <span className="text-[#FF6600] font-medium">collaborate across disciplines</span> 
                      to bring the best ideas to life.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="mb-4 w-full flex justify-between items-start">
                      <h4 className="text-lg font-medium">Extensive Experience</h4>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#FF6600]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Our brand has been active for the past 3 years, but our combined experience spans <span className="text-[#FF6600] font-medium">over 6 to 15+ years</span>.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-8 italic text-lg">
                  <p className="max-w-3xl">
                    Upcrafty was born out of shared passion and strong creative alignment — a team built around trust, skill, and a common vision.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Section: What We Do */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <span className="text-gray-300 font-medium text-xl mr-3">02</span>
                <h3 className="text-2xl md:text-3xl font-medium">What We Do</h3>
              </div>
              
              <div className="mt-6">
                <p className="text-lg mb-10 leading-relaxed">
                  We offer both <span className="font-medium">individual services</span> and <span className="font-medium">complete creative solutions</span>.
                  Whether it's a game, mobile app, website, or brand — we can handle the entire journey, from concept to launch.
                </p>
                
                <div className="relative">
                  <div className="absolute -left-2 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
                  <div className="absolute -right-2 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>
                  
                  <div className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory gap-5">
                    <div className="min-w-[260px] max-w-[260px] bg-white p-5 rounded-lg shadow-sm snap-start flex-shrink-0 border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="font-medium text-lg">Project Packages</div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#FF6600]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-gray-700">Games, apps, brands, <span className="text-[#FF6600] font-medium">NFT/crypto</span> projects</div>
                    </div>
                    
                    <div className="min-w-[260px] max-w-[260px] bg-white p-5 rounded-lg shadow-sm snap-start flex-shrink-0 border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="font-medium text-lg">Illustration & Design</div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#FF6600]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-gray-700">Animation, <span className="text-[#FF6600] font-medium">UI/UX design</span></div>
                    </div>
                    
                    <div className="min-w-[260px] max-w-[260px] bg-white p-5 rounded-lg shadow-sm snap-start flex-shrink-0 border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="font-medium text-lg">3D Modeling</div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#FF6600]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-gray-700"><span className="text-[#FF6600] font-medium">Character</span> and environment modeling</div>
                    </div>
                    
                    <div className="min-w-[260px] max-w-[260px] bg-white p-5 rounded-lg shadow-sm snap-start flex-shrink-0 border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="font-medium text-lg">Development</div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#FF6600]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-gray-700">Game development, <span className="text-[#FF6600] font-medium">web development</span></div>
                    </div>
                    
                    <div className="min-w-[260px] max-w-[260px] bg-white p-5 rounded-lg shadow-sm snap-start flex-shrink-0 border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="font-medium text-lg">Sound Design</div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#FF6600]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-gray-700"><span className="text-[#FF6600] font-medium">Audio production</span> and sound engineering</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section: What Sets Us Apart */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <span className="text-gray-300 font-medium text-xl mr-3">03</span>
                <h3 className="text-2xl md:text-3xl font-medium">What Sets Us Apart</h3>
              </div>
              
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="group flex gap-5 items-start p-5 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="bg-gray-100 w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium text-[#FF6600]">1</div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Full Creative Team</h4>
                      <p className="text-gray-700">A comprehensive team that covers <span className="text-[#FF6600] font-medium">all creative areas</span> in-house</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-5 items-start p-5 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="bg-gray-100 w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium text-[#FF6600]">2</div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Strong Collaboration</h4>
                      <p className="text-gray-700">Efficient teamwork that ensures <span className="text-[#FF6600] font-medium">fast delivery</span> on all projects</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-5 items-start p-5 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="bg-gray-100 w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium text-[#FF6600]">3</div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Clear Communication</h4>
                      <p className="text-gray-700">Structured, <span className="text-[#FF6600] font-medium">step-by-step</span> approach throughout every project phase</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-5 items-start p-5 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="bg-gray-100 w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-medium text-[#FF6600]">4</div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Personalized Approach</h4>
                      <p className="text-gray-700">Custom solutions focused on understanding your <span className="text-[#FF6600] font-medium">unique vision</span></p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black text-white p-6 rounded-lg shadow-md">
                  <p className="mb-0">
                    We've completed <span className="font-medium text-[#FF6600]">over 50 projects</span> so far, mostly with startups and early-stage teams. 
                    We're now looking to grow alongside <span className="font-medium">more established clients</span> who are ready to take things to the next 
                    level — but we'll always keep space for fresh, meaningful ideas.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Section: What Drives Us */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <span className="text-gray-300 font-medium text-xl mr-3">04</span>
                <h3 className="text-2xl md:text-3xl font-medium">What Drives Us</h3>
              </div>
              
              <div className="mt-6">
                <div className="bg-white rounded-lg border border-gray-100 p-8 mb-8 shadow-sm">
                  <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                      <p className="text-lg leading-relaxed mb-4">
                        We're motivated by the challenge of creating something truly great — 
                        not just visually, but in <span className="text-[#FF6600] font-medium">every detail</span>. 
                        We believe that good work comes from <span className="font-medium">clarity, collaboration</span>, and a 
                        genuine interest in the result.
                      </p>
                      
                      <p className="text-lg leading-relaxed">
                        For us, success isn't just about finishing a project. It's about building 
                        something that feels <span className="text-[#FF6600] font-medium">complete, creative, and worth sharing</span>.
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-8">
                      <div className="bg-black p-6 rounded-lg text-white text-center shadow-md">
                        <p className="text-xl font-medium mb-0">
                          If you're building something exciting, we'd love to be part of it.
                        </p>
                      </div>
                    </div>
                  </div>
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