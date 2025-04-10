import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { VIDEOS } from '@/assets/constants';

interface VideoBackgroundProps {
  blur?: boolean;
}

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

const VideoBackground: React.FC<VideoBackgroundProps> = ({ blur = false }) => {
  // Separate refs for desktop and mobile videos
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const isMobileDevice = useIsMobile();
  const [isSlowConnection, setIsSlowConnection] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [overlayPosition, setOverlayPosition] = useState(0);
  
  // Calculate optimal overlay position based on screen height
  useEffect(() => {
    const calculateOverlayPosition = () => {
      // Position the diagonal cut at 75-80% down the screen
      // to be at the right position above the central logo
      const height = window.innerHeight;
      let position = 0;
      
      if (height < 667) { // iPhone 8 and smaller
        position = height * 0.75; // Position on small screens
      } else if (height < 812) { // iPhone X/11 size
        position = height * 0.78; // Position for medium screens
      } else {
        position = height * 0.80; // Position for larger screens
      }
      
      setOverlayPosition(position);
    };
    
    // Calculate initial position
    calculateOverlayPosition();
    
    // Update dimensions on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      calculateOverlayPosition();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Play the correct video based on device type
  useEffect(() => {
    let currentVideoRef = isMobileDevice ? mobileVideoRef : desktopVideoRef;
    
    // Handle video playback safely
    const playVideo = async () => {
      if (!currentVideoRef.current) return;
      
      try {
        // Reset video error if any
        setVideoError(null);
        
        // Start playback and handle the promise
        const playPromise = currentVideoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Video playing successfully");
              if (currentVideoRef.current) {
                console.log("Current video source:", currentVideoRef.current.currentSrc);
                console.log("Video dimensions:", {
                  videoWidth: currentVideoRef.current.videoWidth,
                  videoHeight: currentVideoRef.current.videoHeight,
                  displayWidth: currentVideoRef.current.clientWidth,
                  displayHeight: currentVideoRef.current.clientHeight
                });
              }
            })
            .catch(error => {
              // Only set error if component is still mounted
              console.error("Error playing video:", error);
              setVideoError(error instanceof Error ? error.message : String(error));
            });
        }
      } catch (error) {
        console.error("Error in playVideo function:", error);
        setVideoError(error instanceof Error ? error.message : String(error));
      }
    };
    
    // Don't set up event listeners until the component is fully mounted
    const timer = setTimeout(() => {
      if (currentVideoRef.current) {
        // Set up event listeners
        const loadedDataHandler = () => {
          playVideo();
          setVideoLoaded(true);
        };
        
        const metadataHandler = () => {
          console.log("Video metadata loaded");
        };
        
        currentVideoRef.current.addEventListener('loadeddata', loadedDataHandler);
        currentVideoRef.current.addEventListener('loadedmetadata', metadataHandler);
        
        // Initial attempt to play video
        if (currentVideoRef.current.readyState >= 3) { // HAVE_FUTURE_DATA or higher
          loadedDataHandler();
        }
        
        return () => {
          if (currentVideoRef.current) {
            currentVideoRef.current.removeEventListener('loadeddata', loadedDataHandler);
            currentVideoRef.current.removeEventListener('loadedmetadata', metadataHandler);
          }
        };
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isMobileDevice, windowWidth]); // Re-run when device type or window size changes

  // Check connection speed
  useEffect(() => {
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

  // Choose the appropriate video source based on device and connection speed
  const getDesktopVideoSource = () => {
    // Hard-code the timestamp for cache busting
    const timestamp = Date.now();
    const source = isSlowConnection ? VIDEOS.desktopLow : VIDEOS.desktopHigh;
    const sourceWithTimestamp = `${source}?v=${timestamp}`;
    console.log("Loading desktop video:", sourceWithTimestamp);
    return sourceWithTimestamp;
  };
  
  const getMobileVideoSource = () => {
    // Hard-code the timestamp for cache busting
    const timestamp = Date.now();
    const source = isSlowConnection ? VIDEOS.mobileLow : VIDEOS.mobileHigh;
    const sourceWithTimestamp = `${source}?v=${timestamp}`;
    console.log("Loading mobile video:", sourceWithTimestamp);
    return sourceWithTimestamp;
  };
  
  // Force reload videos when component mounts
  useEffect(() => {
    if (desktopVideoRef.current) {
      desktopVideoRef.current.load();
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.load();
    }
  }, []);

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
      
      {/* Black transparent overlay and blur effect that appears when dropdown is open */}
      {blur && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>
      )}
      
      {/* Desktop layout - full screen video with enhanced responsiveness */}
      <div className={`absolute inset-0 ${isMobileDevice ? 'hidden' : 'hidden md:block'}`}>
        <div className="relative w-full h-full">
          <video
            ref={desktopVideoRef}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover min-h-full min-w-full ${blur ? 'brightness-75' : ''}`}
            style={{
              objectPosition: 'center center',
              // Ensures the video scales properly on all desktop screen sizes
              // while maintaining aspect ratio and filling the container
            }}
            onLoadedData={(e) => {
              setVideoLoaded(true);
              console.log("Current video source:", (e.target as HTMLVideoElement).currentSrc);
              console.log("Video dimensions:", {
                videoWidth: (e.target as HTMLVideoElement).videoWidth,
                videoHeight: (e.target as HTMLVideoElement).videoHeight,
                displayWidth: (e.target as HTMLVideoElement).offsetWidth,
                displayHeight: (e.target as HTMLVideoElement).offsetHeight
              });
            }}
            onError={(e) => {
              setVideoError("Failed to load desktop video");
              console.error("Desktop video error:", e);
            }}
          >
            <source src={getDesktopVideoSource()} type="video/mp4" key={`desktop-${Date.now()}`} />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      
      {/* Mobile layout - fixed height video with diagonal cut and black background */}
      <div className={`absolute inset-0 ${isMobileDevice ? 'block md:hidden' : 'hidden'}`}>
        {/* Full black background for the entire screen */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Video container with enhanced responsive sizing for all mobile screen sizes */}
        <div className="absolute top-0 left-0 w-full h-full max-h-screen overflow-hidden z-0">
          <div className="relative w-full h-full">
            <video
              ref={mobileVideoRef}
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover min-h-full min-w-full ${blur ? 'brightness-75' : ''}`} 
              style={{
                objectPosition: 'center center', 
                // The video will scale to cover the entire container while maintaining aspect ratio
                // This ensures no empty spaces on different screen sizes
              }}
              onLoadedData={(e) => {
                setVideoLoaded(true);
                console.log("Current mobile video source:", (e.target as HTMLVideoElement).currentSrc);
                console.log("Mobile video dimensions:", {
                  videoWidth: (e.target as HTMLVideoElement).videoWidth,
                  videoHeight: (e.target as HTMLVideoElement).videoHeight,
                  displayWidth: (e.target as HTMLVideoElement).offsetWidth,
                  displayHeight: (e.target as HTMLVideoElement).offsetHeight
                });
              }}
              onError={(e) => {
                setVideoError("Failed to load mobile video");
                console.error("Mobile video error:", e);
              }}
            >
              <source src={getMobileVideoSource()} type="video/mp4" key={`mobile-${Date.now()}`} />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
        {/* Diagonal overlay - temporarily hidden */}
        {false && (
          <div 
            className="absolute z-20 bg-black" 
            style={{
              width: '100%',
              height: '100%',  // Extended height to fill the entire viewport
              // Use calculated responsive position based on screen size
              top: `${overlayPosition}px`,
              transform: 'skewY(10deg)',
              transformOrigin: 'bottom left',
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default VideoBackground;