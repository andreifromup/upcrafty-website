// Brand colors
export const COLORS = {
  orange: "#FF6600",
  black: "#000000",
  white: "#FFFFFF"
};

// Orange filter for SVG elements - matches exact #FF6600 color
export const ORANGE_FILTER = 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(1352%) hue-rotate(9deg) brightness(119%) contrast(119%)';

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
  aboutUs: "/about-us-video.mp4",
  // Videos for dropdown animation sections
  twoDAnimations: "/2d animations mobil.mp4",
  motionGraphics: "/motion graphics mobil.mp4"
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
    "/transp 1.png",
    "/transp 2.png",
    "/transp 4.png"
  ]
};

// Client logos for the About page carousel
export const CLIENT_LOGOS = [
  "/Bento 2x.png",
  "/Bucharest 2x.png",
  "/Cowcow 2x.png",
  "/Meegos 2x.png",
  "/Sentries 2x.png",
  "/Smoofs 2x.png",
  "/Smyths 2x.png",
  "/Windify 2x.png"
];

// Navigation structure for dropdown menu
export const NAV_CATEGORIES = [
  {
    name: "ILLUSTRATIONS",
    isTitle: true,
    subcategories: [
      { 
        name: "CARTOON", 
        isTitle: false, 
        mediaType: "image",
        mediaCount: 2,
        items: ["/cartoon1 mobil.webp", "/cartoon2 mobil.webp"],
        desktopItems: ["/cartoons1 desktop.webp", "/cartoons2 desktop.webp"]
      },
      { 
        name: "CHARACTER DESIGN", 
        isTitle: false, 
        mediaType: "image",
        mediaCount: 2,
        items: ["/Character1 mobil.webp", "/Character2 mobil.webp"],
        desktopItems: ["/character1 desktop .webp", "/character2 desktop .webp"]
      }
    ]
  },
  {
    name: "GAMES",
    isTitle: true,
    subcategories: [
      { 
        name: "MOBILE GAMES", 
        isTitle: false,
        mediaType: "mixed",
        mediaCount: 2,
        items: ["/mobile games1.webp", "/mobile games2.mp4"],
        desktopItems: ["/mobil games1 desktop.webp", "/mobil games2 desktop.mp4"]
      }
    ]
  },
  {
    name: "ANIMATIONS",
    isTitle: true,
    subcategories: [
      { 
        name: "2D ANIMATIONS", 
        isTitle: false, 
        mediaType: "video",
        mediaCount: 1,
        items: ["/2d animations mobil.mp4"],
        desktopItems: ["/2d animations desktop.mp4"]
      },
      { 
        name: "MOTION GRAPHICS", 
        isTitle: false, 
        mediaType: "video",
        mediaCount: 1,
        items: ["/motion graphics mobil.mp4"],
        desktopItems: ["/motion graphics desktop.mp4"]
      }
    ]
  },
  {
    name: "3D",
    isTitle: true,
    subcategories: [
      { 
        name: "ENVIRONMENT", 
        isTitle: false, 
        mediaType: "video",
        mediaCount: 2,
        items: ["/environment1 mobil_1.mp4", "/environment2 mobil_2.mp4"],
        desktopItems: ["/environment1 desktop_1.mp4", "/environment2 desktop.mp4"]
      },
      { 
        name: "CHARACTER MODELING", 
        isTitle: false, 
        mediaType: "mixed",
        mediaCount: 2,
        items: ["/CM mobile 1.mp4", "/CM mobile 2.webp"],
        desktopItems: ["/CM desktop 1.mp4", "/CM desktop 2.webp"]
      }
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