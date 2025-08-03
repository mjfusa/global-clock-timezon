// Simple clock icon generator for PWA icons
function generateClockIcon(size: number) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get 2D context from canvas');
  }
  
  // Background
  ctx.fillStyle = '#8b7355';
  ctx.fillRect(0, 0, size, size);
  
  // Center point
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;
  
  // Clock face
  ctx.strokeStyle = '#f8f9fa';
  ctx.lineWidth = size * 0.024;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Hour markers
  ctx.lineWidth = size * 0.008;
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * Math.PI / 180;
    const x1 = centerX + Math.cos(angle) * radius * 0.9;
    const y1 = centerY + Math.sin(angle) * radius * 0.9;
    const x2 = centerX + Math.cos(angle) * radius * 0.8;
    const y2 = centerY + Math.sin(angle) * radius * 0.8;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  // Hour hand (pointing to 3)
  ctx.lineWidth = size * 0.016;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + radius * 0.5, centerY);
  ctx.stroke();
  
  // Minute hand (pointing to 12)
  ctx.lineWidth = size * 0.012;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX, centerY - radius * 0.7);
  ctx.stroke();
  
  // Center dot
  ctx.fillStyle = '#f8f9fa';
  ctx.beginPath();
  ctx.arc(centerX, centerY, size * 0.016, 0, 2 * Math.PI);
  ctx.fill();
  
  return canvas;
}

// Generate all required icon sizes
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const icons: Record<number, HTMLCanvasElement> = {};

sizes.forEach(size => {
  icons[size] = generateClockIcon(size);
});

export { icons, generateClockIcon };