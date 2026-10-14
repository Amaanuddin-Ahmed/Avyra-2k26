// Extract SDQ file IDs from cached Drive HTML
// Then download selected photos from Google Drive
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cachedHtmlPath = 'C:/Users/DELL/.gemini/antigravity/brain/7023d3c9-02ec-45a4-816a-5f7952f48a13/.system_generated/steps/517/content.md';
const html = fs.readFileSync(cachedHtmlPath, 'utf8');

// The user's requested SDQ numbers (from chat history):
// sdq0867, 87, 91, 98, 919, 931, 37, 38, 53, 59, 65, 68, 87, 1041, 56, 62, 73, 78, 85, 88, 90, 93, 96, 
// 1104, 1111, 1133, 1146, 1148, 1157, 1159, 1169, 1172, 1187, 1194, 1202, 1210, 1216, 1222, 1224, 1238, 
// 1264, 1274, 1278, 1295, 1306, 1307, 1302, 1361, 1262, 1366, 1381, 1382, 1393, 1395, 1417, 1424, 1440, 
// 1454, 1459, 1460, 1463, 1467, 1468, 71
const wantedNumbers = [
  867, 87, 91, 98, 919, 931, 37, 38, 53, 59, 65, 68,
  1041, 56, 62, 73, 78, 85, 88, 90, 93, 96,
  1104, 1111, 1133, 1146, 1148, 1157, 1159, 1169, 1172, 1187, 1194,
  1202, 1210, 1216, 1222, 1224, 1238, 1264, 1274, 1278, 1295,
  1306, 1307, 1302, 1361, 1262, 1366, 1381, 1382, 1393, 1395,
  1417, 1424, 1440, 1454, 1459, 1460, 1463, 1467, 1468, 71
];

// Normalize to 4-digit zero-padded strings
const wantedSet = new Set(wantedNumbers.map(n => String(n).padStart(4, '0')));
console.log(`Looking for ${wantedSet.size} unique SDQ photos`);

// Step 1: Find all SDQ entries in the HTML
// Pattern: aria-label="_SDQ####.JPG ... ssk='5:SOMETHING:SOMETHING:FILE_ID'
// The ssk attribute contains the file ID embedded within it

// First let's find all SDQ filenames and the surrounding context to understand the ID structure
const sdqRegex = /_?SDQ(\d{4})\.JPG/gi;
const allSdqMatches = [];
let match;
while ((match = sdqRegex.exec(html)) !== null) {
  const num = match[1];
  const start = Math.max(0, match.index - 500);
  const end = Math.min(html.length, match.index + 500);
  const context = html.substring(start, end);
  allSdqMatches.push({ num, index: match.index, context });
}
console.log(`Found ${allSdqMatches.length} total SDQ entries in HTML`);

