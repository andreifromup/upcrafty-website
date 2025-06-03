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
  
  // Play the correct video based on device type - optimized for faster startup
  useEffect(() => {
    let currentVideoRef = isMobileDevice ? mobileVideoRef : desktopVideoRef;
    let unmounted = false;
    
    // Handle video playback safely with minimal overhead
    const playVideo = async () => {
      if (!currentVideoRef.current || unmounted) return;
      
      try {
        // Reset video error if any
        setVideoError(null);
        
        // Start playback and handle the promise
        const playPromise = currentVideoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (unmounted) return;
              
              // Video playing successfully - production ready
            })
            .catch(error => {
              if (unmounted) return;
              setVideoError(error instanceof Error ? error.message : String(error));
            });
        }
      } catch (error) {
        if (unmounted) return;
        setVideoError(error instanceof Error ? error.message : String(error));
      }
    };
    
    // Handle video loading successfully - runs only once when data is loaded
    const loadedDataHandler = () => {
      playVideo();
      setVideoLoaded(true);
    };
    
    // Handle metadata loaded event
    const metadataHandler = () => {
      // Metadata loaded successfully
    };
    
    // Setup function that runs immediately instead of in a timeout
    const setupVideo = () => {
      if (!currentVideoRef.current || unmounted) return null;
      
      // Set up event listeners with minimal overhead
      currentVideoRef.current.addEventListener('loadeddata', loadedDataHandler);
      currentVideoRef.current.addEventListener('loadedmetadata', metadataHandler);
      
      // Check if video is already loaded and can play
      if (currentVideoRef.current.readyState >= 3) { // HAVE_FUTURE_DATA or higher
        loadedDataHandler();
      }
      
      // Return cleanup function
      return () => {
        if (currentVideoRef.current) {
          currentVideoRef.current.removeEventListener('loadeddata', loadedDataHandler);
          currentVideoRef.current.removeEventListener('loadedmetadata', metadataHandler);
        }
      };
    };
    
    // Setup immediately rather than with a timeout for faster startup
    const cleanup = setupVideo();
    
    // Cleanup function
    return () => {
      unmounted = true;
      if (cleanup) cleanup();
    };
  }, [isMobileDevice, windowWidth]); // Re-run when device type or window size changes

  // Check connection speed - optimized for faster startup with quality fallback
  useEffect(() => {
    // Start with high quality video assumption for better initial experience
    setIsSlowConnection(false);
    
    // Check connection in the background after initial render
    const connectionCheck = () => {
      // Only run expensive checks after UI has rendered
      if ('connection' in navigator) {
        const nav = navigator as NavigatorWithConnection;
        
        if (nav.connection) {
          // Focus on critical performance metrics only
          const slowConnectionTypes = ['slow-2g', '2g'];
          const isSlow = 
            slowConnectionTypes.includes(nav.connection.effectiveType) || 
            nav.connection.downlink < 0.8;
          
          // Only trigger re-render if there's an actual change
          if (isSlow !== isSlowConnection) {
            setIsSlowConnection(isSlow);
          }
        }
      }
    };
    
    // Delay connection check to prioritize rendering
    const timerId = setTimeout(connectionCheck, 500);
    
    // Set up a minimal event listener with debouncing
    const handleConnectionChange = () => {
      // Avoid multiple rapid checks with debounce
      clearTimeout(timerId);
      setTimeout(connectionCheck, 500);
    };
    
    // Only add event listener if the API is available
    if ('connection' in navigator) {
      const nav = navigator as NavigatorWithConnection;
      if (nav.connection) {
        nav.connection.addEventListener('change', handleConnectionChange);
        return () => {
          nav.connection.removeEventListener('change', handleConnectionChange);
        };
      }
    }
    
    return () => clearTimeout(timerId);
  }, [isSlowConnection]);

  // Choose the appropriate video source based on device
  const getDesktopVideoSource = () => {
    return VIDEOS.desktop;
  };
  
  const getMobileVideoSource = () => {
    return VIDEOS.mobile;
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
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError("Failed to load desktop video")}
          >
            <source src={getDesktopVideoSource()} type="video/mp4" />
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
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError("Failed to load mobile video")}
            >
              <source src={getMobileVideoSource()} type="video/mp4" />
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