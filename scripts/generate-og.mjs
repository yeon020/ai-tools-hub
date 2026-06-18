import sharp from "sharp";
import { writeFileSync } from "fs";

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#4f46e5"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#09090b"/>

  <!-- Glow -->
  <ellipse cx="600" cy="-40" rx="550" ry="380" fill="url(#glow)"/>

  <!-- Logo box -->
  <rect x="474" y="120" width="60" height="60" rx="14" fill="url(#logoBg)"/>
  <text x="504" y="159" font-family="Arial Black, sans-serif" font-size="22" font-weight="900" fill="white" text-anchor="middle">AI</text>

  <!-- Hub text -->
  <text x="548" y="163" font-family="Arial Black, sans-serif" font-size="46" font-weight="800" fill="white" letter-spacing="-1">Hub</text>

  <!-- Headline line 1 -->
  <text x="600" y="258" font-family="Arial Black, sans-serif" font-size="58" font-weight="800" fill="white" text-anchor="middle" letter-spacing="-2">Find &amp; Compare the</text>

  <!-- Headline line 2 (purple) -->
  <text x="600" y="326" font-family="Arial Black, sans-serif" font-size="58" font-weight="800" fill="#a78bfa" text-anchor="middle" letter-spacing="-2">Best AI Tools</text>

  <!-- Subtitle -->
  <text x="600" y="384" font-family="Arial, sans-serif" font-size="24" fill="#71717a" text-anchor="middle">33+ AI tools · Pricing · Features · Free Plans</text>

  <!-- Badges -->
  ${["ChatGPT", "Claude", "Cursor", "Midjourney", "Perplexity"].map((name, i) => {
    const totalWidth = 5 * 140 + 4 * 14;
    const startX = (width - totalWidth) / 2;
    const x = startX + i * 154;
    return `
    <rect x="${x}" y="418" width="140" height="42" rx="21" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="${x + 70}" y="444" font-family="Arial, sans-serif" font-size="18" fill="#a1a1aa" text-anchor="middle">${name}</text>
    `;
  }).join("")}

  <!-- Bottom URL -->
  <text x="600" y="588" font-family="Arial, sans-serif" font-size="18" fill="#52525b" text-anchor="middle">ai-tools-hub-silk.vercel.app</text>
</svg>
`;

const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync("public/og-image.png", pngBuffer);
console.log("OG image generated: public/og-image.png");