// Let's look at the structure around the first entry to understand how IDs are stored
if (allSdqMatches.length > 0) {
  // The SSK attribute format seems to be: ssk='5:KEY:NUMBER:FILE_ID'
  // Let's try to extract the file ID from the ssk attribute near each SDQ entry
  
  // Actually looking at the context more carefully:
  // The pattern seems like: aria-label="_SDQ0861.JPG Image Shared" ... ssk='5:auSv138:1lTdco32Qx2xpp3VnvFtXb0WAdv2HGsvi-0-16'
  // But the Google Drive file ID is usually a ~33 character alphanumeric string
  
  // Let's look for data-id patterns instead
  const dataIdRegex = /data-id="([^"]+)"/g;
  const allDataIds = [];
  while ((match = dataIdRegex.exec(html)) !== null) {
    allDataIds.push({ id: match[1], index: match.index });
  }
  console.log(`Found ${allDataIds.length} data-id entries in HTML`);
  
  // For each SDQ entry, find the nearest data-id before it
  const sdqWithIds = [];
  for (const sdqEntry of allSdqMatches) {
    // Find the closest data-id that comes before this SDQ entry
    let closestId = null;
    let closestDist = Infinity;
    for (const dataId of allDataIds) {
      const dist = sdqEntry.index - dataId.index;
      if (dist > 0 && dist < closestDist) {
        closestDist = dist;
        closestId = dataId.id;
      }
    }
    // Also check for data-id after (within 2000 chars)
    if (!closestId || closestDist > 2000) {
      for (const dataId of allDataIds) {
        const dist = dataId.index - sdqEntry.index;
        if (dist > 0 && dist < 2000 && dist < closestDist) {
          closestDist = dist;
          closestId = dataId.id;
        }
      }
    }
    if (closestId && closestDist < 5000) {
      sdqWithIds.push({ num: sdqEntry.num, id: closestId, dist: closestDist });
    }
  }
  
  console.log(`Mapped ${sdqWithIds.length} SDQ entries to data-ids`);
  if (sdqWithIds.length > 0) {
    console.log('Sample:', JSON.stringify(sdqWithIds.slice(0, 3)));
  }
  
  // Filter for wanted photos
  const wantedPhotos = sdqWithIds.filter(e => wantedSet.has(e.num));
  // Remove duplicates by num
  const seen = new Set();
  const uniqueWanted = wantedPhotos.filter(e => {
    if (seen.has(e.num)) return false;
    seen.add(e.num);
    return true;
  });
  
  console.log(`Found ${uniqueWanted.length} of ${wantedSet.size} wanted photos`);
  
  // Save the mapping for download
  const outDir = path.resolve(__dirname, '../public/images/gallery');
  fs.mkdirSync(outDir, { recursive: true });
  
  // Clean old photos
  const oldFiles = fs.readdirSync(outDir);
  for (const f of oldFiles) {
    fs.unlinkSync(path.join(outDir, f));
  }
  console.log(`Cleaned ${oldFiles.length} old files from gallery`);
  
  // Write manifest
  const manifest = uniqueWanted.map((e, i) => ({
    filename: `SDQ${e.num}.JPG`,
    driveId: e.id,
    index: i + 1
  }));
  
  const manifestPath = path.resolve(__dirname, '../public/gallery.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Wrote manifest with ${manifest.length} entries to gallery.json`);
  
  // Download each photo
  async function downloadFile(fileId, filename) {
    // Use Google Drive export URL for publicly shared files
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const dest = path.join(outDir, filename);
    
    return new Promise((resolve, reject) => {
      const makeRequest = (requestUrl, redirectCount) => {
        if (redirectCount > 5) {
          reject(new Error('Too many redirects'));
          return;
        }
        
        const protocol = requestUrl.startsWith('https') ? https : http;
        protocol.get(requestUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, response => {
          // Follow redirects
          if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            makeRequest(response.headers.location, redirectCount + 1);
            return;
          }
          
          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode} for ${filename}`));
            return;
          }
          
          const file = fs.createWriteStream(dest);
          response.pipe(file);
          file.on('finish', () => file.close(() => resolve()));
          file.on('error', err => {
            fs.unlink(dest, () => {});
            reject(err);
          });
        }).on('error', err => reject(err));
      };
      
      makeRequest(url, 0);
    });
  }
  
  (async () => {
    let downloaded = 0;
    let failed = 0;
    for (let i = 0; i < uniqueWanted.length; i++) {
      const entry = uniqueWanted[i];
      const filename = `SDQ${entry.num}.JPG`;
      try {
        await downloadFile(entry.id, filename);
        downloaded++;
        if (downloaded % 10 === 0) console.log(`Downloaded ${downloaded}/${uniqueWanted.length}...`);
        // Rate limit
        await new Promise(r => setTimeout(r, 300));
      } catch (err) {
        console.error(`Failed ${filename}: ${err.message}`);
        failed++;
      }
    }
    console.log(`\nDone! Downloaded: ${downloaded}, Failed: ${failed}`);
    
    // Update manifest with only successfully downloaded files
    const finalFiles = fs.readdirSync(outDir).filter(f => f.endsWith('.JPG') || f.endsWith('.jpg'));
    const finalManifest = finalFiles.map((f, i) => ({ filename: f }));
    fs.writeFileSync(manifestPath, JSON.stringify(finalManifest, null, 2));
    console.log(`Final manifest: ${finalManifest.length} photos`);
  })();
}
