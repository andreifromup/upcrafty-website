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

  // Handle video loading based on screen size
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Update window width on resize for responsive video selection
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
  }, [windowWidth]); // Re-run when window width changes

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

  // Choose the appropriate video source based on device width and connection
  const getVideoSource = () => {
    // Use window.innerWidth for more reliable device detection
    const isMobileWidth = window.innerWidth <= 768;
    
    if (isMobileWidth) {
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
      
      {/* Desktop layout - full screen video */}
      {!isMobileDevice && (
        <div className="absolute inset-0 hidden md:block">
          <video
            ref={videoRef}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            preload="auto"
            className="absolute inset-0 object-cover w-full h-full"
            src={getVideoSource()}
            key={getVideoSource()} 
            onLoadedData={handleVideoLoaded}
            onError={() => setVideoError("Failed to load video")}
          >
            <source src={getVideoSource()} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      
      {/* Mobile layout - fixed height video (751px) with diagonal cut and black background */}
      {isMobileDevice && (
        <div className="absolute inset-0 block md:hidden">
          {/* Full black background for the entire screen */}
          <div className="absolute inset-0 bg-black"></div>
          
          {/* Video container with fixed height of 751px as per Figma */}
          <div className="absolute top-0 left-0 w-full h-[751px] overflow-hidden z-10">
            <video
              ref={videoRef}
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
              preload="auto"
              className="absolute inset-0 object-cover w-full h-full"
              src={getVideoSource()}
              key={getVideoSource()}
              onLoadedData={handleVideoLoaded}
              onError={() => setVideoError("Failed to load video")}
            >
              <source src={getVideoSource()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Diagonal overlay for the bottom-right corner of the video */}
          <div 
            className="absolute z-20 bg-black" 
            style={{
              width: '100%',
              height: '120px', // Reduced height for steeper angle
              bottom: 'calc(100% - 720px)', // Moved lower to be right above the logo (751px - ~30px)
              transform: 'skewY(12deg)', // Increased angle for steeper diagonal
              transformOrigin: 'bottom left', // Rotate from bottom left
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;