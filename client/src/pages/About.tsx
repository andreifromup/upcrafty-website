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
          
          {/* Text Content with elegant, clean, modern design */}
          <div className="text-black mb-8 text-left">
            {/* WHO WE ARE */}
            <section className="mb-24">
              {/* Section header with accent line and number */}
              <div className="flex items-center mb-10">
                <div className="bg-[#FF6600] h-[3px] w-8 mr-4"></div>
                <h3 className="text-3xl md:text-4xl font-medium">Who We Are</h3>
                <span className="ml-auto text-gray-200 font-medium">01</span>
              </div>
              
              <div className="mt-10">
                {/* Introduction with bold company name */}
                <h4 className="text-2xl md:text-3xl mb-6 font-medium">
                  We're <span className="text-[#FF6600]">Upcrafty</span>.
                </h4>
                
                <p className="text-lg mb-12 leading-relaxed max-w-3xl">
                  A creative studio formed by a team of five professionals — each specialized in their own area.
                  We bring together expertise in illustration, animation, 3D design, game development, web development, 
                  and sound design to create comprehensive solutions for our clients.
                </p>
                
                {/* Key features in card format */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {/* Team collaboration card */}
                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-[#FF6600]">
                    <h4 className="text-xl font-medium mb-4 flex items-center">
                      <span className="w-2 h-2 bg-[#FF6600] rounded-full mr-2"></span>
                      Collaborative Process
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      We work closely together on every project. Each team member brings their unique expertise, 
                      but we collaborate across disciplines to elevate the final result.
                    </p>
                  </div>
                  
                  {/* Experience card */}
                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-[#FF6600]">
                    <h4 className="text-xl font-medium mb-4 flex items-center">
                      <span className="w-2 h-2 bg-[#FF6600] rounded-full mr-2"></span>
                      Extensive Experience
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      While Upcrafty has been active for 3 years, our combined professional experience spans over 6 to 15+ years 
                      across various creative fields.
                    </p>
                  </div>
                </div>
                
                {/* Company philosophy */}
                <div className="bg-black p-8 rounded-xl text-white">
                  <p className="text-lg italic mb-0 leading-relaxed">
                    "Upcrafty was born out of shared passion and strong creative alignment — a team built around 
                    trust, skill, and a common vision."
                  </p>
                </div>
              </div>
            </section>
            
            {/* WHAT WE DO */}
            <section className="mb-24">
              {/* Section header with accent line and number */}
              <div className="flex items-center mb-10">
                <div className="bg-[#FF6600] h-[3px] w-8 mr-4"></div>
                <h3 className="text-3xl md:text-4xl font-medium">What We Do</h3>
                <span className="ml-auto text-gray-200 font-medium">02</span>
              </div>
              
              <div className="mt-10">
                <p className="text-lg mb-10 leading-relaxed bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#FF6600]">
                  We offer both <span className="font-medium">individual services</span> and <span className="font-medium">complete creative solutions</span>.
                  Whether it's a game, mobile app, website, or brand — we can handle the entire journey, from concept to launch.
                </p>
                
                {/* Services horizontal scroll with understated elegant design */}
                <div className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm">
                  <h4 className="text-xl font-medium mb-6 flex items-center text-[#FF6600]">
                    <span className="w-2 h-2 bg-[#FF6600] rounded-full mr-2"></span>
                    Our Services
                  </h4>
                  
                  <div className="relative">
                    <div className="absolute -left-2 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute -right-2 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>
                    
                    <div className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory gap-6">
                      {/* Project Packages */}
                      <div className="min-w-[260px] max-w-[260px] bg-gray-50 p-5 rounded-lg snap-start flex-shrink-0 hover:bg-[#FF6600]/5 transition-all duration-300 border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF6600" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                          </svg>
                          <h5 className="font-medium text-lg">Project Packages</h5>
                        </div>
                        <p className="text-gray-600 text-sm">Games, apps, brands, NFT/crypto projects</p>
                      </div>
                      
                      {/* Illustration & Design */}
                      <div className="min-w-[260px] max-w-[260px] bg-gray-50 p-5 rounded-lg snap-start flex-shrink-0 hover:bg-[#FF6600]/5 transition-all duration-300 border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF6600" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                          </svg>
                          <h5 className="font-medium text-lg">Illustration & Design</h5>
                        </div>
                        <p className="text-gray-600 text-sm">Animation, UI/UX design</p>
                      </div>
                      
                      {/* 3D Modeling */}
                      <div className="min-w-[260px] max-w-[260px] bg-gray-50 p-5 rounded-lg snap-start flex-shrink-0 hover:bg-[#FF6600]/5 transition-all duration-300 border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF6600" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                          </svg>
                          <h5 className="font-medium text-lg">3D Modeling</h5>
                        </div>
                        <p className="text-gray-600 text-sm">Character and environment modeling</p>
                      </div>
                      
                      {/* Development */}
                      <div className="min-w-[260px] max-w-[260px] bg-gray-50 p-5 rounded-lg snap-start flex-shrink-0 hover:bg-[#FF6600]/5 transition-all duration-300 border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF6600" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                          </svg>
                          <h5 className="font-medium text-lg">Development</h5>
                        </div>
                        <p className="text-gray-600 text-sm">Game development, web development</p>
                      </div>
                      
                      {/* Sound Design */}
                      <div className="min-w-[260px] max-w-[260px] bg-gray-50 p-5 rounded-lg snap-start flex-shrink-0 hover:bg-[#FF6600]/5 transition-all duration-300 border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF6600" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                          </svg>
                          <h5 className="font-medium text-lg">Sound Design</h5>
                        </div>
                        <p className="text-gray-600 text-sm">Audio production and sound engineering</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500 mt-4">
                    <span className="px-2 py-1 rounded bg-gray-50">← Swipe to explore all services →</span>
                  </div>
                </div>
              </div>
            </section>
            
            {/* WHAT SETS US APART */}
            <section className="mb-24">
              {/* Section header with accent line and number */}
              <div className="flex items-center mb-10">
                <div className="bg-[#FF6600] h-[3px] w-8 mr-4"></div>
                <h3 className="text-3xl md:text-4xl font-medium">What Sets Us Apart</h3>
                <span className="ml-auto text-gray-200 font-medium">03</span>
              </div>
              
              <div className="mt-10">
                {/* USP points displayed as elegant numbered cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {/* Point 1: Full Creative Team */}
                  <div className="bg-white p-6 rounded-xl shadow-sm flex gap-5 items-start hover:shadow-md transition-all duration-300 group">
                    <div className="bg-[#FF6600] w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center text-white font-medium">1</div>
                    <div>
                      <h4 className="font-medium text-lg mb-2 group-hover:text-[#FF6600] transition-colors duration-300">Full Creative Team</h4>
                      <p className="text-gray-600 mb-0 leading-relaxed">A comprehensive team that covers all creative areas in-house for seamless project execution.</p>
                    </div>
                  </div>
                  
                  {/* Point 2: Strong Collaboration */}
                  <div className="bg-white p-6 rounded-xl shadow-sm flex gap-5 items-start hover:shadow-md transition-all duration-300 group">
                    <div className="bg-[#FF6600] w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center text-white font-medium">2</div>
                    <div>
                      <h4 className="font-medium text-lg mb-2 group-hover:text-[#FF6600] transition-colors duration-300">Strong Collaboration</h4>
                      <p className="text-gray-600 mb-0 leading-relaxed">Efficient teamwork ensures fast delivery and high-quality results on all projects.</p>
                    </div>
                  </div>
                  
                  {/* Point 3: Clear Communication */}
                  <div className="bg-white p-6 rounded-xl shadow-sm flex gap-5 items-start hover:shadow-md transition-all duration-300 group">
                    <div className="bg-[#FF6600] w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center text-white font-medium">3</div>
                    <div>
                      <h4 className="font-medium text-lg mb-2 group-hover:text-[#FF6600] transition-colors duration-300">Clear Communication</h4>
                      <p className="text-gray-600 mb-0 leading-relaxed">Structured, step-by-step approach with clear communication throughout every project phase.</p>
                    </div>
                  </div>
                  
                  {/* Point 4: Personalized Approach */}
                  <div className="bg-white p-6 rounded-xl shadow-sm flex gap-5 items-start hover:shadow-md transition-all duration-300 group">
                    <div className="bg-[#FF6600] w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center text-white font-medium">4</div>
                    <div>
                      <h4 className="font-medium text-lg mb-2 group-hover:text-[#FF6600] transition-colors duration-300">Personalized Approach</h4>
                      <p className="text-gray-600 mb-0 leading-relaxed">Custom solutions focused on understanding your unique vision and specific needs.</p>
                    </div>
                  </div>
                </div>
                
                {/* Track record callout */}
                <div className="bg-black text-white p-8 rounded-xl shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="text-[#FF6600] text-4xl font-medium">50+</div>
                    <div>
                      <h4 className="text-xl font-medium mb-3">Projects Completed</h4>
                      <p className="mb-0 text-gray-300 leading-relaxed">
                        We've worked mostly with startups and early-stage teams. We're now looking to grow alongside more established clients 
                        who are ready to take things to the next level — but we'll always keep space for fresh, meaningful ideas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* WHAT DRIVES US */}
            <section className="mb-16">
              {/* Section header with accent line and number */}
              <div className="flex items-center mb-10">
                <div className="bg-[#FF6600] h-[3px] w-8 mr-4"></div>
                <h3 className="text-3xl md:text-4xl font-medium">What Drives Us</h3>
                <span className="ml-auto text-gray-200 font-medium">04</span>
              </div>
              
              <div className="mt-10">
                <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Motivation */}
                    <div className="border-l-[3px] border-[#FF6600] pl-6">
                      <h4 className="text-xl font-medium mb-4 text-[#FF6600]">Our Motivation</h4>
                      <p className="text-gray-700 leading-relaxed">
                        We're driven by the challenge of creating something truly great — 
                        not just visually, but in every detail. We believe that good work comes 
                        from clarity, collaboration, and a genuine interest in the result.
                      </p>
                    </div>
                    
                    {/* Definition of Success */}
                    <div className="border-l-[3px] border-[#FF6600] pl-6">
                      <h4 className="text-xl font-medium mb-4 text-[#FF6600]">Our Definition of Success</h4>
                      <p className="text-gray-700 leading-relaxed">
                        For us, success isn't just about finishing a project. It's about building 
                        something that feels complete, creative, and worth sharing with the world.
                      </p>
                    </div>
                  </div>
                  
                  {/* Final CTA */}
                  <div className="bg-gradient-to-r from-black to-[#333] p-8 rounded-xl text-white text-center">
                    <p className="text-2xl font-medium mb-2">
                      If you're building something exciting,<br />
                      <span className="text-[#FF6600]">we'd love to be part of it.</span>
                    </p>
                    
                    <div className="mt-4 text-gray-400">
                      Let's create something great together.
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