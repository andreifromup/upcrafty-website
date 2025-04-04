import React from "react";
import { useIsMobile } from "../hooks/use-mobile";

// Use string URLs instead of direct imports
const xIcon = "/X.png";
const instaIcon = "/Insta.png";
const tiktokIcon = "/Tiktok.png";
const youtubeIcon = "/Youtube.png";

const SocialIcons: React.FC = () => {
  const isMobileDevice = useIsMobile();
  const iconStyle = "transition-all duration-300 hover:opacity-70 hover:scale-110";
  
  // Smaller sizes for mobile
  const iconSizes = {
    x: isMobileDevice ? "w-[14px] h-[14.3px]" : "w-[16px] h-[16.35px]",
    instagram: isMobileDevice ? "w-[14px] h-[14px]" : "w-[16px] h-[16.05px]",
    tiktok: isMobileDevice ? "w-[12px] h-[14px]" : "w-[14px] h-[16px]",
    youtube: isMobileDevice ? "w-[17px] h-[11px]" : "w-[19px] h-[13px]"
  };
  
  return (
    <div className="flex items-center space-x-4 md:space-x-6">
      {/* X (Twitter) */}
      <a 
        href="#" 
        className={iconStyle} 
        aria-label="X (Twitter)"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src={xIcon} 
          alt="X (Twitter)" 
          className={iconSizes.x}
        />
      </a>
      
      {/* Instagram */}
      <a 
        href="#" 
        className={iconStyle} 
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src={instaIcon} 
          alt="Instagram" 
          className={iconSizes.instagram}
        />
      </a>
      
      {/* TikTok */}
      <a 
        href="#" 
        className={iconStyle} 
        aria-label="TikTok"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src={tiktokIcon} 
          alt="TikTok" 
          className={iconSizes.tiktok}
        />
      </a>
      
      {/* YouTube */}
      <a 
        href="#" 
        className={iconStyle} 
        aria-label="YouTube"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src={youtubeIcon} 
          alt="YouTube" 
          className={iconSizes.youtube}
        />
      </a>
    </div>
  );
};

export default SocialIcons;
