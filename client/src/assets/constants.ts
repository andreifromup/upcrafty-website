// Brand colors
export const COLORS = {
  orange: "#FF6600",
  black: "#000000",
  white: "#FFFFFF"
};

// Orange filter for SVG elements
export const ORANGE_FILTER = 'brightness(0) saturate(100%) invert(49%) sepia(75%) saturate(5338%) hue-rotate(1deg) brightness(103%) contrast(105%)';

// Image assets for icons
export const ICONS = {
  // Social Media Icons - White versions for homepage/footer
  x: "/X white.png",
  instagram: "/Instagram white.png",
  tiktok: "/TikTok white.png",
  youtube: "/Youtube white.png",
  
  // Social Media Icons - Black versions for dropdown menu
  xBlack: "/X black.png",
  instagramBlack: "/Instagram black.png",
  tiktokBlack: "/TikTok black.png",
  youtubeBlack: "/Youtube black.png",
  
  // Logo Images
  logo: "/sigla.png",
  logoBlack: "/Black Logo.png",
  logoBottom: "/sigla bottom.png",
  blackCenterLogo: "/black-center-logo.png",
  
  // Other
  polygon: "/Polygon 2.png",
  mobile: "/mobil.png"
};

// Video files for different platforms and network conditions
export const VIDEOS = {
  desktopHigh: "/desktop.mp4",
  desktopLow: "/desktop-low.mp4",
  mobileHigh: "/mobil.mp4",
  mobileLow: "/mobil-low.mp4",
  aboutUs: "/about-us-video.mp4"
};

// Logo sizing configurations
export const LOGOS = {
  sizes: {
    small: { width: "36.6px", height: "39.1px" },
    medium: { width: "65px", height: "69px" },
    large: { width: "81px", height: "81px" },
    header: { width: "36.6px", height: "39.1px" },
    footer: { width: "38px", height: "38px" }
  }
};

// Social media URL links
export const SOCIAL_LINKS = {
  x: "https://x.com/upcraftystudio",
  instagram: "https://www.instagram.com/upcraftystudio",
  tiktok: "https://www.tiktok.com/@upcraftystudio?lang=en",
  youtube: "https://www.youtube.com/@upcrafty"
};

// Portfolio images
export const PORTFOLIO_IMAGES = {
  default: [
    "/Photo%201.png",
    "/Photo%202.png",
    "/Photo%203.png"
  ]
};

// Client logos for the About page carousel
export const CLIENT_LOGOS = [
  "/Bento 1x.png",
  "/Bucharest 1x.png",
  "/Cowcow 1x.png",
  "/Meegos 1x.png",
  "/Sentries 1x.png",
  "/Smoofs 1x.png",
  "/Smyths 1x.png",
  "/Windify 1x.png"
];

// Navigation structure for dropdown menu
export const NAV_CATEGORIES = [
  {
    name: "ILLUSTRATIONS",
    isTitle: true,
    subcategories: [
      { name: "CARTOON", isTitle: false, items: [] },
      { name: "CHARACTER DESIGN", isTitle: false, items: [] }
    ]
  },
  {
    name: "ANIMATIONS",
    isTitle: true,
    subcategories: [
      { name: "2D ANIMATIONS", isTitle: false, items: [] },
      { name: "MOTION GRAPHICS", isTitle: false, items: [] }
    ]
  },
  {
    name: "GAMES",
    isTitle: true,
    subcategories: [
      { name: "MOBILE GAMES", isTitle: false, items: [] }
    ]
  },
  {
    name: "3D",
    isTitle: true,
    subcategories: [
      { name: "ENVIRONMENT", isTitle: false, items: [] },
      { name: "CHARACTER MODELING", isTitle: false, items: [] }
    ]
  },
  {
    name: "ABOUT US",
    isTitle: false,
    subcategories: []
  },
  {
    name: "CONTACT",
    isTitle: false,
    subcategories: []
  }
];