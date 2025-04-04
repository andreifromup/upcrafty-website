import React from "react";

// Use string URLs instead of direct imports
const xIcon = "/X.png";
const instaIcon = "/Insta.png";
const tiktokIcon = "/Tiktok.png";
const youtubeIcon = "/Youtube.png";

const SocialIcons: React.FC = () => {
  const iconStyle = "transition-all duration-300 hover:opacity-70 hover:scale-110";
  
  return (
    <div className="flex items-center space-x-6">
      {/* X (Twitter) - 16x16.35px */}
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
          className="w-[16px] h-[16.35px]"
        />
      </a>
      
      {/* Instagram - 16x16.05px */}
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
          className="w-[16px] h-[16.05px]"
        />
      </a>
      
      {/* TikTok - 14x16px */}
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
          className="w-[14px] h-[16px]"
        />
      </a>
      
      {/* YouTube - 19x13px */}
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
          className="w-[19px] h-[13px]"
        />
      </a>
    </div>
  );
};

export default SocialIcons;
