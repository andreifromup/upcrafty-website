import React, { useEffect, useRef, useState } from "react";
import { VIDEOS } from "@/assets/constants";

interface AboutVideoProps {
  className?: string;
}

const AboutVideo: React.FC<AboutVideoProps> = ({ className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoSourceUrl, setVideoSourceUrl] = useState<string>("");

  // Setup video URL with URL encoding for spaces
  useEffect(() => {
    const aboutUsVideoPath = VIDEOS.aboutUs;
    // Properly encode the video URL if it contains spaces
    const encodedPath = aboutUsVideoPath.replace(/ /g, "%20");
    setVideoSourceUrl(encodedPath);
  }, []);

  // Setup video playback on component mount
  useEffect(() => {
    if (!videoSourceUrl) return; // Wait until we have the URL

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
  }, [videoSourceUrl]);

  return (
    <div className={`overflow-hidden ${className}`}>
      {videoSourceUrl && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSourceUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default AboutVideo;