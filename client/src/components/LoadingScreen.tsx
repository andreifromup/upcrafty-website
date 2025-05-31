import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let videoLoadedHandler: (() => void) | null = null;

    // Set up the fallback timeout (2 seconds)
    timeoutId = setTimeout(() => {
      if (isVisible) {
        setIsVisible(false);
        setTimeout(onLoadingComplete, 500); // Wait for fade out animation
      }
    }, 2000);

    // Listen for video ready events
    const checkVideoReady = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        if (video.readyState >= 3) { // HAVE_FUTURE_DATA or better
          clearTimeout(timeoutId);
          if (isVisible) {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500); // Wait for fade out animation
          }
        } else {
          // Add event listener for when video can play through
          videoLoadedHandler = () => {
            clearTimeout(timeoutId);
            if (isVisible) {
              setIsVisible(false);
              setTimeout(onLoadingComplete, 500); // Wait for fade out animation
            }
          };
          video.addEventListener('canplaythrough', videoLoadedHandler, { once: true });
        }
      });
    };

    // Check immediately and then periodically
    const checkInterval = setInterval(checkVideoReady, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      clearInterval(checkInterval);
      if (videoLoadedHandler) {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          video.removeEventListener('canplaythrough', videoLoadedHandler!);
        });
      }
    };
  }, [isVisible, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Rotating Logo - Same size as homepage header logo */}
      <div className="mb-8 flex items-center justify-center">
        <div className="h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] md:h-[81px] md:w-[81px] flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="Upcrafty Logo" 
            className="h-full w-auto animate-loading-spin"
            style={{ 
              objectFit: 'contain',
              transformOrigin: 'center center'
            }}
          />
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        <p className="text-black font-normal text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] mb-4">
          Loading...
        </p>
        
        {/* Animated Progress Bar */}
        <div className="w-48 md:w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#FF6600] rounded-full animate-loading-bar" />
        </div>
      </div>
      

    </div>
  );
};

export default LoadingScreen;