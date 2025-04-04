import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Using direct URLs to our public folder with a cache-busting timestamp
const timestamp = Date.now();
const desktopHighQuality = `/background-desktop_1.mp4?v=${timestamp}`;
const desktopLowQuality = `/background-desktop-low.mp4?v=${timestamp}`;
const mobileHighQuality = `/background-mobile.mp4?v=${timestamp}`;
const mobileLowQuality = `/background-mobile-low.mp4?v=${timestamp}`;

// Type for Network Information API
interface NetworkInformation extends EventTarget {
  effectiveType: string;
  downlink: number;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

interface NavigatorWithConnection extends Navigator {
  connection: NetworkInformation;
}

const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobileDevice = useIsMobile();
  const [isSlowConnection, setIsSlowConnection] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Force play the video when it's loaded
  useEffect(() => {
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          // Try to play the video
          await videoRef.current?.play();
          console.log("Video playing successfully");
          
          // Log the current source for debugging
          const currentSrc = videoRef.current?.currentSrc || 'unknown';
          console.log("Current video source:", currentSrc);
          
          // Log video dimensions and quality
          if (videoRef.current) {
            console.log("Video dimensions:", {
              videoWidth: videoRef.current.videoWidth,
              videoHeight: videoRef.current.videoHeight,
              displayWidth: videoRef.current.clientWidth,
              displayHeight: videoRef.current.clientHeight
            });
          }
        } catch (error) {
          console.error("Error playing video:", error);
          setVideoError(error instanceof Error ? error.message : String(error));
        }
      };

      // Play video when component mounts
      playVideo();
      
      // Play video when it's loaded
      videoRef.current.addEventListener('loadeddata', playVideo);
      videoRef.current.addEventListener('loadedmetadata', () => {
        console.log("Video metadata loaded");
      });
      
      return () => {
        videoRef.current?.removeEventListener('loadeddata', playVideo);
        videoRef.current?.removeEventListener('loadedmetadata', () => {});
      };
    }
  }, []);

  // Check connection speed
  useEffect(() => {
    // Check connection speed if the Network Information API is available
    if ('connection' in navigator) {
      const nav = navigator as NavigatorWithConnection;
      
      if (nav.connection) {
        // Check if connection is slow
        const slowConnectionTypes = ['slow-2g', '2g', '3g'];
        const isSlow = 
          slowConnectionTypes.includes(nav.connection.effectiveType) || 
          nav.connection.downlink < 1.5;
        
        setIsSlowConnection(isSlow);
        
        // Listen for connection changes
        const updateConnectionStatus = () => {
          const isSlowUpdated = 
            slowConnectionTypes.includes(nav.connection.effectiveType) || 
            nav.connection.downlink < 1.5;
          
          setIsSlowConnection(isSlowUpdated);
        };
        
        nav.connection.addEventListener('change', updateConnectionStatus);
        
        return () => {
          nav.connection.removeEventListener('change', updateConnectionStatus);
        };
      }
    }
    
    // Fallback for browsers that don't support the Network Information API
    setIsSlowConnection(false);
  }, []);

  // Choose the appropriate video source based on device and connection
  const getVideoSource = () => {
    // Restore original logic that properly respects mobile vs desktop
    if (isMobileDevice) {
      const source = isSlowConnection ? mobileLowQuality : mobileHighQuality;
      console.log("Loading mobile video:", source);
      return source;
    } else {
      const source = isSlowConnection ? desktopLowQuality : desktopHighQuality;
      console.log("Loading desktop video:", source);
      return source;
    }
  };

  // Handle video loading
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      {/* Show black background while video is loading */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black"></div>
      )}
      
      {/* Show error message if there's an error */}
      {videoError && (
        <div className="absolute top-0 left-0 p-2 bg-red-500 text-white text-xs z-50 opacity-70">
          Error: {videoError}
        </div>
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        preload="auto"
        className={`absolute inset-0 object-cover ${
          isMobileDevice ? 'h-[50vh] md:h-full' : 'h-full'
        } w-full`}
        src={getVideoSource()}
        onLoadedData={handleVideoLoaded}
        onError={() => setVideoError("Failed to load video")}
      >
        <source src={getVideoSource()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Diagonal divider and black background for mobile view */}
      {isMobileDevice && (
        <>
          {/* Black background below the diagonal */}
          <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-black md:hidden"></div>
          
          {/* Diagonal divider */}
          <div className="absolute top-[calc(50vh-25px)] left-0 w-full h-[50px] md:hidden" 
               style={{
                 background: 'linear-gradient(135deg, transparent 0%, transparent 49%, black 50%, black 100%)',
                 zIndex: 1
               }}>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoBackground;