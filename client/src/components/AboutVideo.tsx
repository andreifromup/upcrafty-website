import React, { useEffect, useRef, useState } from "react";
import { VIDEOS } from "@/assets/constants";

interface AboutVideoProps {
  className?: string;
}

const AboutVideo: React.FC<AboutVideoProps> = ({ className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoUrl = VIDEOS.aboutUs;

  // Setup video playback on component mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Try to play the video immediately and also on metadata loaded
      const playVideo = () => {
        console.log("Attempting to play About Us video");
        video.play()
          .then(() => {
            setIsVideoPlaying(true);
            console.log("About video playing successfully");
          })
          .catch(error => {
            console.error("Error playing about video:", error);
          });
      };

      // Set video to autoplay in case that helps
      video.autoplay = true;

      // Set up event listeners
      video.addEventListener("loadedmetadata", playVideo);
      video.addEventListener("canplay", playVideo);
      
      // Manually try to play as well
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA or better
        playVideo();
      }

      // Clean up
      return () => {
        video.removeEventListener("loadedmetadata", playVideo);
        video.removeEventListener("canplay", playVideo);
        video.pause();
      };
    }
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoUrl}
          loop
          muted
          playsInline
          preload="auto"
          autoPlay
          controls
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default AboutVideo;