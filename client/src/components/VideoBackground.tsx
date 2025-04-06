import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { VIDEOS } from '@/assets/constants';

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
  // Separate refs for desktop and mobile videos
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const isMobileDevice = useIsMobile();
  const [isSlowConnection, setIsSlowConnection] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Update window width on resize for responsive video selection
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
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
    const source = isSlowConnection ? VIDEOS.desktopLow : VIDEOS.desktopHigh;
    console.log("Loading desktop video:", source);
    return source;
  };
  
  const getMobileVideoSource = () => {
    const source = isSlowConnection ? VIDEOS.mobileLow : VIDEOS.mobileHigh;
    console.log("Loading mobile video:", source);
    return source;
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
      <div className={`absolute inset-0 ${isMobileDevice ? 'hidden' : 'hidden md:block'}`}>
        <video
          ref={desktopVideoRef}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="auto"
          className="absolute inset-0 object-cover w-full h-full"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError("Failed to load desktop video")}
        >
          <source src={getDesktopVideoSource()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Mobile layout - fixed height video with diagonal cut and black background */}
      <div className={`absolute inset-0 ${isMobileDevice ? 'block md:hidden' : 'hidden'}`}>
        {/* Full black background for the entire screen */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Video container with fixed height of 751px as per Figma */}
        <div className="absolute top-0 left-0 w-full h-[751px] overflow-hidden z-10">
          <video
            ref={mobileVideoRef}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            preload="auto"
            className="absolute inset-0 object-cover w-full h-full"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError("Failed to load mobile video")}
          >
            <source src={getMobileVideoSource()} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Diagonal overlay - positioned to be right above the central logo */}
        <div 
          className="absolute z-20 bg-black" 
          style={{
            width: '100%',
            height: '150px',
            top: '550px',  // Moved up to be above the central logo
            transform: 'skewY(10deg)',
            transformOrigin: 'bottom left',
          }}
        ></div>
      </div>
    </div>
  );
};

export default VideoBackground;