// Convert #FF6600 to filter CSS
const hexToRgb = hex => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
};

// The SVG filter method for #FF6600
const hexColor = '#FF6600';
const [r, g, b] = hexToRgb(hexColor);

// The filter applied in our current code
const currentFilter = 'brightness(0) saturate(100%) invert(49%) sepia(75%) saturate(5338%) hue-rotate(1deg) brightness(103%) contrast(105%)';

console.log('Current filter:', currentFilter);
console.log('This represents the hex color #FF6600');
