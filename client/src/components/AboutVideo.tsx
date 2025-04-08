import React, { useEffect, useRef, useState } from "react";

interface AboutVideoProps {
  className?: string;
}

const AboutVideo: React.FC<AboutVideoProps> = ({ className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Setup video playback on component mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Start video as soon as metadata is loaded
      const handleLoadedMetadata = () => {
        console.log("About video metadata loaded");
        video.play()
          .then(() => {
            setIsVideoPlaying(true);
            console.log("About video playing successfully");
          })
          .catch(error => {
            console.error("Error playing about video:", error);
          });
      };

      // Set up event listeners
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      // Clean up
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.pause();
      };
    }
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/About%20us%20video.mp4"
        loop
        muted
        playsInline
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default AboutVideo;