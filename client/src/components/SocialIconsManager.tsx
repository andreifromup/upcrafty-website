import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import SocialIcons from "@/components/SocialIcons";

interface SocialIconsManagerProps {
  isDropdownOpen: boolean;
}

/**
 * This component manages the visibility and positioning of social icons
 * based on the current dropdown state and device type.
 * It ensures social icons appear in only one location at a time:
 * - When dropdown is closed: In the footer area
 * - When dropdown is open: Inside the dropdown (bottom-left on desktop, centered at bottom on mobile)
 */
const SocialIconsManager: React.FC<SocialIconsManagerProps> = ({ isDropdownOpen }) => {
  const isMobile = useIsMobile();

  // For desktop with dropdown open - social icons appear inside dropdown at bottom-left
  // This is handled directly in NavDropdown component

  // For mobile with dropdown open - social icons appear inside dropdown at bottom-center
  // This is handled directly in NavDropdown component

  // For footer (dropdown closed) on desktop only
  if (!isDropdownOpen && !isMobile) {
    return (
      <div className="fixed right-[20px] sm:right-[35px] md:right-[54px] bottom-[20px] sm:bottom-[35px] md:bottom-[40px] z-[60]">
        <SocialIcons inverted={false} />
      </div>
    );
  }

  // Don't render anything when dropdown is open or on mobile as the icons are managed differently:
  // - For dropdown open: Icons are handled by NavDropdown component
  // - For mobile closed: Icons are handled by Footer component
  return null;
};

export default SocialIconsManager;