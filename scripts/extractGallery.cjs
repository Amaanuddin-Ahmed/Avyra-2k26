// Extract file IDs from ALL cached Drive HTML pages
const fs = require('fs');
const path = require('path');

const htmlPaths = [
  'C:/Users/DELL/.gemini/antigravity/brain/7023d3c9-02ec-45a4-816a-5f7952f48a13/.system_generated/steps/517/content.md',
  'C:/Users/DELL/.gemini/antigravity/brain/7023d3c9-02ec-45a4-816a-5f7952f48a13/.system_generated/steps/685/content.md',
  'C:/Users/DELL/.gemini/antigravity/brain/7023d3c9-02ec-45a4-816a-5f7952f48a13/.system_generated/steps/711/content.md',
];

const wantedNumbers = [
  867, 87, 91, 98, 919, 931, 37, 38, 53, 59, 65, 68,
  1041, 56, 62, 73, 78, 85, 88, 90, 93, 96,
  1104, 1111, 1133, 1146, 1148, 1157, 1159, 1169, 1172, 1187, 1194,
  1202, 1210, 1216, 1222, 1224, 1238, 1264, 1274, 1278, 1295,
  1306, 1307, 1302, 1361, 1262, 1366, 1381, 1382, 1393, 1395,
  1417, 1424, 1440, 1454, 1459, 1460, 1463, 1467, 1468, 71
];
const wantedSet = new Set(wantedNumbers.map(n => String(n).padStart(4, '0')));
console.log('Looking for', wantedSet.size, 'unique SDQ photos');

// Process each HTML file
const sdqToId = {};

for (const htmlPath of htmlPaths) {
  if (!fs.existsSync(htmlPath)) {
    console.log('File not found:', htmlPath);
    continue;
  }
  
  const html = fs.readFileSync(htmlPath, 'utf8');
  console.log('\nProcessing:', path.basename(htmlPath), '- Size:', html.length);
  
  // The embed view has a different structure - file IDs are in flip links:
  // https://drive.google.com/file/d/FILE_ID/view
  // or in data attributes
  
  // Strategy 1: Find /file/d/ID/view patterns
  const fileViewRegex = /\/file\/d\/([a-zA-Z0-9_-]{20,})\//g;
  let m;
  const viewIds = new Set();
  while ((m = fileViewRegex.exec(html)) !== null) {
    viewIds.add(m[1]);
  }
  console.log('  Found', viewIds.size, 'file/d/ IDs');
  
  // Strategy 2: Find data-id patterns
  const dataIdRegex = /data-id="([a-zA-Z0-9_-]{20,})"/g;
  const dataIds = new Set();
  while ((m = dataIdRegex.exec(html)) !== null) {
    dataIds.add(m[1]);
  }
  console.log('  Found', dataIds.size, 'data-id IDs');
  
  // Combine all IDs
  const allIds = new Set([...viewIds, ...dataIds]);
  console.log('  Total unique IDs:', allIds.size);
  
  // For each SDQ reference, find the closest ID
  const sdqRegex = /[_]?SDQ(\d{4})/gi;
  while ((m = sdqRegex.exec(html)) !== null) {
    const num = m[1];
    if (!wantedSet.has(num)) continue;
    if (sdqToId[num]) continue;
    
    // Look in the surrounding context for file IDs
    const start = Math.max(0, m.index - 5000);
    const end = Math.min(html.length, m.index + 2000);
    const context = html.substring(start, end);
    
    // Find data-id in context
    const ctxDataId = /data-id="([a-zA-Z0-9_-]{20,})"/g;
    let bestId = null;
    let bestDist = Infinity;
    let dm;
    while ((dm = ctxDataId.exec(context)) !== null) {
      const absPos = start + dm.index;
      const dist = Math.abs(absPos - m.index);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = dm[1];
      }
    }
    
    // Also try /file/d/ID/ pattern
    const ctxFileD = /\/file\/d\/([a-zA-Z0-9_-]{20,})\//g;
    while ((dm = ctxFileD.exec(context)) !== null) {
      const absPos = start + dm.index;
      const dist = Math.abs(absPos - m.index);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = dm[1];
      }
    }
    
    if (bestId && bestDist < 5000) {
      sdqToId[num] = bestId;
    }
  }
  
  console.log('  Found IDs for', Object.keys(sdqToId).length, 'wanted photos so far');
}

const foundNums = Object.keys(sdqToId).sort((a, b) => parseInt(a) - parseInt(b));
console.log('\n=== RESULTS ===');
console.log('Found', foundNums.length, 'of', wantedSet.size, 'wanted photos');
console.log('Found:', foundNums.join(', '));

const missing = [...wantedSet].filter(n => !sdqToId[n]).sort();
console.log('Missing:', missing.join(', '));

// Generate gallery data
const galleryData = foundNums.map((num, i) => ({
  id: sdqToId[num],
  num: num,
  src: `https://lh3.googleusercontent.com/d/${sdqToId[num]}=w600`,
  alt: `AVYRA Freshers Highlight ${i + 1}`
}));

const tsContent = `// Auto-generated gallery data from Google Drive
// ${galleryData.length} photos from last year's freshers
// Generated at ${new Date().toISOString()}

export interface GalleryPhoto {
  id: string;
  num: string;
  src: string;
  alt: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = ${JSON.stringify(galleryData, null, 2)};
`;

const outPath = path.resolve(__dirname, '../src/data/gallery.ts');
fs.writeFileSync(outPath, tsContent);
console.log('\nWrote', galleryData.length, 'photos to gallery.ts');
