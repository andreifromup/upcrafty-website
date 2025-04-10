import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import SocialIcons from "@/components/SocialIcons";
import { useLocation } from "wouter";

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
  const [location] = useLocation();
  
  // Determine if we're on the homepage
  const isHomePage = location === "/";

  // For desktop with dropdown open - social icons appear inside dropdown at bottom-left
  // This is handled directly in NavDropdown component

  // For mobile with dropdown open - social icons appear inside dropdown at bottom-center
  // This is handled directly in NavDropdown component

  // We're removing the fixed social icons since they're now handled by the Footer component
  // This prevents duplication of icons

  // Don't render anything when:
  // - Dropdown is open (Icons are handled by NavDropdown component)
  // - On mobile (Icons are handled by Footer component)
  // - On About page (Icons are handled by About component)
  return null;
};

export default SocialIconsManager;