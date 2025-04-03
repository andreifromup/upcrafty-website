import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";

const Home: React.FC = () => {
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
      {/* Video Background */}
      <VideoBackground />
      
      {/* Main container - Fixed dimensions with symmetric spacing */}
      <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-between z-10 overflow-hidden">
        {/* Top Navigation */}
        <Navbar />
        
        {/* Bottom Footer - Positioned with exact symmetrical spacing */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
