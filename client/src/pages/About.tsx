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
          
          {/* Text Content with modern design elements */}
          <div className="text-black mb-8 text-left">
            {/* Section: Who We Are */}
            <div className="mb-12 relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#FF6600] to-transparent"></div>
              
              <h3 className="text-3xl font-medium mb-6 text-left pl-6">
                <span className="text-[#FF6600]">01.</span> Who We Are
              </h3>
              
              <div className="pl-6">
                <div className="mb-8 max-w-3xl">
                  <p className="text-lg md:text-xl mb-6 leading-relaxed">
                    <span className="font-medium text-black">We're Upcrafty</span>, a creative studio formed by a team of five professionals — each specialized in their own area:
                    <span className="text-[#FF6600]"> illustration & animation, 3D design, game development, web development, </span>
                    and <span className="text-[#FF6600]">sound design</span>.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#FF6600] rounded-lg flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium">Collaborative Process</h4>
                    </div>
                    <p className="text-gray-700">
                      We work closely together on every project. While each of us has a clear role, we often collaborate across disciplines 
                      to bring the best ideas to life.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#FF6600] rounded-lg flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium">Extensive Experience</h4>
                    </div>
                    <p className="text-gray-700">
                      Our brand has been active for the past 3 years, but our combined experience spans over 6 to 15+ years.
                    </p>
                  </div>
                </div>
                
                <div className="text-sm uppercase tracking-wider mb-0 text-center md:text-left">
                  <span className="inline-block bg-black text-white px-4 py-1">Our Philosophy</span>
                </div>
                <p className="text-lg border-l-4 border-[#FF6600] pl-4 py-2 italic bg-gray-50">
                  Upcrafty was born out of shared passion and strong creative alignment — a team built around trust, skill, and a common vision.
                </p>
              </div>
            </div>
            
            {/* Section: What We Do */}
            <div className="mb-12 relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#FF6600] to-transparent"></div>
              
              <h3 className="text-3xl font-medium mb-6 text-left pl-6">
                <span className="text-[#FF6600]">02.</span> What We Do
              </h3>
              
              <div className="pl-6">
                <div className="mb-8 max-w-3xl">
                  <p className="text-lg mb-8">
                    We offer both <span className="font-medium">individual services</span> and <span className="font-medium">complete creative solutions</span>.
                    Whether it's a game, mobile app, website, or brand — we can handle the entire journey, from concept to launch.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-2 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
                  <div className="absolute -right-2 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>
                  
                  <div className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory gap-4">
                    <div className="min-w-[280px] max-w-[280px] bg-white p-5 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] snap-start flex-shrink-0 border border-gray-100 hover:border-[#FF6600] transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-[#FF6600]/10 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6600" className="w-6 h-6">
                          <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 1 5.337 15c.355 0 .676.186.959.401.29.221.634.349 1.003.349 1.036 0 1.875-1.007 1.875-2.25S8.335 11.25 7.299 11.25c-.369 0-.713.128-1.003.349-.283.215-.604.401-.959.401a.656.656 0 0 1-.658-.663 47.703 47.703 0 0 1 .31-4.82.75.75 0 0 1 .64-.643c1.898-.328 3.827-.588 5.775-.772a.581.581 0 0 1 .857.662Z" />
                        </svg>
                      </div>
                      <div className="font-medium text-xl mb-2">Full Project Packages</div>
                      <div className="text-gray-600">Games, apps, brands, NFT/crypto projects</div>
                    </div>
                    
                    <div className="min-w-[280px] max-w-[280px] bg-white p-5 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] snap-start flex-shrink-0 border border-gray-100 hover:border-[#FF6600] transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-[#FF6600]/10 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6600" className="w-6 h-6">
                          <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="font-medium text-xl mb-2">Illustration & Design</div>
                      <div className="text-gray-600">Animation, UI/UX design</div>
                    </div>
                    
                    <div className="min-w-[280px] max-w-[280px] bg-white p-5 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] snap-start flex-shrink-0 border border-gray-100 hover:border-[#FF6600] transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-[#FF6600]/10 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6600" className="w-6 h-6">
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </div>
                      <div className="font-medium text-xl mb-2">3D Modeling</div>
                      <div className="text-gray-600">Character and environment modeling</div>
                    </div>
                    
                    <div className="min-w-[280px] max-w-[280px] bg-white p-5 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] snap-start flex-shrink-0 border border-gray-100 hover:border-[#FF6600] transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-[#FF6600]/10 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6600" className="w-6 h-6">
                          <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="font-medium text-xl mb-2">Development</div>
                      <div className="text-gray-600">Game development, web development</div>
                    </div>
                    
                    <div className="min-w-[280px] max-w-[280px] bg-white p-5 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] snap-start flex-shrink-0 border border-gray-100 hover:border-[#FF6600] transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-[#FF6600]/10 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6600" className="w-6 h-6">
                          <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                          <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                        </svg>
                      </div>
                      <div className="font-medium text-xl mb-2">Sound Design</div>
                      <div className="text-gray-600">Audio production and sound engineering</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section: What Sets Us Apart */}
            <div className="mb-12 relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#FF6600] to-transparent"></div>
              
              <h3 className="text-3xl font-medium mb-6 text-left pl-6">
                <span className="text-[#FF6600]">03.</span> What Sets Us Apart
              </h3>
              
              <div className="pl-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  <div className="group bg-white border border-gray-100 p-5 rounded-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:border-[#FF6600]/40">
                    <div className="flex mb-2 items-center">
                      <div className="bg-[#FF6600] w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium">01</div>
                      <h4 className="font-medium text-lg ml-3">Full Creative Team</h4>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600">A comprehensive team that covers all creative areas in-house</p>
                    </div>
                  </div>
                  
                  <div className="group bg-white border border-gray-100 p-5 rounded-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:border-[#FF6600]/40">
                    <div className="flex mb-2 items-center">
                      <div className="bg-[#FF6600] w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium">02</div>
                      <h4 className="font-medium text-lg ml-3">Strong Collaboration</h4>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600">Efficient teamwork that ensures fast delivery on all projects</p>
                    </div>
                  </div>
                  
                  <div className="group bg-white border border-gray-100 p-5 rounded-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:border-[#FF6600]/40">
                    <div className="flex mb-2 items-center">
                      <div className="bg-[#FF6600] w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium">03</div>
                      <h4 className="font-medium text-lg ml-3">Clear Communication</h4>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600">Structured, step-by-step approach throughout every project phase</p>
                    </div>
                  </div>
                  
                  <div className="group bg-white border border-gray-100 p-5 rounded-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:border-[#FF6600]/40">
                    <div className="flex mb-2 items-center">
                      <div className="bg-[#FF6600] w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium">04</div>
                      <h4 className="font-medium text-lg ml-3">Personalized Approach</h4>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600">Custom solutions focused on understanding your unique vision</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black text-white p-6 rounded-lg">
                  <p className="mb-0 flex items-center">
                    <span className="text-[#FF6600] text-xl mr-3">✓</span>
                    <span>We've completed <span className="font-medium text-[#FF6600]">over 50 projects</span> so far, mostly with startups and early-stage teams. 
                    We're now looking to grow alongside more established clients who are ready to take things to the next 
                    level — but we'll always keep space for fresh, meaningful ideas.</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Section: What Drives Us */}
            <div className="mb-6 relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#FF6600] to-transparent"></div>
              
              <h3 className="text-3xl font-medium mb-6 text-left pl-6">
                <span className="text-[#FF6600]">04.</span> What Drives Us
              </h3>
              
              <div className="pl-6">
                <div className="bg-white rounded-xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-8 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#FF6600]/10"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-6">
                      <p className="text-lg leading-relaxed">
                        We're motivated by the challenge of creating something truly great — 
                        <span className="font-medium">not just visually, but in every detail</span>. 
                        We believe that good work comes from clarity, collaboration, and a 
                        genuine interest in the result.
                      </p>
                      
                      <p className="text-lg leading-relaxed">
                        For us, success isn't just about finishing a project. It's about building 
                        something that feels <span className="text-[#FF6600] font-medium">complete, creative, and worth sharing</span>.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-[#FF6600] to-black p-6 rounded-lg text-white">
                      <p className="text-xl font-medium mb-0 text-center">
                        If you're building something exciting, we'd love to be part of it.
                      </p>
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