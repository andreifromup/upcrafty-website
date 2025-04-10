// Convert #FF6512 to filter CSS
const hexToRgb = hex => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
};

// The SVG filter method for #FF6512
const hexColor = '#FF6512';
const [r, g, b] = hexToRgb(hexColor);

// The filter applied in our current code - updated for #FF6512
const currentFilter = 'brightness(0) saturate(100%) invert(43%) sepia(95%) saturate(3867%) hue-rotate(359deg) brightness(103%) contrast(103%)';

console.log('Current filter:', currentFilter);
console.log('This represents the hex color #FF6512');
