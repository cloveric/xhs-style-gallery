const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const data = require(path.join(projectRoot, 'src/data/styles.json'));
const outDir = path.join(projectRoot, 'public/images/previews');
const SKILL_DIR = path.join(__dirname, 'awe-gemini-web');

// Topic map: concrete topics to replace [YOUR TOPIC] in prompts
const topicMap = {
  'corporate-memphis': 'a team collaborating on a creative project, brainstorming ideas together',
  'cozy-memphis': 'a cozy weekend morning routine with coffee and fresh pastries',
  'sticker-sheet': 'cute cat stickers with different expressions and poses for journal decoration',
  'action-figure': 'a young female software engineer action figure in a blister pack with laptop accessory and coffee cup',
  'funko-pop': 'a cute astronaut character standing on a moon-surface display base',
  'lego-brick': 'a charming European cafe street scene with outdoor seating and flower boxes',
  'knitted-doll': 'a cozy little fox character wearing a scarf sitting in an autumn forest',
  'pixar-3d': 'a cheerful young chef character in a warm bakery kitchen holding a freshly baked cake',
  'enamel-pin': 'a collection of 6 cute enamel pins: a cat, a coffee cup, a crescent moon, a succulent plant, a book, and a rainbow',
  'miniature-diorama': 'a bustling Japanese ramen street at night with lanterns and tiny people',
  'knolling': 'a perfectly organized flat-lay of baking ingredients and tools on a marble surface',
  'double-exposure': 'a woman portrait silhouette filled with a cherry blossom forest landscape',
  'memphis-80s': 'a bold retro music party poster with geometric shapes and neon colors',
  'aged-academia': 'a scholarly still life with antique books, a brass telescope, dried botanical specimens, and a leather journal',
  'voxel-art': 'a magical floating island village with waterfalls and tiny houses made of colorful voxel cubes',
  'retro-crt': 'a retro computer terminal boot screen showing a nostalgic welcome message with green phosphor text',
  'craft-handmade': 'a travel memory collage with cut paper, washi tape, stamps, and handwritten notes about a trip to Kyoto',
  'chalkboard': 'a charming cafe menu board featuring todays specialty coffee drinks and desserts',
  'ikea-manual': 'humorous IKEA-style assembly instructions for building a perfect morning routine',
  'pop-up-book': 'an enchanted fairy tale forest with layered paper trees, a cottage, and woodland animals',
  'coloring-page': 'an intricate mandala-inspired garden scene with flowers, butterflies, and a peaceful fountain',
  'crystal-ball': 'a magical winter village scene with tiny snow-covered houses inside a crystal snow globe',
  'scientific': 'botanical illustration of a blooming magnolia branch with cross-section details and Latin labels',
  'sketch-notes': 'a visual summary of 5 morning productivity habits with icons, arrows, and hand-lettered headers'
};

async function generate() {
  const results = { success: [], failed: [] };

  for (const style of data) {
    const id = style.id;
    const outPath = path.join(outDir, `${id}.png`);

    // Skip if already exists
    if (fs.existsSync(outPath)) {
      console.log(`SKIP ${id} (already exists)`);
      results.success.push(id);
      continue;
    }

    const topic = topicMap[id] || 'a beautiful lifestyle scene';
    const prompt = style.prompt.replace('[YOUR TOPIC]', topic);

    console.log(`GENERATING ${id}...`);

    try {
      // Escape single quotes in prompt for PowerShell
      const safePrompt = prompt.replace(/'/g, "''");
      const cmd = `powershell.exe -Command "bun '${SKILL_DIR}/scripts/main.ts' -p '${safePrompt}' --image '${outPath}' -m gemini-3-pro"`;

      execSync(cmd, {
        timeout: 120000,
        stdio: ['pipe', 'pipe', 'pipe'],
        maxBuffer: 10 * 1024 * 1024
      });

      if (fs.existsSync(outPath)) {
        const size = fs.statSync(outPath).size;
        console.log(`  OK ${id} (${(size/1024).toFixed(0)}KB)`);
        results.success.push(id);
      } else {
        console.log(`  FAIL ${id} (no output file)`);
        results.failed.push(id);
      }
    } catch (err) {
      console.log(`  FAIL ${id}: ${err.message.slice(0, 100)}`);
      results.failed.push(id);
    }

    // 2 second delay between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n=== DONE ===`);
  console.log(`Success: ${results.success.length}/24`);
  console.log(`Failed: ${results.failed.length} ${results.failed.length > 0 ? results.failed.join(', ') : ''}`);
}

generate();
