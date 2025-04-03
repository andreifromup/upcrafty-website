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
    <div className="bg-black text-white font-sans antialiased">
      {/* Video Background */}
      <VideoBackground />
      
      {/* Main container */}
      <div className="relative w-full h-screen flex flex-col justify-between z-10">
        {/* Top Navigation */}
        <Navbar />
        
        {/* Bottom Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
