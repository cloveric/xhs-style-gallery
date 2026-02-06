const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const outDir = path.join(projectRoot, 'public/images/previews');
const SKILL_DIR = path.join(__dirname, 'awe-gemini-web');

// Simplified prompts for retry
const retries = [
  {
    id: 'corporate-memphis',
    prompt: "Create an illustration in Corporate Memphis style. Flat geometric human figures with oversized hands, solid color fills, no gradients or outlines. Characters in purple, blue, warm orange skin tones collaborating in a modern workspace. Bright clean background with geometric accents. Aspect ratio 3:4."
  },
  {
    id: 'action-figure',
    prompt: "Create a realistic 3D action figure of a young female software engineer sealed inside a toy blister pack box. The figure has a laptop accessory and coffee cup. The packaging has a colorful branded header card. Realistic plastic texture and commercial toy photography lighting. Aspect ratio 3:4."
  },
  {
    id: 'pixar-3d',
    prompt: "Create a Pixar-style 3D animated character: a cheerful young chef in a warm bakery kitchen holding a freshly baked cake. Smooth subsurface scattering skin, big expressive eyes, stylized proportions, cinematic lighting with warm golden tones. Pixar/Disney animation quality. Aspect ratio 3:4."
  },
  {
    id: 'coloring-page',
    prompt: "Create an adult coloring book page illustration: an intricate garden scene with detailed flowers, butterflies, and a fountain. Black ink line art on white background with some areas filled with soft watercolor. Mandala-inspired patterns, meditative detail. Aspect ratio 3:4."
  }
];

async function retry() {
  for (const item of retries) {
    const outPath = path.join(outDir, `${item.id}.png`);

    // Delete existing failed file if any
    if (fs.existsSync(outPath)) {
      fs.unlinkSync(outPath);
    }

    console.log(`RETRYING ${item.id}...`);
    const safePrompt = item.prompt.replace(/'/g, "''");

    try {
      const cmd = `powershell.exe -Command "bun '${SKILL_DIR}/scripts/main.ts' -p '${safePrompt}' --image '${outPath}' -m gemini-3-pro"`;
      execSync(cmd, { timeout: 180000, stdio: ['pipe', 'pipe', 'pipe'], maxBuffer: 10*1024*1024 });

      if (fs.existsSync(outPath)) {
        const size = fs.statSync(outPath).size;
        console.log(`  OK ${item.id} (${(size/1024).toFixed(0)}KB)`);
      } else {
        console.log(`  FAIL ${item.id} (no output)`);
      }
    } catch (err) {
      console.log(`  FAIL ${item.id}: ${err.message.slice(0, 150)}`);
    }

    await new Promise(r => setTimeout(r, 3000));
  }
  console.log('RETRY DONE');
}

retry();
