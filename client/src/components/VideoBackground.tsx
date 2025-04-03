import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Using mixkit's sample video as a placeholder
// In a production environment, you would host your own video or use one from a CDN
const VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-countryside-meadow-4075-large.mp4";

const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Ensure video auto-plays
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="video-container absolute inset-0 w-full h-full overflow-hidden">
      {/* Video overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 z-0"></div>
      
      {/* Video element */}
      <video 
        ref={videoRef}
        className={`absolute top-0 left-0 w-full object-cover z-[-1] ${isMobile ? 'h-[50vh]' : 'h-full'}`}
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Mobile specific elements */}
      {isMobile && (
        <>
          {/* Diagonal divider */}
          <div className="absolute top-[45vh] left-0 w-full h-[10vh] bg-black transform -skew-y-6 z-10"></div>
          
          {/* Black background for bottom half */}
          <div className="absolute top-[50vh] left-0 w-full h-[50vh] bg-black z-5"></div>
        </>
      )}
    </div>
  );
};

export default VideoBackground;
