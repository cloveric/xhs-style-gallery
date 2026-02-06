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
  'sketch-notes': 'a visual summary of 5 morning productivity habits with icons, arrows, and hand-lettered headers',

  // === New xiaohongshu styles (42) ===
  // minimal-design
  'wabi-sabi': 'a quiet tea ceremony with handmade pottery on a weathered wooden table, embracing natural imperfections',
  'muji-style': 'an organized minimalist desk setup with natural wood, white stationery, and a simple indoor plant',
  'glass-morphism': 'a weather app dashboard with frosted glass cards showing temperature and forecast icons',
  'line-art-minimal': '5 daily wellness habits illustrated with continuous single-line drawings and brief text labels',
  'scandinavian': 'a cozy hygge living room with light wood furniture, sheepskin throws, and candlelight',
  'paper-cutout': 'a Chinese Mid-Autumn Festival celebration with layered paper-cut moon, lanterns, and rabbits',
  'negative-space': 'a creative coffee cup silhouette revealing a cityscape morning scene within the negative space',

  // color-palette
  'sakura-pink': 'a spring hanami picnic under cherry blossom trees with delicate pink pastries and matcha drinks',
  'ice-blue': 'a refreshing summer skincare routine featuring glacier-blue serums and crystal-clear water drops',
  'matcha-green': 'a serene Japanese matcha cafe interior with bamboo details and freshly whisked matcha latte',
  'sunset-gradient': 'a breathtaking seaside sunset view from a cliffside restaurant with warm orange-purple sky',
  'lavender-haze': 'a dreamy Provence lavender field at golden hour with a vintage bicycle and wicker basket',
  'cyberpunk-neon': 'a futuristic Tokyo street at night with holographic signs, neon reflections on wet pavement',
  'milk-tea-tone': 'an aesthetic cafe flat-lay with milk tea, croissants, a book, and dried flowers on linen',

  // 3d-effects
  '3d-glass': 'a transparent glass smartphone floating in space with colorful app icons visible through the crystal-clear material',
  '3d-inflated': '5 productivity tips with puffy inflated balloon-like 3D text and soft rounded icons floating on a pastel gradient',
  '3d-low-poly': 'a geometric low-poly mountain landscape with a deer and aurora borealis in the night sky',
  '3d-candy': 'a collection of glossy candy-textured beauty products like lipstick, compact, and perfume bottle',
  '3d-metallic': 'a luxury chrome and gold 3D typography spelling STYLE with liquid metal reflections',
  '3d-miniature-world': 'a miniature tilt-shift Japanese zen garden on a floating island with tiny bonsai and stone paths',
  '3d-neon-glow': 'a glowing neon sign spelling OPEN on a dark brick wall with pink and blue tube lighting',

  // info-display
  'mind-map': 'a visual mind map of healthy morning routine habits branching from a central wellness icon',
  'xhs-recipe-card': 'a structured recipe card for making perfect Japanese fluffy pancakes with step-by-step photos',
  'swot-matrix': 'a 2x2 matrix comparing four popular programming languages by ease-of-learning and job-market demand',
  'data-story': 'a narrative visualization of global coffee consumption trends over the past decade with charts and icons',
  'flowchart-process': 'a clear step-by-step skincare routine flowchart from cleansing to sunscreen application',
  'rating-scorecard': 'a detailed product review scorecard for a noise-canceling headphone with star ratings across 5 categories',
  'stat-counter': 'a year-in-review summary with big bold numbers: books read, km walked, recipes tried, countries visited',

  // photo-mood
  'film-diary': 'a weekend trip diary with Polaroid-style photos of a coastal town, handwritten dates and tiny captions',
  'light-and-shadow': 'dramatic window light casting geometric shadows on a minimalist breakfast table with coffee and croissant',
  'drone-aerial': 'a stunning birds-eye view of colorful autumn forest with a winding river cutting through',
  'golden-hour': 'a warm golden hour portrait session at a sunflower field with soft lens flare',
  'rain-mood': 'a cozy rainy afternoon scene through a foggy cafe window with rain droplets and warm interior lighting',
  'mirror-reflection': 'a perfect symmetrical reflection of a traditional Japanese temple in a still pond at dawn',
  'bokeh-dreamy': 'a close-up of a hand holding a sparkler at dusk with beautiful circular bokeh lights in background',

  // trending
  'xhs-pixel-art': 'a cozy pixel art coffee shop scene with a barista making latte art and warm interior glow',
  'risograph': 'a vibrant risograph-printed poster of a farmer market scene with misregistered ink layers in orange and teal',
  'brutalist': 'a raw brutalist design poster for a tech conference with bold monospaced type and stark black-white contrast',
  'chinese-traditional': 'a modern Chinese New Year celebration poster blending traditional paper lanterns with contemporary typography',
  'y2k-retro': 'a nostalgic Y2K-style flip phone advertisement with chrome text, star graphics, and iridescent butterfly clips',
  'watercolor-wash': 'a gentle watercolor painting of a cozy bookshop interior with soft washes of warm amber and sage green',
  'comic-pop-art': 'a pop art style food review panel with halftone dots, bold outlines, and comic speech bubbles saying DELICIOUS'
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
  console.log(`Success: ${results.success.length}/${data.length}`);
  console.log(`Failed: ${results.failed.length} ${results.failed.length > 0 ? results.failed.join(', ') : ''}`);
}

generate();
