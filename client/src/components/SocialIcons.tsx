import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ICONS, SOCIAL_LINKS } from "@/assets/constants";

interface SocialIconsProps {
  inverted?: boolean;
  inDropdown?: boolean;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ inverted = false, inDropdown = false }) => {
  const isMobileDevice = useIsMobile();
  const iconStyle = "transition-all duration-300 md:hover:opacity-70 md:hover:scale-110 active:opacity-70 active:scale-95";
  
  // If in dropdown, always use black icons
  // If not inverted (like on About page or dropdown), use black icons
  // Otherwise use white icons (like on homepage)
  const useBlackIcons = inDropdown || !inverted;
  
  // Exact sizes to match reference image
  const iconSizes = {
    x: isMobileDevice ? "w-[14px] h-[14.3px]" : "w-[16px] h-[16.35px]",
    instagram: isMobileDevice ? "w-[14px] h-[14px]" : "w-[16px] h-[16.05px]",
    tiktok: isMobileDevice ? "w-[12px] h-[14px]" : "w-[14px] h-[16px]",
    youtube: isMobileDevice ? "w-[17px] h-[11px]" : "w-[19px] h-[13px]"
  };
  
  return (
    <div className="flex items-center justify-center space-x-8">
      {/* X (Twitter) */}
      <a 
        href={SOCIAL_LINKS.x} 
        className={iconStyle} 
        aria-label="X (Twitter)"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src={useBlackIcons ? ICONS.xBlack : ICONS.x} 
          alt="X (Twitter)" 
          className={iconSizes.x}
        />
      </a>
      
      {/* Instagram */}
      <a 
        href={SOCIAL_LINKS.instagram} 
        className={iconStyle} 
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src={useBlackIcons ? ICONS.instagramBlack : ICONS.instagram} 
          alt="Instagram" 
          className={iconSizes.instagram}
        />
      </a>
      
      {/* TikTok */}
      <a 
        href={SOCIAL_LINKS.tiktok} 
        className={iconStyle} 
        aria-label="TikTok"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src={useBlackIcons ? ICONS.tiktokBlack : ICONS.tiktok} 
          alt="TikTok" 
          className={iconSizes.tiktok}
        />
      </a>
      
      {/* YouTube */}
      <a 
        href={SOCIAL_LINKS.youtube} 
        className={iconStyle} 
        aria-label="YouTube"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src={useBlackIcons ? ICONS.youtubeBlack : ICONS.youtube} 
          alt="YouTube" 
          className={iconSizes.youtube}
        />
      </a>
    </div>
  );
};

export default SocialIcons;
