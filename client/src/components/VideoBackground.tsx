import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// We'll use URL strings instead of direct imports since the videos might not be in the assets folder yet
const desktopHighQuality = '/background-desktop_1.mp4';
const desktopLowQuality = '/background-desktop-low.mp4';
const mobileHighQuality = '/background-mobile.mp4';
const mobileLowQuality = '/background-mobile-low.mp4';

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
    if (isMobileDevice) {
      return isSlowConnection ? mobileLowQuality : mobileHighQuality;
    } else {
      return isSlowConnection ? desktopLowQuality : desktopHighQuality;
    }
  };

  // Handle video loading
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black"></div>
      )}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        src={getVideoSource()}
        onLoadedData={handleVideoLoaded}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;